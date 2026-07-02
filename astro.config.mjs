// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// User site (leonardtschora.github.io) is served at the root, so no `base` is needed.
// https://astro.build/config
export default defineConfig({
  site: 'https://leonardtschora.github.io',
  integrations: [sitemap()],
});
