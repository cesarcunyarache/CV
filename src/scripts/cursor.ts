import { allowsPointerEffects, lerp } from './env';

/**
 * Subtle follower that complements (never replaces) the native cursor.
 * It grows over interactive elements and shows a label over `[data-cursor]`.
 */
const INTERACTIVE = 'a, button, [data-cursor], label, summary';

export function initCursor() {
	if (!allowsPointerEffects()) return;

	const cursor = document.createElement('div');
	cursor.className = 'cursor';
	cursor.setAttribute('aria-hidden', 'true');
	cursor.innerHTML = '<span class="cursor__label"></span>';
	document.body.append(cursor);
	const label = cursor.querySelector<HTMLElement>('.cursor__label')!;

	const target = { x: -100, y: -100 };
	const position = { ...target };
	let running = false;

	const loop = () => {
		position.x = lerp(position.x, target.x, 0.22);
		position.y = lerp(position.y, target.y, 0.22);
		cursor.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
		if (Math.abs(position.x - target.x) + Math.abs(position.y - target.y) > 0.1) {
			requestAnimationFrame(loop);
		} else {
			running = false;
		}
	};

	window.addEventListener(
		'pointermove',
		(event) => {
			target.x = event.clientX;
			target.y = event.clientY;
			cursor.classList.add('is-visible');
			if (!running) {
				running = true;
				requestAnimationFrame(loop);
			}
		},
		{ passive: true },
	);

	document.addEventListener('pointerover', (event) => {
		const element = (event.target as Element).closest<HTMLElement>(INTERACTIVE);
		const text = element?.dataset.cursor ?? '';
		cursor.classList.toggle('is-hover', Boolean(element));
		cursor.classList.toggle('has-label', Boolean(text));
		label.textContent = text;
	});

	document.documentElement.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
	window.addEventListener('pointerdown', () => cursor.classList.add('is-pressed'));
	window.addEventListener('pointerup', () => cursor.classList.remove('is-pressed'));
}
