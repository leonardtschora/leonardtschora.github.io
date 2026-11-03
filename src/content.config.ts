// Content collections. One so far: the feed (src/content/feed/*.md), read by /feed/, the
// "Latest" block on the home page and /rss.xml. See COOKBOOK §5 "Add a feed entry".
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const feed = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/feed' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // One or two sentences: shown on the home page and as the RSS description.
    summary: z.string(),
    // The main thing to open (live app, paper, repo). Optional.
    link: z.string().url().optional(),
    linkLabel: z.string().default('Open'),
  }),
});

export const collections = { feed };
