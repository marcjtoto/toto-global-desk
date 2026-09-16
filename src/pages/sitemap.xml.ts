import type { APIContext } from 'astro';
import { casesFor, caseSlug, storiesFor, storySlug } from '../lib/content';
import { localize, locales } from '../lib/lang';
import { pageSections } from '../lib/sections';

export async function GET({ site }: APIContext) {
  const origin = site?.toString().replace(/\/$/, '') ?? 'http://127.0.0.1:4321';
  const urls: string[] = [`${origin}/`];
  for (const lang of locales) {
    urls.push(`${origin}${localize(lang, '/')}`);
    urls.push(`${origin}${localize(lang, '/investigations')}`);
    urls.push(`${origin}${localize(lang, '/rss.xml')}`);
    for (const section of pageSections) {
      urls.push(`${origin}${localize(lang, `/${section}`)}`);
    }
    for (const story of await storiesFor(lang)) {
      urls.push(`${origin}${localize(lang, `/article/${storySlug(story)}`)}`);
    }
    for (const item of await casesFor(lang)) {
      urls.push(`${origin}${localize(lang, `/investigations/${caseSlug(item)}`)}`);
    }
  }
  const unique = [...new Set(urls)];
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${unique
    .map((loc) => `<url><loc>${loc}</loc></url>`)
    .join('')}</urlset>`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
