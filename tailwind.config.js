const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      "Lexend": ['Lexend', ...defaultTheme.fontFamily.sans],
      "Raleway": ['Raleway', ...defaultTheme.fontFamily.sans],
      "Lato": ['Lato', ...defaultTheme.fontFamily.sans],
    },},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}