import { localize, type Locale } from '../i18n/config';
import { ui } from '../i18n/ui';
import { portfolio } from './portfolio';
import type { PartialDate } from './types';

/** Portfolio content and interface strings resolved to one language. */
export function getContent(locale: Locale) {
	return { data: localize(portfolio, locale), t: localize(ui, locale) };
}

export type Content = ReturnType<typeof getContent>;
export type ResolvedPortfolio = Content['data'];
export type UI = Content['t'];

/** `2025-03` → `mar 2025` / `Mar 2025`; `2025` → `2025`. */
export function formatDate(date: PartialDate, locale: Locale): string {
	const [year, month] = date.split('-').map(Number);
	if (!month) return String(year);
	return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(new Date(year, month - 1));
}

export function formatRange(start: PartialDate, end: PartialDate | undefined, locale: Locale, present: string) {
	return `${formatDate(start, locale)} — ${end ? formatDate(end, locale) : present}`;
}

