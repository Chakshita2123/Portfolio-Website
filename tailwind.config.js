/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './sections/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
                display: ['Outfit', 'Inter', 'sans-serif'],
            },
            colors: {
                lavender: {
                    DEFAULT: '#c4b5fd',
                    light: '#ede9fe',
                    dark: '#8b5cf6',
                },
                peach: {
                    DEFAULT: '#fdba74',
                    light: '#fff7ed',
                    dark: '#f97316',
                },
                'pastel-pink': {
                    DEFAULT: '#f9a8d4',
                    light: '#fce7f3',
                    dark: '#ec4899',
                },
                sky: {
                    DEFAULT: '#7dd3fc',
                    light: '#e0f2fe',
                    dark: '#0ea5e9',
                },
                mint: {
                    DEFAULT: '#6ee7b7',
                    light: '#d1fae5',
                },
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 10s ease-in-out infinite',
                'float-delayed': 'float 8s ease-in-out 2s infinite',
                'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
                'gradient-shift': 'gradient-shift 8s ease infinite',
                'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
                'scroll-indicator': 'scroll-indicator 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.05)' },
                },
                'gradient-shift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                'bounce-soft': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
                'scroll-indicator': {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '50%': { opacity: '0.3', transform: 'translateY(12px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};
