import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          light: "#E0E7FF",
        },
        cyan: {
          DEFAULT: "#06B6D4",
          glow: "#C7F9FD",
        },
        background: {
          DEFAULT: "#F8FBFF",
          glass: "rgba(255, 255, 255, 0.7)",
        },
        gray: {
          "900": "#0F172A",
          "600": "#475569",
        }
      },
      backgroundImage: {
        'soft-depth': 'radial-gradient(ellipse at center, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%)',
      },
      boxShadow: {
        'premium': '0 8px 30px rgba(125, 211, 252, 0.2)',
        'glow-cyan': '0 0 15px rgba(6, 182, 212, 0.4)',
      },
      animation: {
        'float-blob': 'float-blob 8s ease-in-out infinite',
      },
      keyframes: {
        'float-blob': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      }
    },
  },
  plugins: [],
};

export default config;