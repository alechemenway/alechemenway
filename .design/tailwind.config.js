/** @type {import('tailwindcss').Config} */
// Extracted from https://alechemenway.com by designlang, then curated:
// - fontFamily corrected to the site's real trio (Inter / Instrument Serif / JetBrains Mono)
// - fontSize keys named to the measured type scale instead of raw px
// - real semantic colors added (bg, surface, ink, accent, line) alongside the generated ramps
export default {
  theme: {
    extend: {
      colors: {
        // Semantic (matches the site's own CSS variables)
        bg: '#0a0a0b',
        'bg-raised': '#111113',
        surface: '#16151a',
        ink: '#f4f1eb',
        'ink-muted': '#9c968b',
        line: 'rgb(255 255 255 / 0.1)',

        // Brand
        primary: {
          DEFAULT: '#16151a',
          50: 'hsl(252, 11%, 97%)', 100: 'hsl(252, 11%, 94%)', 200: 'hsl(252, 11%, 86%)',
          300: 'hsl(252, 11%, 76%)', 400: 'hsl(252, 11%, 64%)', 500: 'hsl(252, 11%, 50%)',
          600: 'hsl(252, 11%, 40%)', 700: 'hsl(252, 11%, 32%)', 800: 'hsl(252, 11%, 24%)',
          900: 'hsl(252, 11%, 16%)', 950: 'hsl(252, 11%, 10%)'
        },
        accent: {
          DEFAULT: '#e8b04b',            // brand gold
          light: '#f6c66c',              // hover / gradient stop
          50: 'hsl(39, 77%, 97%)', 100: 'hsl(39, 77%, 94%)', 200: 'hsl(39, 77%, 86%)',
          300: 'hsl(39, 77%, 76%)', 400: 'hsl(39, 77%, 64%)', 500: 'hsl(39, 77%, 50%)',
          600: 'hsl(39, 77%, 40%)', 700: 'hsl(39, 77%, 32%)', 800: 'hsl(39, 77%, 24%)',
          900: 'hsl(39, 77%, 16%)', 950: 'hsl(39, 77%, 10%)'
        },
        'accent-deep': {
          DEFAULT: '#ce6f12',            // burnt orange, rare
          50: 'hsl(30, 84%, 97%)', 500: 'hsl(30, 84%, 50%)', 900: 'hsl(30, 84%, 16%)'
        },
        background: '#0a0a0b',
        foreground: '#f4f1eb'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      fontSize: {
        'display-xl': ['94.72px', { lineHeight: '90.93px', letterSpacing: '-3.79px', fontWeight: '800' }],
        'display-lg': ['69.12px', { lineHeight: '70.5px', letterSpacing: '-2.42px', fontWeight: '800' }],
        'display-md': ['54px', { lineHeight: '55.08px', letterSpacing: '-1.62px', fontWeight: '800' }],
        'display-sm': ['51.2px', { lineHeight: '51.2px', letterSpacing: '-1.54px', fontWeight: '800' }],
        heading: ['23px', { lineHeight: '36.8px', letterSpacing: '-0.46px', fontWeight: '700' }],
        subheading: ['22px', { lineHeight: '35.2px', letterSpacing: '-0.44px', fontWeight: '700' }],
        lead: ['18px', { lineHeight: '18px', letterSpacing: '-0.54px', fontWeight: '700' }],
        'body-lg': ['17.28px', { lineHeight: '28px' }],
        body: ['16px', { lineHeight: '24px' }],
        'body-sm': ['14.5px', { lineHeight: '23.2px' }],
        label: ['14px', { lineHeight: '24px', letterSpacing: '0.14px', fontWeight: '600' }],
        caption: ['13px', { lineHeight: '18.85px' }],
        nav: ['12.5px', { lineHeight: '20px', letterSpacing: '0.375px' }],
        overline: ['12px', { lineHeight: '19.2px', letterSpacing: '2.4px' }],
        micro: ['11px', { lineHeight: '17.6px', letterSpacing: '1.32px' }]
      },
      spacing: {
        hairline: '2px',
        'section-sm': '50px',
        section: '64px',
        'section-lg': '80px',
        'section-xl': '96px'
      },
      borderRadius: {
        card: '16px'
      },
      transitionDuration: {
        150: '150ms', 200: '200ms', 300: '300ms', 500: '500ms'
      },
      transitionTimingFunction: {
        custom: 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      maxWidth: {
        container: '1200px'
      },
      container: {
        center: true,
        padding: '32px'
      }
    }
  }
};
