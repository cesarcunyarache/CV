/**
 * Adds `.is-visible` to `[data-reveal]` elements once they enter the viewport.
 * Children of `[data-reveal-group]` are staggered automatically.
 */
const STAGGER_MS = 80;

export function initReveal() {
	document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
		group.querySelectorAll<HTMLElement>('[data-reveal]').forEach((item, index) => {
			item.style.setProperty('--reveal-delay', String(index * STAGGER_MS));
		});
	});

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
	);

	document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
}
