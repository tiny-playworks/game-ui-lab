import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AbilityBar,
  GameUiLayerHost,
  GameUiProvider,
  GameUiRuntimeProvider,
  LootStack,
  PartyFrame,
  useGameUiRuntime,
} from '@tiny-playworks/game-ui';
import { useDocsLocale } from './locale';

const maxHealth = 420;
const rewardItems = [
  { id: 'core', name: '共鸣核心', rarity: 'legendary' as const, quantity: 1, value: '999', subtitle: 'Boss drop' },
  { id: 'shard', name: '星辉碎片', rarity: 'epic' as const, quantity: 3, value: '240', subtitle: 'Crafting' },
  { id: 'dust', name: '余烬粉尘', rarity: 'common' as const, quantity: 12, value: '30', subtitle: 'Material' },
];

const partyMembers = [
  { id: 'pilot', name: 'Pilot', health: 320, maxHealth: 320, shield: 24, status: { label: 'Haste', tone: 'buff' as const, duration: '6s' } },
  { id: 'support', name: 'Support', health: 280, maxHealth: 300, offline: false },
  { id: 'scout', name: 'Scout', health: 0, maxHealth: 260, offline: true },
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
  const [selectedPartyId, setSelectedPartyId] = useState('pilot');
  const hasMountedRef = useRef(false);

  useEffect(() => {
    runtime.dispatch({
      type: 'target-health:update',
      payload: { name: isZh ? '遗迹守卫' : 'Warden', health: maxHealth, maxHealth },
    });
    runtime.upsertBuff({ id: 'armor-break', label: isZh ? '破甲' : 'Armor break', tone: 'debuff', duration: isZh ? '8秒' : '8s' });
    runtime.setCombo(0, isZh ? '连击' : 'Combo');
  }, [isZh, runtime]);

  useEffect(() => {
    if (burstProgress >= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setBurstProgress((current) => Math.min(1, current + 0.08));
    }, 180);

    return () => window.clearInterval(timer);
  }, [burstProgress]);

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

  useEffect(() => {
    if (burstProgress === 1) {
      if (!hasMountedRef.current) {
        hasMountedRef.current = true;
        return;
      }

      runtime.notify({
        title: isZh ? '技能就绪' : 'Ability ready',
        message: isZh ? '脉冲爆发可以再次释放。' : 'Pulse Burst can be used again.',
        variant: 'success',
      });
    }
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

    if (nextHealth === 0 && currentHealth > 0) {
      runtime.notify({
        title: isZh ? '目标击败' : 'Target defeated',
        message: isZh ? '奖励揭示事件已进入 modal layer。' : 'Reward reveal moved into the modal layer.',
        variant: 'loot',
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
    hasMountedRef.current = false;
    runtime.clearLayer('feedback');
    runtime.clearLayer('notification');
    runtime.clearLayer('modal');
    runtime.clearLayer('hud');
    runtime.dispatch({
      type: 'target-health:update',
      payload: { name: isZh ? '遗迹守卫' : 'Warden', health: maxHealth, maxHealth },
    });
    runtime.upsertBuff({ id: 'armor-break', label: isZh ? '破甲' : 'Armor break', tone: 'debuff', duration: isZh ? '8秒' : '8s' });
    runtime.setCombo(0, isZh ? '连击' : 'Combo');
  }

  return (
    <section className="encounter-demo">
      <GameUiLayerHost />
      <div className="encounter-demo__scene">
        <div className="encounter-demo__party">
          <PartyFrame
            members={partyMembers}
            selectedId={selectedPartyId}
            onMemberSelect={(id) => setSelectedPartyId(id)}
            label={isZh ? '小队' : 'Party'}
          />
          <p className="encounter-demo__note">
            {isZh
              ? 'PartyFrame 为场景内受控组件，暂未接入 runtime。'
              : 'PartyFrame is controlled in-scene and is not wired to runtime yet.'}
          </p>
        </div>
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
        <button type="button" onClick={() => handleAbility('burst')}>{isZh ? '释放技能' : 'Use Ability'}</button>
        <button type="button" onClick={resetEncounter}>{isZh ? '重置战斗' : 'Reset'}</button>
      </div>
    </section>
  );
}
