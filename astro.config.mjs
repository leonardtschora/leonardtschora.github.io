// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served at the root of the custom domain leonardtschora.com (public/CNAME), so no `base` is needed.
// https://astro.build/config
export default defineConfig({
  site: 'https://leonardtschora.com',
  integrations: [sitemap()],
  // Old URLs that may have inbound links. Astro emits a meta-refresh page for each
  // in the static build.
  redirects: {
    '/thesis': '/about/',
    '/education': '/about/',
    '/portfolio': '/work/',
  },
});
