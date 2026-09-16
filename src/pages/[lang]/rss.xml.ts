import type { APIContext } from 'astro';
import { storiesFor, storySlug } from '../../lib/content';
import { isLang, localize } from '../../lib/lang';
import { locales } from '../../lib/lang';

export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export async function GET({ params, site }: APIContext) {
  const lang = isLang(params.lang) ? params.lang : 'en';
  const stories = await storiesFor(lang);
  const origin = site?.toString().replace(/\/$/, '') ?? 'http://127.0.0.1:4321';
  const items = stories
    .map((story) => {
      const link = `${origin}${localize(lang, `/article/${storySlug(story)}`)}`;
      const title = escapeXml(story.data.title);
      const dek = escapeXml(story.data.dek);
      return `<item><title>${title}</title><link>${link}</link><guid>${link}</guid><pubDate>${story.data.published.toUTCString()}</pubDate><description>${dek}</description></item>`;
    })
    .join('');
  const channelTitle = lang === 'pt-br' ? 'ToTo Global Desk (PT-BR)' : 'ToTo Global Desk';
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${channelTitle}</title><link>${origin}${localize(lang, '/')}</link><description>DEMO newsroom feed. Not live reporting.</description>${items}</channel></rss>`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
