/** @type {import('tailwindcss').Config} */
module.exports = {
  // Paths to all of your component files
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "my-blue": {
          DEFAULT: "#1b5dda",
          50: "#eff7ff",
          100: "#dbedfe",
          200: "#bee0ff",
          300: "#92cefe",
          400: "#5eb2fc",
          500: "#3991f8",
          600: "#2373ed",
          700: "#1f53c2",
          800: "#1d428b",
          900: "#162a55",
        },

        bg: "#f5f5f5",
        text: {
          primary: "#333333",
          header: "#09090b",
          sub: "#71717A",
        },
        redBadge: "#e22d20",
        greenBadge: "#4caf50",
        yellowBadge: "#ffeb3b",
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
