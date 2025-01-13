// import flowbite from "flowbite-react/tailwind";
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        dark1: "#0B1437",
        dark2: "#1B254B",
        dark3: "#1B254B",
        light1: "#FFFFFF",
        light2: "#F5F8FE",
        light3: "#EDF2F7",
        text1: '#A3AED0'
      },
    },
  },
  plugins: [flowbite.plugin()],
};
