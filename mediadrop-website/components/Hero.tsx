import React from 'react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 z-10 relative text-center">
        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-light-text dark:text-dark-text leading-tight">
          Download Anything. <br />
          <span className="text-accent">Keep Everything.</span>
        </h1>
        <p className="font-body text-lg md:text-xl mb-10 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Free Video Downloader for YouTube, TikTok, Instagram & More. No server limits, no IP bans. The ultimate ecosystem for Windows and Android.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#download-windows"
            className="bg-accent hover:bg-accent-hover text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            Download for Windows
          </a>
          <a
            href="#download-android"
            className="bg-dark-card border border-gray-700 text-dark-text hover:bg-gray-800 font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            Download APK
          </a>
        </div>
        <p className="font-body text-sm mt-6 text-gray-500">100% Free • No registration required</p>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>
    </section>
  );
}
