/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ✅ Add this line
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}"
  ],
theme: {
      extend: {
        colors: {
          // CSS variable colors for direct use
          'bg-primary': 'var(--bg-primary)',
          'bg-secondary': 'var(--bg-secondary)',
          'bg-tertiary': 'var(--bg-tertiary)',
          'text-primary': 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          'text-tertiary': 'var(--text-tertiary)',
          'accent-primary': 'var(--accent-primary)',
          'accent-secondary': 'var(--accent-secondary)',
          'accent-hover': 'var(--accent-hover)',
          'border': 'var(--border-color)',
          'border-light': 'var(--border-light)',
          'card-bg': 'var(--card-bg)',
          'card-hover': 'var(--card-hover)',
          'code-bg': 'var(--code-bg)',
          'code-text': 'var(--code-text)',
          // Primary palette (if needed elsewhere)
          primary: {
            DEFAULT: '#1f4f89',
            dark: '#163c6a',
            light: '#4a86c5',
          },
          // Dark palette (if needed elsewhere)
          dark: {
            DEFAULT: '#0b1628',
            light: '#111f35',
          },
        },
      },
    },
  plugins: [],
}
