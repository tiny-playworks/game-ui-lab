import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AbilityBar,
  CastBar,
  ComboCounter,
  CooldownSlot,
  DamageNumber,
  DialogueBox,
  FloatingToast,
  HealthBar,
  LocationTag,
  MiniMap,
  NotificationStack,
  RarityBorder,
  ResourceMeter,
  StatusBadge,
  TargetFrame,
  type DamageNumberVariant,
  type FloatingToastVariant,
  type RarityBorderTone,
} from '@tiny-playworks/game-ui';
import { LoopingDamagePreview } from '../components/LoopingDamagePreview';
import { PageIntro } from '../components/PageIntro';

interface FeedbackRouteProps {
  onNavigate: (path: '/' | '/tokens' | '/primitives') => void;
}

interface HitEvent {
  id: number;
  value: string;
  variant: DamageNumberVariant;
  x: number;
  y: number;
}

interface ToastEvent {
  id: number;
  title: string;
  message: string;
  variant: FloatingToastVariant;
}

interface SandboxFrame {
  hit: Omit<HitEvent, 'id'>;
  toast: Omit<ToastEvent, 'id'>;
  comboDelta: number;
  rarity: RarityBorderTone;
  phase: string;
  cast: number;
  mapLabel: string;
  dialogue: string;
}

const frames: SandboxFrame[] = [
  {
    hit: { value: '128', variant: 'damage', x: 34, y: 56 },
    toast: { title: 'Strike landed', message: 'Basic feedback loop fired', variant: 'info' },
    comboDelta: 1,
    rarity: 'common',
    phase: 'Opening hits',
    cast: 0.3,
    mapLabel: 'East gate',
    dialogue: 'Hold the tempo until the ability is ready.',
  },
  {
    hit: { value: '312', variant: 'critical', x: 58, y: 35 },
    toast: { title: 'Critical chain', message: 'Combo window extended', variant: 'warning' },
    comboDelta: 3,
    rarity: 'rare',
    phase: 'Clean combo',
    cast: 0.62,
    mapLabel: 'Patrol route',
    dialogue: 'Patrol is closing in. Keep distance.',
  },
  {
    hit: { value: '+42', variant: 'heal', x: 44, y: 42 },
    toast: { title: 'Shield online', message: 'Barrier restored for the next wave', variant: 'success' },
    comboDelta: 1,
    rarity: 'epic',
    phase: 'Fever streak',
    cast: 0.82,
    mapLabel: 'Shield relay',
    dialogue: 'Barrier restored. Push before the next wave.',
  },
  {
    hit: { value: 'MISS', variant: 'miss', x: 66, y: 52 },
    toast: { title: 'Loot found', message: 'Legendary cache border activated', variant: 'loot' },
    comboDelta: -4,
    rarity: 'legendary',
    phase: 'Loot pulse',
    cast: 1,
    mapLabel: 'Reward beacon',
    dialogue: 'Cache unlocked. Confirm the drop first.',
  },
];

const focusCards = [
  {
    label: 'Motion-first',
    title: 'HUD feedback as the product surface',
    body: 'Damage spikes, target state, cast progress, and combo tempo stay brighter than the shell around them.',
  },
  {
    label: 'Studio identity',
    title: 'Tiny Playworks as a UI lab, not a docs portal',
    body: 'The site behaves like a moving lab entry: dark stage, restrained glow, readable HUD, map, and narrative overlays.',
  },
  {
    label: 'Static-ready',
    title: 'GitHub Pages deploy without abandoning clean URLs',
    body: 'Base path handling and fallback entry keep the public lab deployable as a static site.',
  },
];

