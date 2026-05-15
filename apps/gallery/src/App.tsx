import React, { useEffect, useMemo, useState } from 'react';
import { GameUiProvider } from '@tiny-playworks/game-ui';
import { AppNav } from './components/AppNav';
import { FeedbackRoute } from './routes/FeedbackRoute';
import { PrimitivesRoute } from './routes/PrimitivesRoute';
import { TokensRoute } from './routes/TokensRoute';

type GalleryRoute = {
  path: '/' | '/tokens' | '/primitives';
  label: string;
  shortLabel: string;
};

const routes: GalleryRoute[] = [
  { path: '/', label: 'Feedback', shortLabel: 'Sandbox' },
  { path: '/tokens', label: 'Tokens', shortLabel: 'Foundation' },
  { path: '/primitives', label: 'Primitives', shortLabel: 'Public API' },
];

function resolvePath(pathname: string) {
  const normalizedPathname = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  return routes.find((route) => route.path === normalizedPathname)?.path ?? '/';
}

export function App() {
  const [pathname, setPathname] = useState<'/' | '/tokens' | '/primitives'>(() => resolvePath(window.location.pathname));

  useEffect(() => {
    const normalizedPath = resolvePath(window.location.pathname);

    if (normalizedPath !== window.location.pathname) {
      window.history.replaceState({}, '', normalizedPath);
    }

    const handlePopState = () => {
      setPathname(resolvePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  function navigate(nextPath: '/' | '/tokens' | '/primitives') {
    if (nextPath === pathname) {
      return;
    }

    window.history.pushState({}, '', nextPath);
    setPathname(nextPath);
  }

  const activeRoute = useMemo(
    () => routes.find((route) => route.path === pathname) ?? routes[0],
    [pathname],
  );

  return (
    <GameUiProvider className="gallery-app">
      <div className="app-backdrop" aria-hidden="true" />
      <div className="gallery-shell">
        <AppNav routes={routes} activePath={pathname} onNavigate={navigate} />

        <main className="gallery-main">
          <header className="route-banner" aria-label="Current route">
            <span className="route-banner__label">Current route</span>
            <strong>{activeRoute.label}</strong>
            <span>{activeRoute.shortLabel}</span>
          </header>

          {pathname === '/' ? <FeedbackRoute onNavigate={navigate} /> : null}
          {pathname === '/tokens' ? <TokensRoute /> : null}
          {pathname === '/primitives' ? <PrimitivesRoute /> : null}
        </main>
      </div>
    </GameUiProvider>
  );
}
