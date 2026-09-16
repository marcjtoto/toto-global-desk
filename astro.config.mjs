// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

const githubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: githubPages ? 'https://marcjtoto.github.io' : 'http://127.0.0.1:4321',
  base: githubPages ? '/toto-global-desk' : '/',
  integrations: [mdx()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-br'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
