/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          espresso: "#22140C",
          walnut: "#352418",
          brown: "#463225",
          gold: "#A98353",
          champagne: "#E3BC87",
          cream: "#F9F6F0",
        },
      },
      fontFamily: {
        brand: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
