/**
 * Light / dark toggle. The initial theme is applied by an inline script in
 * <head> (no flash); this module only handles the button and keeps the
 * browser UI colour (`<meta name="theme-color">`) in sync with the choice.
 */
const STORAGE_KEY = 'theme';
const THEME_COLORS = { light: '#ffffff', dark: '#000000' } as const;
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

const currentTheme = () =>
	(document.documentElement.dataset.theme as 'light' | 'dark' | undefined) ?? (darkQuery.matches ? 'dark' : 'light');

/** Without a saved choice the per-media meta tags already match the OS. */
function syncThemeColor() {
	const theme = document.documentElement.dataset.theme as keyof typeof THEME_COLORS | undefined;
	document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
		const own = meta.media.includes('dark') ? THEME_COLORS.dark : THEME_COLORS.light;
		meta.content = theme ? THEME_COLORS[theme] : own;
	});
}

export function initThemeToggle() {
	syncThemeColor();
	document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
		button.addEventListener('click', () => {
			const next = currentTheme() === 'dark' ? 'light' : 'dark';
			document.documentElement.dataset.theme = next;
			syncThemeColor();
			try {
				localStorage.setItem(STORAGE_KEY, next);
			} catch {
				// Storage can be unavailable (private mode); the choice then lasts for this page only.
			}
		});
	});
}
