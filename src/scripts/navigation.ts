/**
 * Header state on scroll, current-section indicator and the mobile menu.
 */
export function initNavigation() {
	const header = document.querySelector<HTMLElement>('[data-header]');
	if (!header) return;

	// Compact state once the page has scrolled past the hero top.
	const sentinel = document.querySelector('[data-header-sentinel]');
	if (sentinel) {
		new IntersectionObserver(([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting)).observe(
			sentinel,
		);
	}

	// Current section → aria-current on the matching links.
	const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
	const setCurrent = (id: string | null) => {
		links.forEach((link) => {
			if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
			else link.removeAttribute('aria-current');
		});
	};
	const sectionObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) setCurrent(entry.target.id);
			}
		},
		{ rootMargin: '-45% 0px -50% 0px' },
	);
	document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

	// Mobile menu
	const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
	const menu = document.getElementById(toggle?.getAttribute('aria-controls') ?? '');
	if (!toggle || !menu) return;

	const setOpen = (open: boolean) => {
		toggle.setAttribute('aria-expanded', String(open));
		toggle.setAttribute('aria-label', open ? toggle.dataset.labelClose! : toggle.dataset.labelOpen!);
		header.classList.toggle('is-menu-open', open);
		document.documentElement.classList.toggle('is-locked', open);
		// Keep keyboard and screen reader focus inside the open menu.
		document.querySelectorAll<HTMLElement>('main, footer').forEach((element) => (element.inert = open));
		if (open) menu.querySelector<HTMLElement>('a')?.focus();
	};

	toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
	menu.addEventListener('click', (event) => {
		if ((event.target as Element).closest('a')) setOpen(false);
	});
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
			setOpen(false);
			toggle.focus();
		}
	});
	window.matchMedia('(min-width: 48rem)').addEventListener('change', (event) => {
		if (event.matches) setOpen(false);
	});
}
