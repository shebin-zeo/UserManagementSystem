/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  // safelist: [
  //   {
  //     pattern: /^p-/,  // Protect all PrimeNG classes
  //   }
  // ],
  theme: {
    extend: {
      keyframes: {
        slideInFromLeft: {
          '0%': { transform: 'translateX(-50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        appear: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        slideInFromLeft: 'slideInFromLeft 0.8s ease-out forwards',
        appear: 'appear 1s ease-out forwards',
      },
    },
  },
  plugins: [],
   corePlugins: {
    preflight: true, // Disable Tailwind's base reset else PrimeNg styles will be overridden
  }
}