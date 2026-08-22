import React from 'react';

const faqs = [
  {
    q: "How much does Media Drop cost?",
    a: "Media Drop is 100% free forever. There are no hidden fees or premium versions. We earn revenue purely through unintrusive AdSense/AdMob ads within the applications."
  },
  {
    q: "Are my downloads safe and secure?",
    a: "Yes. All video and audio downloads occur directly on your local device using the open-source yt-dlp engine. Your network traffic goes straight from your device to the video platform."
  },
  {
    q: "Does Media Drop support downloading Private Videos?",
    a: "Currently, you must download publicly accessible or unlisted videos. Private videos that require login are not technically supported inside the core without supplying cookies."
  },
  {
    q: "Will I get IP banned from YouTube for using this?",
    a: "No. Unlike other server-side downloading tools that get IP-banned frequently, Media Drop uses your own local IP address exactly like you were browsing YouTube natively."
  },
  {
    q: "What platforms are supported?",
    a: "Media Drop supports over 1000+ websites including YouTube, TikTok, Instagram, Twitter/X, Facebook, Reddit, and Vimeo."
  },
  {
    q: "How to use Media Drop Android?",
    a: "You can find an interesting video in your browser or YouTube app, tap 'Share', and select Media Drop from the list. It will automatically fetch and prompt you to download!"
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
              <h3 className="font-heading text-xl font-bold mb-3">{faq.q}</h3>
              <p className="font-body text-gray-600 dark:text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
