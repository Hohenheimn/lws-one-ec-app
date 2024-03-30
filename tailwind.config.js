/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins"],
        "poppins-md": ["poppins-md"],
        "poppins-sb": ["poppins-sb"],
        "poppins-b": ["poppins-b"],
      },
    },
  },
  plugins: [],
};
