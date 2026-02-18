/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
      extend: {
        colors: {
          eco: {
            50:  '#f0fdf4',
            100: '#dcfce7',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            900: '#14532d',
          }
        }
      }
    },
    plugins: [require('daisyui')],
    daisyui: {
      themes: [
        {
          ecobazaar: {
            'primary':         '#16a34a',
            'primary-focus':   '#15803d',
            'primary-content': '#ffffff',
            'secondary':       '#0d9488',
            'accent':          '#f59e0b',
            'neutral':         '#1f2937',
            'base-100':        '#ffffff',
            'base-200':        '#f9fafb',
            'base-300':        '#f3f4f6',
            'info':            '#3b82f6',
            'success':         '#22c55e',
            'warning':         '#f59e0b',
            'error':           '#ef4444',
          },
        },
        'light',
      ],
      defaultTheme: 'ecobazaar',
    },
  }