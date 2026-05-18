import { describe, expect, it } from '@rstest/core';
import { galleryRoutes, resolveRoutePath, toRouteHref } from '../lib/routing';

describe('gallery routing', () => {
  it('keeps the public route inventory stable', () => {
    expect(galleryRoutes.map((route) => route.path)).toEqual(['/', '/tokens', '/primitives']);
  });

  it('resolves local and Pages deep links to the same route paths', () => {
    expect(resolveRoutePath('/tokens', '/')).toBe('/tokens');
    expect(resolveRoutePath('/primitives', '/')).toBe('/primitives');
    expect(resolveRoutePath('/game-ui-lab/tokens', '/game-ui-lab/')).toBe('/tokens');
    expect(resolveRoutePath('/game-ui-lab/primitives', '/game-ui-lab/')).toBe('/primitives');
  });

  it('builds hrefs for root and GitHub Pages bases', () => {
    expect(toRouteHref('/tokens', '/')).toBe('/tokens');
    expect(toRouteHref('/primitives', '/game-ui-lab/')).toBe('/game-ui-lab/primitives');
  });
});
