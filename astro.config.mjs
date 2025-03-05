import { defineConfig } from 'astro/config'

import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
	integrations: [],
	output: 'server',
	adapter: vercel(),
	compressHTML: true
})
