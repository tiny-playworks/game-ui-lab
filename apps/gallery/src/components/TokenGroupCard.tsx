import React from 'react';
import type { GameUiTokenDefinition, GameUiTokenGroupDefinition } from '@tiny-playworks/tokens';

function TokenSample({ token }: { token: GameUiTokenDefinition }) {
  const cssVarReference = `var(${token.cssVar})`;

  if (token.sample.kind === 'swatch') {
    return <span className="token-chip token-chip--swatch" style={{ background: cssVarReference }} aria-hidden="true" />;
  }

  if (token.sample.kind === 'text') {
    return <span className="token-chip token-chip--text" style={{ color: cssVarReference }}>Aa</span>;
  }

  if (token.sample.kind === 'border') {
    return <span className="token-chip token-chip--border" style={{ borderColor: cssVarReference, color: cssVarReference }}>Loot</span>;
  }

  if (token.sample.kind === 'shadow') {
    return <span className="token-chip token-chip--shadow" style={{ boxShadow: cssVarReference }} aria-hidden="true" />;
  }

  if (token.sample.kind === 'radius') {
    return <span className="token-chip token-chip--radius" style={{ borderRadius: cssVarReference }} aria-hidden="true" />;
  }

  if (token.sample.kind === 'spacing') {
    return (
      <span className="token-chip token-chip--spacing" style={{ gap: cssVarReference }} aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    );
  }

  return (
    <span className="token-chip token-chip--motion" aria-hidden="true">
      {token.sample.label}
    </span>
  );
}

export function TokenGroupCard({ group }: { group: GameUiTokenGroupDefinition }) {
  return (
    <article className="token-group">
      <div className="token-group__header">
        <span className="token-group__eyebrow">Token group</span>
        <h2>{group.title}</h2>
        <p>{group.description}</p>
      </div>

      <div className="token-list">
        {group.tokens.map((token) => (
          <div key={token.cssVar} className="token-row">
            <TokenSample token={token} />
            <div className="token-row__body">
              <div className="token-row__topline">
                <strong>{token.name}</strong>
                <code>{token.cssVar}</code>
              </div>
              <p>{token.description}</p>
            </div>
            <span className="token-row__value">{token.value}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
