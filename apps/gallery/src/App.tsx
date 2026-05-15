import React, { useEffect, useMemo, useState } from 'react';
import { GameUiProvider } from '@tiny-playworks/game-ui';
import { AppNav } from './components/AppNav';
import {
  galleryRoutes,
  resolveRoutePath,
  restorePagesFallback,
  toRouteHref,
  type GalleryRoutePath,
} from './lib/routing';
import { FeedbackRoute } from './routes/FeedbackRoute';
import { PrimitivesRoute } from './routes/PrimitivesRoute';
import { TokensRoute } from './routes/TokensRoute';

const basePath = __LAB_BASE_PATH__;

export function App() {
  const [pathname, setPathname] = useState<GalleryRoutePath>(() => resolveRoutePath(window.location.pathname, basePath));

  useEffect(() => {
    restorePagesFallback(basePath);

    const normalizedPath = resolveRoutePath(window.location.pathname, basePath);
    const normalizedHref = toRouteHref(normalizedPath, basePath);

    if (normalizedHref !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      const nextUrl = new URL(window.location.href);
      nextUrl.pathname = normalizedHref;
      window.history.replaceState({}, '', nextUrl.toString());
    }

    const handlePopState = () => {
      setPathname(resolveRoutePath(window.location.pathname, basePath));
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  function navigate(nextPath: GalleryRoutePath) {
    if (nextPath === pathname) {
      return;
    }

    window.history.pushState({}, '', toRouteHref(nextPath, basePath));
    setPathname(nextPath);
  }

  const activeRoute = useMemo(
    () => galleryRoutes.find((route) => route.path === pathname) ?? galleryRoutes[0],
    [pathname],
  );

  return (
    <GameUiProvider className="gallery-app">
      <div className="app-backdrop" aria-hidden="true" />
      <div className="gallery-shell">
        <AppNav routes={galleryRoutes} activePath={pathname} onNavigate={navigate} basePath={basePath} />

        <main className="gallery-main">
          {pathname !== '/' ? (
            <header className="route-banner" aria-label="Current route">
              <span className="route-banner__label">Current route</span>
              <strong>{activeRoute.label}</strong>
              <span>{activeRoute.shortLabel}</span>
            </header>
          ) : null}

          {pathname === '/' ? <FeedbackRoute onNavigate={navigate} /> : null}
          {pathname === '/tokens' ? <TokensRoute /> : null}
          {pathname === '/primitives' ? <PrimitivesRoute /> : null}
        </main>
      </div>
    </GameUiProvider>
  );
}
