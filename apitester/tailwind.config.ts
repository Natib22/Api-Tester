import type { Config } from "tailwindcss";
import daisyui from "daisyui"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient": "linear-gradient(0deg, #4640DE, #4640DE), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightgrey: "#221F1F",
        "GET": "#73DC8C",
    POST: "#DBDE52",
    PUT : "#FFA24E",
    PATCH : "#FFA24E",
    DELETE : "#FF6E6E",
    semigray: "#515B6F",
        verylightpurple: "#D6DDEB",
        bluepurple: "#4640DE"

      },
      screens: {
        mobile: "0px",
        tablet: "440px",
        pc : "800px",   
      }
    },
  },
  plugins: [
    daisyui,
    
  ],
  daisyui: {
    themes: ['dark' ,  'retro', 'cyberpunk', 'valentine', 'aqua'], // Add your theme
  },
};
export default config;
