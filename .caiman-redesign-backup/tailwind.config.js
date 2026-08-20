/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-bg) / <alpha-value>)',
        'text-main': 'rgb(var(--color-text) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        'mint-green': 'rgb(var(--color-primary) / <alpha-value>)', // Keep backward compatibility mapping to primary
      }
    },
  },
  plugins: [],
}
