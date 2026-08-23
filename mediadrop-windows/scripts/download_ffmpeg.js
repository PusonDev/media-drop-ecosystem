const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const binDir = path.join(__dirname, '../resources/bin');
const zipPath = path.join(binDir, 'ffmpeg.zip');
// Using a more direct gyan.dev link for binary
const ffmpegUrl = 'https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip';

if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir, { recursive: true });
}

async function main() {
  console.log('--- STARTING FFMPEG DOWNLOAD ---');
  try {
    execFileSync('curl.exe', ['-L', '--fail', '--retry', '3', '--output', zipPath, ffmpegUrl], { stdio: 'inherit' });
    console.log('Download complete. Extracting via PowerShell...');
    execFileSync('powershell.exe', [
      '-NoProfile', '-NonInteractive', '-Command',
      `Expand-Archive -LiteralPath '${zipPath}' -DestinationPath '${binDir}' -Force`
    ], { stdio: 'inherit' });

    const ffmpegFolder = fs.readdirSync(binDir).find((folder) => folder.startsWith('ffmpeg'));
    const srcExe = ffmpegFolder && path.join(binDir, ffmpegFolder, 'bin', 'ffmpeg.exe');
    const srcProbe = ffmpegFolder && path.join(binDir, ffmpegFolder, 'bin', 'ffprobe.exe');
    if (!srcExe || !fs.existsSync(srcExe) || !srcProbe || !fs.existsSync(srcProbe)) {
      throw new Error('The downloaded archive did not contain ffmpeg.exe and ffprobe.exe.');
    }
    fs.copyFileSync(srcExe, path.join(binDir, 'ffmpeg.exe'));
    fs.copyFileSync(srcProbe, path.join(binDir, 'ffprobe.exe'));
    fs.rmSync(path.join(binDir, ffmpegFolder), { recursive: true, force: true });
    fs.rmSync(zipPath, { force: true });
    console.log('FFmpeg and FFprobe installed successfully.');
  } catch (error) {
    fs.rmSync(zipPath, { force: true });
    console.error(`FFmpeg setup failed: ${error.message}`);
    process.exitCode = 1;
  }
}

main();
