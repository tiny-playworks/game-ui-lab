export const lootItems = [
  {
    id: 'shard-1',
    name: '星辉碎片',
    rarity: 'epic',
    quantity: 3,
    value: '240',
    subtitle: '制作材料',
  },
  {
    id: 'core-2',
    name: '共鸣核心',
    rarity: 'legendary',
    quantity: 1,
    value: '999',
    subtitle: '高稀有度',
  },
  {
    id: 'dust-3',
    name: '余烬粉尘',
    rarity: 'common',
    quantity: 12,
    value: '30',
    subtitle: '可分解',
  },
  {
    id: 'orb-4',
    name: '脉冲晶核',
    rarity: 'rare',
    quantity: 2,
    value: '128',
    subtitle: '能量道具',
  },
];

export const damageNumberSnippet = `import { DamageNumber, GameUiProvider } from '@tiny-playworks/game-ui';

export function DamageBurst() {
  return (
    <GameUiProvider>
      <DamageNumber value="128" variant="critical" prefix="暴击" />
      <DamageNumber value="42" variant="heal" prefix="治疗" />
      <DamageNumber value="MISS" variant="miss" />
    </GameUiProvider>
  );
}`;

export const healthBarSnippet = `import { HealthBar, GameUiProvider } from '@tiny-playworks/game-ui';

export function HealthPanel() {
  return (
    <GameUiProvider>
      <HealthBar value={97} max={120} shield={18} label="生命" showValue />
    </GameUiProvider>
  );
}`;

export const resourceMeterSnippet = `import { ResourceMeter, GameUiProvider } from '@tiny-playworks/game-ui';

export function ResourcePanel() {
  return (
    <GameUiProvider>
      <ResourceMeter value={67} max={90} kind="mana" label="法力" />
      <ResourceMeter value={44} max={100} kind="stamina" label="耐力" />
    </GameUiProvider>
  );
}`;

export const comboCounterSnippet = `import { ComboCounter, GameUiProvider } from '@tiny-playworks/game-ui';

export function ComboPanel() {
  return (
    <GameUiProvider>
      <ComboCounter count={12} label="连击" tier="稳定连击" />
    </GameUiProvider>
  );
}`;

export const cooldownSlotSnippet = `import { CooldownSlot, GameUiProvider } from '@tiny-playworks/game-ui';

export function SkillSlot() {
  return (
    <GameUiProvider>
      <CooldownSlot progress={0.62} label="爆发" icon="Q" />
    </GameUiProvider>
  );
}`;

export const statusBadgeSnippet = `import { StatusBadge, GameUiProvider } from '@tiny-playworks/game-ui';

export function StatusPanel() {
  return (
    <GameUiProvider>
      <StatusBadge label="急速" tone="buff" count={3} duration="12秒" />
    </GameUiProvider>
  );
}`;

export const floatingToastSnippet = `import { FloatingToast, GameUiProvider } from '@tiny-playworks/game-ui';

export function ToastPanel() {
  return (
    <GameUiProvider>
      <FloatingToast title="命中已触发" message="基础反馈已经开始播放。" variant="info" />
    </GameUiProvider>
  );
}`;

export const rarityBorderSnippet = `import { RarityBorder, GameUiProvider } from '@tiny-playworks/game-ui';

export function BorderPanel() {
  return (
    <GameUiProvider>
      <RarityBorder tone="legendary">
        <div className="docs-demo-rarity">
          <strong>传奇掉落</strong>
          <span>适合把结果收得更有层次。</span>
        </div>
      </RarityBorder>
    </GameUiProvider>
  );
}`;

export const lootCardSnippet = `import { LootCard, GameUiProvider } from '@tiny-playworks/game-ui';

export function LootCardPanel() {
  return (
    <GameUiProvider>
      <LootCard
        name="星辉碎片"
        rarity="epic"
        quantity={3}
        value="240"
        subtitle="制作材料"
      />
    </GameUiProvider>
  );
}`;

export const lootStackSnippet = `import { LootStack, GameUiProvider } from '@tiny-playworks/game-ui';

const items = [
  { id: 'shard-1', name: '星辉碎片', rarity: 'epic', quantity: 3, value: '240', subtitle: '制作材料' },
  { id: 'core-2', name: '共鸣核心', rarity: 'legendary', quantity: 1, value: '999', subtitle: '高稀有度' },
  { id: 'dust-3', name: '余烬粉尘', rarity: 'common', quantity: 12, value: '30', subtitle: '可分解' },
];

export function LootStackPanel() {
  return (
    <GameUiProvider>
      <LootStack items={items} label="掉落栈" limit={3} />
    </GameUiProvider>
  );
}`;

export const rewardRevealSnippet = `import { RewardReveal, GameUiProvider } from '@tiny-playworks/game-ui';

const items = [
  { id: 'shard-1', name: '星辉碎片', rarity: 'epic', quantity: 3, value: '240', subtitle: '制作材料' },
  { id: 'core-2', name: '共鸣核心', rarity: 'legendary', quantity: 1, value: '999', subtitle: '高稀有度' },
  { id: 'dust-3', name: '余烬粉尘', rarity: 'common', quantity: 12, value: '30', subtitle: '可分解' },
];

export function RewardPanel() {
  return (
    <GameUiProvider>
      <RewardReveal title="战斗结算" items={items} state="revealed" actionLabel="领取" />
    </GameUiProvider>
  );
}`;
