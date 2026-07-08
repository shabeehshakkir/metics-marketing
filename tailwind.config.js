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
        ink: '#141414',
        muted: '#5F625A',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"Schibsted Grotesk"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1180px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(26, 26, 26, 0.04), 0 2px 8px -2px rgba(26, 26, 26, 0.04)',
        'card-hover': '0 16px 40px -12px rgba(26, 26, 26, 0.12)',
        lift: '0 12px 32px -8px rgba(26, 26, 26, 0.14)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
