import { desks } from '../i18n/ui';

export const staticPages = ['methodology', 'corrections', 'contact', 'about'] as const;
export const extraSections = ['latest', 'breaking', 'search'] as const;

export const deskSections = desks.map((d) => d.id).filter((id) => id !== 'investigations');

export const pageSections = [...deskSections, ...staticPages, ...extraSections];
