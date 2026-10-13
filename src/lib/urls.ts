function siteOrigin(): string {
  const site = String(import.meta.env.SITE || 'https://adaozz.github.io');
  return new URL(site.endsWith('/') ? site : `${site}/`).origin;
}

function basePrefix(): string {
  const base = import.meta.env.BASE_URL || '/';
  if (base === '/') return '/';
  return base.endsWith('/') ? base : `${base}/`;
}

function alreadyHasBase(path: string): boolean {
  const prefix = basePrefix();
  if (prefix === '/') return false;
  const trimmed = prefix.replace(/\/+$/, '');
  return path === trimmed || path === prefix || path.startsWith(prefix);
}

export function withBase(path = '/', options: { file?: boolean } = {}): string {
  const trimmed = path.trim() || '/';
  if (/^https?:\/\//.test(trimmed)) return trimmed;

  const fromRoot = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  if (alreadyHasBase(fromRoot)) {
    if (options.file || /\.[a-z0-9]+$/i.test(fromRoot)) return fromRoot;
    return fromRoot.endsWith('/') ? fromRoot : `${fromRoot}/`;
  }

  const withoutSlash = trimmed.replace(/^\/+/, '');
  const joined = `${basePrefix()}${withoutSlash}`.replace(/\/{2,}/g, '/');
  const url = joined.startsWith('/') ? joined : `/${joined}`;

  if (options.file || /\.[a-z0-9]+$/i.test(url)) {
    return url;
  }

  return url.endsWith('/') ? url : `${url}/`;
}

export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path;
  return new URL(withBase(path), `${siteOrigin()}/`).href;
}

export function isCurrentPath(pathname: string, href: string): boolean {
  const current = withBase(pathname);
  const target = withBase(href);
  if (target === withBase('/')) return current === target;
  return current === target || current.startsWith(target);
}
