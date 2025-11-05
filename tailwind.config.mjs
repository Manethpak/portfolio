/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          bg: 'rgb(var(--color-bg-primary) / <alpha-value>)',
          text: 'rgb(var(--color-text-primary) / <alpha-value>)',
          border: 'rgb(var(--color-border-primary) / <alpha-value>)',
          accent: 'rgb(var(--color-accent-primary) / <alpha-value>)',
        },
        secondary: {
          bg: 'rgb(var(--color-bg-secondary) / <alpha-value>)',
          text: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          border: 'rgb(var(--color-border-secondary) / <alpha-value>)',
          accent: 'rgb(var(--color-accent-secondary) / <alpha-value>)',
        },
        tertiary: {
          bg: 'rgb(var(--color-bg-tertiary) / <alpha-value>)',
          text: 'rgb(var(--color-text-tertiary) / <alpha-value>)',
        },
        muted: {
          text: 'rgb(var(--color-text-muted) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        serif: ["Roboto Slab", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
