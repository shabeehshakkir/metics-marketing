/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A',
        accent: '#ff6719',
        'accent-glow': 'rgba(255, 103, 25, 0.15)',
        secondary: '#2f5d50',
        paper: '#FAF8F6',
        'paper-soft': '#fcfbf9',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
