const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

export const prefersReducedMotion = () => reducedMotionQuery.matches;

/** Mouse/trackpad users that have not asked for reduced motion. */
export const allowsPointerEffects = () => finePointerQuery.matches && !reducedMotionQuery.matches;

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

export const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));
