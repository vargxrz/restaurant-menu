/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*{html,js}"],
  theme: {
    fontFamily: {
      'display': ['Bebas Neue', 'Impact', 'sans-serif'],
      'sans': ['Barlow', 'sans-serif']
    },
    extend: {
      colors: {
        'charcoal': {
          DEFAULT: '#1a1a1a',
          light: '#2a2a2a',
          dark: '#0f0f0f',
        },
        'flame': {
          red: '#ff3838',
          'red-dark': '#e62828',
          orange: '#ffb638',
        },
        'fresh': {
          green: '#00d084',
        },
        'concrete': '#3a3a3a',
      },
      backgroundImage: {
        "home": "url('/assets/bg.png')",
        "urban-gradient": "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
      },
      boxShadow: {
        'red-glow': '0 0 20px rgba(255, 56, 56, 0.4)',
        'green-glow': '0 0 20px rgba(0, 208, 132, 0.4)',
        'urban': '0 8px 32px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}

