// Tests for src/lib/llms.ts. Run: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fill } from '../src/lib/llms.ts';

const data = {
  tools: [{ name: 'mdshare', host: 'mdshare.live' }, { name: 'Mugilu', host: 'mugilu.live' }, { name: 'Overlooked', host: 'overlooked-india.pages.dev' }],
  stories: [
    { title: 'The Overlooked Species', url: 'https://overlooked-species.surge.sh', topic: 'the species India overlooks', subtitle: 'what records leave out' },
    { title: 'Upwind', url: 'https://upwind.surge.sh/', topic: "Delhi's winter air" },
  ],
};

test('fill: counts, tool list, story topics and story list come from the data', () => {
  const out = fill('{{toolCount}} free open tools: {{tools}}. {{storyCount}} data stories: {{storyTopics}}.\n{{storyList}}', data);
  assert.equal(out, "Three free open tools: mdshare (mdshare.live), Mugilu (mugilu.live), Overlooked (overlooked-india.pages.dev). " +
    "Two data stories: the species India overlooks and Delhi's winter air.\n" +
    '- The Overlooked Species, what records leave out (overlooked-species.surge.sh)\n- Upwind (upwind.surge.sh)');
});

test('fill: an unknown placeholder is an error, so a typo never reaches the site', () => {
  assert.throws(() => fill('{{toolcount}}', data), /toolcount/);
});

test('the template names every placeholder that fill knows and no count is typed in', () => {
  const t = readFileSync(new URL('../src/data/llms.txt', import.meta.url), 'utf8');
  for (const k of ['toolCount', 'tools', 'storyCount', 'storyTopics', 'storyList']) assert.ok(t.includes(`{{${k}}}`), k);
  assert.doesNotMatch(t, /\b(Five|Six|Seven|Eight|Fourteen|Fifteen) (free open tools|data stories)/);
});
