/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        luxury: {
          green: "#2D5016",
          light: "#E8F3DF",
          gold: "#D4AF37",
          dark: "#1A1A1A",
        },
      },
      fontFamily: {
        luxury: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
