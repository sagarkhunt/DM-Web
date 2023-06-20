/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: "#088178",
        "theme-light": "#dff8f6",
        "dark-theme": "#003a37",
        "white-300": "#fbfbfd",
        "slate-400": "#6e777d",
        "slate-500": "#343a3d",
        "gray-200": "#f4f8fb",
        "gray-300": "#f7f8f8",
        "gray-500": "#e5e7eb",
        "gray-600": "#67676a",
        "gray-700": "121314",
        "gray-800": "#383836",
        "gray-900": "#303538",
        "gray-1000": "#4b5258",
        "yellow-300": "#fee4c3",
        "yellow-500": "#fcc875",
        "blue-200": "#dceefc",
        "blue-400": "#b9ddff",
        "red-400": "#e06868",
        "red-800": "#a02828",
        "red-900": "#bd081c",
        "purple-800": "#4e42a2",
        "purple-300": "#f5f5ff",
      },
      // screens: {
      //   xs: "425px",
      // },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
