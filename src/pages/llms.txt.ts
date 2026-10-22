import data from '../data/synthesys.json';
import template from '../data/llms.txt?raw';
import { fill } from '../lib/llms.ts';

export function GET() {
  return new Response(fill(template, data), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
