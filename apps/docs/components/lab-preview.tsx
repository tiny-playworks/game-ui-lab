import { useEffect, useMemo, useState } from 'react';
import {
  AbilityBar,
  CastBar,
  ComboCounter,
  DamageNumber,
  DialogueBox,
  GameUiProvider,
  HealthBar,
  LocationTag,
  MiniMap,
  NotificationStack,
  RarityBorder,
  ResourceMeter,
  StatusBadge,
  TargetFrame,
} from '@tiny-playworks/game-ui';
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
  cast: number;
  mapLabelZh: string;
  mapLabelEn: string;
  dialogueZh: string;
  dialogueEn: string;
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
    cast: 0.32,
    mapLabelZh: '东侧入口',
    mapLabelEn: 'East gate',
    dialogueZh: '先稳住节奏，等技能转好。',
    dialogueEn: 'Hold the tempo until the ability is ready.',
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
    cast: 0.68,
    mapLabelZh: '巡逻路线',
    mapLabelEn: 'Patrol route',
    dialogueZh: '巡逻队靠近了，保持距离。',
    dialogueEn: 'Patrol is closing in. Keep distance.',
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
    cast: 1,
    mapLabelZh: '奖励信标',
    mapLabelEn: 'Reward beacon',
    dialogueZh: '缓存已解锁，先确认掉落。',
    dialogueEn: 'Cache unlocked. Confirm the drop first.',
  },
];

const abilityItems = [
  { id: 'blink', label: '闪现', icon: 'B', ready: true, cost: '20' },
  { id: 'burst', label: '爆发', icon: 'Q', progress: 0.58, cost: '35' },
  { id: 'nova', label: '新星', icon: 'R', progress: 0.12, locked: true },
];

const mapMarkers = [
  { id: 'ally', x: 22, y: 40, tone: 'ally' as const, label: '友军' },
  { id: 'enemy', x: 72, y: 52, tone: 'enemy' as const, label: '巡逻' },
  { id: 'objective', x: 48, y: 28, tone: 'objective' as const, label: '信标', active: true },
];

const notifications = [
  { id: 'loot', title: '发现掉落', message: '星辉碎片已加入背包。', variant: 'loot' as const },
  { id: 'warn', title: '敌人接近', message: '巡逻队正在靠近。', variant: 'warning' as const },
  { id: 'ready', title: '技能就绪', message: '闪现可以使用。', variant: 'success' as const },
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
          ? '奖励、HUD、地图和叙事反馈可以在同一个场景里检查。'
          : '用于检查战斗、探索、叙事组件组合后的间距、层级和节奏。'
        : frame.rarity === 'legendary'
          ? 'Inspect rewards, HUD, map, and narrative feedback in one scene.'
          : 'Check spacing, hierarchy, and rhythm across combat, map, and narrative components.',
    [frame.rarity, isZh],
  );

  return (
    <section className="lab-preview">
      <div className="lab-preview__copy">
        <p className="docs-eyebrow">{isZh ? 'Playground / 实验台' : 'Playground / 实验台'}</p>
        <h2>{isZh ? '多场景组件组合预览' : 'Multi-surface composition preview'}</h2>
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
              <div className="lab-preview__hud-item lab-preview__hud-item--wide">
                <span className="lab-preview__hud-label">{isZh ? '目标' : 'Target'}</span>
                <TargetFrame
                  name={isZh ? '遗迹守卫' : 'Warden'}
                  faction={frame.rarity === 'legendary' ? 'boss' : 'enemy'}
                  level="Lv.18"
                  health={frame.health * 4}
                  maxHealth={480}
                  statuses={[{ label: isZh ? '灼烧' : 'Burn', tone: 'debuff', duration: isZh ? '8秒' : '8s' }]}
                />
              </div>
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
                <AbilityBar abilities={abilityItems} label={isZh ? '技能栏' : 'Ability bar'} />
              </div>
              <div className="lab-preview__hud-item">
                <span className="lab-preview__hud-label">{isZh ? '施法' : 'Cast'}</span>
                <CastBar label={isZh ? '奥术光束' : 'Arc Beam'} progress={frame.cast} state={frame.cast >= 1 ? 'complete' : 'channeling'} />
              </div>
              <div className="lab-preview__hud-item">
                <span className="lab-preview__hud-label">{isZh ? '状态' : 'Status'}</span>
                <StatusBadge label={isZh ? '急速' : 'Haste'} tone="buff" count={3} duration={isZh ? '12秒' : '12s'} />
              </div>
              <div className="lab-preview__hud-item">
                <span className="lab-preview__hud-label">{isZh ? '地图' : 'Map'}</span>
                <MiniMap label={isZh ? frame.mapLabelZh : frame.mapLabelEn} markers={mapMarkers} />
                <LocationTag
                  name={isZh ? frame.mapLabelZh : frame.mapLabelEn}
                  zone={isZh ? '北区' : 'North'}
                  danger={frame.rarity === 'common' ? 'safe' : frame.rarity === 'legendary' ? 'contested' : 'hostile'}
                  status={isZh ? '路线已更新' : 'Route updated'}
                />
              </div>
              <div className="lab-preview__hud-item lab-preview__hud-item--wide">
                <span className="lab-preview__hud-label">{isZh ? '叙事' : 'Narrative'}</span>
                <DialogueBox speaker="Mira" text={isZh ? frame.dialogueZh : frame.dialogueEn} tone={frame.rarity === 'rare' ? 'warning' : 'ally'} />
              </div>
              <div className="lab-preview__hud-item lab-preview__hud-item--toast">
                <span className="lab-preview__hud-label">{isZh ? '反馈' : 'Toast'}</span>
                <NotificationStack notifications={notifications} limit={2} />
              </div>
            </div>
          </div>
        </RarityBorder>
      </GameUiProvider>
    </section>
  );
}
