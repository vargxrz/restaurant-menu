/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif']
    },
    extend: {
      colors: {
        'gray': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          600: '#6B7280',
          900: '#1F2937',
        },
        'red': {
          DEFAULT: '#EF4444',
          600: '#DC2626',
        },
        'green': {
          DEFAULT: '#10B981',
          600: '#059669',
        }
      },
      backgroundImage: {
        "home": "url('/assets/bg.png')"
      },
    },
  },
  plugins: [],
}
