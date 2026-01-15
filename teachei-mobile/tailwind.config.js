/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#137fec",
        "primary-dark": "#0c62b8",
        "background-light": "#f6f7f8",
        "background-dark": "#101922",
        "surface-light": "#ffffff",
        "surface-dark": "#1e2936",
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["PlusJakartaSans"],
        "display-medium": ["PlusJakartaSans-Medium"],
        "display-semibold": ["PlusJakartaSans-SemiBold"],
        "display-bold": ["PlusJakartaSans-Bold"],
        "display-extrabold": ["PlusJakartaSans-ExtraBold"],
      },
      borderRadius: {
        DEFAULT: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};



