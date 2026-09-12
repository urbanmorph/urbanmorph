import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { allPosts } from '../lib/blog';
import { site } from '../lib/site';

export async function GET(context: APIContext) {
  const posts = await allPosts();
  return rss({
    title: 'The Urban Dispatch, by Urban Morph',
    description: 'Insights on sustainable mobility, urban governance, climate action and policy from Urban Morph, Bengaluru.',
    site: context.site ?? site.url,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description || p.data.subtitle || '',
      link: `/blog/${p.id}/`,
      categories: [p.data.category],
      author: p.data.author,
    })),
    customData: '<language>en-in</language>',
  });
}
