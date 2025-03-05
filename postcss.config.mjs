import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss'
import autoprefixer from 'autoprefixer'
import nested from 'postcss-nested'
import cssnano from 'cssnano'

export default {
	plugins: [
		nested,
		autoprefixer,
		cssnano({ preset: 'default', plugins: [autoprefixer] }),
		purgeCSSPlugin({
			content: [
				'./src/**/*.astro',
				'./src/**/*.html',
				'./src/**/*.js',
				'./src/**/*.jsx',
				'./src/**/*.ts',
				'./src/**/*.tsx'
			],
			css: ['./src/**/*.css'],
			safelist: {
				deep: [/headerPage$/]
			}
		})
	]
}
