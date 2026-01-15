/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hedera-purple': '#8259ef',
        'hedera-blue': '#2d84eb',
        'mine-shaft': '#222222',
        'emerald': '#3ec878'
      },
    },
  },
  plugins: [],
}
