import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Media Drop - Free Video Downloader for YouTube, TikTok, Instagram & More",
  description: "Download Anything. Keep Everything. Get the free Media Drop app for Windows and Android.",
  keywords: "video downloader, free youtube downloader, tiktok downloader, instagram downloader, mediadrop",
  openGraph: {
    title: "Media Drop - Free Social Media Video Downloader",
    description: "Download Anything. Keep Everything. Fast, free, and secure.",
    url: "https://mediadrop.site",
    siteName: "Media Drop",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${syne.variable} ${dmSans.variable} font-body bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-200`}>
        {children}
      </body>
    </html>
  );
}
