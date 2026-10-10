import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        tertiary: 'var(--bg-tertiary)',
        card: 'var(--bg-card)',
        foreground: 'var(--text-primary)',
        muted: 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        accent: 'var(--accent-primary)',
        'accent-hover': 'var(--accent-hover)',
        border: 'var(--border)',
        success: 'var(--success)',
      },
    },
  },
  plugins: [],
}
export default config
