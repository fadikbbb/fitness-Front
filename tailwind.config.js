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
        primary: '#344e41',
        secondary: '#588157',
        text: '#3a5a40',
        hover: '#a3b18a',
        background: '#dad7cd',
        secondaryBackground: '#40513B',
        button: '#609966',
        buttonHover: '#001d3d',
        darkSecondary: '#ffc300',
        darkPrimary: '#ffd60a',
        darkBackground: '#000814',
        darkHover: '#1B4242',
        darkText: '#003566',
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
