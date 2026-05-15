import React from 'react';

interface AppNavProps {
  routes: Array<{
    path: '/' | '/tokens' | '/primitives';
    label: string;
    shortLabel: string;
  }>;
  activePath: '/' | '/tokens' | '/primitives';
  onNavigate: (path: '/' | '/tokens' | '/primitives') => void;
}

export function AppNav({ routes, activePath, onNavigate }: AppNavProps) {
  return (
    <header className="app-nav">
      <button className="app-nav__brand" type="button" onClick={() => onNavigate('/')}>
        <span className="app-nav__eyebrow">Tiny Playworks</span>
        <strong>Feedback Sandbox</strong>
        <span className="app-nav__caption">Early playground/docs for combat feedback primitives.</span>
      </button>

      <nav className="app-nav__links" aria-label="Gallery navigation">
        {routes.map((route) => {
          const isActive = route.path === activePath;

          return (
            <a
              key={route.path}
              className="app-nav__link"
              data-active={isActive}
              href={route.path}
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
