export function withBase(path = '/', options: { file?: boolean } = {}): string {
  const base = import.meta.env.BASE_URL || '/';
  const trimmed = path.trim() || '/';
  const isAbsolute = /^https?:\/\//.test(trimmed);
  if (isAbsolute) return trimmed;

  const withoutSlash = trimmed.replace(/^\/+/, '');
  const joined = `${base.replace(/\/+$/, '')}/${withoutSlash}`.replace(/\/{2,}/g, '/');
  const url = joined.startsWith('/') ? joined : `/${joined}`;

  if (options.file || /\.[a-z0-9]+$/i.test(url)) {
    return url;
  }

  return url.endsWith('/') ? url : `${url}/`;
}

export function absoluteUrl(path = '/'): string {
  const site = import.meta.env.SITE || 'https://adaozz.github.io';
  const origin = String(site).replace(/\/+$/, '');
  const href = withBase(path);
  if (/^https?:\/\//.test(href)) return href;
  return `${origin}${href}`;
}

export function isCurrentPath(pathname: string, href: string): boolean {
  const current = withBase(pathname);
  const target = withBase(href);
  if (target === withBase('/')) return current === target;
  return current === target || current.startsWith(target);
}
