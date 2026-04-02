/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Flat naming to match your @apply bg-tasveer-maroon-bg
        'tasveer-maroon-bg': '#1a0a0a', 
        'tasveer-maroon-card': '#2a1515',
        'tasveer-gold': '#d4af37',
        'tasveer-ivory': '#f5f5f0',
      },
    },
  },
  plugins: [],
}