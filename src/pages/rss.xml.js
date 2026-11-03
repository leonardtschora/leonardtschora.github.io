// /rss.xml — the feed (src/content/feed/) as RSS 2.0, for feed readers and cross-posting tools.
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';

export async function GET(context) {
  const entries = (await getCollection('feed')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: `${SITE.name} — feed`,
    description: 'What Léonard Tschora shipped lately: new apps, new versions and what was learned.',
    site: context.site,
    items: entries.map((e) => ({
      title: e.data.title,
      pubDate: e.data.date,
      description: e.data.summary,
      link: `/feed/#${e.id}`,
    })),
    customData: '<language>en</language>',
    // Links end in an anchor (/feed/#id): no trailing slash after it.
    trailingSlash: false,
  });
}
