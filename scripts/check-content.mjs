import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.cwd(), 'src/content');
const collections = ['writing', 'notes', 'projects'];
const errors = [];
const publishedIds = new Map();

function parseFrontmatter(source, file) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    errors.push(`${file}: missing YAML frontmatter`);
    return {};
  }
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const item = line.match(/^([A-Za-z][\w]*):\s*(.*)$/);
    if (!item) continue;
    data[item[1]] = item[2].replace(/^["']|["']$/g, '');
  }
  return data;
}

async function walk(dir) {
  let entries = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error && error.code === 'ENOENT') return [];
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (/\.(md|mdx)$/.test(entry.name)) files.push(full);
  }
  return files;
}

for (const name of collections) {
  const dir = path.join(root, name);
  const files = await walk(dir);
  for (const file of files) {
    const source = await readFile(file, 'utf8');
    const data = parseFrontmatter(source, path.relative(process.cwd(), file));
    if (!data.title) errors.push(`${file}: title is required`);
    if (name !== 'projects' && !data.publishedAt) {
      errors.push(`${file}: publishedAt is required`);
    }
    if (name === 'projects' && !data.status) {
      errors.push(`${file}: status is required`);
    }
    const id = path.relative(dir, file).replace(/\.(md|mdx)$/i, '');
    const draft = data.draft === 'true';
    if (!draft) {
      const key = `${name}:${id}`;
      if (publishedIds.has(key)) errors.push(`duplicate published id ${key}`);
      publishedIds.set(key, file);
    }
  }
}

try {
  await stat(path.join(root, 'writing'));
  await stat(path.join(root, 'notes'));
  await stat(path.join(root, 'projects'));
} catch {
  errors.push('content collection directories must exist even when empty');
}

if (errors.length > 0) {
  console.error('Content check failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content check passed. ${publishedIds.size} published entries.`);
