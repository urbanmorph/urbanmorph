import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
export function formatDate(d: Date): string {
  return fmt.format(d);
}

export async function allPosts(): Promise<Post[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function categoriesOf(posts: Post[]): { name: string; slug: string; count: number }[] {
  const map = new Map<string, { name: string; slug: string; count: number }>();
  for (const p of posts) {
    const slug = slugify(p.data.category);
    const cur = map.get(slug) ?? { name: p.data.category, slug, count: 0 };
    cur.count++;
    map.set(slug, cur);
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
