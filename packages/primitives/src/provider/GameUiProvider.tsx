import React from 'react';
import type { ReactNode } from 'react';

export interface GameUiProviderProps {
  children: ReactNode;
  theme?: 'default';
  className?: string;
}

export function GameUiProvider({ children, theme = 'default', className }: GameUiProviderProps) {
  return (
    <div className={['game-ui-root', className].filter(Boolean).join(' ')} data-game-ui-theme={theme}>
      {children}
    </div>
  );
}
