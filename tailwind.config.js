/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        'bg-dark': '#0A0E27',      // Very dark navy background
        'bg-darker': '#05070F',    // Even darker for cards
        'bg-card': '#1A1F3A',      // Card background
        'bg-hover': '#252D48',     // Hover state
        
        // Text colors
        'text-primary': '#E8ECFF', // Light text
        'text-secondary': '#B0BFFF', // Dimmed text
        'text-muted': '#7B8FCC',   // Very dim text
        
        // Accent colors (vibrant on dark)
        'accent-blue': '#60A5FA',  // Bright blue
        'accent-green': '#34D399', // Bright green
        'accent-purple': '#A78BFA', // Bright purple
        'accent-orange': '#FB923C', // Bright orange
        'accent-red': '#F87171',   // Bright red
        'accent-cyan': '#22D3EE',  // Bright cyan
        
        // Semantic colors
        primary: '#60A5FA',
        secondary: '#A78BFA',
        accent: '#34D399',
        success: '#34D399',
        warning: '#FBBF24',
        danger: '#F87171',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #1A1F3A 0%, #0F1729 100%)',
        'gradient-card': 'linear-gradient(135deg, #252D48 0%, #1A1F3A 100%)',
        'gradient-accent': 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 12px rgba(96, 165, 250, 0.15)',
        'inner-dark': 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
      },
      borderColor: {
        'card': '#2D3B5F',
        'hover': '#3D4B7F',
      },
    },
  },
  plugins: [],
}
