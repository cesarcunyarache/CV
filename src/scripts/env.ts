const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

export const prefersReducedMotion = () => reducedMotionQuery.matches;

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));
