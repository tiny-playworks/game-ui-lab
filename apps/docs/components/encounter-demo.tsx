import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AbilityBar,
  GameUiLayerHost,
  GameUiProvider,
  GameUiRuntimeProvider,
  LootStack,
  useGameUiRuntime,
} from '@tiny-playworks/game-ui';
import { useDocsLocale } from './locale';

const maxHealth = 420;
const rewardItems = [
  { id: 'core', name: '共鸣核心', rarity: 'legendary' as const, quantity: 1, value: '999', subtitle: 'Boss drop' },
  { id: 'shard', name: '星辉碎片', rarity: 'epic' as const, quantity: 3, value: '240', subtitle: 'Crafting' },
  { id: 'dust', name: '余烬粉尘', rarity: 'common' as const, quantity: 12, value: '30', subtitle: 'Material' },
];

const initialParty = [
  { id: 'pilot', name: 'Pilot', health: 320, maxHealth: 320, shield: 24, status: { id: 'haste', label: 'Haste', tone: 'buff' as const, duration: '6s' } },
  { id: 'support', name: 'Support', health: 280, maxHealth: 300 },
  { id: 'scout', name: 'Scout', health: 0, maxHealth: 260, offline: true },
];

const mapMarkers = [
  { id: 'ally', x: 22, y: 42, tone: 'ally' as const, label: 'Ally' },
  { id: 'enemy', x: 68, y: 55, tone: 'enemy' as const, label: 'Warden' },
  { id: 'beacon', x: 48, y: 28, tone: 'objective' as const, label: 'Beacon', active: true },
];

export function EncounterDemo() {
  return (
    <GameUiProvider theme="arcade">
      <GameUiRuntimeProvider toastLimit={3} damageLimit={8}>
        <EncounterRuntimeScene />
      </GameUiRuntimeProvider>
    </GameUiProvider>
  );
}

