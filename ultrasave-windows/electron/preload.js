const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
  getDefaultDownloadsPath: () => ipcRenderer.invoke('dialog:getDefaultDownloadsPath'),
  fetchInfo: (url) => ipcRenderer.invoke('python:fetch_info', url),
  downloadVideo: (options) => ipcRenderer.send('python:download', options),
  onDownloadProgress: (callback) => ipcRenderer.on('python:download_progress', callback),
  onDownloadError: (callback) => ipcRenderer.on('python:download_error', callback),
  onDownloadComplete: (callback) => ipcRenderer.on('python:download_complete', callback),
  openItem: (path) => ipcRenderer.send('shell:open_item', path),
  downloadUpdate: (url) => ipcRenderer.send('app:download_update', { downloadUrl: url }),
  extractImages: (url) => ipcRenderer.invoke('web:extract_images', url),
  downloadImage: (options) => ipcRenderer.invoke('web:download_image', options),
  openBrowserWindow: (url) => ipcRenderer.send('web:open_browser_window', url),
  onUpdateProgress: (callback) => ipcRenderer.on('app:update_progress', callback),
  onUpdateComplete: (callback) => ipcRenderer.on('app:update_complete', callback),
  onUpdateError: (callback) => ipcRenderer.on('app:update_error', callback),
  removeAllListeners: () => {
    ipcRenderer.removeAllListeners('python:download_progress');
    ipcRenderer.removeAllListeners('python:download_error');
    ipcRenderer.removeAllListeners('python:download_complete');
    ipcRenderer.removeAllListeners('app:update_progress');
    ipcRenderer.removeAllListeners('app:update_complete');
    ipcRenderer.removeAllListeners('app:update_error');
  }
});
