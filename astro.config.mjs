// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// TODO: set your production domain (used for canonical URLs, Open Graph and the sitemap).
const site = 'https://example.com';

// https://astro.build/config
export default defineConfig({
	site,
	trailingSlash: 'ignore',
	build: { inlineStylesheets: 'auto' },
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Geist',
			cssVariable: '--font-sans',
			weights: ['300 700'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Geist Mono',
			cssVariable: '--font-mono',
			weights: [400, 500],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['ui-monospace', 'monospace'],
		},
		{
			provider: fontProviders.google(),
			name: 'Instrument Serif',
			cssVariable: '--font-serif',
			weights: [400],
			styles: ['italic'],
			subsets: ['latin'],
			fallbacks: ['Georgia', 'serif'],
		},
	],
});
