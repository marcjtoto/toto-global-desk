import type { APIContext } from 'astro';
import { casesFor, caseSlug, storiesFor, storySlug } from '../lib/content';
import { localize, locales } from '../lib/lang';
import { pageSections } from '../lib/sections';

export async function GET({ site }: APIContext) {
  const origin = site?.toString().replace(/\/$/, '') ?? 'http://127.0.0.1:4321';
  const rows: { loc: string; lastmod?: string }[] = [{ loc: `${origin}/` }];
  for (const lang of locales) {
    rows.push({ loc: `${origin}${localize(lang, '/')}` });
    rows.push({ loc: `${origin}${localize(lang, '/investigations')}` });
    rows.push({ loc: `${origin}${localize(lang, '/rss.xml')}` });
    for (const section of pageSections) {
      rows.push({ loc: `${origin}${localize(lang, `/${section}`)}` });
    }
    for (const story of await storiesFor(lang)) {
      rows.push({
        loc: `${origin}${localize(lang, `/article/${storySlug(story)}`)}`,
        lastmod: story.data.published.toISOString().slice(0, 10),
      });
    }
    for (const item of await casesFor(lang)) {
      rows.push({
        loc: `${origin}${localize(lang, `/investigations/${caseSlug(item)}`)}`,
        lastmod: item.data.published.toISOString().slice(0, 10),
      });
    }
  }
  const seen = new Set<string>();
  const unique = rows.filter((row) => {
    if (seen.has(row.loc)) return false;
    seen.add(row.loc);
    return true;
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${unique
    .map((row) =>
      row.lastmod
        ? `<url><loc>${row.loc}</loc><lastmod>${row.lastmod}</lastmod></url>`
        : `<url><loc>${row.loc}</loc></url>`,
    )
    .join('')}</urlset>`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
