/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        zoom: {
          "0%": { backgroundSize: "100%" },
          "100%": { backgroundSize: "110%" },
        },
      },
      animation: {
        zoom: "zoom 6s ease-in-out forwards", 
      },
    },
  },
  plugins: [],
}
