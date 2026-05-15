import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ComboCounter,
  DamageNumber,
  FloatingToast,
  RarityBorder,
  type DamageNumberVariant,
  type FloatingToastVariant,
  type RarityBorderTone,
} from '@tiny-playworks/game-ui';
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
}

const frames: SandboxFrame[] = [
  {
    hit: { value: '128', variant: 'damage', x: 34, y: 56 },
    toast: { title: 'Strike landed', message: 'Basic feedback loop fired', variant: 'info' },
    comboDelta: 1,
    rarity: 'common',
    phase: 'Opening hits',
  },
  {
    hit: { value: '312', variant: 'critical', x: 58, y: 35 },
    toast: { title: 'Critical chain', message: 'Combo window extended', variant: 'warning' },
    comboDelta: 3,
    rarity: 'rare',
    phase: 'Clean combo',
  },
  {
    hit: { value: '+42', variant: 'heal', x: 44, y: 42 },
    toast: { title: 'Shield online', message: 'Barrier restored for the next wave', variant: 'success' },
    comboDelta: 1,
    rarity: 'epic',
    phase: 'Fever streak',
  },
  {
    hit: { value: 'MISS', variant: 'miss', x: 66, y: 52 },
    toast: { title: 'Loot found', message: 'Legendary cache border activated', variant: 'loot' },
    comboDelta: -4,
    rarity: 'legendary',
    phase: 'Loot pulse',
  },
];

export function FeedbackRoute({ onNavigate }: FeedbackRouteProps) {
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
  const waveLabel = useMemo(
    () => (combo >= 18 ? 'Fever streak' : combo >= 8 ? 'Clean combo' : 'Opening hits'),
    [combo],
  );

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
    <section className="route-grid route-grid--feedback">
      <div className="route-grid__lead">
        <PageIntro
          eyebrow="Feedback"
          title="Game UI Feedback Lab"
          description="A looping sandbox for combat numbers, loot pulses, combo states, and rarity borders. Dark stage, bright feedback."
        >
          <span className="meta-pill">A1 readability baseline</span>
          <span className="meta-pill">Live combat sandbox</span>
        </PageIntro>

        <div className="route-note-grid">
          <article className="route-note">
            <span className="route-note__eyebrow">Current loop</span>
            <strong>{frame.phase}</strong>
            <p>Glow stays restrained in the shell. The feedback primitives keep the brightness peak.</p>
          </article>
          <article className="route-note">
            <span className="route-note__eyebrow">Next jumps</span>
            <strong>Tokens and primitives are now first-class assets.</strong>
            <div className="route-note__actions">
              <button type="button" onClick={() => onNavigate('/tokens')}>Open tokens</button>
              <button type="button" onClick={() => onNavigate('/primitives')}>Open primitives</button>
            </div>
          </article>
        </div>
      </div>

      <div className="route-grid__stage">
        <RarityBorder tone={frame.rarity} className="sandbox-frame">
          <div className="combat-panel">
            <div className="arena-grid" aria-hidden="true" />
            <div className="boss-core">
              <motion.div
                className="boss-orbit"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="boss-eye"
                animate={{ scale: frame.rarity === 'legendary' ? [1, 1.08, 1] : [1, 1.03, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
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

            <div className="rarity-chip" data-tone={frame.rarity}>
              {frame.rarity}
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

        <div className="toast-stack">
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
        </div>
      </div>
    </section>
  );
}
