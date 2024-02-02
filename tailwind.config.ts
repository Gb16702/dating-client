import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#3E21F4",
        accent_blue: "#110CFE",
        accent_transparent: "rgba(62, 33, 244, 0.15)",
        long_foreground: "#828282",
        subtitle_foreground: "#ABA9A9",
        gray_border: "#C9C9C9",
        whitish_border: "#F0F0F0",
        whitish_background: "#F7F7F7",
        transparent_black: "rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
