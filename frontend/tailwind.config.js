/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Achromatic colors
        white: '#FFFFFF',
        gray: {
          50: '#F5F5F5',
          400: '#999999',
          600: '#666666',
          900: '#1A1A1A',
        },
        black: '#000000',

        // Semantic colors
        primary: '#0066FF',
        success: '#00AA00',
        error: '#CC0000',
        warning: '#FFAA00',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '2rem',    // 32px
      },
      spacing: {
        // 8px grid system
        '0': '0',
        '1': '0.5rem',   // 8px
        '2': '1rem',     // 16px
        '3': '1.5rem',   // 24px
        '4': '2rem',     // 32px
        '6': '3rem',     // 48px
        '8': '4rem',     // 64px
        '12': '6rem',    // 96px
      },
      borderRadius: {
        DEFAULT: '4px',
        lg: '8px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
        md: '0 4px 12px rgba(0, 0, 0, 0.1)',
        lg: '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        fast: '200ms',
        DEFAULT: '300ms',
        slow: '500ms',
      },
      transitionTimingFunction: {
        'in': 'cubic-bezier(0.4, 0.0, 1, 1)',
        'out': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
