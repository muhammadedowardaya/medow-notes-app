/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'selector',
	theme: {
		extend: {
			screens: {
				xs: '360px', // Custom screen untuk xs (extra small)
				'2xl': '1440px', // Custom screen untuk 2xl (di atas xl)
				'3xl': '1920px', // Custom screen untuk 3xl
			},
			animation: {
				'slow-pulse': 'slow-pulse 2s linear infinite 3s',
			},
			keyframes: {
				'slow-pulse': {
					'0%,100%': { transform: 'scale(1)', opacity: 0.5 },
					'50%': { transform: 'scale(1.3)', opacity: 1 },
				},
			},
		},
	},
	plugins: [],
};
