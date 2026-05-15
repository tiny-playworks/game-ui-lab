export type GalleryRoutePath = '/' | '/tokens' | '/primitives';

export interface GalleryRoute {
  path: GalleryRoutePath;
  label: string;
  shortLabel: string;
  description: string;
}

export const galleryRoutes: GalleryRoute[] = [
  {
    path: '/',
    label: 'Feedback',
    shortLabel: 'Sandbox',
    description: 'Live feedback stage and lab entry.',
  },
  {
    path: '/tokens',
    label: 'Tokens',
    shortLabel: 'Foundation',
    description: 'CSS variable foundation and consumption overview.',
  },
  {
    path: '/primitives',
    label: 'Primitives',
    shortLabel: 'Public API',
    description: 'Public primitives with live mini-samples.',
  },
];

export function normalizeBasePath(basePath: string) {
  if (!basePath || basePath === '/') {
    return '';
  }

  return `/${basePath.replace(/^\/+|\/+$/g, '')}`;
}

export function stripBasePath(pathname: string, basePath: string) {
  const normalizedBasePath = normalizeBasePath(basePath);

  if (!normalizedBasePath) {
    return pathname || '/';
  }

  if (pathname === normalizedBasePath) {
    return '/';
  }

  if (pathname.startsWith(`${normalizedBasePath}/`)) {
    return pathname.slice(normalizedBasePath.length) || '/';
  }

  return pathname || '/';
}

export function resolveRoutePath(pathname: string, basePath: string) {
  const strippedPathname = stripBasePath(pathname, basePath);
  const normalizedPathname =
    strippedPathname !== '/' && strippedPathname.endsWith('/')
      ? strippedPathname.slice(0, -1)
      : strippedPathname;

  return galleryRoutes.find((route) => route.path === normalizedPathname)?.path ?? '/';
}

export function toRouteHref(path: GalleryRoutePath, basePath: string) {
  const normalizedBasePath = normalizeBasePath(basePath);

  if (!normalizedBasePath) {
    return path;
  }

  return path === '/' ? `${normalizedBasePath}/` : `${normalizedBasePath}${path}`;
}

export function restorePagesFallback(basePath: string) {
  const searchParams = new URLSearchParams(window.location.search);
  const redirectedPath = searchParams.get('p');

  if (!redirectedPath) {
    return;
  }

  const query = searchParams.get('q');
  const hash = searchParams.get('h');
  const routePath = resolveRoutePath(redirectedPath, '');
  const nextUrl = new URL(window.location.href);

  nextUrl.search = query ? `?${query}` : '';
  nextUrl.hash = hash ? `#${hash}` : '';
  nextUrl.pathname = toRouteHref(routePath, basePath);

  window.history.replaceState({}, '', nextUrl.toString());
}
