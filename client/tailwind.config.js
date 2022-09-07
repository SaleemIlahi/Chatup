/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        reg_W: "550px",
      },
      height: {
        reg_H: "600px",
      },
      boxShadow: {
        reg_BS: "0 4px 4px 0 rgba(0,0,0,0.25),6px 6px 20px 0 rgba(0,0,0,0.16)",
        reg_BTN: "2px 2px 8px rgba(0,0,0,0.6)",
      },
      letterSpacing: {
        reg_LS: "1rem",
      },
      colors: {
        colr: "#22214B",
        colr_80: "rgba(34,33,75,0.8)",
      },
      backgroundColor: {
        bgcolr: "#22214B",
      },
      keyframes: {
        fromTop: {
          "0%": { transform: "translateY(-60px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
      },
      animation: {
        fromTop: "fromTop 1s ease-in-out 1",
      },
    },
  },
  plugins: [],
};
