import { getCollection, type CollectionEntry } from 'astro:content';
import { compareDesc } from './dates';
import { withBase } from './urls';

export type WritingEntry = CollectionEntry<'writing'>;
export type NoteEntry = CollectionEntry<'notes'>;
export type ProjectEntry = CollectionEntry<'projects'>;

const includeDrafts = import.meta.env.DEV;

export function isPublished<T extends { data: { draft: boolean } }>(entry: T): boolean {
  return includeDrafts || !entry.data.draft;
}

export async function getWriting(): Promise<WritingEntry[]> {
  const entries = await getCollection('writing', isPublished);
  return entries.sort((a, b) => compareDesc(a.data.publishedAt, b.data.publishedAt));
}

export async function getNotes(): Promise<NoteEntry[]> {
  const entries = await getCollection('notes', isPublished);
  return entries.sort((a, b) => compareDesc(a.data.publishedAt, b.data.publishedAt));
}

export async function getProjects(): Promise<ProjectEntry[]> {
  const entries = await getCollection('projects', isPublished);
  return entries.sort((a, b) => {
    const order = (a.data.order ?? 99) - (b.data.order ?? 99);
    if (order !== 0) return order;
    return a.data.title.localeCompare(b.data.title, 'en');
  });
}

export function writingPath(entry: WritingEntry): string {
  return withBase(`/writing/${entry.id}/`);
}

export function notePath(entry: NoteEntry): string {
  return withBase(`/notes/${entry.id}/`);
}

export function getFeaturedWriting(entries: WritingEntry[], limit = 4): WritingEntry[] {
  const featured = entries.filter((entry) => entry.data.featured);
  const source = featured.length > 0 ? featured : entries;
  return source.slice(0, limit);
}

export function groupWritingByYear(entries: WritingEntry[]): Array<[string, WritingEntry[]]> {
  const groups = new Map<string, WritingEntry[]>();
  for (const entry of entries) {
    const year = String(entry.data.publishedAt.getUTCFullYear());
    const list = groups.get(year) ?? [];
    list.push(entry);
    groups.set(year, list);
  }
  return [...groups.entries()].sort((a, b) => Number(b[0]) - Number(a[0]));
}

export function uniqueTags(entries: Array<WritingEntry | NoteEntry>): string[] {
  return [...new Set(entries.flatMap((entry) => entry.data.tags))].sort((a, b) =>
    a.localeCompare(b, 'zh-CN'),
  );
}

export function neighbors<T>(entries: T[], current: T): { prev?: T; next?: T } {
  const index = entries.indexOf(current);
  if (index < 0) return {};
  return {
    next: entries[index + 1],
    prev: entries[index - 1],
  };
}

export type RecentItem = {
  kind: 'writing' | 'note';
  title: string;
  href: string;
  date: Date;
  demo?: boolean;
};

export function recentUpdates(writing: WritingEntry[], notes: NoteEntry[], limit = 6): RecentItem[] {
  const items: RecentItem[] = [
    ...writing.map((entry) => ({
      kind: 'writing' as const,
      title: entry.data.title,
      href: writingPath(entry),
      date: entry.data.publishedAt,
      demo: entry.data.demo,
    })),
    ...notes.map((entry) => ({
      kind: 'note' as const,
      title: entry.data.title,
      href: notePath(entry),
      date: entry.data.publishedAt,
      demo: entry.data.demo,
    })),
  ];
  return items.sort((a, b) => compareDesc(a.date, b.date)).slice(0, limit);
}

export const projectStatusLabel: Record<ProjectEntry['data']['status'], string> = {
  wip: '进行中',
  active: '活跃',
  paused: '暂停',
  archived: '归档',
};
