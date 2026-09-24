import { easeOutExpo, prefersReducedMotion } from './env';

/**
 * `[data-count-from]` counts from its start value to the number it already
 * contains when it enters the viewport. Without JS or with reduced motion
 * the final value is shown as-is.
 */
const COUNT_DURATION_MS = 1600;

function initCounters() {
	const counters = document.querySelectorAll<HTMLElement>('[data-count-from]');
	if (!counters.length || prefersReducedMotion()) return;

	const run = (element: HTMLElement) => {
		const from = Number(element.dataset.countFrom);
		const to = Number(element.dataset.countTo);
		const start = performance.now();
		const tick = (now: number) => {
			const t = Math.min(1, (now - start) / COUNT_DURATION_MS);
			element.textContent = String(Math.round(from + (to - from) * easeOutExpo(t)));
			if (t < 1) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	};

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				observer.unobserve(entry.target);
				run(entry.target as HTMLElement);
			}
		},
		{ threshold: 0.6 },
	);

	counters.forEach((counter) => {
		counter.dataset.countTo = counter.textContent ?? '';
		counter.textContent = counter.dataset.countFrom ?? '';
		observer.observe(counter);
	});
}

/** `[data-clock]` shows the current time in `data-time-zone`. */
function initClocks() {
	document.querySelectorAll<HTMLElement>('[data-clock]').forEach((element) => {
		const format = new Intl.DateTimeFormat(document.documentElement.lang, {
			hour: '2-digit',
			minute: '2-digit',
			timeZone: element.dataset.timeZone,
		});
		const render = () => (element.textContent = format.format(new Date()));
		render();
		setInterval(render, 30_000);
	});
}

/** `[data-copy]` copies its value and announces the result. */
function initCopyButtons() {
	document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
		const label = button.querySelector<HTMLElement>('[data-copy-label]');
		const original = label?.textContent ?? '';
		button.hidden = !navigator.clipboard;
		button.addEventListener('click', async () => {
			await navigator.clipboard.writeText(button.dataset.copy ?? '');
			button.classList.add('is-copied');
			if (label) label.textContent = button.dataset.copiedLabel ?? original;
			setTimeout(() => {
				button.classList.remove('is-copied');
				if (label) label.textContent = original;
			}, 2000);
		});
	});
}

export function initWidgets() {
	initCounters();
	initClocks();
	initCopyButtons();
}
