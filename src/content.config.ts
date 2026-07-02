import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Publications shown on the Thesis page. Add a paper by dropping a new
// Markdown file into src/content/publications/ — the abstract is the body.
const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    venue: z.string(),
    date: z.coerce.date(),
    authors: z.string(),
    paperUrl: z.string().optional(),
    slidesUrl: z.string().optional(),
    doi: z.string().url().optional(),
    award: z.string().optional(),
    // Lower = shown first (falls back to date when omitted).
    order: z.number().optional(),
  }),
});

export const collections = { publications };
