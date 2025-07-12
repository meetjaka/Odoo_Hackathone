const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Sora', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        DEFAULT: '0.75rem',
      },
      colors: {
        primary: 'hsl(160, 70%, 40%)',
        'primary-foreground': 'hsl(355.7, 100%, 97.3%)',
        secondary: 'hsl(240, 4.8%, 95.9%)',
        accent: 'hsl(160, 60%, 90%)',
        border: 'hsl(240, 5.9%, 90%)',
        card: 'hsl(0, 0%, 100%)',
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(240, 10%, 3.9%)',
        // Dark mode
        dark: {
          background: 'hsl(240, 10%, 3.9%)',
          foreground: 'hsl(0, 0%, 98%)',
          card: 'hsl(240, 10%, 3.9%)',
          primary: 'hsl(160, 70%, 50%)',
          'primary-foreground': 'hsl(355.7, 100%, 97.3%)',
          secondary: 'hsl(240, 3.7%, 15.9%)',
          accent: 'hsl(240, 3.7%, 15.9%)',
          border: 'hsl(240, 3.7%, 15.9%)',
        },
      },
    },
  },
  plugins: [],
}; 