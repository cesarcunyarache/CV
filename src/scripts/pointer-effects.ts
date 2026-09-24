import { allowsPointerEffects } from './env';

/**
 * `[data-tilt]`     sets --rx / --ry (deg) and --mx / --my (%) from the pointer.
 * `[data-magnetic]` pulls the element slightly towards the pointer.
 * `[data-parallax-pointer]` sets --px / --py (-1 → 1) relative to the viewport.
 * Only for fine pointers without reduced motion.
 */
const TILT_MAX_DEG = 6;
const MAGNETIC_STRENGTH = 0.28;

function onFrame<T extends Event>(handler: (event: T) => void) {
	let frame = 0;
	let last: T;
	return (event: T) => {
		last = event;
		if (!frame) {
			frame = requestAnimationFrame(() => {
				frame = 0;
				handler(last);
			});
		}
	};
}

function initTilt() {
	document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((element) => {
		element.addEventListener(
			'pointermove',
			onFrame((event: PointerEvent) => {
				const rect = element.getBoundingClientRect();
				const x = (event.clientX - rect.left) / rect.width;
				const y = (event.clientY - rect.top) / rect.height;
				element.style.setProperty('--ry', `${((x - 0.5) * TILT_MAX_DEG * 2).toFixed(2)}deg`);
				element.style.setProperty('--rx', `${((0.5 - y) * TILT_MAX_DEG * 2).toFixed(2)}deg`);
				element.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
				element.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
			}),
		);
		element.addEventListener('pointerleave', () => {
			element.style.setProperty('--rx', '0deg');
			element.style.setProperty('--ry', '0deg');
		});
	});
}

function initMagnetic() {
	document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((element) => {
		element.addEventListener(
			'pointermove',
			onFrame((event: PointerEvent) => {
				const rect = element.getBoundingClientRect();
				const x = (event.clientX - rect.left - rect.width / 2) * MAGNETIC_STRENGTH;
				const y = (event.clientY - rect.top - rect.height / 2) * MAGNETIC_STRENGTH;
				element.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
			}),
		);
		element.addEventListener('pointerleave', () => {
			element.style.transform = '';
		});
	});
}

function initPointerParallax() {
	const targets = document.querySelectorAll<HTMLElement>('[data-parallax-pointer]');
	if (!targets.length) return;
	window.addEventListener(
		'pointermove',
		onFrame((event: PointerEvent) => {
			const x = (event.clientX / window.innerWidth) * 2 - 1;
			const y = (event.clientY / window.innerHeight) * 2 - 1;
			targets.forEach((target) => {
				target.style.setProperty('--px', x.toFixed(3));
				target.style.setProperty('--py', y.toFixed(3));
			});
		}),
		{ passive: true },
	);
}

export function initPointerEffects() {
	if (!allowsPointerEffects()) return;
	initTilt();
	initMagnetic();
	initPointerParallax();
}