const primitiveSnapshots = [
  {
    name: 'DamageNumber',
    note: 'Combat float and critical spikes.',
  },
  {
    name: 'AbilityBar',
    note: 'Skill group readiness and lock state.',
  },
  {
    name: 'AbilityTooltip',
    note: 'Compact ability detail card.',
  },
  {
    name: 'CastBar',
    note: 'Casting and channel progress.',
  },
  {
    name: 'TargetFrame',
    note: 'Enemy, boss, and ally target state.',
  },
  {
    name: 'FloatingToast',
    note: 'Utility, loot, and state feedback.',
  },
  {
    name: 'MiniMap',
    note: 'Static marker map for exploration UI.',
  },
  {
    name: 'MapMarker',
    note: 'Ally, enemy, objective, and neutral points.',
  },
  {
    name: 'CompassBar',
    note: 'Heading strip with local markers.',
  },
  {
    name: 'LocationTag',
    note: 'Zone label and danger state.',
  },
  {
    name: 'DialogueBox',
    note: 'Speaker line with tone.',
  },
  {
    name: 'ChoicePrompt',
    note: 'Display-only branch choices.',
  },
  {
    name: 'ComboCounter',
    note: 'HUD tempo and streak energy.',
  },
  {
    name: 'QuestLog',
    note: 'Quest list built on objective semantics.',
  },
  {
    name: 'NotificationStack',
    note: 'Stacked system feedback.',
  },
  {
    name: 'HealthBar',
    note: 'Persistent HP and shield state.',
  },
  {
    name: 'CooldownSlot',
    note: 'Ability readiness at a glance.',
  },
  {
    name: 'RarityBorder',
    note: 'Framing for collectible emphasis.',
  },
  {
    name: 'LootStack',
    note: 'Post-wave drops with overflow handling.',
  },
  {
    name: 'RewardReveal',
    note: 'Cache reveal and claim flow.',
  },
  {
    name: 'GameUiProvider',
    note: 'Theme root for the shared token layer.',
  },
];

const abilityItems = [
  { id: 'blink', label: 'Blink', icon: 'B', ready: true, cost: '20' },
  { id: 'burst', label: 'Burst', icon: 'Q', progress: 0.68, cost: '35' },
  { id: 'nova', label: 'Nova', icon: 'R', progress: 0.12, locked: true },
];

const mapMarkers = [
  { id: 'ally', x: 22, y: 44, tone: 'ally' as const, label: 'Ally' },
  { id: 'enemy', x: 72, y: 50, tone: 'enemy' as const, label: 'Patrol' },
  { id: 'objective', x: 48, y: 28, tone: 'objective' as const, label: 'Beacon', active: true },
];

const notificationPreview = [
  { id: 'loot', title: 'Loot pulse', message: 'Legendary cache border activated', variant: 'loot' as const },
  { id: 'route', title: 'Route updated', message: 'Objective marker moved to the east gate', variant: 'info' as const },
  { id: 'warn', title: 'Patrol warning', message: 'Enemy route intersects your cast line', variant: 'warning' as const },
];

