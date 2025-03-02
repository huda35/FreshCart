/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors : {
        'main':"#0aad0a",
        'gray' : "#919eab",
        'light' : "#f8f9fa",        
      },
      container : {
        center:true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      }
    },
  },
  plugins: [
    require('flowbite/plugin') 
  ],
}

