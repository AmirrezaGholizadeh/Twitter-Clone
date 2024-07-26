/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // deepBlue: "#0b132b",
        ylnMnBlue: "#3a506b",
        deepBlue: "#0f172a",
        specialGray: "#5c6e7e",
        babyBlue: "#38bdf8",
        hoverBlue: "#0ea5e9",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [],
};
