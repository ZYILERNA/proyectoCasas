/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#333333',
        accent: '#D4A868',
        brandSand: '#D4A868',
        light: '#f4f4f4',
      },
    },
  },
  plugins: [],
};
