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
