import React from 'react';
import {
  ComboCounter,
  FloatingToast,
  GameUiProvider,
  RarityBorder,
} from '@tiny-playworks/game-ui';
import { LoopingDamagePreview } from '../components/LoopingDamagePreview';
import { PageIntro } from '../components/PageIntro';
import { PrimitiveCard } from '../components/PrimitiveCard';

const rarityTones: Array<'common' | 'rare' | 'epic' | 'legendary'> = ['common', 'rare', 'epic', 'legendary'];

export function PrimitivesRoute() {
  return (
    <section className="stack-section">
      <PageIntro
        eyebrow="Primitives"
        title="Primitives Overview"
        description="Public API only. These samples stay intentionally small, readable, and bright enough to prove how the primitives behave on a dark shell."
      >
        <span className="meta-pill">Public API only</span>
        <span className="meta-pill">No internal imports</span>
      </PageIntro>

      <section className="primitive-stage">
        <div className="primitive-stage__copy">
          <span className="route-note__eyebrow">Live stage</span>
          <strong>Compact overview deck</strong>
          <p>The stage stays present, but the cards below carry the main explanation load.</p>
        </div>

        <RarityBorder tone="legendary" className="primitive-stage__arena">
          <div className="primitive-stage__arena-inner">
            <LoopingDamagePreview
              className="primitive-stage__numbers"
              items={[
                { value: '460', variant: 'critical', prefix: 'CRIT' },
                { value: '84', variant: 'damage' },
                { value: '+26', variant: 'heal' },
              ]}
            />
            <div className="primitive-stage__aside">
              <ComboCounter count={19} />
              <FloatingToast title="Overview running" message="Five public primitives, one dark shell." variant="success" />
            </div>
          </div>
        </RarityBorder>
      </section>

      <div className="overview-grid">
        <PrimitiveCard
          name="DamageNumber"
          summary="Floating combat text for damage, heal, critical, and miss states."
          tokenNote="Consumes combat color tokens and motion durations to create a readable brightness spike."
        >
          <LoopingDamagePreview
            className="sample-row sample-row--damage"
            items={[
              { value: '128', variant: 'damage' },
              { value: '512', variant: 'critical', prefix: 'CRIT' },
              { value: '+48', variant: 'heal' },
              { value: 'MISS', variant: 'miss' },
            ]}
            intervalMs={1600}
          />
        </PrimitiveCard>

        <PrimitiveCard
          name="FloatingToast"
          summary="Short-lived game feedback messages for utility, loot, warning, and success states."
          tokenNote="Consumes surface, line, spacing, and shadow tokens so utility alerts stay legible."
        >
          <div className="sample-stack">
            <FloatingToast title="Info" message="Reload finished" variant="info" />
            <FloatingToast title="Loot" message="Epic shard acquired" variant="loot" />
          </div>
        </PrimitiveCard>

        <PrimitiveCard
          name="ComboCounter"
          summary="Compact HUD counter for combo chains and rising encounter tempo."
          tokenNote="Consumes critical-tone colors, radius, and shadow/glow tokens for the combo peak."
        >
          <div className="sample-row sample-row--combo">
            <ComboCounter count={5} />
            <ComboCounter count={18} />
          </div>
        </PrimitiveCard>

        <PrimitiveCard
          name="RarityBorder"
          summary="Token-driven rarity frame for common, rare, epic, and legendary states."
          tokenNote="Consumes rarity colors, radius, and glow tokens to frame loot and status emphasis."
        >
          <div className="sample-grid sample-grid--rarity">
            {rarityTones.map((tone) => (
              <RarityBorder key={tone} tone={tone} className="rarity-swatch">
                <div className="rarity-swatch__content">
                  <span>{tone}</span>
                </div>
              </RarityBorder>
            ))}
          </div>
        </PrimitiveCard>

        <PrimitiveCard
          name="GameUiProvider"
          summary="Theme root that provides the CSS variable context for every primitive preview."
          tokenNote="Provides the shared theme boundary so primitives read from one token foundation instead of local overrides."
        >
          <GameUiProvider className="provider-sample">
            <div className="provider-sample__panel">
              <span className="provider-sample__eyebrow">Theme root</span>
              <strong>Wrap once, consume everywhere.</strong>
              <p>All previews in this gallery stay inside the same provider boundary.</p>
            </div>
          </GameUiProvider>
        </PrimitiveCard>
      </div>
    </section>
  );
}
