const colors = require('./src/colors.js');


module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: colors.primary.light,
          DEFAULT: colors.primary.DEFAULT,
          dark: colors.primary.dark,
        },
        secondary: {
          light: colors.secondary.light,
          DEFAULT: colors.secondary.DEFAULT,
          dark: colors.secondary.dark,
        },
        text: {
          light: colors.text.light,
          DEFAULT: colors.text.DEFAULT,
          dark: colors.text.dark,
        },
        background: {
          DEFAULT: colors.background.DEFAULT,
        },
        success: {
          light: colors.success.light,
          DEFAULT: colors.success.DEFAULT,
          dark: colors.success.dark,
        },
        info: {
          light: colors.info.light,
          DEFAULT: colors.info.DEFAULT,
          dark: colors.info.dark,
        },
        warning: {
          light: colors.warning.light,
          DEFAULT: colors.warning.DEFAULT,
          dark: colors.warning.dark,
        },
        danger: {
          light: colors.danger.light,
          DEFAULT: colors.danger.DEFAULT,
          dark: colors.danger.dark,
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    
  ],
}
