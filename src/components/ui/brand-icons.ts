/**
 * Brand logos (Simple Icons, CC0) resolved at build time — no client JS.
 * Technologies in `portfolio.ts` are matched by name; anything unknown
 * falls back to a monogram.
 */
import {
	siCisco,
	siDocker,
	siGit,
	siGoogle,
	siJavascript,
	siLaravel,
	siLinux,
	siMysql,
	siNestjs,
	siOpenjdk,
	siPhp,
	siPostgresql,
	siPrisma,
	siPython,
	siTypescript,
	type SimpleIcon,
} from 'simple-icons';

const registry: Record<string, SimpleIcon> = {
	cisco: siCisco,
	docker: siDocker,
	git: siGit,
	google: siGoogle,
	java: siOpenjdk,
	javascript: siJavascript,
	laravel: siLaravel,
	linux: siLinux,
	mysql: siMysql,
	nestjs: siNestjs,
	php: siPhp,
	postgresql: siPostgresql,
	prisma: siPrisma,
	python: siPython,
	typescript: siTypescript,
};

const normalize = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Relative luminance of a `RRGGBB` hex colour (WCAG). */
function luminance(hex: string) {
	const [r, g, b] = [0, 2, 4].map((i) => {
		const c = parseInt(hex.slice(i, i + 2), 16) / 255;
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export interface BrandIcon {
	/** Id of the `<symbol>` in the page sprite (BrandSprite.astro). */
	id: string;
	title: string;
	path: string;
	/** Brand colour, or undefined when it would be unreadable on light or dark backgrounds. */
	color?: string;
}

export function getBrandIcon(name: string): BrandIcon | undefined {
	const key = normalize(name);
	const icon = registry[key];
	if (!icon) return undefined;
	const l = luminance(icon.hex);
	return { id: `brand-${key}`, title: icon.title, path: icon.path, color: l > 0.04 && l < 0.75 ? `#${icon.hex}` : undefined };
}

/** Every registered logo, for the sprite. */
export const allBrandIcons = () => Object.keys(registry).map((key) => getBrandIcon(key)!);
