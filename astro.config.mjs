// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// TODO: set your production domain (used for canonical URLs, Open Graph and the sitemap).
const site = 'https://example.com';

// https://astro.build/config
export default defineConfig({
	site,
	trailingSlash: 'ignore',
	build: { inlineStylesheets: 'always' },
	fonts: [
		{
			// Fallback for non-Apple platforms; Apple devices use SF Pro (system).
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-inter',
			weights: ['400 700'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['Arial', 'sans-serif'],
		},
	],
});
