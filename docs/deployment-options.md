# Deployment options

Nothing is deployed. Local preview only until Marc approves a host.

| Option | Cost | Notes |
| --- | --- | --- |
| Local (`npm run preview`) | $0 | Default |
| Cloudflare Pages | $0 free tier for static assets; 500 builds/month on free | Best later match for Astro. Needs Marc’s account + yes. |
| GitHub Pages | $0 | Simple; bandwidth/size caps |
| Netlify | Free credits; can pause | Forms exist; not needed yet |
| Vercel Hobby | $0 then paid | Poor fit; Hobby is non-commercial |

Do not buy a domain, add billing, or connect DNS without an explicit money/approval gate.

Suggested later command (not to run now):

```bash
npx wrangler pages project list
```

That still requires a Cloudflare login. Do not execute it as part of this local build.
