// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust paths to match your project
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1E3A8A',     // blue-900
          DEFAULT: '#1E40AF',   // blue-800
          light: '#0EA5E9',    // sky-500
        },
        secondary: {
          green: '#10B981',    // emerald-500
          teal: '#0D9488',     // teal-600
        },
      },
    },
  },
  plugins: [],
}