export function FeedbackRoute({ onNavigate }: FeedbackRouteProps) {
  const shouldReduceMotion = useReducedMotion();
  const [frameIndex, setFrameIndex] = useState(1);
  const [combo, setCombo] = useState(7);
  const [hits, setHits] = useState<HitEvent[]>([
    { id: 1, value: '312', variant: 'critical', x: 58, y: 34 },
    { id: 2, value: '84', variant: 'damage', x: 36, y: 58 },
  ]);
  const [toasts, setToasts] = useState<ToastEvent[]>([{
    id: 1,
    title: 'Lab ready',
    message: 'Feedback primitives are running on CSS variables',
    variant: 'info',
  }]);
  const eventIdRef = useRef(10);

  const frame = frames[frameIndex];
  const healthValue = Math.max(34, 118 - combo * 3);
  const shieldValue = frame.rarity === 'epic' || frame.rarity === 'legendary' ? 34 : 0;
  const manaValue = Math.max(22, 76 - frameIndex * 9);
  const cooldownProgress = frame.rarity === 'legendary' ? 1 : Math.min(0.92, 0.34 + frameIndex * 0.18);
  const notifications = [
    ...toasts.map((toast) => ({ ...toast, id: String(toast.id) })),
    ...notificationPreview,
  ];
  const waveLabel = useMemo(
    () => (combo >= 18 ? 'Fever streak' : combo >= 8 ? 'Clean combo' : 'Opening hits'),
    [combo],
  );
  const feedbackStatus = `Current phase: ${frame.phase}, combo ${combo}, rarity ${frame.rarity}, health ${healthValue}, shield ${shieldValue}.`;

  function fireFrame(nextIndex = (frameIndex + 1) % frames.length) {
    const nextFrame = frames[nextIndex];
    const id = eventIdRef.current + 1;
    eventIdRef.current = id;

    setFrameIndex(nextIndex);
    setHits((current) => [...current.slice(-3), { ...nextFrame.hit, id }]);
    setToasts((current) => [{ ...nextFrame.toast, id }, ...current].slice(0, 3));
    setCombo((current) => Math.max(0, current + nextFrame.comboDelta));

    window.setTimeout(() => {
      setHits((current) => current.filter((hit) => hit.id !== id));
    }, 900);
  }

  function resetSandbox() {
    setCombo(0);
    setFrameIndex(0);
    const resetToast: ToastEvent = {
      id: Date.now(),
      title: 'Sandbox reset',
      message: 'Loop restarted from opening feedback',
      variant: 'warning',
    };
    setToasts((current) => [resetToast, ...current].slice(0, 3));
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFrameIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % frames.length;
        const nextFrame = frames[nextIndex];
        const id = eventIdRef.current + 1;
        eventIdRef.current = id;

        setHits((current) => [...current.slice(-3), { ...nextFrame.hit, id }]);
        setToasts((current) => [{ ...nextFrame.toast, id }, ...current].slice(0, 3));
        setCombo((current) => Math.max(0, current + nextFrame.comboDelta));

        window.setTimeout(() => {
          setHits((current) => current.filter((hit) => hit.id !== id));
        }, 900);

        return nextIndex;
      });
    }, 2400);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section className="landing-layout">
      <div className="route-grid route-grid--feedback">
        <PageIntro
          eyebrow="Tiny Playworks"
          title="A moving Game UI Lab for HUD, maps, and narrative feedback."
          description="A public motion-first lab for damage numbers, target HUD, map markers, dialogue, notifications, and token-driven dark UI. More live stage than docs home."
        >
          <span className="meta-pill">Static GitHub Pages lab</span>
          <span className="meta-pill">Live combat sandbox</span>
          <span className="meta-pill">Primitives + tokens entry</span>
        </PageIntro>

        <div className="landing-cta-row">
          <button type="button" onClick={() => onNavigate('/tokens')}>Open token overview</button>
          <button type="button" onClick={() => onNavigate('/primitives')}>Open primitives</button>
        </div>

        <div className="route-note-grid route-note-grid--hero">
          <article className="route-note">
            <span className="route-note__eyebrow">Current loop</span>
            <strong>{frame.phase}</strong>
            <p>Glow stays restrained in the shell. HUD, map, and narrative feedback keep the brightness peak.</p>
          </article>
          <article className="route-note">
            <span className="route-note__eyebrow">Positioning</span>
            <strong>Not Storybook, not SaaS, not a generic docs frame.</strong>
            <div className="route-note__actions">
              <span className="meta-pill">Studio-facing lab entry</span>
              <span className="meta-pill">Readable dark surfaces</span>
            </div>
          </article>
        </div>

        <div className="route-grid__stage">
          <RarityBorder tone={frame.rarity} className="sandbox-frame">
            <div className="combat-panel" aria-label="Live HUD, map, and narrative feedback stage">
              <div className="arena-grid" aria-hidden="true" />
              <div className="boss-core">
                <motion.div
                  className="boss-orbit"
                  animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 12, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="boss-eye"
                  animate={shouldReduceMotion ? { scale: 1 } : { scale: frame.rarity === 'legendary' ? [1, 1.08, 1] : [1, 1.03, 1] }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              <AnimatePresence>
                {hits.map((hit) => (
                  <div className="hit-slot" key={hit.id} style={{ left: `${hit.x}%`, top: `${hit.y}%` }}>
                    <DamageNumber
                      value={hit.value}
                      variant={hit.variant}
                      prefix={hit.variant === 'critical' ? 'CRIT' : undefined}
                    />
                  </div>
                ))}
              </AnimatePresence>

              <div className="hud-topline">
                <span>Feedback Sandbox</span>
                <span>{waveLabel}</span>
              </div>

              <div className="target-dock">
                <TargetFrame
                  name={frame.rarity === 'legendary' ? 'Cache Warden' : 'Relic Warden'}
                  faction={frame.rarity === 'legendary' ? 'boss' : 'enemy'}
                  level="Lv.18"
                  health={healthValue * 4}
                  maxHealth={480}
                  shield={shieldValue}
                  statuses={[
                    { label: waveLabel, tone: combo >= 18 ? 'buff' : 'neutral', count: Math.max(1, Math.floor(combo / 6)) },
                    { label: 'Exposed', tone: 'debuff', duration: '8s' },
                  ]}
                />
              </div>

              <div className="hud-state-panel">
                <HealthBar value={healthValue} max={120} shield={shieldValue} label="Pilot HP" showValue />
                <ResourceMeter value={manaValue} max={90} kind="mana" label="Arcane" />
                <div className="hud-status-row">
                  <StatusBadge label={waveLabel} tone={combo >= 18 ? 'buff' : 'neutral'} count={Math.max(1, Math.floor(combo / 6))} />
                  <StatusBadge label="Exposed" tone="debuff" duration="8s" />
                </div>
              </div>

              <div className="rarity-chip" data-tone={frame.rarity}>
                {frame.rarity}
              </div>

              <div className="map-dock">
                <MiniMap label={frame.mapLabel} markers={mapMarkers} />
                <LocationTag
                  name={frame.mapLabel}
                  zone="North ridge"
                  danger={frame.rarity === 'common' ? 'safe' : frame.rarity === 'legendary' ? 'contested' : 'hostile'}
                  status="Route updated"
                />
              </div>

              <div className="ability-dock">
                <AbilityBar abilities={abilityItems} label="Sandbox ability bar" />
              </div>

              <div className="cast-dock">
                <CastBar label="Arc beam" progress={frame.cast} state={frame.cast >= 1 ? 'complete' : 'channeling'} />
              </div>

              <div className="dialogue-dock">
                <DialogueBox speaker="Mira" text={frame.dialogue} tone={frame.rarity === 'rare' ? 'warning' : 'ally'} />
              </div>

              <div className="combo-dock">
                <ComboCounter count={combo} />
              </div>
            </div>
          </RarityBorder>

          <div className="sandbox-controls">
            <button type="button" onClick={() => fireFrame()}>Step feedback</button>
            <button type="button" onClick={resetSandbox}>Reset loop</button>
          </div>

          <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {feedbackStatus}
          </div>

          <div className="toast-stack" role="log" aria-live="polite" aria-atomic="false" aria-relevant="additions text" aria-label="Feedback messages">
            <AnimatePresence>
              {toasts.map((toast) => (
                <FloatingToast
                  key={toast.id}
                  title={toast.title}
                  message={toast.message}
                  variant={toast.variant}
                />
              ))}
            </AnimatePresence>
            <NotificationStack notifications={notifications} limit={2} label="Sandbox notifications" />
          </div>
        </div>
      </div>

      <section className="landing-section">
        <div className="section-heading">
          <span className="section-heading__eyebrow">Current focus</span>
          <h2>Studio identity, live HUD feedback, and deploy-ready static presentation.</h2>
        </div>
        <div className="focus-grid">
          {focusCards.map((card) => (
            <article key={card.title} className="route-note route-note--feature">
              <span className="route-note__eyebrow">{card.label}</span>
              <strong>{card.title}</strong>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <div className="section-heading">
          <span className="section-heading__eyebrow">Primitives snapshot</span>
          <h2>The homepage now shows combat, exploration, and narrative primitives together.</h2>
        </div>
        <div className="snapshot-grid">
          <article className="overview-card overview-card--snapshot">
            <div className="overview-card__header">
              <span className="overview-card__eyebrow">Feedback spike</span>
              <h2>DamageNumber</h2>
            </div>
            <div className="overview-card__sample">
              <LoopingDamagePreview
                className="sample-row sample-row--damage"
                items={[
                  { value: '128', variant: 'damage' },
                  { value: '512', variant: 'critical', prefix: 'CRIT' },
                  { value: '+36', variant: 'heal' },
                  { value: 'MISS', variant: 'miss' },
                ]}
                intervalMs={1500}
              />
            </div>
          </article>

          <article className="overview-card overview-card--snapshot">
            <div className="overview-card__header">
              <span className="overview-card__eyebrow">Current primitives</span>
              <h2>Live kit</h2>
            </div>
            <div className="lab-chip-grid">
              {primitiveSnapshots.map((primitive) => (
                <div key={primitive.name} className="lab-chip">
                  <strong>{primitive.name}</strong>
                  <span>{primitive.note}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="overview-card overview-card--snapshot">
            <div className="overview-card__header">
              <span className="overview-card__eyebrow">HUD + narrative</span>
              <h2>Target, map, and notices</h2>
            </div>
            <div className="overview-card__sample sample-stack">
              <TargetFrame
                name="Relic Warden"
                faction="enemy"
                level="Lv.18"
                health={328}
                maxHealth={480}
                statuses={[{ label: 'Exposed', tone: 'debuff', duration: '8s' }]}
              />
              <MiniMap label="Reward beacon" markers={mapMarkers} />
              <div className="hud-status-row">
                <ComboCounter count={18} />
                <CooldownSlot progress={cooldownProgress} label="Blink" icon="B" ready={cooldownProgress >= 1} />
              </div>
              <AbilityBar abilities={abilityItems} label="Snapshot ability bar" />
              <DialogueBox speaker="Mira" text="Cache unlocked. Confirm the drop first." tone="ally" />
              <NotificationStack notifications={notificationPreview} limit={2} />
            </div>
          </article>
        </div>
      </section>

      <section className="landing-section">
        <div className="section-heading">
          <span className="section-heading__eyebrow">Explore routes</span>
          <h2>Tokens and primitives stay one jump away from the lab entry.</h2>
        </div>
        <div className="gateway-grid">
          <button type="button" className="gateway-card" onClick={() => onNavigate('/tokens')}>
            <span className="gateway-card__eyebrow">Token overview</span>
            <strong>CSS variables foundation</strong>
            <p>Color, rarity, motion, glow, radius, and spacing with small consumption samples.</p>
          </button>
          <button type="button" className="gateway-card" onClick={() => onNavigate('/primitives')}>
            <span className="gateway-card__eyebrow">Primitives overview</span>
            <strong>Public API in motion</strong>
            <p>Combat feedback, HUD state, map exploration, narrative flow, and loot feedback in compact live previews.</p>
          </button>
        </div>
      </section>

      <section className="landing-section landing-section--footer">
        <div className="route-note route-note--footer">
          <span className="route-note__eyebrow">Publishing note</span>
          <strong>Static GitHub Pages first, richer doc systems later.</strong>
          <p>Rspress, Storybook, API tables, and versioned docs stay deferred. This phase ships a public moving lab entry with clean route URLs and Pages-safe fallback.</p>
        </div>
      </section>
    </section>
  );
}
