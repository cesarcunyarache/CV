import { prefersReducedMotion } from './env';

/**
 * Turns vertical scroll into horizontal movement for `[data-horizontal]`.
 * The section gets enough height for its track; `scroll-progress.ts` drives
 * `--progress` and CSS translates the track. Disabled on small screens and
 * with reduced motion, where the track falls back to a normal layout.
 */
const desktopQuery = window.matchMedia('(min-width: 64rem)');

export function initHorizontalScroll() {
	const sections = document.querySelectorAll<HTMLElement>('[data-horizontal]');
	if (!sections.length) return;

	const update = () => {
		const enabled = desktopQuery.matches && !prefersReducedMotion();
		sections.forEach((section) => {
			const track = section.querySelector<HTMLElement>('[data-horizontal-track]');
			if (!track) return;
			const distance = Math.max(0, track.scrollWidth - section.clientWidth);
			const active = enabled && distance > 0;
			section.classList.toggle('is-horizontal', active);
			section.style.setProperty('--distance', `${distance}px`);
			section.style.height = active ? `${distance + window.innerHeight}px` : '';
		});
	};

	update();
	const observer = new ResizeObserver(update);
	sections.forEach((section) => {
		const track = section.querySelector('[data-horizontal-track]');
		if (track) observer.observe(track);
	});
	window.addEventListener('resize', update, { passive: true });
	desktopQuery.addEventListener('change', update);
}
