/**
 * Light / dark toggle. The initial theme is applied by an inline script in
 * <head> (no flash); this module only handles the button.
 */
const STORAGE_KEY = 'theme';
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

const currentTheme = () =>
	(document.documentElement.dataset.theme as 'light' | 'dark' | undefined) ?? (darkQuery.matches ? 'dark' : 'light');

export function initThemeToggle() {
	document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
		button.addEventListener('click', () => {
			const next = currentTheme() === 'dark' ? 'light' : 'dark';
			document.documentElement.dataset.theme = next;
			try {
				localStorage.setItem(STORAGE_KEY, next);
			} catch {
				// Storage can be unavailable (private mode); the choice then lasts for this page only.
			}
		});
	});
}
