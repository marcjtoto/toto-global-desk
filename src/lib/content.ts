import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export async function storiesFor(lang: Lang): Promise<CollectionEntry<'stories'>[]> {
  const all = await getCollection('stories');
  return all
    .filter((s) => s.data.lang === lang)
    .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
}

export async function casesFor(lang: Lang): Promise<CollectionEntry<'cases'>[]> {
  const all = await getCollection('cases');
  return all
    .filter((s) => s.data.lang === lang)
    .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
}

export function storySlug(entry: CollectionEntry<'stories'>): string {
  return entry.id.split('/').pop() ?? entry.id;
}

export function caseSlug(entry: CollectionEntry<'cases'>): string {
  return entry.id.split('/').pop() ?? entry.id;
}

export function artForDesk(desk: CollectionEntry<'stories'>['data']['desk']): string {
  if (desk === 'corruption-watch' || desk === 'data-lab') return '/art/solar.svg';
  if (desk === 'war-watch' || desk === 'world') return '/art/glass.svg';
  return '/art/lead-plaza.svg';
}

export function homepageSlots(stories: CollectionEntry<'stories'>[]) {
  const lead = stories.find((s) => s.data.featured) ?? stories[0];
  const rest = stories.filter((s) => s.id !== lead?.id);
  return {
    lead,
    breaking: stories.find((s) => s.data.breaking),
    mid: rest.slice(0, 2),
    live: stories.slice(0, 4),
    mostRead: [lead, ...rest].filter(Boolean).slice(0, 3),
  };
}
