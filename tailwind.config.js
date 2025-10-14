/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#121212",
          bgAlt: "#0C0C0C",
          text: "#E5E5E5",
          muted: "#8E8E8E",
          accent: "#E45B66"
        }
      },
      fontFamily: {
        title: ['Cinzel', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.35)'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
        },
      }
    },
  },
  plugins: [],
}

