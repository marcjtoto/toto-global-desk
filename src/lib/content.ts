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

export const EDITION_001_KEYS = [
  'stf-sessao-15-set-2026',
  'pf-operacao-sonar-belem',
  'uscis-visto-diversidade-liminar',
  'ucrania-operacao-vivaldi',
  'tregua-energia-ucrania-eua',
] as const;

export function homepageSlots(stories: CollectionEntry<'stories'>[]) {
  const sourced = stories.filter(
    (s) => s.data.sample === false && (EDITION_001_KEYS as readonly string[]).includes(s.data.translationKey),
  );
  const pool = sourced.length > 0 ? sourced : stories.filter((s) => s.data.sample === false);
  const demoFallback = pool.length > 0 ? pool : stories;
  const board = demoFallback;
  const lead = board.find((s) => s.data.featured) ?? board[0];
  const rest = board.filter((s) => s.id !== lead?.id);
  return {
    lead,
    breaking: board.find((s) => s.data.breaking),
    mid: rest.slice(0, 2),
    live: board.slice(0, 5),
    mostRead: [lead, ...rest].filter(Boolean).slice(0, 5),
  };
}
