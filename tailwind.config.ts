import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px) scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        "hover-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.3s ease-in-out",
        "slide-up": "slide-up 0.3s ease",
        "hover-up": "hover-up 0.2s ease-out forwards",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
