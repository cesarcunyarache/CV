import { clamp } from './env';

/**
 * Exposes scroll progress as the CSS custom property `--progress` (0 → 1).
 *
 *  data-progress="view"   0 when the element enters from the bottom,
 *                         1 when it leaves through the top.
 *  data-progress="sticky" 0 when the element's top reaches the viewport top,
 *                         1 when its bottom reaches the viewport bottom
 *                         (for tall sections with a sticky child).
 *  data-progress="exit"   0 while the element's top is at the viewport top,
 *                         1 once it has scrolled completely out (hero).
 *
 * Only elements near the viewport are measured, in a single rAF per frame.
 * The browser's native scrolling is never intercepted.
 */
export function initScrollProgress() {
	const elements = document.querySelectorAll<HTMLElement>('[data-progress]');
	if (!elements.length) return;

	const active = new Set<HTMLElement>();
	let frame = 0;

	const measure = () => {
		frame = 0;
		const viewport = window.innerHeight;
		for (const element of active) {
			const rect = element.getBoundingClientRect();
			const mode = element.dataset.progress;
			const progress =
				mode === 'sticky'
					? -rect.top / Math.max(1, rect.height - viewport)
					: mode === 'exit'
						? -rect.top / rect.height
						: (viewport - rect.top) / (viewport + rect.height);
			element.style.setProperty('--progress', clamp(progress).toFixed(4));
		}
	};

	const schedule = () => {
		if (!frame) frame = requestAnimationFrame(measure);
	};

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				const element = entry.target as HTMLElement;
				if (entry.isIntersecting) active.add(element);
				else active.delete(element);
			}
			schedule();
		},
		{ rootMargin: '10% 0px' },
	);

	elements.forEach((element) => observer.observe(element));
	window.addEventListener('scroll', schedule, { passive: true });
	window.addEventListener('resize', schedule, { passive: true });
}
