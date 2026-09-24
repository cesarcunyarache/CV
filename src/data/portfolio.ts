/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — single source of truth
 * ─────────────────────────────────────────────────────────────────────────
 *  Everything shown on the site lives here. Components only decide *how* it
 *  looks. Translatable text is written as `{ es: '…', en: '…' }`; values that
 *  are the same in every language (names, dates, URLs, technologies) are
 *  plain strings so they are never duplicated.
 *
 *  Values marked `TODO` are placeholders that must be replaced.
 */
import type { Portfolio } from './types';

export const portfolio: Portfolio = {
	profile: {
		name: 'Cesar Efrain Cunyarache Castillo',
		shortName: 'Cesar Cunyarache',
		role: { es: 'Ingeniero de Sistemas', en: 'Systems Engineer' },
		location: {
			city: 'Piura',
			country: { es: 'Perú', en: 'Peru' },
			countryCode: 'PE',
			timeZone: 'America/Lima',
		},
		headline: {
			es: 'Construyo software empresarial que entiende el negocio.',
			en: 'I build enterprise software that understands the business.',
		},
		summary: {
			es: 'Desarrollador backend enfocado en APIs, arquitectura y reglas de negocio. Transformo procesos reales en sistemas mantenibles, medibles y rápidos.',
			en: 'Backend developer focused on APIs, architecture and business rules. I turn real processes into maintainable, measurable and fast systems.',
		},
		availability: {
			es: 'Desarrollador de Software en Allen Dostmen S.A.C.',
			en: 'Software Developer at Allen Dostmen S.A.C.',
		},
	},

	contact: {
		// TODO: replace with your real public contact details.
		email: 'tu-correo@ejemplo.com',
		linkedin: 'https://www.linkedin.com/in/tu-usuario',
		github: 'https://github.com/cesarcunyarache',
	},

	about: {
		statement: {
			es: 'Soy ingeniero de sistemas. Me interesa el punto exacto donde un proceso de negocio se convierte en código: entender la regla, modelarla bien y construir un sistema que siga siendo fácil de cambiar mañana.',
			en: 'I am a systems engineer. I care about the exact point where a business process becomes code: understanding the rule, modelling it well and building a system that is still easy to change tomorrow.',
		},
		paragraphs: [
			{
				es: 'Trabajo principalmente en backend, APIs y software empresarial: caja, inventario, cotizaciones y los procesos que los conectan.',
				en: 'I work mainly on backend, APIs and enterprise software: cash management, inventory, quotations and the processes that connect them.',
			},
			{
				es: 'Antes de escribir código analizo el proceso. Después optimizo lo que se puede medir y cuido la arquitectura, la autorización y la trazabilidad para que el sistema sea mantenible.',
				en: 'Before writing code I analyse the process. Then I optimise what can be measured and take care of architecture, authorization and traceability so the system stays maintainable.',
			},
		],
		facts: [
			{ label: { es: 'Base', en: 'Based in' }, value: { es: 'Piura, Perú', en: 'Piura, Peru' } },
			{ label: { es: 'Enfoque', en: 'Focus' }, value: { es: 'Backend · APIs · ERP', en: 'Backend · APIs · ERP' } },
			{ label: { es: 'Formación', en: 'Education' }, value: { es: 'Ingeniería de Sistemas', en: 'Systems Engineering' } },
		],
	},

	principles: [
		{
			title: { es: 'Entender el negocio', en: 'Understand the business' },
			description: {
				es: 'Analizo cómo funciona el proceso real antes de proponer una solución técnica.',
				en: 'I analyse how the real process works before proposing a technical solution.',
			},
		},
		{
			title: { es: 'Modelar las reglas', en: 'Model the rules' },
			description: {
				es: 'Convierto reglas de negocio en modelos y flujos explícitos, no en condiciones dispersas.',
				en: 'I turn business rules into explicit models and flows, not scattered conditionals.',
			},
		},
		{
			title: { es: 'Diseñar para cambiar', en: 'Design for change' },
			description: {
				es: 'Arquitectura modular, SOLID y Clean Code para que el sistema evolucione sin romperse.',
				en: 'Modular architecture, SOLID and Clean Code so the system can evolve without breaking.',
			},
		},
		{
			title: { es: 'Medir y optimizar', en: 'Measure and optimise' },
			description: {
				es: 'Optimizo consultas y tiempos de respuesta con datos, no con suposiciones.',
				en: 'I optimise queries and response times with data, not assumptions.',
			},
		},
	],

	experience: [
		{
			company: 'Allen Dostmen S.A.C.',
			role: { es: 'Desarrollador de Software', en: 'Software Developer' },
			location: 'Piura, Perú',
			start: '2025',
			highlights: [
				{
					es: 'Desarrollé soluciones de software empresarial para procesos de caja, inventario y cotizaciones.',
					en: 'Built enterprise software solutions for cash management, inventory and quotation processes.',
				},
				{
					es: 'Analicé y transformé procesos y reglas de negocio en soluciones de software mantenibles.',
					en: 'Analysed business processes and rules and turned them into maintainable software.',
				},
				{
					es: 'Optimicé el procesamiento de centros de costo, reduciendo las consultas de 8 a 1 y el tiempo de respuesta de 244 ms a 82 ms.',
					en: 'Optimised cost-centre processing, reducing queries from 8 to 1 and response time from 244 ms to 82 ms.',
				},
				{
					es: 'Implementé mejoras de arquitectura, autorización y trazabilidad para fortalecer la mantenibilidad y el control de los sistemas.',
					en: 'Implemented architecture, authorization and traceability improvements to strengthen maintainability and control.',
				},
			],
			caseStudy: {
				title: { es: 'Centros de costo', en: 'Cost centres' },
				context: {
					es: 'Optimización del procesamiento de centros de costo.',
					en: 'Cost-centre processing optimisation.',
				},
				metrics: [
					{ label: { es: 'Consultas', en: 'Queries' }, unit: { es: 'consultas', en: 'queries' }, before: 8, after: 1 },
					{ label: { es: 'Tiempo de respuesta', en: 'Response time' }, unit: { es: 'ms', en: 'ms' }, before: 244, after: 82 },
				],
			},
		},
	],

	/**
	 * PROJECTS — add, remove or reorder entries freely.
	 * The three entries below are PLACEHOLDERS (`placeholder: true`) and must be
	 * replaced with real projects. `image` accepts an import from `src/assets`.
	 */
	projects: [
		{
			slug: 'placeholder-erp-module',
			placeholder: true,
			featured: true,
			year: 2026,
			title: { es: 'Proyecto de ejemplo 01', en: 'Sample project 01' },
			category: { es: 'Software empresarial', en: 'Enterprise software' },
			role: { es: 'Backend', en: 'Backend' },
			description: {
				es: 'Placeholder. Reemplaza este proyecto en src/data/portfolio.ts con un caso real: problema, solución y resultado.',
				en: 'Placeholder. Replace this project in src/data/portfolio.ts with a real case: problem, solution and outcome.',
			},
			highlights: [
				{ es: 'Resultado medible #1', en: 'Measurable outcome #1' },
				{ es: 'Decisión técnica #2', en: 'Technical decision #2' },
			],
			technologies: ['Laravel', 'PostgreSQL'],
		},
		{
			slug: 'placeholder-rest-api',
			placeholder: true,
			featured: true,
			year: 2026,
			title: { es: 'Proyecto de ejemplo 02', en: 'Sample project 02' },
			category: { es: 'API REST', en: 'REST API' },
			role: { es: 'Backend', en: 'Backend' },
			description: {
				es: 'Placeholder. Describe aquí una API: qué problema resuelve, cómo está diseñada y qué decisiones tomaste.',
				en: 'Placeholder. Describe an API here: what problem it solves, how it is designed and what decisions you made.',
			},
			technologies: ['NestJS', 'TypeScript', 'Prisma'],
		},
		{
			slug: 'placeholder-process-tool',
			placeholder: true,
			year: 2025,
			title: { es: 'Proyecto de ejemplo 03', en: 'Sample project 03' },
			category: { es: 'Automatización de procesos', en: 'Process automation' },
			description: {
				es: 'Placeholder. Agrega repositoryUrl o liveUrl para mostrar los enlaces del proyecto.',
				en: 'Placeholder. Add repositoryUrl or liveUrl to show the project links.',
			},
			technologies: ['PHP', 'MySQL', 'Docker'],
		},
	],

	skills: [
		{
			id: 'frameworks',
			kind: 'technologies',
			title: { es: 'Frameworks', en: 'Frameworks' },
			items: ['Laravel', 'NestJS'],
		},
		{
			id: 'languages',
			kind: 'technologies',
			title: { es: 'Lenguajes', en: 'Languages' },
			items: ['PHP', 'TypeScript', 'JavaScript', 'Java'],
		},
		{
			id: 'databases',
			kind: 'technologies',
			title: { es: 'Bases de datos', en: 'Databases' },
			items: ['PostgreSQL', 'MySQL', 'Eloquent', 'Prisma'],
		},
		{
			id: 'tools',
			kind: 'technologies',
			title: { es: 'Herramientas', en: 'Tools' },
			items: ['Git', 'Docker', 'Linux'],
		},
		{
			id: 'development',
			kind: 'concepts',
			title: { es: 'Desarrollo', en: 'Development' },
			items: [
				{ es: 'Desarrollo de software', en: 'Software development' },
				{ es: 'Desarrollo backend', en: 'Backend development' },
				'APIs REST',
				'Clean Code',
				'SOLID',
				{ es: 'Arquitectura modular', en: 'Modular architecture' },
			],
		},
		{
			id: 'systems',
			kind: 'concepts',
			title: { es: 'Sistemas', en: 'Systems' },
			items: [
				{ es: 'Software empresarial', en: 'Enterprise software' },
				{ es: 'Análisis de procesos', en: 'Process analysis' },
				{ es: 'Modelamiento de reglas de negocio', en: 'Business rules modelling' },
				{ es: 'Sistemas ERP', en: 'ERP systems' },
				{ es: 'Diseño y optimización de consultas', en: 'Query design and optimisation' },
			],
		},
	],

	education: [
		{
			institution: 'Universidad César Vallejo',
			degree: { es: 'Ingeniería de Sistemas', en: 'Systems Engineering' },
			location: 'Piura, Perú',
			start: '2020',
			end: '2025',
		},
	],

	certifications: [
		{ name: 'CCNAv7: Switching, Routing and Wireless Essentials', issuer: 'Cisco Networking Academy' },
		{ name: 'CCNAv7: Introduction to Networks', issuer: 'Cisco Networking Academy' },
		{ name: 'PCAP: Programming Essentials in Python' },
		{ name: 'Inspiring Study Conference with Google' },
	],

	languages: [
		{ name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' }, proficiency: 1 },
		{ name: { es: 'Inglés', en: 'English' }, level: { es: 'Básico / Intermedio', en: 'Basic / Intermediate' }, proficiency: 0.45 },
	],

	contactSection: {
		title: { es: 'Construyamos algo útil.', en: "Let's build something useful." },
		description: {
			es: '¿Tienes un proceso que necesita software, una API que diseñar o un sistema que optimizar? Escríbeme.',
			en: 'Have a process that needs software, an API to design or a system to optimise? Get in touch.',
		},
	},
};
