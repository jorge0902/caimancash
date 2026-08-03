/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b', // Zinc 950
        surface: '#18181b',    // Zinc 900
        border: '#27272a',     // Zinc 800
        primary: {
          light: '#34d399',    // Emerald 400
          DEFAULT: '#10b981',  // Emerald 500
          dark: '#059669',     // Emerald 600
        },
        text: {
          main: '#f4f4f5',     // Zinc 100
          muted: '#a1a1aa',    // Zinc 400
        }
      },
      fontFamily: {
        sans: ['Inter', 'pk-inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
