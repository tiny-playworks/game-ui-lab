import React from 'react';
import {
  ComboCounter,
  CooldownSlot,
  FloatingToast,
  GameUiProvider,
  HealthBar,
  LootCard,
  LootStack,
  ObjectiveChip,
  QuestTracker,
  RarityBorder,
  ResourceMeter,
  RewardReveal,
  StatusBadge,
} from '@tiny-playworks/game-ui';
import { LoopingDamagePreview } from '../components/LoopingDamagePreview';
import { PageIntro } from '../components/PageIntro';
import { PrimitiveCard } from '../components/PrimitiveCard';
import { primitiveDocs } from '../lib/primitiveDocs';

const rarityTones: Array<'common' | 'rare' | 'epic' | 'legendary'> = ['common', 'rare', 'epic', 'legendary'];

const lootItems = [
  { id: 'credits', name: 'Credits', rarity: 'common' as const, quantity: 120, value: '120g' },
  { id: 'core', name: 'Pulse Core', rarity: 'rare' as const, quantity: 1, subtitle: 'Upgrade' },
  { id: 'shard', name: 'Neon Shard', rarity: 'epic' as const, quantity: 3, value: '240g' },
  { id: 'cache', name: 'Ancient Cache', rarity: 'legendary' as const, quantity: 1, subtitle: 'Wave clear' },
];

const questObjectives = [
  { id: 'beacon', label: 'Find beacon', state: 'complete' as const, meta: 'Main route' },
  { id: 'shards', label: 'Collect shards', progress: 2, max: 5, meta: 'Side quest' },
  { id: 'vault', label: 'Enter vault', state: 'locked' as const, meta: 'Locked' },
];

