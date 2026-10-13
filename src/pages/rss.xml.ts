import rss from '@astrojs/rss';
import { getNotes, getProjects, getWriting, notePath, writingPath } from '../lib/content';
import { site } from '../data/site';
import { absoluteUrl } from '../lib/urls';

type FeedItem = {
  title: string;
  description: string;
  link: string;
  pubDate?: Date;
  categories?: string[];
};

export async function GET() {
  const writing = await getWriting();
  const notes = await getNotes();
  const projects = await getProjects();
  const self = absoluteUrl('/rss.xml');
  const items: FeedItem[] = [
    ...writing.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: absoluteUrl(writingPath(entry)),
      categories: entry.data.tags,
    })),
    ...notes.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: absoluteUrl(notePath(entry)),
      categories: entry.data.tags,
    })),
    ...projects
      .filter((entry) => Boolean(entry.data.github))
      .map((entry) => ({
        title: entry.data.title,
        description: entry.data.summary,
        pubDate: undefined,
        link: String(entry.data.github),
        categories: entry.data.stack,
      })),
  ];
  items.sort((a, b) => (b.pubDate?.getTime() ?? 0) - (a.pubDate?.getTime() ?? 0));

  const feed = await rss({
    title: site.title,
    description: site.description,
    site: absoluteUrl('/'),
    items,
    trailingSlash: true,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    customData: [
      `<language>${site.locale}</language>`,
      `<atom:link href="${self}" rel="self" type="application/rss+xml"/>`,
    ].join(''),
  });

  return new Response(feed.body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
