/**
 * Navigation behaviour:
 *  - floating glass state once the page scrolls (`is-scrolled`)
 *  - hides while scrolling down, returns when scrolling up (`is-hidden`)
 *  - current section → `aria-current` + a highlight that slides between links
 *  - mobile glass panel menu
 */
const HIDE_AFTER_PX = 320;
const SCROLL_DELTA_PX = 6;

export function initNavigation() {
	const header = document.querySelector<HTMLElement>('[data-header]');
	if (!header) return;

	const sentinel = document.querySelector('[data-header-sentinel]');
	if (sentinel) {
		new IntersectionObserver(([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting)).observe(
			sentinel,
		);
	}

	initAutoHide(header);
	const moveIndicator = initIndicator(header);

	// Current section → aria-current on the matching links.
	const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
	const setCurrent = (id: string) => {
		links.forEach((link) => {
			if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
			else link.removeAttribute('aria-current');
		});
		moveIndicator();
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

	initMobileMenu(header);
}

function initAutoHide(header: HTMLElement) {
	let lastY = window.scrollY;
	let frame = 0;

	const update = () => {
		frame = 0;
		const y = window.scrollY;
		const keepVisible = header.contains(document.activeElement) || y < HIDE_AFTER_PX;
		if (keepVisible || y < lastY - SCROLL_DELTA_PX) header.classList.remove('is-hidden');
		else if (y > lastY + SCROLL_DELTA_PX) header.classList.add('is-hidden');
		if (Math.abs(y - lastY) > SCROLL_DELTA_PX) lastY = y;
	};

	window.addEventListener('scroll', () => (frame ||= requestAnimationFrame(update)), { passive: true });
	header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
}

/** Highlight that slides to the current (or hovered) desktop link. */
function initIndicator(header: HTMLElement) {
	const list = header.querySelector<HTMLElement>('[data-nav-list]');
	const indicator = header.querySelector<HTMLElement>('[data-nav-indicator]');
	if (!list || !indicator) return () => {};

	const place = (link: HTMLElement | null) => {
		if (!link) {
			indicator.classList.remove('is-visible');
			return;
		}
		const wasHidden = !indicator.classList.contains('is-visible');
		// Appear in place instead of sliding in from the left edge.
		if (wasHidden) indicator.style.transition = 'none';
		indicator.style.setProperty('--x', `${link.offsetLeft}px`);
		indicator.style.setProperty('--w', `${link.offsetWidth}px`);
		if (wasHidden) {
			void indicator.offsetWidth;
			indicator.style.transition = '';
		}
		indicator.classList.add('is-visible');
	};

	const current = () => list.querySelector<HTMLElement>('[aria-current]');

	list.addEventListener('pointerover', (event) => place((event.target as Element).closest<HTMLElement>('a')));
	list.addEventListener('pointerleave', () => place(current()));
	list.addEventListener('focusin', (event) => place((event.target as Element).closest<HTMLElement>('a')));
	list.addEventListener('focusout', () => place(current()));

	return () => place(current());
}

function initMobileMenu(header: HTMLElement) {
	const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
	const menu = document.getElementById(toggle?.getAttribute('aria-controls') ?? '');
	const scrim = header.querySelector('[data-menu-scrim]');
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
	scrim?.addEventListener('click', () => setOpen(false));
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
