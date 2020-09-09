/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    colors: {
      white: "#fff",
      black: "#000",
      "gray-100": "#E3F6FC",
      "gray-200": "#52585D",
      "gray-300": "#F2F6F7",
      "gray-400": "#FDFDFE",
      "gray-500": "#96A9BA",
      "gray-600": "#D0D9DF",
      "yellow-100": "#F3BA4A",
      "red-100": "#FD2828",
      "green-100": "#46D362",
      "blue-100": "#6588DE",
      "purple-100": "#A47BD7"
    },
    extend: {
      fontSize: {
        xxs: "0.625rem"
      },
      borderRadius: {
        xl: "1rem"
      }
    }
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === "production",
    content: ["components/**/*.vue", "layouts/**/*.vue", "pages/**/*.vue", "plugins/**/*.js", "nuxt.config.js"]
  }
};
