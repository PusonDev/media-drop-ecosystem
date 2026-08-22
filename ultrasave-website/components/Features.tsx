import React from 'react';

const features = [
  {
    title: 'Client-Side Download',
    description: 'Downloads happen directly on your device. No server waiting lines, no IP bans, and zero privacy concerns.',
    icon: '⚡',
  },
  {
    title: 'Multiple Platforms',
    description: 'Support for YouTube, TikTok, Instagram, Twitter, and hundreds of other social media platforms.',
    icon: '🌐',
  },
  {
    title: 'Highest Quality',
    description: 'Download in 4K, 1080p, 720p and more. Extract audio in up to 320kbps MP3 or M4A quality.',
    icon: '🎬',
  },
  {
    title: 'Playlist Support',
    description: 'Download entire playlists with a single click. Select individual videos or ranges easily.',
    icon: '📚',
  },
  {
    title: 'Subtitle Extraction',
    description: 'Download subtitles and captions in multiple languages directly packaged with your video.',
    icon: '📝',
  },
  {
    title: '100% Free Forever',
    description: 'Supported by unintrusive ads. No premium tiers, no hidden fees, and completely open ecosystem.',
    icon: '💎',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-light-card dark:bg-dark-card transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Why Choose <span className="text-accent">Media Drop</span>?</h2>
          <p className="font-body text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Built on top of powerful open-source engines like yt-dlp, Media Drop gives you complete control over your media.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-2xl bg-light-bg dark:bg-dark-bg border border-gray-200 dark:border-gray-800 hover:border-accent dark:hover:border-accent transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-heading text-xl font-bold mb-3">{feature.title}</h3>
              <p className="font-body text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
