import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { GameUiThemeName, GameUiTokenOverrides } from '@tiny-playworks/tokens';
import { createGameUiTokenStyle } from '@tiny-playworks/tokens';
import { mergeClass, providerRootClass } from '../styles';

export interface GameUiProviderProps {
  children: ReactNode;
  theme?: GameUiThemeName;
  tokens?: GameUiTokenOverrides;
  className?: string;
  style?: CSSProperties;
}

export function GameUiProvider({
  children,
  theme = 'default',
  tokens,
  className,
  style,
}: GameUiProviderProps) {
  const tokenStyle = createGameUiTokenStyle(tokens);

  return (
    <div
      className={mergeClass(providerRootClass, className)}
      data-game-ui-theme={theme}
      style={{ ...style, ...tokenStyle }}
    >
      {children}
    </div>
  );
}
