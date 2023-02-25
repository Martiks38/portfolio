module.exports = {
	extends: ['plugin:astro/recommended', 'plugin:@typescript-eslint/recommended'],
	rules: {
		'space-before-function-paren': ['error', 'never']
	},
	overrides: [
		{
			files: ['*.astro'],
			parser: 'astro-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro']
			},
			rules: {}
		}
	]
}
