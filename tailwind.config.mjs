/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'threads-orange': '#FF5722',
        'threads-yellow': '#FFB300',
        'accent-cyan': '#19d0e8',
        'dark-bg': '#010101',
        'dark-surface': '#0a0a0a',
        'dark-border': '#1a1a1a',
        'text-primary': '#ffffff',
        'text-secondary': '#a3a3a3',
        'text-muted': '#545454',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'sans-serif'],
        display: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-threads': 'linear-gradient(135deg, #FF5722 0%, #FFB300 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 87, 34, 0.3)',
        'glow-cyan': '0 0 20px rgba(25, 208, 232, 0.3)',
      },
    },
  },
  plugins: [],
}
