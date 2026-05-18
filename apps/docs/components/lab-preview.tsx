import { useEffect, useMemo, useState } from 'react';
import {
  ComboCounter,
  CooldownSlot,
  DamageNumber,
  FloatingToast,
  GameUiProvider,
  HealthBar,
  RarityBorder,
  ResourceMeter,
  StatusBadge,
} from '@tiny-playworks/game-ui';
import './docs.css';

interface Frame {
  title: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  damage: string;
  toastTitle: string;
  toastMessage: string;
  toastVariant: 'info' | 'success' | 'warning' | 'loot';
  combo: number;
  health: number;
  shield: number;
  mana: number;
  cooldown: number;
}

const frames: Frame[] = [
  {
    title: 'Opening hits',
    rarity: 'common',
    damage: '128',
    toastTitle: 'Strike landed',
    toastMessage: '基础反馈已经开始播放。',
    toastVariant: 'info',
    combo: 7,
    health: 97,
    shield: 0,
    mana: 67,
    cooldown: 0.34,
  },
  {
    title: 'Clean combo',
    rarity: 'rare',
    damage: '312',
    toastTitle: 'Critical chain',
    toastMessage: '连击窗口被拉长了。',
    toastVariant: 'warning',
    combo: 10,
    health: 88,
    shield: 18,
    mana: 58,
    cooldown: 0.52,
  },
  {
    title: 'Loot pulse',
    rarity: 'legendary',
    damage: 'MISS',
    toastTitle: 'Loot found',
    toastMessage: '传奇掉落边框已激活。',
    toastVariant: 'loot',
    combo: 3,
    health: 74,
    shield: 34,
    mana: 42,
    cooldown: 1,
  },
];

export function LabPreview() {
  const [frameIndex, setFrameIndex] = useState(0);
  const frame = frames[frameIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % frames.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  const subtitle = useMemo(
    () =>
      frame.rarity === 'legendary'
        ? '英文不是重点，重点是你能不能马上看懂怎么用。'
        : '这个面板就是给人先看懂，再去抄用法。',
    [frame.rarity],
  );

  return (
    <section className="lab-preview">
      <div className="lab-preview__copy">
        <p className="docs-eyebrow">Live Lab / 实时实验台</p>
        <h2>直接看效果，不是先读一堆英文。</h2>
        <p>{subtitle}</p>
        <div className="lab-preview__actions">
          <button type="button" onClick={() => setFrameIndex((current) => (current + 1) % frames.length)}>
            下一个场景
          </button>
          <span>自动轮播 + 手动切换</span>
        </div>
      </div>

      <GameUiProvider>
        <RarityBorder tone={frame.rarity} className="lab-preview__stage">
          <div className="lab-preview__stage-inner">
            <div className="lab-preview__numbers">
              <DamageNumber value={frame.damage} variant={frame.rarity === 'legendary' ? 'critical' : 'damage'} prefix={frame.rarity === 'legendary' ? 'LEG' : 'CRIT'} />
            </div>
            <div className="lab-preview__hud">
              <HealthBar value={frame.health} max={120} shield={frame.shield} label="Pilot HP" showValue />
              <ResourceMeter value={frame.mana} max={90} kind="mana" label="Arcane" />
              <ComboCounter count={frame.combo} />
              <CooldownSlot progress={frame.cooldown} label="Burst" icon="Q" />
              <StatusBadge label="Haste" tone="buff" count={3} duration="12s" />
              <FloatingToast title={frame.toastTitle} message={frame.toastMessage} variant={frame.toastVariant} />
            </div>
          </div>
        </RarityBorder>
      </GameUiProvider>
    </section>
  );
}
