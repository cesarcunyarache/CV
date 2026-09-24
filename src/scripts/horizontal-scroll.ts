import { prefersReducedMotion } from './env';

/**
 * Turns vertical scroll into horizontal movement for `[data-horizontal]`.
 * The section gets enough height for its track; `scroll-progress.ts` drives
 * `--progress` and CSS translates the track. Disabled on small screens and
 * with reduced motion, where the track falls back to a normal layout.
 *
 * Measuring the track forces layout, so each section is only set up when it
 * comes within one viewport of the screen — never during page load.
 */
const desktopQuery = window.matchMedia('(min-width: 64rem)');

function setup(section: HTMLElement) {
	const track = section.querySelector<HTMLElement>('[data-horizontal-track]');
	if (!track) return;

	const update = () => {
		const enabled = desktopQuery.matches && !prefersReducedMotion();
		const distance = Math.max(0, track.scrollWidth - section.clientWidth);
		const active = enabled && distance > 0;
		section.classList.toggle('is-horizontal', active);
		section.style.setProperty('--distance', `${distance}px`);
		section.style.height = active ? `${distance + window.innerHeight}px` : '';
	};

	update();
	new ResizeObserver(update).observe(track);
	window.addEventListener('resize', update, { passive: true });
	desktopQuery.addEventListener('change', update);
}

export function initHorizontalScroll() {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				observer.unobserve(entry.target);
				setup(entry.target as HTMLElement);
			}
		},
		{ rootMargin: '100% 0px' },
	);
	document.querySelectorAll<HTMLElement>('[data-horizontal]').forEach((section) => observer.observe(section));
}
