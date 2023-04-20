/* eslint @typescript-eslint/no-var-requires: "off" */
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
	plugins: [
		require('postcss-nested'),
		require('autoprefixer'),
		require('cssnano'),
		purgecss({
			content: ['src/**/*.astro'],
			css: ['src/**/*.css'],
			safelist: {
				deep: [/buttonToTop$/, /headerPage$/, /menuBtn$/]
			}
		})
	]
}
