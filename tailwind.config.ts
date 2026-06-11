import type { Config } from 'tailwindcss'

const config: Config = {
  prefix: 'tw-',
  important: false,
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poly: ['"Poly"', 'serif'],
      },
    },
  },
  plugins: [
    function ({ addVariant }: { addVariant: (name: string, value: string) => void }) {
      addVariant('firefox', ':-moz-any(&)')
    },
  ],
}

export default config
