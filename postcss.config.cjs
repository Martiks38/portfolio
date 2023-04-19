const autoprefixer = require('autoprefixer')
const purgecss = require('purgecss')
const nesting = require('postcss-nesting')

module.exports = {
	plugins: [nesting, autoprefixer, purgecss]
}
