import { prefersReducedMotion } from './env';

/**
 * Cursor-driven effects, all through one delegated pointermove per frame:
 *  [data-spotlight]      --mx / --my: light position inside the element
 *  [data-tilt]           --rx / --ry: small 3D tilt towards the cursor
 *  [data-magnetic]       translate: pulled slightly towards the cursor
 *  [data-pointer-scene]  --px / --py: cursor position in the viewport (-1 → 1)
 * Only for mouse / trackpad users without reduced motion.
 */
const TILT_DEG = 5;
const MAGNETIC_PULL = 0.25;

function resetTilt(element: HTMLElement) {
	element.style.removeProperty('--rx');
	element.style.removeProperty('--ry');
}

export function initPointer() {
	const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
	if (!finePointer || prefersReducedMotion()) return;

	const scenes = [...document.querySelectorAll<HTMLElement>('[data-pointer-scene]')];
	let tilted: HTMLElement | null = null;
	let pulled: HTMLElement | null = null;
	let last: PointerEvent | null = null;
	let frame = 0;

	const relative = (element: HTMLElement, event: PointerEvent) => {
		const rect = element.getBoundingClientRect();
		return { rect, x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
	};

	const apply = () => {
		frame = 0;
		const event = last;
		if (!event) return;
		const target = event.target instanceof Element ? event.target : null;

		const spot = target?.closest<HTMLElement>('[data-spotlight]');
		if (spot) {
			const { rect } = relative(spot, event);
			spot.style.setProperty('--mx', `${event.clientX - rect.left}px`);
			spot.style.setProperty('--my', `${event.clientY - rect.top}px`);
		}

		const tilt = target?.closest<HTMLElement>('[data-tilt]') ?? null;
		if (tilted && tilted !== tilt) resetTilt(tilted);
		if (tilt) {
			const { x, y } = relative(tilt, event);
			tilt.style.setProperty('--ry', `${((x - 0.5) * 2 * TILT_DEG).toFixed(2)}deg`);
			tilt.style.setProperty('--rx', `${((0.5 - y) * 2 * TILT_DEG).toFixed(2)}deg`);
		}
		tilted = tilt;

		const magnet = target?.closest<HTMLElement>('[data-magnetic]') ?? null;
		if (pulled && pulled !== magnet) pulled.style.translate = '';
		if (magnet) {
			const { rect } = relative(magnet, event);
			const dx = (event.clientX - rect.left - rect.width / 2) * MAGNETIC_PULL;
			const dy = (event.clientY - rect.top - rect.height / 2) * MAGNETIC_PULL;
			magnet.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
		}
		pulled = magnet;

		const px = ((event.clientX / window.innerWidth) * 2 - 1).toFixed(3);
		const py = ((event.clientY / window.innerHeight) * 2 - 1).toFixed(3);
		for (const scene of scenes) {
			scene.style.setProperty('--px', px);
			scene.style.setProperty('--py', py);
		}
	};

	document.addEventListener(
		'pointermove',
		(event) => {
			last = event;
			frame ||= requestAnimationFrame(apply);
		},
		{ passive: true },
	);
	document.documentElement.addEventListener('pointerleave', () => {
		if (tilted) resetTilt(tilted);
		if (pulled) pulled.style.translate = '';
		tilted = pulled = null;
	});
}
