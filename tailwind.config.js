const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      "Poppins": ['Poppins', ...defaultTheme.fontFamily.sans],
      "Ubuntu": ['Ubuntu', ...defaultTheme.fontFamily.sans],
    },},
  },
  plugins: [],
}