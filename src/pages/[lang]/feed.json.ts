import type { APIContext } from 'astro';
import { storiesFor, storySlug } from '../../lib/content';
import { isLang, locales, localize } from '../../lib/lang';

export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export async function GET({ params, site }: APIContext) {
  const lang = isLang(params.lang) ? params.lang : 'en';
  const stories = await storiesFor(lang);
  const origin = site?.toString().replace(/\/$/, '') ?? 'http://127.0.0.1:4321';
  const home = `${origin}${localize(lang, '/')}`;
  const body = {
    version: 'https://jsonfeed.org/version/1.1',
    title: lang === 'pt-br' ? 'ToTo Global Desk (PT-BR)' : 'ToTo Global Desk',
    home_page_url: home,
    feed_url: `${origin}${localize(lang, '/feed.json')}`,
    description: 'DEMO newsroom feed. Not live reporting.',
    language: lang === 'pt-br' ? 'pt-BR' : 'en',
    items: stories.map((story) => {
      const url = `${origin}${localize(lang, `/article/${storySlug(story)}`)}`;
      return {
        id: url,
        url,
        title: story.data.title,
        content_text: story.data.dek,
        date_published: story.data.published.toISOString(),
        tags: [story.data.desk, story.data.kicker],
        authors: story.data.authors.map((name) => ({ name })),
      };
    }),
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
  });
}
