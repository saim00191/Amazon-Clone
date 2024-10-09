import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: "1440px",
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        title: "Roboto",
        body: "Poppins",
      },
      colors: {
        amazonBlue: "#131921",
        amazonLight: "#232f3E",
        amazonYellow: "#febd69",
        white: "#ffffff",
        lightText: "#ccc",
        quantityBox: "#f0f2f2",
        footer: "#131a22",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
