import { gameUiTokenGroups, gameUiTokens, type GameUiTokenOverrides, type GameUiThemeName } from '@tiny-playworks/tokens';
import {
  CooldownSlot,
  FloatingToast,
  GameUiProvider,
  HealthBar,
  LootCard,
  ResourceMeter,
} from '@tiny-playworks/game-ui';
import { Localized, useDocsLocale } from './locale';

const groupLabels = {
  color: '颜色',
  rarity: '稀有度',
  hud: 'HUD',
  ability: '技能',
  map: '地图',
  narrative: '叙事',
  inventory: '背包',
  party: '小队',
  economy: '经济',
  motion: '动效',
  glow: '光效',
  radius: '圆角',
  spacing: '间距',
};

const customTokens = {
  accent: '#ff7ad9',
  line: 'rgba(255, 122, 217, 0.38)',
  health: '#ff335f',
  shield: '#7dd3fc',
  mana: '#48f5ff',
  rarityLegendary: '#ffb000',
  abilityReady: '#76ff7a',
  markerObjective: '#ffdd66',
  choice: '#ff7ad9',
  shadowGlow: '0 0 32px rgba(255, 122, 217, 0.34)',
} satisfies GameUiTokenOverrides;

const tokenCode = `import { GameUiProvider, HealthBar, ResourceMeter, LootCard } from '@tiny-playworks/game-ui';
import '@tiny-playworks/game-ui/styles.css';

<GameUiProvider
  theme="arcade"
  tokens={{
    health: '#ff335f',
    mana: '#48f5ff',
    rarityLegendary: '#ffb000',
  }}
>
  <HealthBar value={82} max={100} showValue />
  <ResourceMeter value={64} max={100} kind="mana" label="MP" />
  <LootCard name="星核" rarity="legendary" quantity={1} />
</GameUiProvider>`;

export function TokenShowcase() {
  const { locale } = useDocsLocale();
  const isZh = locale === 'zh';

  return (
    <>
      <section className="docs-section">
        <Localized as="h2" className="docs-section__title" zh="Token 如何影响组件" en="How tokens affect components" />
        <div className="docs-token-compare">
          <TokenScene title={isZh ? '默认主题' : 'Default theme'} />
          <TokenScene title={isZh ? 'Arcade + 局部 token' : 'Arcade + scoped tokens'} theme="arcade" tokens={customTokens} />
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

function TokenScene({ title, theme = 'default', tokens }: { title: string; theme?: GameUiThemeName; tokens?: GameUiTokenOverrides }) {
  return (
    <GameUiProvider className="docs-token-scene" theme={theme} tokens={tokens}>
      <div className="docs-token-scene__bar">
        <span>{title}</span>
        <CooldownSlot label="Q" progress={0.64} ready={false} />
      </div>
      <HealthBar value={82} max={100} shield={18} label="HP" showValue />
      <ResourceMeter value={64} max={100} kind="mana" label="MP" />
      <div className="docs-token-scene__loot">
        <LootCard className="docs-token-scene__loot-item" name="星核" rarity="legendary" quantity={1} value="999" subtitle="Legendary" />
        <FloatingToast className="docs-token-scene__toast" title="Token Applied" message="Color, border, glow" variant="loot" />
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
