import type { NoteEntry, WritingEntry } from './content';
import { notePath, writingPath } from './content';

export type SearchDocument = {
  kind: 'writing' | 'note';
  title: string;
  description: string;
  tags: string[];
  href: string;
  date: string;
};

export function toSearchDocuments(writing: WritingEntry[], notes: NoteEntry[]): SearchDocument[] {
  return [
    ...writing.map((entry) => ({
      kind: 'writing' as const,
      title: entry.data.title,
      description: entry.data.description,
      tags: entry.data.tags,
      href: writingPath(entry),
      date: entry.data.publishedAt.toISOString(),
    })),
    ...notes.map((entry) => ({
      kind: 'note' as const,
      title: entry.data.title,
      description: entry.data.description,
      tags: entry.data.tags,
      href: notePath(entry),
      date: entry.data.publishedAt.toISOString(),
    })),
  ];
}

export function matchesQuery(document: SearchDocument, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return false;
  const haystack = [document.title, document.description, ...document.tags].join(' ').toLowerCase();
  return haystack.includes(needle);
}
