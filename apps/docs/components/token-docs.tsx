import type { CSSProperties } from 'react';
import { gameUiTokenGroups, gameUiTokens, gameUiTokenVars } from '../../../packages/tokens/src';
import {
  CooldownSlot,
  FloatingToast,
  GameUiProvider,
  HealthBar,
  LootCard,
  ResourceMeter,
} from '../../../packages/primitives/src';
import { Localized, useDocsLocale } from './locale';

const groupLabels = {
  color: '颜色',
  rarity: '稀有度',
  hud: 'HUD',
  motion: '动效',
  glow: '光效',
  radius: '圆角',
  spacing: '间距',
};

const customTokenStyle = {
  [gameUiTokenVars.accent]: '#ff7ad9',
  [gameUiTokenVars.line]: 'rgba(255, 122, 217, 0.38)',
  [gameUiTokenVars.health]: '#ff335f',
  [gameUiTokenVars.shield]: '#7dd3fc',
  [gameUiTokenVars.mana]: '#48f5ff',
  [gameUiTokenVars.rarityLegendary]: '#ffb000',
  [gameUiTokenVars.shadowGlow]: '0 0 32px rgba(255, 122, 217, 0.34)',
} as CSSProperties;

const tokenCode = `import { gameUiTokens, gameUiTokenVars } from '@tiny-playworks/tokens';

<div style={{
  [gameUiTokenVars.health]: '#ff335f',
  [gameUiTokenVars.mana]: '#48f5ff',
  [gameUiTokenVars.rarityLegendary]: '#ffb000',
  padding: gameUiTokens.space4,
  gap: gameUiTokens.space3,
}}>
  <HealthBar value={82} max={100} showValue />
  <ResourceMeter value={64} max={100} kind="mana" label="MP" />
  <LootCard name="星核" rarity="legendary" quantity={1} />
</div>`;

export function TokenShowcase() {
  const { locale } = useDocsLocale();
  const isZh = locale === 'zh';

  return (
    <>
      <section className="docs-section">
        <Localized as="h2" className="docs-section__title" zh="Token 如何影响组件" en="How tokens affect components" />
        <div className="docs-token-compare">
          <TokenScene title={isZh ? '默认 token' : 'Default tokens'} />
          <TokenScene title={isZh ? '局部覆盖后' : 'Scoped override'} style={customTokenStyle} />
        </div>
        <pre className="docs-demo-block__code"><code>{tokenCode}</code></pre>
      </section>

      <section className="docs-section">
        <Localized as="h2" className="docs-section__title" zh="Token 列表" en="Token reference" />
        <div className="docs-token-groups">
          {gameUiTokenGroups.map((group) => (
            <article className="docs-token-group" key={group.id}>
              <h3>{isZh ? `${groupLabels[group.id]} / ${group.title.replace(' tokens', '')}` : group.title}</h3>
              <div className="docs-token-list">
                {group.tokens.map((token) => (
                  <div className="docs-token-row" key={token.cssVar}>
                    <TokenSample kind={token.sample.kind} value={token.value} />
                    <div>
                      <strong>{token.name}</strong>
                      <code>{token.cssVar}</code>
                    </div>
                    <span>{token.value}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function TokenScene({ title, style }: { title: string; style?: CSSProperties }) {
  return (
    <GameUiProvider className="docs-token-scene">
      <div className="docs-token-scene__scope" style={style}>
        <div className="docs-token-scene__bar">
          <span>{title}</span>
          <CooldownSlot label="Q" progress={0.64} ready={false} />
        </div>
        <HealthBar value={82} max={100} shield={18} label="HP" showValue />
        <ResourceMeter value={64} max={100} kind="mana" label="MP" />
        <div className="docs-token-scene__loot">
          <LootCard name="星核" rarity="legendary" quantity={1} value="999" subtitle="Legendary" />
          <FloatingToast title="Token Applied" message="Color, border, glow" variant="loot" />
        </div>
      </div>
    </GameUiProvider>
  );
}

function TokenSample({ kind, value }: { kind: string; value: string }) {
  if (kind === 'border') {
    return <span className="docs-token-sample docs-token-sample--border" style={{ borderColor: value }} />;
  }

  if (kind === 'text') {
    return <span className="docs-token-sample docs-token-sample--text" style={{ color: value }}>Aa</span>;
  }

  if (kind === 'shadow') {
    return <span className="docs-token-sample docs-token-sample--shadow" style={{ boxShadow: value }} />;
  }

  if (kind === 'radius') {
    return <span className="docs-token-sample docs-token-sample--radius" style={{ borderRadius: value }} />;
  }

  if (kind === 'spacing') {
    return <span className="docs-token-sample docs-token-sample--spacing" style={{ width: value }} />;
  }

  if (kind === 'motion') {
    return <span className="docs-token-sample docs-token-sample--motion" />;
  }

  return <span className="docs-token-sample docs-token-sample--swatch" style={{ background: value, color: gameUiTokens.text }} />;
}
