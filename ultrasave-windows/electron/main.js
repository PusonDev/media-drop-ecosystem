const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const https = require('https');

let mainWindow;

// For Vite hot module replacement
const isDev = !app.isPackaged;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    title: 'Media Drop',
    minWidth: 800,
    minHeight: 600,
    frame: true, 
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true 
    },
    icon: path.join(__dirname, '../public/icon.ico')
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Helper for exact path to bundled yt-dlp
function getYtdlpPath() {
  return app.isPackaged
    ? path.join(process.resourcesPath, 'bin/yt-dlp.exe')
    : path.join(__dirname, '../resources/bin/yt-dlp.exe');
}

function getFfmpegPath() {
  return app.isPackaged
    ? path.join(process.resourcesPath, 'bin')
    : path.join(__dirname, '../resources/bin');
}

// IPC Handler: select directory
ipcMain.handle('dialog:openDirectory', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  if (canceled) return null;
  return filePaths[0];
});

// IPC Handler: fetch info directly from yt-dlp binary (No Python needed!)
ipcMain.handle('python:fetch_info', async (event, url) => {
  const ytdlp = getYtdlpPath();

  const tryFetch = (extraArgs = []) => new Promise((resolve, reject) => {
    const args = [
      '--ffmpeg-location', getFfmpegPath(),
      '--js-runtimes', 'node',
      '--user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      '--dump-json', '--no-playlist',
      ...extraArgs,
      url
    ];
    console.log(`Executing: ${ytdlp} ${args.join(' ')}`);
    const ytProcess = spawn(ytdlp, args);
    let output = '';
    let errorOutput = '';
    ytProcess.stdout.on('data', (data) => { output += data.toString(); });
    ytProcess.stderr.on('data', (data) => { errorOutput += data.toString(); });
    ytProcess.on('close', (code) => {
      if (code === 0) {
        try { resolve(JSON.parse(output)); }
        catch { reject('Failed to parse video info.'); }
      } else {
        reject(errorOutput || `Exit code ${code}`);
      }
    });
    ytProcess.on('error', (err) => reject(`Spawn failed: ${err.message}`));
  });

  try {
    // 1st attempt: Normal extractor with modern desktop User-Agent
    return await tryFetch();
  } catch (firstErr) {
    try {
      // 2nd attempt: Generic extractor with video extraction
      return await tryFetch(['--force-generic-extractor']);
    } catch (secondErr) {
      const msg = String(secondErr);
      if (msg.includes('Unsupported URL') || msg.includes('generic')) {
        return { error: 'Unable to extract direct stream automatically. You can use Built-in Web Browser to view and download directly.' };
      }
      return { error: 'Could not fetch media info. Check URL or use Built-in Web Browser.' };
    }
  }
});

