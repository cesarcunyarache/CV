/**
 * Interface strings (navigation, headings, buttons, SEO). Portfolio content
 * lives in `src/data/portfolio.ts`.
 */
import type { Localized } from './config';

export const sections = ['about', 'work', 'approach', 'experience', 'stack', 'education', 'contact'] as const;
export type SectionId = (typeof sections)[number];

/** Two-tone section headline: `title` + a muted continuation. */
interface Heading {
	title: Localized;
	subtitle: Localized;
}

export const ui = {
	meta: {
		title: {
			es: 'Cesar Cunyarache — Ingeniero de Sistemas · Backend & Software Empresarial',
			en: 'Cesar Cunyarache — Systems Engineer · Backend & Enterprise Software',
		},
		description: {
			es: 'Portfolio de Cesar Efrain Cunyarache Castillo, Ingeniero de Sistemas en Piura, Perú. Desarrollo backend, APIs, arquitectura de software y sistemas ERP.',
			en: 'Portfolio of Cesar Efrain Cunyarache Castillo, Systems Engineer in Piura, Peru. Backend development, APIs, software architecture and ERP systems.',
		},
	},
	a11y: {
		skipToContent: { es: 'Saltar al contenido', en: 'Skip to content' },
		mainNav: { es: 'Navegación principal', en: 'Main navigation' },
		languageSwitcher: { es: 'Cambiar idioma', en: 'Change language' },
		themeToggle: { es: 'Cambiar entre tema claro y oscuro', en: 'Switch between light and dark theme' },
		openMenu: { es: 'Abrir menú', en: 'Open menu' },
		closeMenu: { es: 'Cerrar menú', en: 'Close menu' },
		backToTop: { es: 'Volver arriba', en: 'Back to top' },
		opensInNewTab: { es: '(abre en una pestaña nueva)', en: '(opens in a new tab)' },
		architectureDiagram: {
			es: 'Diagrama de las capas de un sistema: interfaz, API, reglas de negocio y base de datos.',
			en: 'Diagram of system layers: interface, API, business rules and database.',
		},
	},
	nav: {
		about: { es: 'Perfil', en: 'About' },
		work: { es: 'Proyectos', en: 'Work' },
		approach: { es: 'Enfoque', en: 'Approach' },
		experience: { es: 'Experiencia', en: 'Experience' },
		stack: { es: 'Stack', en: 'Stack' },
		education: { es: 'Formación', en: 'Education' },
		contact: { es: 'Contacto', en: 'Contact' },
	} satisfies Record<SectionId, Localized>,
	/** Items shown in the navigation bar, in order. */
	navItems: ['about', 'work', 'experience', 'stack', 'contact'] satisfies SectionId[],
	headings: {
		work: {
			title: { es: 'Trabajo seleccionado.', en: 'Selected work.' },
			subtitle: {
				es: 'Software que resuelve problemas concretos del negocio.',
				en: 'Software that solves concrete business problems.',
			},
		},
		approach: {
			title: { es: 'Cómo trabajo.', en: 'How I work.' },
			subtitle: {
				es: 'Del proceso de negocio a producción, en cuatro pasos.',
				en: 'From business process to production, in four steps.',
			},
		},
		experience: {
			title: { es: 'Experiencia.', en: 'Experience.' },
			subtitle: { es: 'Software empresarial en producción.', en: 'Enterprise software in production.' },
		},
		stack: {
			title: { es: 'Stack técnico.', en: 'Tech stack.' },
			subtitle: {
				es: 'Las herramientas de cada día y los principios detrás de ellas.',
				en: 'Everyday tools and the principles behind them.',
			},
		},
		education: {
			title: { es: 'Formación.', en: 'Education.' },
			subtitle: { es: 'Ingeniería y aprendizaje continuo.', en: 'Engineering and continuous learning.' },
		},
	} satisfies Partial<Record<SectionId, Heading>>,
	hero: {
		ctaWork: { es: 'Ver proyectos', en: 'View work' },
		ctaContact: { es: 'Hablemos', en: "Let's talk" },
		scrollHint: { es: 'Desliza para ver las capas', en: 'Scroll to explore the layers' },
		layers: {
			es: ['Interfaz', 'API REST', 'Reglas de negocio', 'Base de datos'],
			en: ['Interface', 'REST API', 'Business rules', 'Database'],
		},
	},
	about: {
		eyebrow: { es: 'Quién soy', en: 'Who I am' },
		languages: { es: 'Idiomas', en: 'Languages' },
	},
	work: {
		empty: {
			es: 'Estoy documentando mis proyectos. Muy pronto estarán aquí.',
			en: 'I am documenting my projects. They will be here soon.',
		},
		placeholder: { es: 'Ejemplo', en: 'Sample' },
		live: { es: 'Ver sitio', en: 'Live site' },
		repository: { es: 'Ver código', en: 'View code' },
	},
	experience: {
		present: { es: 'Presente', en: 'Present' },
		caseStudy: { es: 'Caso medido', en: 'Measured case' },
		before: { es: 'Antes', en: 'Before' },
		after: { es: 'Después', en: 'After' },
		reduction: { es: 'menos', en: 'less' },
	},
	stack: {
		principles: { es: 'Principios y dominio', en: 'Principles & domain' },
	},
	education: {
		certifications: { es: 'Cursos y certificaciones', en: 'Courses & certifications' },
	},
	contact: {
		eyebrow: { es: 'Contacto', en: 'Contact' },
		emailLabel: { es: 'Correo', en: 'Email' },
		email: { es: 'Escríbeme', en: 'Email me' },
		copy: { es: 'Copiar correo', en: 'Copy email' },
		copied: { es: 'Copiado', en: 'Copied' },
		localTime: { es: 'Hora local en', en: 'Local time in' },
	},
	footer: {
		builtWith: { es: 'Diseñado y construido con Astro.', en: 'Designed and built with Astro.' },
	},
	notFound: {
		title: { es: 'Página no encontrada', en: 'Page not found' },
		description: {
			es: 'La ruta que buscas no existe o fue movida.',
			en: 'The route you are looking for does not exist or has moved.',
		},
		back: { es: 'Volver al inicio', en: 'Back home' },
	},
} as const;
