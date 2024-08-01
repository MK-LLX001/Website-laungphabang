/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],

  
  theme: {
    extend: {},
  },
  plugins: [],
};

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#242424",
      grey: "#F3F3F3",
      "dark-grey": "#6B6B6B",
      red: "#FF4E4E",
      transparent: "transparent",
      twitter: "#1DA1F2",
      purple: "#8B46FF",
      Primary: "#186F65",
      Secondary: "#FF4081",
      "Secondary Dark": "#ce3447",
      Foreground: "#fbfbfb",
      Background: "#efeff1",
      Border: "#dfdde2",
      purple: "#9C27B0",
      purple200: "#FFBB86FC",
    },

    fontSize: {
      sm: "12px",
      base: "14px",
      xl: "16px",
      "2xl": "20px",
      "3xl": "28px",
      "4xl": "38px",
      "5xl": "50px",
    },

    extend: {
      fontFamily: {
        inter: ["'Inter'", "sans-serif"],
        gelasio: ["'Gelasio'", "serif"],
        noto_san_lao: ["Noto Sans Lao", "sans-serif"],
        MisansLao: ["MiSans Lao"],
      },
    },
  },
  plugins: [],
});

// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",

// ],
//   theme: {

//       colors: {
//           'white': '#FFFFFF',
//           'black': '#242424',
//           'grey': '#F3F3F3',
//           'dark-grey': '#6B6B6B',
//           'red': '#FF4E4E',
//           'transparent': 'transparent',
//           'twitter': '#1DA1F2',
//           'purple': '#8B46FF'
//       },

//       fontSize: {
//           'sm': '12px',
//           'base': '14px',
//           'xl': '16px',
//           '2xl': '20px',
//           '3xl': '28px',
//           '4xl': '38px',
//           '5xl': '50px',
//       },

//       extend: {
//           fontFamily: {
//             inter: ["'Inter'", "sans-serif"],
//             gelasio: ["'Gelasio'", "serif"]
//           },
//       },

//   },
//   plugins: [],
// };
