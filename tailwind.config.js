/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pageComponent/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins"],
        "poppins-md": ["poppins-md"],
        "poppins-sb": ["poppins-sb"],
        "poppins-b": ["poppins-b"],
      },
      colors: {
        primary: "#74e291",
        secondary: "#445069",
        black: "#272829",
      },
    },
  },
  plugins: [],
};
