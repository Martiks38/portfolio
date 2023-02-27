/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			gridTemplateColumns: {
				presentationImages: 'repeat(auto-fit, minmax(250px, 1fr))'
			},
			screens: {
				desktop: '976px'
			}
		}
	},
	plugins: []
}
