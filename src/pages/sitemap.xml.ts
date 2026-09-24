import type { APIRoute } from 'astro';
import { localeMeta, localePath, locales } from '../i18n/config';

/** Sitemap with hreflang alternates for every locale. */
export const GET: APIRoute = ({ site }) => {
	const base = site ?? new URL('http://localhost');
	const alternates = locales
		.map(
			(locale) =>
				`<xhtml:link rel="alternate" hreflang="${localeMeta[locale].htmlLang}" href="${new URL(localePath(locale), base).href}"/>`,
		)
		.join('');
	const urls = locales
		.map((locale) => `<url><loc>${new URL(localePath(locale), base).href}</loc>${alternates}</url>`)
		.join('');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,
		{ headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
	);
};
