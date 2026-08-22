import React, { useState, useEffect } from 'react';
import './index.css';

// Professional SVGs
const Icons = {
  Home: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Download: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
  ),
  Images: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
  ),
  Browser: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  ),
  History: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Paste: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
  ),
  Folder: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  )
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [availableFormats, setAvailableFormats] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [downloadMode, setDownloadMode] = useState('video');
  const [audioFormat, setAudioFormat] = useState('m4a');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [savePath, setSavePath] = useState(() => localStorage.getItem('savePath') || '');
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('downloadHistory')) || [];
    } catch {
      return [];
    }
  });

  // Image Extractor States
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [extractingImages, setExtractingImages] = useState(false);
  const [extractedImages, setExtractedImages] = useState([]);
  const [downloadingImageIdx, setDownloadingImageIdx] = useState(null);
  const [imageMsg, setImageMsg] = useState(null);

  // Browser launcher state
  const [browserUrlInput, setBrowserUrlInput] = useState('');

  const [remoteConfig, setRemoteConfig] = useState(null);
  const [updateStatus, setUpdateStatus] = useState('idle'); // idle, available, downloading, completed, error
  const [updateProgress, setUpdateProgress] = useState(0);

  const APP_VERSION = '1.0.0';
  const currentDownloadRef = React.useRef(null);

  // Save config values
  useEffect(() => {
    localStorage.setItem('savePath', savePath);
  }, [savePath]);

  useEffect(() => {
    localStorage.setItem('downloadHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`https://ultrasave-website.vercel.app/config.json?t=${Date.now()}`);
        const data = await res.json();
        setRemoteConfig(data);
        if (data.version && data.version !== APP_VERSION) {
          setUpdateStatus('available');
        }
      } catch (err) {
        console.debug('Failed to fetch remote config:', err);
      }
    };
    fetchConfig();
  }, []);

  // Handle auto-paste
  useEffect(() => {
    const handleFocus = async () => {
      try {
        const text = await navigator.clipboard.readText();
        const validDomains = ['youtube.com', 'youtu.be', 'tiktok.com', 'instagram.com', 'fb.watch', 'facebook.com', 'pinterest.com', 'twitter.com', 'x.com'];
        if (text && validDomains.some(domain => text.includes(domain)) && !url) {
          setUrl(text);
        }
      } catch (clipboardError) {
        console.debug('Clipboard access unavailable:', clipboardError);
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [url]);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onDownloadProgress((_, msg) => setProgress(msg));
      window.electronAPI.onDownloadError((_, err) => {
        setError(err);
        setDownloading(false);
      });
      window.electronAPI.onDownloadComplete(() => {
        setDownloading(false);
        setProgress('Download Completed Successfully!');
        if (currentDownloadRef.current) {
          const { title, url: dlUrl, type, savePath: dlPath } = currentDownloadRef.current;
          setHistory(prev => [
            {
              id: Date.now(),
              title,
              url: dlUrl,
              type,
              savePath: dlPath,
              date: new Date().toLocaleString(),
            },
            ...prev
          ]);
        }
      });

      // Update progress listeners
      window.electronAPI.onUpdateProgress((_, prog) => {
        setUpdateProgress(prog);
        setUpdateStatus('downloading');
      });
      window.electronAPI.onUpdateComplete(() => {
        setUpdateStatus('completed');
      });
      window.electronAPI.onUpdateError((_, err) => {
        setError(`Update failed: ${err}`);
        setUpdateStatus('error');
      });
    }
  }, []);

  const handleFetchInfo = async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    setVideoInfo(null);
    setAvailableFormats([]);
    setSelectedFormat('');
    setDownloadMode('video');
    try {
      if (window.electronAPI) {
        const info = await window.electronAPI.fetchInfo(url);
        if (info?.error) {
          setError(info.error);
        } else {
          setVideoInfo(info);
          const formats = Array.isArray(info?.formats) ? info.formats : [];
          const picked = buildQualityList(formats);
          setAvailableFormats(picked);
          setSelectedFormat(picked.find((item) => item.recommended)?.formatId || picked[0]?.formatId || 'bestvideo+bestaudio/best');
        }
      }
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const selectDirectory = async () => {
    if (window.electronAPI) {
      const path = await window.electronAPI.openDirectory();
      if (path) setSavePath(path);
    }
  };

  const triggerUpdate = () => {
    if (remoteConfig?.downloadUrl && window.electronAPI) {
      setUpdateStatus('downloading');
      window.electronAPI.downloadUpdate(remoteConfig.downloadUrl);
    }
  };

  const startDownload = () => {
    if (!videoInfo || !savePath) return;
    setDownloading(true);
    setProgress('Preparing...');
    const isAudioOnly = downloadMode === 'audio';

    currentDownloadRef.current = {
      title: videoInfo.title,
      url,
      type: downloadMode,
      savePath
    };

    window.electronAPI.downloadVideo({
      url,
      format: isAudioOnly ? 'bestaudio/best' : (selectedFormat || 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'),
      savePath,
      subtitle: 'none',
      audioOnly: isAudioOnly,
      audioFormat
    });
  };

  // Extract Images from any web link
  const handleExtractImages = async () => {
    if (!imageUrlInput) return;
    setExtractingImages(true);
    setImageMsg(null);
    setExtractedImages([]);
    try {
      if (window.electronAPI) {
        const res = await window.electronAPI.extractImages(imageUrlInput);
        if (res.success && res.images?.length > 0) {
          setExtractedImages(res.images);
          setImageMsg(`Found ${res.images.length} high-resolution images & assets!`);
        } else {
          setImageMsg(res.error || 'No images found on this page.');
        }
      }
    } catch (err) {
      setImageMsg(`Extraction failed: ${err.message}`);
    } finally {
      setExtractingImages(false);
    }
  };

  const handleDownloadSingleImage = async (imgObj, idx) => {
    setDownloadingImageIdx(idx);
    try {
      if (window.electronAPI) {
        await window.electronAPI.downloadImage({
          imageUrl: imgObj.url,
          savePath: savePath || '',
          fileName: `image_${Date.now()}_${imgObj.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
        });
        setImageMsg(`Downloaded: ${imgObj.name}`);
      }
    } catch (err) {
      setImageMsg(`Failed to download image: ${err}`);
    } finally {
      setDownloadingImageIdx(null);
    }
  };

  const openInAppBrowser = (target) => {
    if (window.electronAPI) {
      window.electronAPI.openBrowserWindow(target || 'https://google.com');
    }
  };

  const formatSize = (bytes) => {
    if (!bytes || Number.isNaN(bytes)) return 'Auto size';
    if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
    if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  const buildQualityList = (formats) => {
    const videoFormats = formats
      .filter((format) => format?.vcodec && format.vcodec !== 'none' && format?.height)
      .sort((a, b) => (b.height || 0) - (a.height || 0) || (b.fps || 0) - (a.fps || 0));

    const maxHeight = videoFormats[0]?.height || 0;
    const seen = new Set();
    const results = [];

    videoFormats.forEach((format) => {
      const label = `${format.height}p${format.fps ? ` • ${format.fps}fps` : ''}`;
      const key = `${format.height}-${format.fps || 0}`;
      if (seen.has(key)) return;
      seen.add(key);

      const recommended = format.height === Math.min(Math.max(maxHeight, 720), 1080) && (format.fps || 30) >= 30;
      results.push({
        id: key,
        label,
        formatId: `${format.format_id}+bestaudio[ext=m4a]/best[ext=mp4]/best`,
        size: format.filesize || format.filesize_approx || null,
        note: format.vcodec?.includes('avc') ? 'MP4' : format.vcodec || 'Video',
        fps: format.fps || null,
        recommended,
      });
    });

    const audioFormats = formats
      .filter((format) => format?.vcodec === 'none' && format?.acodec && format.acodec !== 'none')
      .sort((a, b) => (b.abr || 0) - (a.abr || 0));

    const bestAudio = audioFormats[0];
    if (bestAudio) {
      results.push({
        id: 'audio-only',
        label: `Audio only • ${bestAudio.abr ? `${bestAudio.abr}kbps` : 'Best'}`,
        formatId: 'bestaudio/best',
        size: bestAudio.filesize || bestAudio.filesize_approx || null,
        note: 'MP3/M4A',
        fps: null,
        recommended: false,
      });
    }

    return results.slice(0, 12);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><Icons.Download /></span>
                Universal Video & Audio Downloader
              </h2>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="Paste link from YouTube, TikTok, Facebook, Instagram, Twitter or any website..." 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 p-4 pl-12 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-500 text-sm"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icons.Paste />
                  </div>
                </div>
                <button 
                  onClick={handleFetchInfo}
                  disabled={loading || !url}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-8 rounded-xl font-bold transition-all accent-glow whitespace-nowrap shadow-lg shadow-indigo-600/30"
                >
                  {loading ? 'Analyzing...' : 'Fetch Info'}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-4 rounded-xl text-sm animate-fade-in flex items-center justify-between gap-4">
                <span>{error}</span>
                <button
                  onClick={() => openInAppBrowser(url)}
                  className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs px-3 py-1.5 rounded-lg border border-rose-500/30 font-semibold whitespace-nowrap"
                >
                  Open in Built-in Browser ↗
                </button>
              </div>
            )}

            {videoInfo && (
              <div className="glass-card p-6 rounded-2xl animate-fade-in">
                <div className="flex gap-6 flex-col md:flex-row">
                  <div className="relative group flex-shrink-0">
                    <img src={videoInfo.thumbnail} className="w-full md:w-64 aspect-video object-cover rounded-xl shadow-2xl border border-white/10" alt="" />
                    <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                      {videoInfo.extractor_key}
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold leading-tight mb-1">{videoInfo.title}</h3>
                      <p className="text-gray-400 text-xs">{videoInfo.duration_string || 'Duration unavailable'}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400 min-w-16 text-xs">Save Folder:</span>
                        <div className="flex-1 flex gap-2">
                          <input type="text" readOnly value={savePath} placeholder="Select download directory..." className="flex-1 bg-black/40 border border-white/5 px-3 py-2 rounded-lg text-xs" />
                          <button onClick={selectDirectory} className="bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-colors"><Icons.Folder /></button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Select Mode</div>
                        <div className="flex rounded-xl border border-white/10 bg-black/30 p-1 text-xs font-bold">
                          <button onClick={() => setDownloadMode('video')} className={`rounded-lg px-4 py-1.5 transition-all ${downloadMode === 'video' ? 'bg-indigo-500 text-white shadow' : 'text-gray-400'}`}>Video</button>
                          <button onClick={() => setDownloadMode('audio')} className={`rounded-lg px-4 py-1.5 transition-all ${downloadMode === 'audio' ? 'bg-cyan-500 text-white shadow' : 'text-gray-400'}`}>Audio Only</button>
                        </div>
                      </div>
                      {downloadMode === 'audio' ? (
                        <select value={audioFormat} onChange={(event) => setAudioFormat(event.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500">
                          <option value="m4a">M4A • Original Quality (Recommended)</option>
                          <option value="mp3">MP3 • 320 kbps Ultra HD</option>
                          <option value="mp3-192">MP3 • 192 kbps Standard</option>
                        </select>
                      ) : null}

                      <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Available Resolutions & Quality</div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {downloadMode === 'video' && availableFormats.length > 0 ? availableFormats.map((format) => (
                          <button
                            key={format.id}
                            onClick={() => setSelectedFormat(format.formatId)}
                            className={`rounded-xl border p-3 text-left transition-all ${
                              selectedFormat === format.formatId
                                ? 'border-indigo-400 bg-indigo-500/20 text-white shadow-lg shadow-indigo-500/10'
                                : 'border-white/10 bg-black/30 text-gray-300 hover:border-white/20 hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="font-bold text-sm">{format.label}</div>
                                <div className="text-[11px] text-gray-400 mt-0.5">
                                  {format.note} {format.fps ? `• ${format.fps}fps` : ''}
                                </div>
                              </div>
                              {format.recommended ? (
                                <span className="rounded bg-cyan-400/20 px-2 py-0.5 text-[9px] font-extrabold uppercase text-cyan-300">
                                  HD
                                </span>
                              ) : null}
                            </div>
                            <div className="mt-1 text-[11px] text-gray-500">
                              {formatSize(format.size)}
                            </div>
                          </button>
                        )) : downloadMode === 'audio' ? (
                          <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-xs text-cyan-200 col-span-2">
                            ✨ Audio extraction extracts direct high-bitrate stream and converts to selected format smoothly.
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400 rounded-xl border border-dashed border-white/10 p-4 col-span-2">
                            Direct best quality stream selected. Ready to download.
                          </div>
                        )}
                      </div>
                    </div>

                    <button 
                      onClick={startDownload}
                      disabled={downloading || !savePath}
                      className="w-full accent-gradient hover:opacity-95 text-white font-bold py-3.5 rounded-xl shadow-xl transition-all disabled:opacity-30 disabled:grayscale uppercase tracking-wider text-sm shadow-indigo-600/30"
                    >
                      {downloading ? 'Processing Download...' : 'START DOWNLOAD'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {progress && (
              <div className="glass-card p-6 rounded-2xl animate-fade-in border-indigo-500/20">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-indigo-400 font-bold text-xs tracking-widest uppercase">Live Progress</span>
                  <span className="text-xs font-mono text-indigo-300">{progress}</span>
                </div>
                <div className="h-2 bg-black rounded-full overflow-hidden">
                  <div className="h-full accent-gradient animate-pulse" style={{width: progress.includes('%') ? progress.split('%')[0].split(' ').pop() + '%' : '100%'}}></div>
                </div>
              </div>
            )}
          </div>
        );

      case 'images':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><Icons.Images /></span>
                Universal Web Image & Asset Extractor
              </h2>
              <p className="text-xs text-gray-400 mb-4">Extract all original resolutions, HD srcset, and background images from any webpage URL.</p>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="Enter website link (e.g. https://unsplash.com, instagram, blog, etc.)..." 
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 p-4 pl-12 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-sm"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icons.Paste />
                  </div>
                </div>
                <button 
                  onClick={handleExtractImages}
                  disabled={extractingImages || !imageUrlInput}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-8 rounded-xl font-bold transition-all whitespace-nowrap shadow-lg shadow-indigo-600/30"
                >
                  {extractingImages ? 'Scanning Page...' : 'Extract All Images'}
                </button>
              </div>
            </div>

            {imageMsg && (
              <div className="bg-white/5 border border-white/10 text-indigo-300 p-4 rounded-xl text-xs flex justify-between items-center">
                <span>{imageMsg}</span>
              </div>
            )}

            {extractedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {extractedImages.map((img, idx) => (
                  <div key={idx} className="glass-card rounded-2xl p-3 flex flex-col justify-between group border border-white/5 hover:border-indigo-500/40 transition-all">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-black/40 mb-3 flex items-center justify-center">
                      <img src={img.url} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-bold text-gray-300 uppercase">
                        {img.type}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-300 truncate font-semibold">{img.name}</p>
                      <button
                        onClick={() => handleDownloadSingleImage(img, idx)}
                        disabled={downloadingImageIdx === idx}
                        className="w-full bg-white/5 hover:bg-indigo-600 text-white text-xs font-bold py-2 rounded-lg transition-colors border border-white/10 hover:border-indigo-500"
                      >
                        {downloadingImageIdx === idx ? 'Saving...' : 'Download Image ⬇'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'browser':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <span className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><Icons.Browser /></span>
                Built-in Web Browser & Sniffer
              </h2>
              <p className="text-xs text-gray-400 mb-6">
                Open any restricted, DRM-protected, or login-based website directly in an isolated browser window to browse freely and grab direct streaming media links.
              </p>

              <div className="flex gap-3 max-w-2xl">
                <input 
                  type="text" 
                  placeholder="https://example.com" 
                  value={browserUrlInput}
                  onChange={(e) => setBrowserUrlInput(e.target.value)}
                  className="flex-1 bg-black/40 border border-white/5 p-4 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
                <button
                  onClick={() => openInAppBrowser(browserUrlInput)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                >
                  Launch Browser ↗
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-2">
                <div className="text-lg">🍪 Bypass Cookies & Captcha</div>
                <p className="text-xs text-gray-400">Log in securely with your accounts on sites requiring verification.</p>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-2">
                <div className="text-lg">⚡ Dynamic Blobs & DRM</div>
                <p className="text-xs text-gray-400">Inspect and play protected streams without bot blocking.</p>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-white/5 space-y-2">
                <div className="text-lg">🎯 1-Click Link Capture</div>
                <p className="text-xs text-gray-400">Copy any media link directly into Media Drop Downloader.</p>
              </div>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><Icons.History /></span>
                Download History
              </h2>
              {history.length > 0 && (
                <button
                  onClick={() => { setHistory([]); localStorage.removeItem('downloadHistory'); }}
                  className="text-xs text-rose-400 hover:text-rose-300 border border-rose-500/20 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            {history.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center text-gray-500">
                <div className="text-4xl mb-3">📂</div>
                <p className="text-sm">No downloads yet. Start downloading something!</p>
              </div>
            ) : (
              history.map(item => (
                <div key={item.id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-lg flex-shrink-0">
                    {item.type === 'audio' ? '🎵' : '🎬'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.date} · {item.type === 'audio' ? 'Audio' : 'Video'}</p>
                    <p className="text-xs text-gray-600 truncate mt-0.5">{item.savePath}</p>
                  </div>
                  <button
                    onClick={() => window.electronAPI?.openItem(item.savePath)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 px-3 py-1.5 border border-indigo-500/20 rounded-lg flex-shrink-0 transition-colors"
                  >
                    Open Folder
                  </button>
                </div>
              ))
            )}
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><Icons.Settings /></span>
              Settings
            </h2>

            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Download Location</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={savePath || 'No folder selected'}
                  className="flex-1 bg-black/40 border border-white/5 px-4 py-3 rounded-xl text-sm text-gray-300"
                />
                <button
                  onClick={selectDirectory}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl text-sm font-bold transition-colors"
                >
                  Browse
                </button>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Application & Auto Update</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Current Version</p>
                  <p className="text-xs text-gray-500 mt-0.5">v{APP_VERSION}</p>
                </div>
                {updateStatus === 'idle' && remoteConfig && (
                  <span className="text-xs text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg">Up to date</span>
                )}
                {updateStatus === 'available' && (
                  <button
                    onClick={triggerUpdate}
                    className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-lg shadow-indigo-600/30"
                  >
                    ⬇ 1-Click Update to v{remoteConfig?.version}
                  </button>
                )}
                {updateStatus === 'downloading' && (
                  <div className="text-xs text-indigo-400">Downloading Update... {updateProgress}%</div>
                )}
                {updateStatus === 'completed' && (
                  <span className="text-xs text-emerald-400">Update downloaded. Restarting...</span>
                )}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Data Management</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Download History</p>
                  <p className="text-xs text-gray-500 mt-0.5">{history.length} items stored locally</p>
                </div>
                <button
                  onClick={() => { setHistory([]); localStorage.removeItem('downloadHistory'); }}
                  className="text-xs text-rose-400 hover:text-rose-300 border border-rose-500/20 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Clear History
                </button>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#050508] text-[#fcfcff] selection:bg-indigo-500/30 overflow-hidden dark">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col bg-black/20 backdrop-blur-3xl">
        <div className="p-6 pb-4 flex items-center gap-3 no-drag">
          <div className="w-10 h-10 accent-gradient rounded-xl flex items-center justify-center text-2xl shadow-lg ring-1 ring-white/20">🎬</div>
          <h1 className="brand-wordmark">Media Drop</h1>
        </div>

        {/* Update Banner */}
        {updateStatus === 'available' && (
          <div className="mx-4 mb-2 bg-indigo-600/15 border border-indigo-500/30 rounded-xl p-3">
            <p className="text-[11px] font-bold text-indigo-300">🚀 Update available!</p>
            <p className="text-[10px] text-gray-400 mt-0.5">v{remoteConfig?.version} is ready</p>
            <button
              onClick={triggerUpdate}
              className="mt-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold py-1.5 rounded-lg transition-colors shadow-md"
            >
              1-Click Update
            </button>
          </div>
        )}
        {updateStatus === 'downloading' && (
          <div className="mx-4 mb-2 bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-3">
            <p className="text-[11px] font-bold text-indigo-300">Downloading update... {updateProgress}%</p>
            <div className="mt-2 h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 transition-all" style={{ width: `${updateProgress}%` }} />
            </div>
          </div>
        )}

        <nav className="flex-1 px-4 space-y-1 no-drag">
          {[
            { id: 'home', label: 'Media Downloader', icon: Icons.Home },
            { id: 'images', label: 'Image Extractor', icon: Icons.Images },
            { id: 'browser', label: 'Built-in Browser', icon: Icons.Browser },
            { id: 'history', label: 'History', icon: Icons.History },
            { id: 'settings', label: 'Settings', icon: Icons.Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                activeTab === tab.id
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon />
              {tab.label}
              {tab.id === 'history' && history.length > 0 && (
                <span className="ml-auto bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{history.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="bg-indigo-600/5 rounded-2xl p-3 border border-indigo-500/10">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs text-gray-300 font-medium">System Online · v{APP_VERSION}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <div className="h-8 titlebar-drag-region" />

        <div className="flex-1 p-8 pt-2 overflow-y-auto overflow-x-hidden">
          {renderContent()}
        </div>

        {/* Dynamic Partner / Affiliate Notice (Only shows if enabled in remote config.json) */}
        {remoteConfig?.affiliate?.enabled && (
          <div className="h-[72px] bg-black/30 border-t border-white/5 flex items-center px-6 gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-300 truncate">{remoteConfig.affiliate.title}</p>
              <p className="text-[11px] text-gray-500 truncate">{remoteConfig.affiliate.text}</p>
            </div>
            <a
              href={remoteConfig.affiliate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Learn More
            </a>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
