# 🎬 Media Drop — The Ultimate Social Media Downloader Ecosystem

<p align="center">
  <img src="docs/images/logo.png" width="200" alt="Media Drop Logo">
</p>

<p align="center">
  <strong>Download Anything. Keep Everything.</strong><br>
  A high-performance, free ecosystem for downloading videos and audio from your favorite social media platforms.
</p>

---

## 🌟 Overview

**Media Drop** is a comprehensive ecosystem designed to give users full control over their media consumption. Unlike traditional downloaders that rely on expensive server-side processing, Media Drop runs the heavy lifting directly on the user's device. This ensures:
- 🚀 **Zero Server Costs:** Built to last forever.
- 🔒 **Privacy First:** No data sent to third-party servers.
- ⚡ **Maximum Speed:** Utilizes the full bandwidth of your own connection.

## 📱 The Ecosystem

| Product | Platform | Core Technology | Status |
| :--- | :--- | :--- | :--- |
| **Media Drop PC** | Windows | Electron + React + Node.js | 🚀 Ready |
| **Media Drop Mobile** | Android | Flutter + Dart | 🚀 Ready |
| **Media Drop Web** | Web | Next.js (Landing Page) | 🚀 Ready |

---

## ✨ Key Features

- **Multi-Platform Support:** Works with YouTube, TikTok, Instagram, Facebook, Twitter, and more.
- **Smart Detection:** Automatically detects links from your clipboard.
- **High Quality:** Download up to **4K Video** and **320kbps MP3** audio.
- **Batch Processing:** Support for playlists and bulk downloads.
- **Smart Progress:** Real-time speed, percentage, and ETA tracking.
- **Multithreading:** Uses 8+ concurrent fragments for lightning-fast downloads.
- **Theme Support:** Beautiful Dark and Light modes.

---

## 🛠️ Technical Stack

### Windows Application
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Electron (Node.js)
- **Engine:** Standalone `yt-dlp.exe` + `ffmpeg` + Node.js JavaScript runtime
- **Distribution:** NSIS Installer & Portable EXE

### Android Application
- **Framework:** Flutter (Material 3)
- **Engine:** `yt-dlp` ARM binary (Bundled)
- **Features:** Share-to-download, background processing, and notifications.

### Web (Landing Page)
- **Framework:** Next.js (App Router)
- **Styling:** CSS Modules / Tailwind
- **Deployment:** Vercel

---

## 🚀 Getting Started

### Development

To set up the development environment for each product, navigate to their respective directories:

```bash
# Windows App
cd ultrasave-windows
npm install
npm run dev

# Android App
cd ultrasave-android
flutter pub get
flutter run

# Website
cd ultrasave-website
npm install
npm run dev
```

### Building for Production

- **Windows:** `npm run build` inside `ultrasave-windows`.
- **Android:** `flutter build apk --release` inside `ultrasave-android`.
- **Website:** `npm run build` inside `ultrasave-website`.

---

## 👤 Author

**Puson** (Baba Puson)
- 📍 Dhaka, Bangladesh
- 📺 [YouTube Channel](https://www.youtube.com/@babapuson8897)
- 💻 B.Sc. CSE Student & IT Specialist

---

## 📜 License

This project is built for the community. Use it fairly, and respect the content creators' copyrights.

---

<p align="center">
  Made with ❤️ by Puson using Anti Gravity
</p>
