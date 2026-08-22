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
  )
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [savePath, setSavePath] = useState('');

  // Handle auto-paste
  useEffect(() => {
    const handleFocus = async () => {
      try {
        const text = await navigator.clipboard.readText();
        const validDomains = ['youtube.com', 'youtu.be', 'tiktok.com', 'instagram.com', 'fb.watch', 'facebook.com'];
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
      });
    }
  }, []);

  const handleFetchInfo = async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    setVideoInfo(null);
    try {
      if (window.electronAPI) {
        const info = await window.electronAPI.fetchInfo(url);
        if (info?.error) setError(info.error);
        else setVideoInfo(info);
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

  const startDownload = () => {
    if (!videoInfo || !savePath) return;
    setDownloading(true);
    setProgress('Preparing...');
    window.electronAPI.downloadVideo({
      url,
      format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
      savePath,
      subtitle: 'none'
    });
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><Icons.Download /></span>
                New Download
              </h2>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="Paste video URL here..." 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 p-4 pl-12 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-500"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icons.Paste />
                  </div>
                </div>
                <button 
                  onClick={handleFetchInfo}
                  disabled={loading || !url}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-8 rounded-xl font-bold transition-all accent-glow whitespace-nowrap"
                >
                  {loading ? 'Analyzing...' : 'Fetch Info'}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-sm animate-fade-in">
                {error}
              </div>
            )}

            {videoInfo && (
              <div className="glass-card p-6 rounded-2xl animate-fade-in">
                <div className="flex gap-6">
                  <div className="relative group">
                    <img src={videoInfo.thumbnail} className="w-56 aspect-video object-cover rounded-xl shadow-2xl border border-white/10" alt="" />
                    <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                      {videoInfo.extractor_key}
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold leading-tight mb-1">{videoInfo.title}</h3>
                      <p className="text-gray-400 text-sm">{videoInfo.duration_string || 'Length unknown'}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400 min-w-16">Save To:</span>
                        <div className="flex-1 flex gap-2">
                          <input type="text" readOnly value={savePath} placeholder="Choose folder..." className="flex-1 bg-black/40 border border-white/5 px-3 py-2 rounded-lg text-xs" />
                          <button onClick={selectDirectory} className="bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-colors"><Icons.Folder /></button>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={startDownload}
                      disabled={downloading || !savePath}
                      className="w-full accent-gradient hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-xl transition-all disabled:opacity-30 disabled:grayscale"
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
                  <span className="text-indigo-400 font-bold text-sm tracking-widest uppercase">Progress</span>
                  <span className="text-xs font-mono text-indigo-300">{progress}</span>
                </div>
                <div className="h-2 bg-black rounded-full overflow-hidden">
                  <div className="h-full accent-gradient animate-pulse" style={{width: progress.includes('%') ? progress.split('%')[0].split(' ').pop() + '%' : '100%'}}></div>
                </div>
              </div>
            )}
          </div>
        );
      case 'history':
        return <div className="p-12 text-center text-gray-500">Your download history will appear here.</div>;
      case 'settings':
        return <div className="p-12 text-center text-gray-500">Settings coming soon.</div>;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#050508] text-[#fcfcff] selection:bg-indigo-500/30 overflow-hidden dark">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col bg-black/20 backdrop-blur-3xl">
        <div className="p-8 pb-12 flex items-center gap-3 no-drag">
          <div className="w-10 h-10 accent-gradient rounded-xl flex items-center justify-center text-2xl shadow-lg ring-1 ring-white/20">🎬</div>
          <h1 className="text-xl font-extrabold tracking-tighter">Media Drop</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 no-drag">
          {[
            { id: 'home', label: 'Home', icon: Icons.Home },
            { id: 'history', label: 'History', icon: Icons.History },
            { id: 'settings', label: 'Settings', icon: Icons.Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${
                activeTab === tab.id 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="bg-indigo-600/5 rounded-2xl p-4 border border-indigo-500/10">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs text-gray-300 font-medium">System Ready</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Titlebar */}
        <div className="h-10 titlebar-drag-region flex justify-end items-center px-4 gap-2">
           {/* Custom buttons would go here (minimize, close) */}
        </div>
        
        <div className="flex-1 p-10 pt-4 overflow-y-auto overflow-x-hidden">
          {renderContent()}
        </div>

        {/* AdSense Area */}
        <div className="h-[90px] bg-black/40 border-t border-white/5 flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <span className="text-[10px] font-bold text-gray-700 absolute top-2 left-4 tracking-[0.2em] uppercase">Partner Display</span>
          <p className="text-gray-600 text-sm font-medium tracking-wide">ADVERTISEMENT SPACE (90PX)</p>
        </div>
      </main>
    </div>
  );
}

export default App;
