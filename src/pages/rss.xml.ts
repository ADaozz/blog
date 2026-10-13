import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getNotes, getWriting, notePath, writingPath } from '../lib/content';
import { site } from '../data/site';
import { absoluteUrl } from '../lib/urls';

export async function GET(context: APIContext) {
  const writing = await getWriting();
  const notes = await getNotes();
  const items = [
    ...writing.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: writingPath(entry),
    })),
    ...notes.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: notePath(entry),
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: site.title,
    description: site.description,
    site: context.site ?? absoluteUrl('/'),
    items,
    trailingSlash: true,
  });
}
