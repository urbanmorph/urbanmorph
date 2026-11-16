// Every open tool on /synthesys shows its own app icon beside its name, the
// same icons as sathyasankaran.com's tool cards, so a tool reads the same everywhere.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const data = JSON.parse(readFileSync(new URL('../src/data/synthesys.json', import.meta.url), 'utf8'));
const page = readFileSync(new URL('../src/pages/synthesys.astro', import.meta.url), 'utf8');

test('every tool names an icon under /tools/ that exists in public/', () => {
  for (const t of data.tools) {
    assert.match(t.icon ?? '', /^\/tools\/[a-z0-9-]+\.(svg|png)$/, `${t.name} has no icon`);
    assert.ok(existsSync(new URL(`../public${t.icon}`, import.meta.url)), `${t.icon} is missing`);
  }
});

test('the tool card draws the icon, decorative (the name is beside it), at a fixed 40px', () => {
  assert.match(page, /<img class="tool__icon" src=\{t\.icon\} alt="" width="40" height="40"/);
});
