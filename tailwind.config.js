/** @type {import('tailwindcss').Config} */


module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      animation: {
        spin: 'spin 2s linear infinite', // Modify duration if needed
      },
    },
  },
}
