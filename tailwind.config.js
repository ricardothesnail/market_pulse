/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark background only
        'bg-dark': '#0A0E27',
        'bg-darker': '#05070F',
        'bg-card': '#1A1F3A',
        'bg-hover': '#252D48',
        
        // Vibrant, joyful colors everywhere
        'text-primary': '#E8ECFF',
        'text-secondary': '#A8C5FF',
        'text-muted': '#7B95FF',
        
        // Super vibrant accent colors - JOYFUL
        'joy-pink': '#FF1493',
        'joy-purple': '#9D4EDD',
        'joy-blue': '#3A86FF',
        'joy-cyan': '#00D9FF',
        'joy-green': '#06FFA5',
        'joy-orange': '#FF6B35',
        'joy-yellow': '#FFD60A',
        'joy-magenta': '#FF006E',
        
        // Softer versions for backgrounds
        'joy-pink-soft': '#FF1493',
        'joy-purple-soft': '#9D4EDD',
        'joy-blue-soft': '#3A86FF',
        'joy-cyan-soft': '#00D9FF',
      },
      backgroundImage: {
        'gradient-joy-pink': 'linear-gradient(135deg, #FF1493 0%, #FF006E 100%)',
        'gradient-joy-purple': 'linear-gradient(135deg, #9D4EDD 0%, #3A86FF 100%)',
        'gradient-joy-blue': 'linear-gradient(135deg, #3A86FF 0%, #00D9FF 100%)',
        'gradient-joy-cyan': 'linear-gradient(135deg, #00D9FF 0%, #06FFA5 100%)',
        'gradient-joy-green': 'linear-gradient(135deg, #06FFA5 0%, #FFD60A 100%)',
        'gradient-joy-orange': 'linear-gradient(135deg, #FF6B35 0%, #FFD60A 100%)',
        'gradient-joy-sunset': 'linear-gradient(135deg, #FF6B35 0%, #FF1493 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1A1F3A 0%, #0F1729 100%)',
      },
      boxShadow: {
        'glow-pink': '0 0 20px rgba(255, 20, 147, 0.3)',
        'glow-purple': '0 0 20px rgba(157, 78, 221, 0.3)',
        'glow-blue': '0 0 20px rgba(58, 134, 255, 0.3)',
        'glow-cyan': '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-green': '0 0 20px rgba(6, 255, 165, 0.3)',
        'card': '0 4px 6px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 12px 24px rgba(58, 134, 255, 0.2)',
      },
    },
  },
  plugins: [],
}
