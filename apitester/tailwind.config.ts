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
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightgrey: "#221F1F",
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
    themes: ['dark' ,  'retro', 'cyberpunk', 'valentine', 'aqua'], // Add your themes here
  },
};
export default config;
