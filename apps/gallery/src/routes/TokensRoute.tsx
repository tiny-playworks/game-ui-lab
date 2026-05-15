import React from 'react';
import {
  ComboCounter,
  FloatingToast,
  RarityBorder,
} from '@tiny-playworks/game-ui';
import { gameUiTokenGroups } from '@tiny-playworks/tokens';
import { LoopingDamagePreview } from '../components/LoopingDamagePreview';
import { PageIntro } from '../components/PageIntro';
import { TokenGroupCard } from '../components/TokenGroupCard';

const consumptionNotes = [
  {
    name: 'DamageNumber',
    note: 'Uses damage, heal, critical, and miss colors plus motion durations to keep combat spikes bright.',
  },
  {
    name: 'RarityBorder',
    note: 'Consumes rarity colors, glow shadow, and radius tokens to frame loot and status states.',
  },
  {
    name: 'FloatingToast',
    note: 'Consumes surface, line, space, and shadow tokens so utility feedback stays readable on dark scenes.',
  },
];

export function TokensRoute() {
  return (
    <section className="stack-section">
      <PageIntro
        eyebrow="Tokens"
        title="Token Overview"
        description="Current tokens are CSS variables foundation for the lab. This is assetized for gallery use, not a full Figma sync layer."
      >
        <span className="meta-pill">CSS variables foundation</span>
        <span className="meta-pill">Rspress deferred</span>
      </PageIntro>

      <div className="token-hero">
        <div className="token-hero__copy">
          <span className="route-note__eyebrow">Token consumption sample</span>
          <strong>Small scene, same foundations.</strong>
          <p>Color, rarity, motion, glow, radius, and spacing stay visible here as a compact lab deck instead of a full hero stage.</p>
        </div>

        <RarityBorder tone="epic" className="token-sample">
          <div className="token-sample__stage">
            <LoopingDamagePreview
              className="token-sample__numbers"
              items={[
                { value: '248', variant: 'damage' },
                { value: '620', variant: 'critical', prefix: 'CRIT', size: 40 },
                { value: '+32', variant: 'heal' },
              ]}
            />
            <div className="token-sample__status">
              <ComboCounter count={14} />
              <FloatingToast
                title="Token deck"
                message="Primitives consume the same CSS variable foundation."
                variant="loot"
              />
            </div>
          </div>
        </RarityBorder>
      </div>

      <div className="token-groups-grid">
        {gameUiTokenGroups.map((group) => (
          <TokenGroupCard key={group.id} group={group} />
        ))}
      </div>

      <section className="consumption-panel">
        <div className="consumption-panel__intro">
          <span className="route-note__eyebrow">Tokens to primitives</span>
          <h2>How the foundation gets consumed</h2>
          <p>The public primitives stay lightweight because their visual rules flow through the shared token layer first.</p>
        </div>

        <div className="consumption-panel__grid">
          {consumptionNotes.map((item) => (
            <article key={item.name} className="route-note route-note--compact">
              <span className="route-note__eyebrow">{item.name}</span>
              <strong>{item.note}</strong>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
