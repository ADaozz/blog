import type { APIRoute } from 'astro';
import { getNotes, getWriting } from '../lib/content';
import { toSearchDocuments } from '../lib/search';

export const GET: APIRoute = async () => {
  const writing = await getWriting();
  const notes = await getNotes();
  const documents = toSearchDocuments(writing, notes);
  return new Response(JSON.stringify(documents), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
