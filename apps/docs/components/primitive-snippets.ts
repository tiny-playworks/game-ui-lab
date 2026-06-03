export const primitiveSnippets = {
  'ability-bar': {
    snippetZh: `import { AbilityBar, GameUiProvider } from '@tiny-playworks/game-ui';

const abilities = [
  { id: 'blink', label: '闪现', icon: 'B', ready: true, resourceCost: '20 MP', triggerKey: '1' },
  { id: 'burst', label: '爆发', icon: 'Q', active: true, progress: 0.58, resourceCost: '35 MP', cooldownText: '4.2秒', comboHint: '连击 +2', variant: 'ultimate' as const, triggerKey: '2' },
  { id: 'nova', label: '新星', icon: 'R', progress: 0.12, locked: true },
];

export function Demo() {
  return (
    <GameUiProvider>
      <AbilityBar abilities={abilities} selectedId="burst" onAbilityClick={(id) => console.log(id)} />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { AbilityBar, GameUiProvider } from '@tiny-playworks/game-ui';

const abilities = [
  { id: 'blink', label: 'Blink', icon: 'B', ready: true, resourceCost: '20 MP', triggerKey: '1' },
  { id: 'burst', label: 'Burst', icon: 'Q', active: true, progress: 0.58, resourceCost: '35 MP', cooldownText: '4.2s', comboHint: 'Chain +2', variant: 'ultimate' as const, triggerKey: '2' },
  { id: 'nova', label: 'Nova', icon: 'R', progress: 0.12, locked: true },
];

export function Demo() {
  return (
    <GameUiProvider>
      <AbilityBar abilities={abilities} selectedId="burst" onAbilityClick={(id) => console.log(id)} />
    </GameUiProvider>
  );
}`,
  },
  'ability-tooltip': {
    snippetZh: `import { AbilityTooltip, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <AbilityTooltip name="闪现" description="短距离位移，穿过危险区域。" cost="20 MP" cooldown="8秒" />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { AbilityTooltip, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <AbilityTooltip name="Blink" description="Short blink through danger zones." cost="20 MP" cooldown="8s" />
    </GameUiProvider>
  );
}`,
  },
  'cast-bar': {
    snippetZh: `import { CastBar, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <CastBar label="奥术光束" progress={0.72} state="channeling" />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { CastBar, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <CastBar label="Arc Beam" progress={0.72} state="channeling" />
    </GameUiProvider>
  );
}`,
  },
  'target-frame': {
    snippetZh: `import { TargetFrame, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <TargetFrame
        name="遗迹守卫"
        faction="boss"
        level="Lv.18"
        health={420}
        maxHealth={800}
        statuses={[{ label: '灼烧', tone: 'debuff' as const, duration: '8秒' }]}
      />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { TargetFrame, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <TargetFrame
        name="Warden"
        faction="boss"
        level="Lv.18"
        health={420}
        maxHealth={800}
        statuses={[{ label: 'Burn', tone: 'debuff' as const, duration: '8s' }]}
      />
    </GameUiProvider>
  );
}`,
  },
  'mini-map': {
    snippetZh: `import { MiniMap, GameUiProvider } from '@tiny-playworks/game-ui';

const markers = [
  { id: 'ally', x: 20, y: 38, tone: 'ally' as const, label: '友军' },
  { id: 'enemy', x: 72, y: 54, tone: 'enemy' as const, label: '巡逻' },
  { id: 'objective', x: 48, y: 28, tone: 'objective' as const, label: '信标', active: true },
];

export function Demo() {
  return (
    <GameUiProvider>
      <MiniMap
        label="区域地图"
        markers={markers}
        zones={[{ id: 'patrol', x: 58, y: 42, width: 24, height: 18, tone: 'danger', label: '巡逻区' }]}
        paths={[{ id: 'route', points: [{ x: 20, y: 38 }, { x: 48, y: 28 }], label: '安全路线' }]}
        scanRadius={36}
        playerHeading={90}
        zoomLabel="2x"
      />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { MiniMap, GameUiProvider } from '@tiny-playworks/game-ui';

const markers = [
  { id: 'ally', x: 20, y: 38, tone: 'ally' as const, label: 'Ally' },
  { id: 'enemy', x: 72, y: 54, tone: 'enemy' as const, label: 'Patrol' },
  { id: 'objective', x: 48, y: 28, tone: 'objective' as const, label: 'Beacon', active: true },
];

export function Demo() {
  return (
    <GameUiProvider>
      <MiniMap
        label="Sector map"
        markers={markers}
        zones={[{ id: 'patrol', x: 58, y: 42, width: 24, height: 18, tone: 'danger', label: 'Patrol zone' }]}
        paths={[{ id: 'route', points: [{ x: 20, y: 38 }, { x: 48, y: 28 }], label: 'Safe route' }]}
        scanRadius={36}
        playerHeading={90}
        zoomLabel="2x"
      />
    </GameUiProvider>
  );
}`,
  },
  'map-marker': {
    snippetZh: `import { MapMarker, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <div style={{ position: 'relative', width: 220, height: 120 }}>
        <MapMarker x={48} y={28} tone="objective" label="信标" active />
      </div>
    </GameUiProvider>
  );
}`,
    snippetEn: `import { MapMarker, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <div style={{ position: 'relative', width: 220, height: 120 }}>
        <MapMarker x={48} y={28} tone="objective" label="Beacon" active />
      </div>
    </GameUiProvider>
  );
}`,
  },
  'compass-bar': {
    snippetZh: `import { CompassBar, GameUiProvider } from '@tiny-playworks/game-ui';

const markers = [
  { id: 'gate', label: '门', heading: 80, tone: 'objective' as const },
  { id: 'patrol', label: '敌', heading: 220, tone: 'enemy' as const },
];

export function Demo() {
  return (
    <GameUiProvider>
      <CompassBar heading={90} markers={markers} />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { CompassBar, GameUiProvider } from '@tiny-playworks/game-ui';

const markers = [
  { id: 'gate', label: 'Gate', heading: 80, tone: 'objective' as const },
  { id: 'patrol', label: 'Enemy', heading: 220, tone: 'enemy' as const },
];

export function Demo() {
  return (
    <GameUiProvider>
      <CompassBar heading={90} markers={markers} />
    </GameUiProvider>
  );
}`,
  },
  'location-tag': {
    snippetZh: `import { LocationTag, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <LocationTag name="灰烬门" zone="北区" danger="hostile" status="敌方巡逻" />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { LocationTag, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <LocationTag name="Ash Gate" zone="North" danger="hostile" status="Enemy patrol" />
    </GameUiProvider>
  );
}`,
  },
  'dialogue-box': {
    snippetZh: `import { DialogueBox, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <DialogueBox speaker="Mira" source="通讯" text="守住这道门，信标马上就会点亮。" tone="ally" typing />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { DialogueBox, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <DialogueBox speaker="Mira" source="Radio" text="Hold this gate—the beacon lights in a moment." tone="ally" typing />
    </GameUiProvider>
  );
}`,
  },
  'choice-prompt': {
    snippetZh: `import { ChoicePrompt, GameUiProvider } from '@tiny-playworks/game-ui';

const choices = [
  { id: 'left', label: '走左侧通道', description: '安全但奖励少', cost: '1 把钥匙', resultPreview: '避开巡逻' },
  { id: 'right', label: '强行突破', description: '危险但更快', cost: '20 体力', resultPreview: '触发增援' },
];

export function Demo() {
  return (
    <GameUiProvider>
      <ChoicePrompt title="选择路线" choices={choices} />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { ChoicePrompt, GameUiProvider } from '@tiny-playworks/game-ui';

const choices = [
  { id: 'left', label: 'Take the left path', description: 'Safer, fewer rewards', cost: '1 key', resultPreview: 'Avoids patrol' },
  { id: 'right', label: 'Force the breach', description: 'Risky but faster', cost: '20 stamina', resultPreview: 'Calls reinforcements' },
];

export function Demo() {
  return (
    <GameUiProvider>
      <ChoicePrompt title="Choose a route" choices={choices} />
    </GameUiProvider>
  );
}`,
  },
  'quest-log': {
    snippetZh: `import { QuestLog, GameUiProvider } from '@tiny-playworks/game-ui';

const quests = [
  {
    id: 'signal',
    title: '信标追踪',
    subtitle: '每日路线',
    objectives: [
      { id: 'beacon', label: '定位信标', state: 'complete' as const, meta: '主线' },
      { id: 'shards', label: '收集星辉碎片', progress: 2, max: 5, meta: '支线' },
      { id: 'vault', label: '进入遗迹核心', state: 'locked' as const, meta: '未解锁' },
    ],
  },
];

export function Demo() {
  return (
    <GameUiProvider>
      <QuestLog activeId="signal" quests={quests} />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { QuestLog, GameUiProvider } from '@tiny-playworks/game-ui';

const quests = [
  {
    id: 'signal',
    title: 'Signal hunt',
    subtitle: 'Daily route',
    objectives: [
      { id: 'beacon', label: 'Locate beacon', state: 'complete' as const, meta: 'Main' },
      { id: 'shards', label: 'Collect shards', progress: 2, max: 5, meta: 'Side' },
      { id: 'vault', label: 'Enter vault core', state: 'locked' as const, meta: 'Locked' },
    ],
  },
];

export function Demo() {
  return (
    <GameUiProvider>
      <QuestLog activeId="signal" quests={quests} />
    </GameUiProvider>
  );
}`,
  },
  'notification-stack': {
    snippetZh: `import { NotificationStack, GameUiProvider } from '@tiny-playworks/game-ui';

const notifications = [
  { id: 'loot', title: '发现掉落', message: '星辉碎片已加入背包。', variant: 'loot' as const },
  { id: 'warn', title: '敌人接近', message: '巡逻队正在靠近。', variant: 'warning' as const },
  { id: 'ready', title: '技能就绪', message: '闪现可以使用。', variant: 'success' as const },
  { id: 'route', title: '路线更新', message: '新的信标位置已标记。', variant: 'info' as const },
];

export function Demo() {
  return (
    <GameUiProvider>
      <NotificationStack notifications={notifications} limit={3} />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { NotificationStack, GameUiProvider } from '@tiny-playworks/game-ui';

const notifications = [
  { id: 'loot', title: 'Loot found', message: 'Astral shard added to inventory.', variant: 'loot' as const },
  { id: 'warn', title: 'Enemy nearby', message: 'Patrol is closing in.', variant: 'warning' as const },
  { id: 'ready', title: 'Ability ready', message: 'Blink is available.', variant: 'success' as const },
  { id: 'route', title: 'Route updated', message: 'New beacon marked on the map.', variant: 'info' as const },
];

export function Demo() {
  return (
    <GameUiProvider>
      <NotificationStack notifications={notifications} limit={3} />
    </GameUiProvider>
  );
}`,
  },
  'damage-number': {
    snippetZh: `import { DamageNumber, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <DamageNumber motion="static" value="128" variant="critical" prefix="暴击" />
      <DamageNumber motion="static" value="42" variant="heal" prefix="治疗" />
      <DamageNumber motion="static" value="MISS" variant="miss" />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { DamageNumber, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <DamageNumber motion="static" value="128" variant="critical" prefix="CRIT" />
      <DamageNumber motion="static" value="42" variant="heal" prefix="HEAL" />
      <DamageNumber motion="static" value="MISS" variant="miss" />
    </GameUiProvider>
  );
}`,
  },
  'health-bar': {
    snippetZh: `import { HealthBar, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <HealthBar value={97} max={120} shield={18} label="生命" showValue />
      <HealthBar value={420} max={800} tone="boss" label="Boss" showValue />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { HealthBar, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <HealthBar value={97} max={120} shield={18} label="Health" showValue />
      <HealthBar value={420} max={800} tone="boss" label="Boss" showValue />
    </GameUiProvider>
  );
}`,
  },
  'resource-meter': {
    snippetZh: `import { ResourceMeter, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <ResourceMeter value={67} max={90} kind="mana" label="法力" />
      <ResourceMeter value={44} max={100} kind="stamina" label="耐力" />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { ResourceMeter, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <ResourceMeter value={67} max={90} kind="mana" label="Mana" />
      <ResourceMeter value={44} max={100} kind="stamina" label="Stamina" />
    </GameUiProvider>
  );
}`,
  },
  'combo-counter': {
    snippetZh: `import { ComboCounter, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <ComboCounter count={12} label="连击" tier="稳定连击" />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { ComboCounter, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <ComboCounter count={12} label="Combo" tier="Steady chain" />
    </GameUiProvider>
  );
}`,
  },
  'cooldown-slot': {
    snippetZh: `import { CooldownSlot, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <CooldownSlot progress={0.62} label="爆发" icon="Q" />
      <CooldownSlot progress={1} label="闪避" icon="E" />
      <CooldownSlot progress={0.2} label="禁用" icon="R" disabled />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { CooldownSlot, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <CooldownSlot progress={0.62} label="Burst" icon="Q" />
      <CooldownSlot progress={1} label="Dodge" icon="E" />
      <CooldownSlot progress={0.2} label="Locked" icon="R" disabled />
    </GameUiProvider>
  );
}`,
  },
  'status-badge': {
    snippetZh: `import { StatusBadge, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <StatusBadge label="急速" tone="buff" count={3} duration="12秒" />
      <StatusBadge label="灼烧" tone="debuff" duration="8秒" />
      <StatusBadge label="打断" tone="warning" />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { StatusBadge, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <StatusBadge label="Haste" tone="buff" count={3} duration="12s" />
      <StatusBadge label="Burn" tone="debuff" duration="8s" />
      <StatusBadge label="Interrupt" tone="warning" />
    </GameUiProvider>
  );
}`,
  },
  'objective-chip': {
    snippetZh: `import { ObjectiveChip, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <ObjectiveChip label="定位信标" state="complete" meta="主线" />
      <ObjectiveChip label="收集星辉碎片" progress={2} max={5} meta="支线" />
      <ObjectiveChip label="进入遗迹核心" state="locked" meta="未解锁" />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { ObjectiveChip, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <ObjectiveChip label="Locate beacon" state="complete" meta="Main" />
      <ObjectiveChip label="Collect shards" progress={2} max={5} meta="Side" />
      <ObjectiveChip label="Enter vault core" state="locked" meta="Locked" />
    </GameUiProvider>
  );
}`,
  },
  'quest-tracker': {
    snippetZh: `import { QuestTracker, GameUiProvider } from '@tiny-playworks/game-ui';

const objectives = [
  { id: 'beacon', label: '定位信标', state: 'complete', meta: '主线' },
  { id: 'shards', label: '收集星辉碎片', progress: 2, max: 5, meta: '支线' },
  { id: 'vault', label: '进入遗迹核心', state: 'locked', meta: '未解锁' },
];

export function Demo() {
  return (
    <GameUiProvider>
      <QuestTracker title="信标追踪" subtitle="每日路线" objectives={objectives} />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { QuestTracker, GameUiProvider } from '@tiny-playworks/game-ui';

const objectives = [
  { id: 'beacon', label: 'Locate beacon', state: 'complete', meta: 'Main' },
  { id: 'shards', label: 'Collect shards', progress: 2, max: 5, meta: 'Side' },
  { id: 'vault', label: 'Enter vault core', state: 'locked', meta: 'Locked' },
];

export function Demo() {
  return (
    <GameUiProvider>
      <QuestTracker title="Signal hunt" subtitle="Daily route" objectives={objectives} />
    </GameUiProvider>
  );
}`,
  },
  'floating-toast': {
    snippetZh: `import { FloatingToast, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <FloatingToast title="命中已触发" message="基础反馈已经开始播放。" variant="info" />
      <FloatingToast title="发现掉落" message="传奇掉落边框已激活。" variant="loot" />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { FloatingToast, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <FloatingToast title="Strike landed" message="Base feedback is now playing." variant="info" />
      <FloatingToast title="Loot found" message="Legendary border is active." variant="loot" />
    </GameUiProvider>
  );
}`,
  },
  'rarity-border': {
    snippetZh: `import { RarityBorder, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <RarityBorder tone="legendary">
        <div>
          <strong>传奇掉落</strong>
          <span>适合把奖励结果收在一个明确容器里。</span>
        </div>
      </RarityBorder>
    </GameUiProvider>
  );
}`,
    snippetEn: `import { RarityBorder, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <RarityBorder tone="legendary">
        <div>
          <strong>Legendary drop</strong>
          <span>Wrap reward results in a clear container.</span>
        </div>
      </RarityBorder>
    </GameUiProvider>
  );
}`,
  },
  'loot-card': {
    snippetZh: `import { LootCard, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <LootCard name="星辉碎片" rarity="epic" quantity={3} value="240" subtitle="制作材料" />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { LootCard, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <LootCard name="Astral Shard" rarity="epic" quantity={3} value="240" subtitle="Crafting" />
    </GameUiProvider>
  );
}`,
  },
  'loot-stack': {
    snippetZh: `import { LootStack, GameUiProvider } from '@tiny-playworks/game-ui';

const items = [
  { id: 'shard', name: '星辉碎片', rarity: 'epic' as const, quantity: 3, value: '240', subtitle: '制作材料' },
  { id: 'core', name: '共鸣核心', rarity: 'legendary' as const, quantity: 1, value: '999', subtitle: '高稀有度' },
  { id: 'dust', name: '余烬粉尘', rarity: 'common' as const, quantity: 12, value: '30', subtitle: '可分解' },
  { id: 'orb', name: '脉冲晶核', rarity: 'rare' as const, quantity: 2, value: '128', subtitle: '能量道具' },
];

export function Demo() {
  return (
    <GameUiProvider>
      <LootStack
        items={items}
        label="掉落栈"
        limit={3}
        renderItem={(item, state, defaultCard) => defaultCard}
      />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { LootStack, GameUiProvider } from '@tiny-playworks/game-ui';

const items = [
  { id: 'shard', name: 'Astral Shard', rarity: 'epic' as const, quantity: 3, value: '240', subtitle: 'Crafting' },
  { id: 'core', name: 'Resonance Core', rarity: 'legendary' as const, quantity: 1, value: '999', subtitle: 'Boss drop' },
  { id: 'dust', name: 'Ember Dust', rarity: 'common' as const, quantity: 12, value: '30', subtitle: 'Salvage' },
  { id: 'orb', name: 'Pulse Core', rarity: 'rare' as const, quantity: 2, value: '128', subtitle: 'Energy' },
];

export function Demo() {
  return (
    <GameUiProvider>
      <LootStack
        items={items}
        label="Loot stack"
        limit={3}
        renderItem={(item, state, defaultCard) => defaultCard}
      />
    </GameUiProvider>
  );
}`,
  },
  'reward-reveal': {
    snippetZh: `import { RewardReveal, GameUiProvider } from '@tiny-playworks/game-ui';

const items = [
  { id: 'shard', name: '星辉碎片', rarity: 'epic' as const, quantity: 3, value: '240', subtitle: '制作材料' },
  { id: 'core', name: '共鸣核心', rarity: 'legendary' as const, quantity: 1, value: '999', subtitle: '高稀有度' },
];

export function Demo() {
  return (
    <GameUiProvider>
      <RewardReveal title="战斗结算" items={items} state="revealed" actionLabel="领取" />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { RewardReveal, GameUiProvider } from '@tiny-playworks/game-ui';

const items = [
  { id: 'shard', name: 'Astral Shard', rarity: 'epic' as const, quantity: 3, value: '240', subtitle: 'Crafting' },
  { id: 'core', name: 'Resonance Core', rarity: 'legendary' as const, quantity: 1, value: '999', subtitle: 'Boss drop' },
];

export function Demo() {
  return (
    <GameUiProvider>
      <RewardReveal title="Combat results" items={items} state="revealed" actionLabel="Claim" />
    </GameUiProvider>
  );
}`,
  },
  'buff-bar': {
    snippetZh: `import { BuffBar, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <BuffBar
        buffs={[
          { id: 'haste', label: '急速', tone: 'buff', count: 2 },
          { id: 'burn', label: '灼烧', tone: 'debuff', duration: '8秒' },
        ]}
        limit={4}
      />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { BuffBar, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <BuffBar
        buffs={[
          { id: 'haste', label: 'Haste', tone: 'buff', count: 2 },
          { id: 'burn', label: 'Burn', tone: 'debuff', duration: '8s' },
        ]}
        limit={4}
      />
    </GameUiProvider>
  );
}`,
  },
  'inventory-grid': {
    snippetZh: `import { InventoryGrid, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <InventoryGrid
        columns={4}
        selectedId="c"
        slots={[
          { id: 'a', item: { id: 'shard', name: '星辉碎片', rarity: 'epic' }, stackCount: 3, slotType: 'material' },
          { id: 'b', locked: true },
          { id: 'c', equipped: true, item: { id: 'core', name: '共鸣核心', rarity: 'legendary' }, slotType: 'weapon', compareState: 'upgrade', quickAction: '装备' },
        ]}
        onContextAction={(id, action) => console.log(id, action)}
        onSlotMove={(fromId, toId) => console.log(fromId, toId)}
      />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { InventoryGrid, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <InventoryGrid
        columns={4}
        selectedId="c"
        slots={[
          { id: 'a', item: { id: 'shard', name: 'Astral Shard', rarity: 'epic' }, stackCount: 3, slotType: 'material' },
          { id: 'b', locked: true },
          { id: 'c', equipped: true, item: { id: 'core', name: 'Resonance Core', rarity: 'legendary' }, slotType: 'weapon', compareState: 'upgrade', quickAction: 'Equip' },
        ]}
        onContextAction={(id, action) => console.log(id, action)}
        onSlotMove={(fromId, toId) => console.log(fromId, toId)}
      />
    </GameUiProvider>
  );
}`,
  },
  'currency-bar': {
    snippetZh: `import { CurrencyBar, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <CurrencyBar
        currencies={[
          { id: 'gold', label: '金币', amount: 240, tone: 'gold', icon: 'G' },
          { id: 'gem', label: '水晶', amount: 12, tone: 'gem', icon: '◆' },
        ]}
      />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { CurrencyBar, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <CurrencyBar
        currencies={[
          { id: 'gold', label: 'Gold', amount: 240, tone: 'gold', icon: 'G' },
          { id: 'gem', label: 'Gems', amount: 12, tone: 'gem', icon: '◆' },
        ]}
      />
    </GameUiProvider>
  );
}`,
  },
  'party-frame': {
    snippetZh: `import { PartyFrame, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <PartyFrame
        members={[
          { id: 'pilot', name: '领航员', health: 320, maxHealth: 420, shield: 24 },
          { id: 'support', name: '支援', health: 180, maxHealth: 360 },
        ]}
        selectedId="pilot"
      />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { PartyFrame, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <PartyFrame
        members={[
          { id: 'pilot', name: 'Pilot', health: 320, maxHealth: 420, shield: 24 },
          { id: 'support', name: 'Support', health: 180, maxHealth: 360 },
        ]}
        selectedId="pilot"
      />
    </GameUiProvider>
  );
}`,
  },
  'pause-menu': {
    snippetZh: `import { PauseMenu, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <PauseMenu
        open
        title="暂停"
        items={[
          { id: 'resume', label: '继续' },
          { id: 'settings', label: '设置' },
          { id: 'quit', label: '退出', danger: true },
        ]}
        onResume={() => {}}
      />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { PauseMenu, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <PauseMenu
        open
        title="Paused"
        items={[
          { id: 'resume', label: 'Resume' },
          { id: 'settings', label: 'Settings' },
          { id: 'quit', label: 'Quit', danger: true },
        ]}
        onResume={() => {}}
      />
    </GameUiProvider>
  );
}`,
  },
  'game-timer': {
    snippetZh: `import { GameTimer, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <GameTimer remainingMs={12000} totalMs={30000} label="Boss" variant="ring" warningThreshold={0.25} />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { GameTimer, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <GameTimer remainingMs={12000} totalMs={30000} label="Boss" variant="ring" warningThreshold={0.25} />
    </GameUiProvider>
  );
}`,
  },
  'loading-overlay': {
    snippetZh: `import { LoadingOverlay, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <LoadingOverlay open title="加载中" message="同步世界状态" progress={0.42} />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { LoadingOverlay, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <LoadingOverlay open title="Loading" message="Syncing world state" progress={0.42} />
    </GameUiProvider>
  );
}`,
  },
  'death-screen': {
    snippetZh: `import { DeathScreen, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <DeathScreen
        open
        title="战败"
        message="再试一次，调整技能节奏。"
        actionLabel="重试"
        secondaryLabel="返回营地"
      />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { DeathScreen, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <DeathScreen
        open
        title="Defeated"
        message="Try again and adjust your ability tempo."
        actionLabel="Retry"
        secondaryLabel="Return to camp"
      />
    </GameUiProvider>
  );
}`,
  },
  'shop-panel': {
    snippetZh: `import { ShopPanel, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <ShopPanel
        title="补给站"
        selectedId="potion"
        onItemSelect={(id) => console.log(id)}
        onPurchase={(id) => console.log(id)}
        items={[{
          id: 'potion',
          name: '治疗药剂',
          rarity: 'rare',
          price: '20g',
          stock: 0,
          discount: '-20%',
          unavailableReason: '金币不足',
          details: '恢复 80 点生命',
        }]}
        currencies={[{ id: 'gold', label: '金币', amount: 120, tone: 'gold' }]}
      />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { ShopPanel, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <ShopPanel
        title="Supply post"
        selectedId="potion"
        onItemSelect={(id) => console.log(id)}
        onPurchase={(id) => console.log(id)}
        items={[{
          id: 'potion',
          name: 'Healing potion',
          rarity: 'rare',
          price: '20g',
          stock: 0,
          discount: '-20%',
          unavailableReason: 'Need more gold',
          details: 'Restores 80 HP',
        }]}
        currencies={[{ id: 'gold', label: 'Gold', amount: 120, tone: 'gold' }]}
      />
    </GameUiProvider>
  );
}`,
  },
  'chat-feed': {
    snippetZh: `import { ChatFeed, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <ChatFeed
        messages={[
          { id: '1', author: '系统', text: 'Boss 已进入战斗', tone: 'combat', timestamp: '12:04', channel: '团队', highlighted: true },
          { id: '2', author: '队友', text: '左侧通道更安全', tone: 'party', timestamp: '12:05', channel: '队伍' },
        ]}
      />
    </GameUiProvider>
  );
}`,
    snippetEn: `import { ChatFeed, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <ChatFeed
        messages={[
          { id: '1', author: 'System', text: 'Boss engaged', tone: 'combat', timestamp: '12:04', channel: 'Raid', highlighted: true },
          { id: '2', author: 'Ally', text: 'Left path is safer', tone: 'party', timestamp: '12:05', channel: 'Party' },
        ]}
      />
    </GameUiProvider>
  );
}`,
  },
} as const;

export type PrimitiveSnippetId = keyof typeof primitiveSnippets;
