/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			container: {
				center: true,
				screens: {
					'2xl': '1280px',
					xl: '1024px',
					lg: '1024px',
					md: '768px',
					sm: '640px'
				}
			},
			fontFamily: {
				Vazir: 'Vazir',
				Lalezar: 'Lalezar'
			},
			boxShadow: {
				box: '0 0 30px 8px rgba(167, 243, 208, 0.10)',
				box2: '0 0 50px 8px rgb(15, 23, 42)'
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