// IPC Handler: Extract all images/resolutions from any website URL
ipcMain.handle('web:extract_images', async (event, targetUrl) => {
  try {
    let cleanUrl = targetUrl.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    const dummyWin = new BrowserWindow({
      show: false,
      width: 1280,
      height: 800,
      webPreferences: {
        images: true,
        javascript: true
      }
    });

    await dummyWin.loadURL(cleanUrl, {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    });

    // Wait a brief moment for dynamic JS/Lazy images to render
    await new Promise(r => setTimeout(r, 2000));

    const images = await dummyWin.webContents.executeJavaScript(`
      (() => {
        const found = new Map();
        const addImg = (src, alt, type) => {
          if (!src || src.startsWith('data:') || src.length < 5) return;
          try {
            const absolute = new URL(src, window.location.href).href;
            if (!found.has(absolute)) {
              found.set(absolute, {
                url: absolute,
                alt: alt || 'Web Image',
                type: type || 'Image',
                name: absolute.split('/').pop().split('?')[0] || 'image.jpg'
              });
            }
          } catch(e) {}
        };

        // 1. Regular images + srcset
        document.querySelectorAll('img').forEach(img => {
          if (img.currentSrc) addImg(img.currentSrc, img.alt, 'Image');
          if (img.src) addImg(img.src, img.alt, 'Image');
          if (img.srcset) {
            img.srcset.split(',').forEach(s => {
              const part = s.trim().split(' ')[0];
              if (part) addImg(part, img.alt, 'High-Res SrcSet');
            });
          }
        });

        // 2. OpenGraph / Twitter meta images
        document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach(m => {
          if (m.content) addImg(m.content, 'Social Preview', 'HD OpenGraph');
        });

        // 3. Background images
        document.querySelectorAll('*').forEach(el => {
          const bg = window.getComputedStyle(el).backgroundImage;
          if (bg && bg.startsWith('url(')) {
            const clean = bg.replace(/^url\\(['"]?/, '').replace(/['"]?\\)$/, '');
            addImg(clean, 'Background Element', 'Background');
          }
        });

        return Array.from(found.values());
      })()
    `);

    dummyWin.destroy();
    return { success: true, url: cleanUrl, images };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// IPC Handler: Download image file to selected save directory
ipcMain.handle('web:download_image', async (event, { imageUrl, savePath, fileName }) => {
  try {
    const destination = path.join(savePath || app.getPath('downloads'), fileName || `image_${Date.now()}.jpg`);
    const file = fs.createWriteStream(destination);
    
    return new Promise((resolve, reject) => {
      const client = imageUrl.startsWith('https') ? https : require('http');
      client.get(imageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve({ success: true, path: destination });
        });
      }).on('error', (e) => {
        fs.unlink(destination, () => {});
        reject(e.message);
      });
    });
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// IPC Handler: Open In-App Browser for direct browsing / stream sniffing
ipcMain.on('web:open_browser_window', (event, targetUrl) => {
  const cleanUrl = targetUrl?.startsWith('http') ? targetUrl : `https://${targetUrl || 'google.com'}`;
  const webWin = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Media Drop Browser',
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  webWin.loadURL(cleanUrl);
});

// IPC Handler: download directly from yt-dlp binary (No Python needed!)
ipcMain.on('python:download', (event, { url, format, savePath, subtitle, audioOnly, audioFormat }) => {
  const ytdlp = getYtdlpPath();

  const args = [
    '-f', format,
    '--merge-output-format', 'mp4',
    '--ffmpeg-location', getFfmpegPath(),
    '--js-runtimes', 'node',
    '--concurrent-fragments', '8',
    '--continue', '--newline',
    '-o', path.join(savePath, '%(title)s.%(ext)s'),
    url
  ];

  if (subtitle && subtitle !== 'none') {
    args.push('--write-sub', '--sub-lang', subtitle, '--convert-subs', 'srt');
  }

  if (audioOnly) {
    args.push('-x', '--audio-format', audioFormat === 'mp3-192' ? 'mp3' : audioFormat || 'm4a');
    if (audioFormat === 'mp3-192') args.push('--audio-quality', '192K');
    if (audioFormat === 'mp3') args.push('--audio-quality', '320K');
  }

  const ytProcess = spawn(ytdlp, args);
  let errorOutput = '';

  ytProcess.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        event.reply('python:download_progress', line.trim());
      }
    });
  });

  ytProcess.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  ytProcess.on('close', (code) => {
    if (code === 0) {
      event.reply('python:download_complete', code);
    } else {
      event.reply('python:download_error', errorOutput || `Download failed with code ${code}.`);
    }
  });

  ytProcess.on('error', (error) => {
    event.reply('python:download_error', `Download process failed: ${error.message}`);
  });
});

ipcMain.on('shell:open_item', (event, fullPath) => {
  shell.showItemInFolder(fullPath);
});

ipcMain.on('app:download_update', (event, { downloadUrl }) => {
  const tempPath = path.join(app.getPath('temp'), 'MediaDropSetup.exe');
  const file = fs.createWriteStream(tempPath);
  
  console.log(`Downloading update from: ${downloadUrl}`);
  https.get(downloadUrl, (response) => {
    const totalSize = parseInt(response.headers['content-length'], 10) || 0;
    let downloadedSize = 0;
    
    response.pipe(file);
    
    response.on('data', (chunk) => {
      downloadedSize += chunk.length;
      const pct = totalSize ? Math.round((downloadedSize / totalSize) * 100) : 0;
      event.reply('app:update_progress', pct);
    });
    
    file.on('finish', () => {
      file.close();
      event.reply('app:update_complete');
      shell.openPath(tempPath).then(() => {
        app.quit();
      });
    });
  }).on('error', (err) => {
    fs.unlink(tempPath, () => {});
    event.reply('app:update_error', err.message);
  });
});
