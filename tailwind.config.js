/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/frontend/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media', // or 'class' for manual dark mode control
  theme: {
    extend: {
      colors: {
        // Tambahkan kustom colors jika diperlukan
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 