import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-3xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎬</span>
            <span className="text-2xl font-extrabold tracking-tighter text-white">Media Drop</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(108,99,255,0.3)]">
            Get App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] animate-fade-in tracking-tight">
            Download Anything.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Keep Everything.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
            The professional solution for saving your favorite videos from YouTube, TikTok, Instagram, and more. 
            Standalone performance, zero costs, and built for privacy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto px-10 py-5 rounded-2xl accent-gradient text-white font-bold text-lg shadow-2xl flex items-center justify-center gap-3 transform transition hover:scale-105 active:scale-95">
              <span>⬇</span> Download for Windows
            </button>
            <button className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg backdrop-blur-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3">
              <span>📱</span> Get Android APK
            </button>
          </div>

          <div className="mt-20 relative px-4">
             <div className="absolute inset-0 bg-indigo-600/20 blur-[100px] -z-10 transform scale-75"></div>
             <div className="glass-card rounded-3xl p-4 md:p-6 shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10">
                <div className="bg-black/40 rounded-2xl aspect-[16/9] flex items-center justify-center group overflow-hidden relative">
                   <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-transparent transition-colors"></div>
                   <p className="text-gray-500 font-medium tracking-widest uppercase text-sm">Media Drop Preview Experience</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Why Media Drop?</h2>
          <p className="text-gray-400">Built for power users who demand the best.</p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { title: "Local Performance", desc: "No central servers. Downloading happens on your device for maximum speed and privacy.", icon: "⚡" },
            { title: "Multi-Platform", desc: "Seamlessly download from over 1,000+ websites including YouTube, Facebook, and Instagram.", icon: "🌐" },
            { title: "Master Quality", desc: "Support for 4K video, 60FPS content, and high-fidelity 320kbps audio formats.", icon: "💎" }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl hover:border-indigo-500/30 transition-all group">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
             <span className="text-2xl">🎬</span>
             <span className="text-xl font-bold tracking-tighter">Media Drop</span>
          </div>
          <p className="text-gray-600 text-sm">© 2026 Media Drop Ecosystem. Part of the BABA PUSON universe.</p>
        </div>
      </footer>
    </main>
  );
}
