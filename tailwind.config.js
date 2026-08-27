/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      none: '0px',
      sm: '2px',
      DEFAULT: '2px',
      md: '2px',
      lg: '2px',
      xl: '2px',
      '2xl': '2px',
      '3xl': '2px',
      '4xl': '2px',
      full: '9999px',
    },
    extend: {
      colors: {
        primary: '#0e1720',
        accent: '#ff6719',
        'accent-hover': '#d45514',
        'accent-active': '#a34110',
        'accent-glow': 'rgba(255, 103, 25, 0.14)',
        secondary: '#2f6f5b',
        paper: '#fbfcfd',
        'paper-soft': '#eef1f4',
        layer: '#eef1f4',
        ink: '#0e1720',
        muted: '#5c6770',
        subtle: '#dce2e8',
        strong: '#8b959e',
        inverse: '#243040',
        field: '#eef1f4',
        highlight: '#fff1e8',
        support: '#2f6f5b',
        error: '#c62828',
      },
      fontFamily: {
        sans: ['"Inter Tight"', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['"Inter Tight"', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      maxWidth: {
        container: '92rem',
      },
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
      },
      boxShadow: {
        card: 'none',
        'card-hover': 'none',
        lift: 'none',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.2, 0, 0.38, 0.9)',
      },
    },
  },
  plugins: [],
}
