// llms.txt is written from src/data/llms.txt with the SyntheSYS counts and lists filled in from synthesys.json,
// so a new tool or story never leaves a stale number (src/pages/llms.txt.ts).
import { countWord } from './count.ts';

type Tool = { name: string; host: string };
type Story = { title: string; url: string; topic: string; subtitle?: string };

const host = (url: string) => new URL(url).host;
const and = (items: string[]) => (items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`);

export function fill(template: string, data: { tools: Tool[]; stories: Story[] }): string {
  const values: Record<string, string> = {
    toolCount: countWord(data.tools.length),
    tools: data.tools.map((t) => `${t.name} (${t.host})`).join(', '),
    storyCount: countWord(data.stories.length),
    storyTopics: and(data.stories.map((s) => s.topic)),
    storyList: data.stories.map((s) => `- ${s.title}${s.subtitle ? `, ${s.subtitle}` : ''} (${host(s.url)})`).join('\n'),
  };
  return template.replace(/\{\{(\w+)\}\}/g, (_, k: string) => {
    if (!(k in values)) throw new Error(`llms.txt: unknown placeholder {{${k}}}`);
    return values[k];
  });
}