function getPrimitiveDoc(name: string) {
  const doc = primitiveDocs.find((item) => item.name === name);

  if (!doc) {
    throw new Error(`Missing primitive docs for ${name}`);
  }

  const { usage, states, props } = doc;
  return { usage, states, props };
}

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
              <HealthBar value={86} max={120} shield={28} label="Pilot HP" showValue />
              <ComboCounter count={19} />
              <FloatingToast title="Overview running" message="HUD core joins the feedback primitives." variant="success" />
            </div>
          </div>
        </RarityBorder>
      </section>

      <div className="overview-grid">
        <PrimitiveCard
          name="DamageNumber"
          summary="Floating combat text for damage, heal, critical, and miss states."
          tokenNote="Consumes combat color tokens and motion durations to create a readable brightness spike."
          {...getPrimitiveDoc('DamageNumber')}
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
          {...getPrimitiveDoc('FloatingToast')}
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
          {...getPrimitiveDoc('ComboCounter')}
        >
          <div className="sample-row sample-row--combo">
            <ComboCounter count={5} />
            <ComboCounter count={18} />
          </div>
        </PrimitiveCard>

        <PrimitiveCard
          name="HealthBar"
          summary="Persistent HP and shield readout for player, boss, and encounter HUD states."
          tokenNote="Consumes health and shield HUD tokens with compact value and shield overlays."
          {...getPrimitiveDoc('HealthBar')}
        >
          <div className="sample-stack">
            <HealthBar value={96} max={120} shield={32} label="Pilot HP" showValue />
            <HealthBar value={42} max={180} label="Boss Core" tone="boss" showValue />
          </div>
        </PrimitiveCard>

        <PrimitiveCard
          name="ResourceMeter"
          summary="Compact mana, energy, and stamina bars for ability costs and movement state."
          tokenNote="Consumes HUD resource colors while preserving the shared surface and spacing tokens."
          {...getPrimitiveDoc('ResourceMeter')}
        >
          <div className="sample-stack">
            <ResourceMeter value={44} max={80} kind="mana" label="Arcane" />
            <ResourceMeter value={68} max={100} kind="energy" />
            <ResourceMeter value={31} max={60} kind="stamina" />
          </div>
        </PrimitiveCard>

        <PrimitiveCard
          name="CooldownSlot"
          summary="Ability slot with cooldown mask, ready state, disabled state, and compact label."
          tokenNote="Consumes cooldown mask, accent, heal, radius, and surface tokens for ability readiness."
          {...getPrimitiveDoc('CooldownSlot')}
        >
          <div className="sample-row sample-row--cooldowns">
            <CooldownSlot progress={1} label="Blink" icon="B" ready />
            <CooldownSlot progress={0.58} label="Burst" icon="Q" />
            <CooldownSlot progress={0.2} label="Nova" icon="R" disabled />
          </div>
        </PrimitiveCard>

        <PrimitiveCard
          name="StatusBadge"
          summary="Small persistent status marker for buffs, debuffs, warnings, stacks, and durations."
          tokenNote="Consumes HUD positive, negative, warning, and neutral tones for readable status chips."
          {...getPrimitiveDoc('StatusBadge')}
        >
          <div className="sample-row sample-row--badges">
            <StatusBadge label="Haste" tone="buff" count={3} duration="12s" />
            <StatusBadge label="Burn" tone="debuff" duration="8s" />
            <StatusBadge label="Guard" tone="neutral" />
            <StatusBadge label="Overheat" tone="warning" />
          </div>
        </PrimitiveCard>

        <PrimitiveCard
          name="ObjectiveChip"
          summary="Single quest objective chip for active, complete, locked, and progress states."
          tokenNote="Consumes accent, heal, muted, line, surface, radius, and spacing tokens for compact quest state."
          {...getPrimitiveDoc('ObjectiveChip')}
        >
          <div className="sample-stack">
            <ObjectiveChip label="Find beacon" state="complete" meta="Main route" />
            <ObjectiveChip label="Collect shards" progress={2} max={5} meta="Side quest" />
            <ObjectiveChip label="Enter vault" state="locked" meta="Locked" />
          </div>
        </PrimitiveCard>

        <PrimitiveCard
          name="QuestTracker"
          summary="Quest panel that groups objectives and keeps the completion count visible."
          tokenNote="Uses ObjectiveChip internally so tracker panels inherit the same objective state language."
          {...getPrimitiveDoc('QuestTracker')}
        >
          <QuestTracker title="Signal Hunt" subtitle="Daily route" objectives={questObjectives} />
        </PrimitiveCard>

        <PrimitiveCard
          name="LootCard"
          summary="Compact loot item surface for rarity, quantity, value, and item category metadata."
          tokenNote="Consumes rarity colors, loot emphasis, surface, radius, and shadow tokens for item pickup clarity."
          {...getPrimitiveDoc('LootCard')}
        >
          <div className="sample-stack">
            <LootCard name="Neon Shard" rarity="epic" quantity={3} value="240g" subtitle="Crafting drop" />
            <LootCard name="Ancient Cache" rarity="legendary" subtitle="Wave clear" selected />
          </div>
        </PrimitiveCard>

        <PrimitiveCard
          name="LootStack"
          summary="Stacked drop list with a stable visible limit and overflow marker for post-wave pickup."
          tokenNote="Uses LootCard internally so stacks inherit rarity and surface tokens without extra API paths."
          {...getPrimitiveDoc('LootStack')}
        >
          <LootStack label="Wave drops" items={lootItems} limit={3} />
        </PrimitiveCard>

        <PrimitiveCard
          name="RewardReveal"
          summary="Reward flow panel for sealed, revealed, and claimed cache states with optional action."
          tokenNote="Combines loot and surface tokens into a single post-combat reveal state."
          {...getPrimitiveDoc('RewardReveal')}
        >
          <RewardReveal title="Cache unlocked" state="revealed" items={lootItems.slice(1)} actionLabel="Claim" />
        </PrimitiveCard>

        <PrimitiveCard
          name="RarityBorder"
          summary="Token-driven rarity frame for common, rare, epic, and legendary states."
          tokenNote="Consumes rarity colors, radius, and glow tokens to frame loot and status emphasis."
          {...getPrimitiveDoc('RarityBorder')}
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
          {...getPrimitiveDoc('GameUiProvider')}
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
