/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'laptop': {'max': '1078px'},
      // => @media (max-width: 1535px) { ... }

      'tab': {'max': '918px'},
      // => @media (max-width: 1279px) { ... }
      'medium':{'max':'874px'},

      'smalltab': {'max': '715px'},
      // => @media (max-width: 1023px) { ... }

      'sm': {'max': '704px'},
      // => @media (max-width: 767px) { ... }

      'mobilexl': {'max': '664px'},
      // => @media (max-width: 639px) { ... }
      'mobilel':{'max':'580px'},
      'mobile':{'max':'462px'},
      },
      
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

