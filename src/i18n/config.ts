/**
 * Supported languages. Adding a language here makes TypeScript flag every
 * text in `src/data/portfolio.ts` and `src/i18n/ui.ts` that still needs a
 * translation. Routes are generated automatically.
 */
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

/** Metadata used by `<html lang>`, Open Graph and the language switcher. */
export const localeMeta: Record<Locale, { label: string; name: string; htmlLang: string; ogLocale: string }> = {
	es: { label: 'ES', name: 'Español', htmlLang: 'es-PE', ogLocale: 'es_PE' },
	en: { label: 'EN', name: 'English', htmlLang: 'en', ogLocale: 'en_US' },
};

/** Text that exists in every supported language. */
export type Localized<T = string> = Record<Locale, T>;

export function isLocale(value: unknown): value is Locale {
	return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/** `/` for the default locale, `/en/` for the rest. */
export function localePath(locale: Locale): string {
	return locale === defaultLocale ? '/' : `/${locale}/`;
}

function isLocalizedValue(value: unknown): value is Localized<unknown> {
	if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
	const keys = Object.keys(value);
	return keys.length === locales.length && locales.every((locale) => keys.includes(locale));
}

/** Replaces every `Localized<T>` in `T` by `T`, recursively. */
export type Resolved<T> =
	T extends Localized<infer U>
		? Resolved<U>
		: T extends readonly (infer Item)[]
			? Resolved<Item>[]
			: T extends object
				? { [K in keyof T]: Resolved<T[K]> }
				: T;

/** Deeply resolves `{ es, en }` objects to the requested language. */
export function localize<T>(value: T, locale: Locale): Resolved<T> {
	if (isLocalizedValue(value)) return localize(value[locale], locale) as Resolved<T>;
	if (Array.isArray(value)) return value.map((item) => localize(item, locale)) as Resolved<T>;
	if (typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype) {
		return Object.fromEntries(
			Object.entries(value).map(([key, entry]) => [key, localize(entry, locale)]),
		) as Resolved<T>;
	}
	return value as Resolved<T>;
}
