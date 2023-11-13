/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        "display": ["'Lalezar'", "Helvetica", "sans"],
        "body": ["'Open Sans'", "Helvetica", "sand"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "secondary": "#FEC93E",
        "primary": "#72C7D3",
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
