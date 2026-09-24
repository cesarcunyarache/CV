import type { ImageMetadata } from 'astro';
import type { Localized } from '../i18n/config';

/** Year-month string, e.g. `2025-03`, or just a year, e.g. `2025`. */
export type PartialDate = `${number}` | `${number}-${number}`;

export interface Link {
	label: string;
	href: string;
}

export interface Profile {
	name: string;
	/** Short name used for the logo / navigation. */
	shortName: string;
	role: Localized;
	location: { city: string; country: Localized; countryCode: string; timeZone: string };
	/** One line value proposition shown in the hero. */
	headline: Localized;
	summary: Localized;
	/** Optional: shown in the hero when set. */
	availability?: Localized;
}

export interface Contact {
	email: string;
	linkedin: string;
	github: string;
}

export interface AboutContent {
	/** Large editorial statement, revealed word by word on scroll. */
	statement: Localized;
	paragraphs: Localized<string>[];
	facts: { label: Localized; value: Localized }[];
}

export type PrincipleIcon = 'process' | 'rules' | 'architecture' | 'performance';

export interface Principle {
	title: Localized;
	description: Localized;
	icon: PrincipleIcon;
}

/** A before/after measurement rendered as an animated comparison. */
export interface Metric {
	label: Localized;
	unit: Localized;
	before: number;
	after: number;
	/** `blocks` draws one block per unit (small counts, e.g. 8 → 1 queries). Default: `bars`. */
	visual?: 'bars' | 'blocks';
}

export interface Experience {
	company: string;
	role: Localized;
	location: string;
	start: PartialDate;
	/** Omit when it is the current position. */
	end?: PartialDate;
	summary?: Localized;
	highlights: Localized[];
	/** Optional case study with measurable results. */
	caseStudy?: { title: Localized; context: Localized; metrics: Metric[] };
	technologies?: string[];
}

export interface Project {
	slug: string;
	title: Localized;
	description: Localized;
	category: Localized;
	role?: Localized;
	year?: number;
	technologies: string[];
	highlights?: Localized[];
	image?: ImageMetadata;
	imageAlt?: Localized;
	gallery?: { src: ImageMetadata; alt: Localized }[];
	liveUrl?: string;
	repositoryUrl?: string;
	featured?: boolean;
	/** Marks example content that must be replaced before going live. */
	placeholder?: boolean;
}

export interface SkillGroup {
	id: string;
	title: Localized;
	/** Technologies render as large type, concepts as a readable list. */
	kind: 'technologies' | 'concepts';
	items: (Localized | string)[];
}

export interface Education {
	institution: string;
	degree: Localized;
	location: string;
	start: PartialDate;
	end?: PartialDate;
}

export interface Certification {
	name: string;
	/** Brand logo key, e.g. `cisco`, `python`, `google` (see src/components/ui/brand-icons.ts). */
	icon?: string;
	issuer?: string;
	year?: number;
	url?: string;
}

export interface Language {
	name: Localized;
	level: Localized;
	/** 0–1, used only for the visual indicator. */
	proficiency: number;
}

export interface Portfolio {
	profile: Profile;
	contact: Contact;
	about: AboutContent;
	principles: Principle[];
	experience: Experience[];
	projects: Project[];
	skills: SkillGroup[];
	education: Education[];
	certifications: Certification[];
	languages: Language[];
	contactSection: { title: Localized; description: Localized };
}
