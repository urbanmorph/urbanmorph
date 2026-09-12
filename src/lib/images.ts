import type { ImageMetadata } from 'astro';

const all = import.meta.glob<ImageMetadata>('/src/assets/img/**/*.{webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
});

/** Resolve a path like "img/team/sathya.webp" (as stored in the data files) to an imported image. */
export function img(path: string | null | undefined): ImageMetadata | undefined {
  if (!path) return undefined;
  const key = '/src/assets/' + path.replace(/^\.\.\//, '').replace(/^\//, '');
  return all[key];
}
