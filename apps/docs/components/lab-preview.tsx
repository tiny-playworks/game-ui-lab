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
} from '../../../packages/primitives/src';
import { useDocsLocale } from './locale';
import './docs.css';

interface Frame {
  titleZh: string;
  titleEn: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  damage: string;
  toastTitleZh: string;
  toastTitleEn: string;
  toastMessageZh: string;
  toastMessageEn: string;
  toastVariant: 'info' | 'success' | 'warning' | 'loot';
  combo: number;
  health: number;
  shield: number;
  mana: number;
  cooldown: number;
}

const frames: Frame[] = [
  {
    titleZh: '开场命中',
    titleEn: 'Opening hits',
    rarity: 'common',
    damage: '128',
    toastTitleZh: '命中已触发',
    toastTitleEn: 'Strike landed',
    toastMessageZh: '基础反馈已经开始播放。',
    toastMessageEn: 'The base feedback is now playing.',
    toastVariant: 'info',
    combo: 7,
    health: 97,
    shield: 0,
    mana: 67,
    cooldown: 0.34,
  },
  {
    titleZh: '稳定连击',
    titleEn: 'Clean combo',
    rarity: 'rare',
    damage: '312',
    toastTitleZh: '暴击连锁',
    toastTitleEn: 'Critical chain',
    toastMessageZh: '连击窗口被拉长了。',
    toastMessageEn: 'The combo window got longer.',
    toastVariant: 'warning',
    combo: 10,
    health: 88,
    shield: 18,
    mana: 58,
    cooldown: 0.52,
  },
  {
    titleZh: '传奇掉落',
    titleEn: 'Loot pulse',
    rarity: 'legendary',
    damage: 'MISS',
    toastTitleZh: '发现掉落',
    toastTitleEn: 'Loot found',
    toastMessageZh: '传奇掉落边框已激活。',
    toastMessageEn: 'The legendary loot border is active.',
    toastVariant: 'loot',
    combo: 3,
    health: 74,
    shield: 34,
    mana: 42,
    cooldown: 1,
  },
];

export function LabPreview() {
  const { locale } = useDocsLocale();
  const [frameIndex, setFrameIndex] = useState(0);
  const frame = frames[frameIndex];
  const isZh = locale === 'zh';

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % frames.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  const subtitle = useMemo(
    () =>
      isZh
        ? frame.rarity === 'legendary'
          ? '奖励、HUD、反馈可以在同一个场景里检查。'
          : '用于检查多个组件组合后的间距、层级和节奏。'
        : frame.rarity === 'legendary'
          ? 'Inspect rewards, HUD, and feedback in one scene.'
          : 'Check spacing, hierarchy, and rhythm across multiple components.',
    [frame.rarity, isZh],
  );

  return (
    <section className="lab-preview">
      <div className="lab-preview__copy">
        <p className="docs-eyebrow">{isZh ? 'Playground / 实验台' : 'Playground / 实验台'}</p>
        <h2>{isZh ? 'HUD 组合预览' : 'HUD composition preview'}</h2>
        <p>{subtitle}</p>
        <div className="lab-preview__actions">
          <button type="button" onClick={() => setFrameIndex((current) => (current + 1) % frames.length)}>
            {isZh ? '下一个场景' : 'Next scene'}
          </button>
          <span>{isZh ? '自动轮播 + 手动切换' : 'Auto-rotates + manual switch'}</span>
        </div>
      </div>

      <GameUiProvider>
        <RarityBorder tone={frame.rarity} className="lab-preview__stage">
          <div className="lab-preview__stage-inner">
            <div className="lab-preview__numbers">
              <p className="lab-preview__stage-kicker">{isZh ? frame.titleZh : frame.titleEn}</p>
              <DamageNumber
                value={frame.damage}
                variant={frame.rarity === 'legendary' ? 'critical' : 'damage'}
                prefix={isZh ? (frame.rarity === 'legendary' ? '传说' : '暴击') : frame.rarity === 'legendary' ? 'LEG' : 'CRIT'}
              />
            </div>
            <div className="lab-preview__hud">
              <div className="lab-preview__hud-item">
                <span className="lab-preview__hud-label">{isZh ? '生命' : 'HP'}</span>
                <HealthBar value={frame.health} max={120} shield={frame.shield} label={isZh ? '生命' : 'HP'} showValue />
              </div>
              <div className="lab-preview__hud-item">
                <span className="lab-preview__hud-label">{isZh ? '法力' : 'Mana'}</span>
                <ResourceMeter value={frame.mana} max={90} kind="mana" label={isZh ? '法力' : 'Mana'} />
              </div>
              <div className="lab-preview__hud-item">
                <span className="lab-preview__hud-label">{isZh ? '连击' : 'Combo'}</span>
                <ComboCounter
                  count={frame.combo}
                  label={isZh ? '连击' : 'Combo'}
                  tier={
                    isZh
                      ? frame.combo >= 30
                        ? '爆发连击'
                        : frame.combo >= 15
                          ? '高热连击'
                          : frame.combo >= 6
                            ? '稳定连击'
                            : '开场命中'
                      : undefined
                  }
                />
              </div>
              <div className="lab-preview__hud-item">
                <span className="lab-preview__hud-label">{isZh ? '爆发' : 'Burst'}</span>
                <CooldownSlot progress={frame.cooldown} label={isZh ? '爆发' : 'Burst'} icon="Q" />
              </div>
              <div className="lab-preview__hud-item">
                <span className="lab-preview__hud-label">{isZh ? '状态' : 'Status'}</span>
                <StatusBadge label={isZh ? '急速' : 'Haste'} tone="buff" count={3} duration={isZh ? '12秒' : '12s'} />
              </div>
              <div className="lab-preview__hud-item lab-preview__hud-item--toast">
                <span className="lab-preview__hud-label">{isZh ? '反馈' : 'Toast'}</span>
                <FloatingToast
                  title={isZh ? frame.toastTitleZh : frame.toastTitleEn}
                  message={isZh ? frame.toastMessageZh : frame.toastMessageEn}
                  variant={frame.toastVariant}
                />
              </div>
            </div>
          </div>
        </RarityBorder>
      </GameUiProvider>
    </section>
  );
}
