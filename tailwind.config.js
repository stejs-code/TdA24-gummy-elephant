/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        "display": ["'Lalezar'", "Helvetica", "sans"],
        "body": ["'Open Sans'", "Helvetica", "sand"],
      },
      // https://uicolors.app/create
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "secondary": {
          '50': '#fffaeb',
          '100': '#fff1c6',
          '200': '#fee289',
          '300': '#fec93e',
          '400': '#feb721',
          '500': '#f89508',
          '600': '#db6e04',
          '700': '#b64c07',
          '800': '#943a0c',
          '900': '#79310e',
          '950': '#461702',
        },
        "primary": {
          '50': '#f0fafb',
          '100': '#d9f2f4',
          '200': '#b8e4e9',
          '300': '#72c7d3',
          '400': '#4eb2c2',
          '500': '#3395a7',
          '600': '#2d7a8d',
          '700': '#2a6374',
          '800': '#2a5360',
          '900': '#274652',
          '950': '#152d37',
        },
        "default": "#181818"
      }
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    }
  ],
};
