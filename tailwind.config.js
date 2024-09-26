/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode using a class
  content: [
    "./src/**/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
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
        //
        // primary: '#FF6F61', // Coral
        // secondary: '#6B5B95', // Slate Blue
        // accent: '#88B04B', // Olive Green
        // background: '#F8F8F8', // Light Gray (Light mode)
        // darkBackground: '#333333', // Dark mode background
        // text: '#333333', // Dark Text (Light mode)
        // darkText: '#F8F8F8', // Light text (Dark mode)
        // muted: '#A7A7A7', // Muted Gray
        // success: '#28A745', // Green
        // warning: '#FFC107', // Yellow
        // danger: '#DC3545', // Red
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
