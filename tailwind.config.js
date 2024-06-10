export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brightRed: "#E50914",
        darkRed: "#B81D24",
        offBlack: "#221F1F",
        offWhite: "#F5F5F1",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
    },
    },
  },
  plugins: [],
}