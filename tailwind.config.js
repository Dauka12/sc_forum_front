/** @type {import('tailwindcss').Config} */

module.exports = {
    darkMode: ["class"],
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx,css}',
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                fadeOut: {
                    '0%': { opacity: 1 },
                    '100%': { opacity: 0 },
                },
                slideIn: {
                    '0%': { transform: 'translateX(20px)', opacity: 0 },
                    '100%': { transform: 'translateX(0)', opacity: 1 },
                },
                slideInLeft: {
                    '0%': { transform: 'translateX(-20px)', opacity: 0 },
                    '100%': { transform: 'translateX(0)', opacity: 1 },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: 0 },
                    '100%': { transform: 'scale(1)', opacity: 1 },
                },
                'slide-in-from-top': {
                    '0%': { transform: 'translateY(-10px)', opacity: 0 },
                    '100%': { transform: 'translateY(0)', opacity: 1 },
                },
                'spin-slow': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                'pulse-border': {
                    '0%, 100%': { borderColor: 'rgba(0,0,0,0.2)' },
                    '50%': { borderColor: 'rgba(0,0,0,0.8)' },
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fadeIn": "fadeIn 0.4s ease-in-out forwards",
                "fadeOut": "fadeOut 0.4s ease-in-out forwards",
                "slideIn": "slideIn 0.4s ease-in-out forwards",
                "slideInLeft": "slideInLeft 0.4s ease-in-out forwards",
                "scaleIn": "scaleIn 0.3s ease-in-out forwards",
                'slide-in-from-top-1': 'slide-in-from-top 0.3s ease-out',
                'spin-slow': 'spin-slow 12s linear infinite',
                'float': 'float 3s ease-in-out infinite',
                'pulse-border': 'pulse-border 2s ease-in-out infinite',
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            }
        },
    },
    plugins: [require("tailwindcss-animate")],
}