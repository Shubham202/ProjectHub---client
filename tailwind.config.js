/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			lato: ["Lato"],
			pacifico: ["Pacifico"]
		},
		extend: {
			colors: {
				'primary': "#66BFBF",
				'primary-hover': "#5FB2B2",
			}
		}
	},
	plugins: []
};

