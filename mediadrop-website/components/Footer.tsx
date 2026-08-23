import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-gray-800 py-12 text-gray-400 font-body">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-heading text-xl font-bold text-white mb-4">Media Drop</h3>
            <p className="mb-4">
              &quot;Download Anything. Keep Everything.&quot; <br/>
              A fully free and open ecosystem for Windows and Android.
            </p>
            <p className="text-sm border-t border-gray-700 pt-4 mt-6">
              © {new Date().getFullYear()} Media Drop. Built by Puson.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Platforms</h4>
            <ul className="space-y-2">
              <li><a href="#download-windows" className="hover:text-accent transition-colors">Windows PC (EXE)</a></li>
              <li><a href="#download-android" className="hover:text-accent transition-colors">Android (APK)</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#faq" className="hover:text-accent transition-colors">FAQ</a></li>
              <li><a href="https://www.youtube.com/@babapuson8897" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">YouTube Channel</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
