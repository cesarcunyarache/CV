/**
 * Interface strings (navigation, labels, buttons, SEO). Portfolio content
 * lives in `src/data/portfolio.ts`.
 */
import type { Localized } from './config';

export const sections = ['about', 'work', 'approach', 'experience', 'stack', 'education', 'contact'] as const;
export type SectionId = (typeof sections)[number];

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
		openMenu: { es: 'Abrir menú', en: 'Open menu' },
		closeMenu: { es: 'Cerrar menú', en: 'Close menu' },
		backToTop: { es: 'Volver arriba', en: 'Back to top' },
		opensInNewTab: { es: '(abre en una pestaña nueva)', en: '(opens in a new tab)' },
		architectureDiagram: {
			es: 'Diagrama decorativo de capas de un sistema: interfaz, API, reglas de negocio y base de datos.',
			en: 'Decorative diagram of system layers: interface, API, business rules and database.',
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
	navItems: ['work', 'experience', 'about', 'contact'] satisfies SectionId[],
	hero: {
		ctaWork: { es: 'Ver proyectos', en: 'View work' },
		ctaContact: { es: 'Hablemos', en: "Let's talk" },
		scroll: { es: 'Desliza', en: 'Scroll' },
		currently: { es: 'Actualmente', en: 'Currently' },
		layers: {
			es: ['Interfaz', 'API REST', 'Reglas de negocio', 'Base de datos'],
			en: ['Interface', 'REST API', 'Business rules', 'Database'],
		},
	},
	sectionTitles: {
		about: { es: 'Quién soy', en: 'Who I am' },
		work: { es: 'Trabajo seleccionado', en: 'Selected work' },
		approach: { es: 'Cómo trabajo', en: 'How I work' },
		experience: { es: 'Experiencia', en: 'Experience' },
		stack: { es: 'Stack técnico', en: 'Tech stack' },
		education: { es: 'Formación', en: 'Education' },
		contact: { es: 'Contacto', en: 'Contact' },
	} satisfies Record<SectionId, Localized>,
	about: {
		languages: { es: 'Idiomas', en: 'Languages' },
	},
	work: {
		intro: {
			es: 'Casos donde el software resuelve un problema concreto del negocio.',
			en: 'Cases where software solves a concrete business problem.',
		},
		empty: {
			es: 'Estoy documentando mis proyectos. Muy pronto estarán aquí.',
			en: 'I am documenting my projects. They will be here soon.',
		},
		placeholder: { es: 'Placeholder', en: 'Placeholder' },
		featured: { es: 'Destacado', en: 'Featured' },
		role: { es: 'Rol', en: 'Role' },
		live: { es: 'Ver en vivo', en: 'Live site' },
		repository: { es: 'Código', en: 'Source' },
		cursorLabel: { es: 'Ver', en: 'View' },
		dragHint: { es: 'Sigue deslizando', en: 'Keep scrolling' },
	},
	approach: {
		intro: {
			es: 'Entiendo el negocio y la ingeniería. Este es el recorrido de una regla de negocio hasta producción.',
			en: 'I understand both the business and the engineering. This is the path from a business rule to production.',
		},
	},
	experience: {
		present: { es: 'Presente', en: 'Present' },
		caseStudy: { es: 'Caso medido', en: 'Measured case' },
		before: { es: 'Antes', en: 'Before' },
		after: { es: 'Después', en: 'After' },
		reduction: { es: 'menos', en: 'less' },
	},
	stack: {
		intro: {
			es: 'Herramientas que uso a diario y los conceptos que guían cómo las uso.',
			en: 'Tools I use every day and the concepts that guide how I use them.',
		},
		principles: { es: 'Principios y dominio', en: 'Principles & domain' },
	},
	education: {
		certifications: { es: 'Cursos y certificaciones', en: 'Courses & certifications' },
	},
	contact: {
		emailLabel: { es: 'Correo', en: 'Email' },
		email: { es: 'Escríbeme', en: 'Email me' },
		copy: { es: 'Copiar correo', en: 'Copy email' },
		copied: { es: 'Copiado', en: 'Copied' },
		localTime: { es: 'Hora local', en: 'Local time' },
	},
	footer: {
		builtWith: { es: 'Diseñado y construido con Astro.', en: 'Designed and built with Astro.' },
		rights: { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
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
