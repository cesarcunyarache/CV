import { initHorizontalScroll } from './horizontal-scroll';
import { initNavigation } from './navigation';
import { initPointer } from './pointer';
import { initReveal } from './reveal';
import { initScrollProgress } from './scroll-progress';
import { initThemeToggle } from './theme';
import { initWidgets } from './widgets';

// Needed right away: theme button, navigation and entrance reveals.
initThemeToggle();
initNavigation();
initReveal();

// The rest runs in separate tasks so page load never blocks for long.
const deferred = [initScrollProgress, initHorizontalScroll, initWidgets, initPointer];
const runNext = () => {
	deferred.shift()?.();
	if (deferred.length) setTimeout(runNext, 0);
};
setTimeout(runNext, 0);
