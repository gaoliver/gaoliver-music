/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0a0a0a",
          bgAlt: "#0a0a0a",
          text: "#fdfdfd",
          muted: "#7e848c",
          accent: "#ad0e10",
          accentHover: "#ef090c",
        },
      },
      fontFamily: {
        title: ["Roboto", "Helvetica Neue", "sans-serif"],
        body: ["Roboto", "Helvetica Neue", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.35)",
        surface: "0 -10px 100px 100px #0a0a0a",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.5rem",
        },
      },
    },
  },
  plugins: [],
};
