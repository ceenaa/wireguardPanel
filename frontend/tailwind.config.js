/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				Vazir: 'Vazir',
				Lalezar: 'Lalezar'
			},
			boxShadow: {
				box: '0 0 30px 8px rgba(167, 243, 208, 0.10)',
				box2: '0 0 50px 8px rgb(15, 23, 42)',
			}
		}
	},
	plugins: [
		function ({ addVariant }) {
			addVariant('child', '& > *');
			addVariant('child-hover', '& > *:hover');
		}
	]
};
