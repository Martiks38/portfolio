/* eslint @typescript-eslint/no-var-requires: "off" */
const purgecss = require('@fullhuman/postcss-purgecss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

module.exports = {
	plugins: [
		require('postcss-nested'),
		cssnano({ plugins: [autoprefixer], preset: 'default' }),
		purgecss({
			content: ['src/**/*.astro'],
			css: ['src/**/*.css'],
			safelist: {
				deep: [/headerPage$/]
			}
		})
	]
}
