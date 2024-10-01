/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode using a class
  content: [
    "./src/**/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
       
        sm: '640px',   // Small screens and up
        md: '768px',   // Medium screens and up
        lg: '1024px',  // Large screens and up
        xl: '1280px',  // Extra large screens and up
      },
      colors: {
        primary: '#40513B',
        secondary: '#609966',
        text: '#40513B',
        hover: '#9DC08B',
        background: '#EDF1D6',
        secondaryBackground: '#40513B',
        button: '#609966',
        buttonHover: '#40513B',
        darkSecondary: '#5C8374',
        darkPrimary: '#9EC8B9',
        darkBackground: '#092635',
        darkHover: '#1B4242',
        darkText: '#9EC8B9',
        muted: '#A7A7A7',
        success: '#28A745',
        warning: '#FFC107',
        danger: '#DC3545',
        info: '#17A2B8',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      spacing: {
        '128': '32rem', // Custom spacing
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem', // Extra large border radius
      },
    },
  },
  plugins: [],
}
