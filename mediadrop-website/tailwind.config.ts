import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#6c63ff',
          hover: '#7b73ff',
        },
        dark: {
          bg: '#0f0f13',
          card: '#1a1a24',
          text: '#f0f0f5',
        },
        light: {
          bg: '#f4f4f8',
          card: '#ffffff',
          text: '#111118',
        },
        success: '#22c55e',
        error: '#ef4444',
      },
      fontFamily: {
        heading: ['var(--font-syne)'],
        body: ['var(--font-dm-sans)'],
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Using class strategy for manual toggle
};
export default config;
