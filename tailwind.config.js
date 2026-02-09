/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        secondary: '#3B82F6',
        accent: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        'bg-light': '#F8FAFC',
        'text-dark': '#1E293B',
      },
    },
  },
  plugins: [],
}