function EncounterRuntimeScene() {
  const runtime = useGameUiRuntime();
  const { locale } = useDocsLocale();
  const isZh = locale === 'zh';
  const [selectedAbility, setSelectedAbility] = useState('strike');
  const [burstProgress, setBurstProgress] = useState(1);
  const [selectedLoot, setSelectedLoot] = useState('core');

  const seedEncounter = useCallback(() => {
    runtime.dispatch({
      type: 'target-health:update',
      payload: { name: isZh ? '遗迹守卫' : 'Warden', health: maxHealth, maxHealth },
    });
    runtime.upsertBuff({ id: 'armor-break', label: isZh ? '破甲' : 'Armor break', tone: 'debuff', duration: isZh ? '8秒' : '8s' });
    runtime.setCombo(0, isZh ? '连击' : 'Combo');
    runtime.setParty({ members: initialParty, selectedId: 'pilot' });
    runtime.trackQuest({
      title: isZh ? '信标追踪' : 'Signal hunt',
      subtitle: isZh ? '遭遇战' : 'Encounter',
      objectives: [
        { id: 'hit', label: isZh ? '造成伤害' : 'Deal damage', state: 'active' },
        { id: 'defeat', label: isZh ? '击败守卫' : 'Defeat warden', state: 'locked' },
      ],
    });
    runtime.setMapMarkers({
      label: isZh ? '遗迹区' : 'Ruin sector',
      markers: mapMarkers,
      selectedId: 'enemy',
    });
    runtime.enqueueDialogue({
      speaker: isZh ? '领航员' : 'Pilot',
      text: isZh ? '目标已标记，保持连击。' : 'Target marked. Keep the combo alive.',
      tone: 'ally',
    });
  }, [isZh, runtime]);

  useEffect(() => {
    seedEncounter();
  }, [seedEncounter]);

  useEffect(() => {
    if (burstProgress >= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setBurstProgress((current) => {
        const next = Math.min(1, current + 0.08);

        if (next >= 1 && current < 1) {
          runtime.notify({
            title: isZh ? '技能就绪' : 'Ability ready',
            message: isZh ? '脉冲爆发可以再次释放。' : 'Pulse Burst can be used again.',
            variant: 'success',
          });
        }

        return next;
      });
    }, 180);

    return () => window.clearInterval(timer);
  }, [burstProgress, isZh, runtime]);

  useEffect(() => {
    runtime.dispatch({
      type: 'cooldown:update',
      payload: {
        id: 'strike',
        label: isZh ? '攻击' : 'Attack',
        progress: 1,
        ready: true,
      },
    });
    runtime.dispatch({
      type: 'cooldown:update',
      payload: {
        id: 'burst',
        label: isZh ? '爆发' : 'Burst',
        progress: burstProgress,
        ready: burstProgress >= 1,
        disabled: burstProgress < 1,
      },
    });
  }, [burstProgress, isZh, runtime]);

  const abilities = useMemo(
    () => [
      { id: 'strike', label: isZh ? '攻击' : 'Attack', icon: 'A', ready: true, shortcut: '1' },
      {
        id: 'burst',
        label: isZh ? '爆发' : 'Burst',
        icon: 'Q',
        progress: burstProgress,
        ready: burstProgress >= 1,
        shortcut: '2',
        cooldownLabel: burstProgress >= 1 ? (isZh ? '就绪' : 'Ready') : `${Math.round(burstProgress * 100)}%`,
      },
    ],
    [burstProgress, isZh],
  );

  function emitHit(nextDamage: number, variant: 'damage' | 'critical') {
    const target = runtime.getState().layers.hud.target;
    const currentHealth = target?.health ?? maxHealth;
    const nextHealth = Math.max(0, currentHealth - nextDamage);

    runtime.emitDamage({
      value: nextDamage,
      variant,
      prefix: variant === 'critical' ? (isZh ? '暴击' : 'CRIT') : undefined,
      anchor: { x: 58, y: 38 },
    });
    runtime.incrementCombo(1, isZh ? '连击' : 'Combo');
    runtime.dispatch({
      type: 'target-health:update',
      payload: {
        name: target?.name ?? (isZh ? '遗迹守卫' : 'Warden'),
        health: nextHealth,
        maxHealth: target?.maxHealth ?? maxHealth,
      },
    });
    runtime.dispatch({
      type: 'quest:objective:update',
      payload: { id: 'hit', patch: { state: 'complete', progress: 1, max: 1 } },
    });

    if (nextHealth === 0 && currentHealth > 0) {
      runtime.dispatch({
        type: 'quest:objective:update',
        payload: { id: 'defeat', patch: { state: 'complete' } },
      });
      runtime.notify({
        title: isZh ? '目标击败' : 'Target defeated',
        message: isZh ? '奖励与叙事事件已入队。' : 'Reward and narrative events queued.',
        variant: 'loot',
      });
      runtime.enqueueDialogue({
        speaker: isZh ? '遗迹守卫' : 'Warden',
        text: isZh ? '核心……留给你们了。' : 'The core… is yours.',
        tone: 'warning',
      });
      runtime.dispatch({
        type: 'reward-reveal:show',
        payload: {
          id: 'warden-cache',
          title: isZh ? '遗迹守卫掉落' : 'Warden cache',
          items: rewardItems,
          state: 'sealed',
        },
      });
    }
  }

  function handleAbility(id: string) {
    setSelectedAbility(id);

    if (id === 'strike') {
      emitHit(42, 'damage');
      return;
    }

    if (burstProgress < 1) {
      runtime.notify({
        title: isZh ? '冷却中' : 'Cooling down',
        message: isZh ? '脉冲爆发还没有准备好。' : 'Pulse Burst is not ready yet.',
        variant: 'warning',
      });
      return;
    }

    setBurstProgress(0);
    emitHit(96, 'critical');
  }

  function resetEncounter() {
    setBurstProgress(1);
    runtime.clearLayer('feedback');
    runtime.clearLayer('notification');
    runtime.clearLayer('modal');
    runtime.clearLayer('narrative');
    runtime.clearLayer('hud');
    seedEncounter();
  }

  function openShop() {
    runtime.dispatch({
      type: 'shop:open',
      payload: {
        id: 'ruin-vendor',
        title: isZh ? '遗迹商人' : 'Ruin vendor',
        items: [
          { id: 'potion', name: isZh ? '修复药剂' : 'Repair potion', rarity: 'common', price: 50, value: '50' },
          { id: 'core', name: isZh ? '共鸣核心' : 'Resonance core', rarity: 'legendary', price: 999, value: '999' },
        ],
        currencies: [
          { id: 'gold', label: isZh ? '金币' : 'Gold', amount: 420, tone: 'gold' },
          { id: 'gem', label: isZh ? '宝石' : 'Gems', amount: 12, tone: 'gem' },
        ],
      },
    });
  }

  function openQuestLog() {
    runtime.openQuestLog({
      title: isZh ? '任务日志' : 'Quest log',
      activeId: 'signal',
      quests: [
        {
          id: 'signal',
          title: isZh ? '信标追踪' : 'Signal hunt',
          subtitle: isZh ? '遭遇战' : 'Encounter',
          objectives: runtime.getState().layers.hud.quest?.objectives ?? [],
        },
      ],
    });
  }

  function showBranchChoices() {
    runtime.showChoices({
      title: isZh ? '选择路线' : 'Choose route',
      options: [
        { id: 'left', label: isZh ? '左侧通道' : 'Left path', description: isZh ? '安全' : 'Safe' },
        { id: 'right', label: isZh ? '强行突破' : 'Force breach', description: isZh ? '危险' : 'Risky' },
      ],
    });
  }

  return (
    <section className="encounter-demo">
      <GameUiLayerHost />
      <div className="encounter-demo__scene">
        <div className="encounter-demo__hud">
          <AbilityBar
            abilities={abilities}
            selectedId={selectedAbility}
            onAbilityClick={(id) => handleAbility(id)}
            label={isZh ? '技能栏' : 'Ability bar'}
          />
        </div>
        <div className="encounter-demo__loot">
          <LootStack
            items={rewardItems}
            selectedId={selectedLoot}
            onItemSelect={(id) => setSelectedLoot(id)}
            label={isZh ? '掉落预览' : 'Loot preview'}
            limit={3}
          />
        </div>
      </div>
      <div className="encounter-demo__controls">
        <button type="button" onClick={() => handleAbility('strike')}>{isZh ? '攻击' : 'Attack'}</button>
        <button type="button" onClick={() => handleAbility('burst')}>{isZh ? '爆发' : 'Burst'}</button>
        <button type="button" onClick={openShop}>{isZh ? '商店' : 'Shop'}</button>
        <button type="button" onClick={openQuestLog}>{isZh ? '任务日志' : 'Quest log'}</button>
        <button type="button" onClick={showBranchChoices}>{isZh ? '分支选项' : 'Choices'}</button>
        <button type="button" onClick={() => runtime.advanceDialogue()}>{isZh ? '下一句' : 'Next line'}</button>
        <button type="button" onClick={resetEncounter}>{isZh ? '重置' : 'Reset'}</button>
      </div>
      <p className="encounter-demo__note">
        {isZh
          ? 'HUD、叙事、商店、任务日志与反馈均通过 runtime 驱动；LayerHost 渲染各层。'
          : 'HUD, narrative, shop, quest log, and feedback are runtime-driven and rendered by LayerHost.'}
      </p>
    </section>
  );
}
