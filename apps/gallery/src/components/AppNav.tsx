import React from 'react';
import { toRouteHref, type GalleryRoute, type GalleryRoutePath } from '../lib/routing';

interface AppNavProps {
  routes: GalleryRoute[];
  activePath: GalleryRoutePath;
  onNavigate: (path: GalleryRoutePath) => void;
  basePath: string;
}

export function AppNav({ routes, activePath, onNavigate, basePath }: AppNavProps) {
  return (
    <header className="app-nav">
      <button className="app-nav__brand" type="button" onClick={() => onNavigate('/')}>
        <span className="app-nav__eyebrow">Tiny Playworks</span>
        <strong>Game UI Lab</strong>
        <span className="app-nav__caption">A public motion-first feedback lab for combat UI, rarity framing, and live primitive experiments.</span>
      </button>

      <nav className="app-nav__links" aria-label="Gallery navigation">
        {routes.map((route) => {
          const isActive = route.path === activePath;

          return (
            <a
              key={route.path}
              className="app-nav__link"
              data-active={isActive}
              href={toRouteHref(route.path, basePath)}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(route.path);
              }}
            >
              <strong>{route.label}</strong>
              <span>{route.shortLabel}</span>
            </a>
          );
        })}
      </nav>
    </header>
  );
}
