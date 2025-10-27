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
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
          light: '#818cf8',
        },
        secondary: '#22d3ee',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        bg: {
          dark: '#0f172a',
          medium: '#1e293b',
          light: '#334155',
        },
      },
    },
  },
  plugins: [],
};
export default config;

