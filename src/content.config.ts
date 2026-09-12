import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().default(''),
      date: z.coerce.date(),
      category: z.string().default('Urban Policy'),
      author: z.string().default('Sathya Sankaran'),
      subtitle: z.string().optional(),
      hero: image().optional(),
      heroUrl: z.string().optional(),
      thumb: image().optional(),
      heroCaption: z.string().optional(),
      dateUnknown: z.boolean().optional(),
    }),
});

export const collections = { blog };
