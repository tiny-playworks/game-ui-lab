import type { JSX, ReactNode } from 'react';
import {
  AbilityBar,
  AbilityTooltip,
  CastBar,
  ChoicePrompt,
  ComboCounter,
  CompassBar,
  CooldownSlot,
  DamageNumber,
  DialogueBox,
  FloatingToast,
  GameUiProvider,
  HealthBar,
  LocationTag,
  LootCard,
  LootStack,
  MapMarker,
  MiniMap,
  NotificationStack,
  ObjectiveChip,
  QuestLog,
  QuestTracker,
  RarityBorder,
  ResourceMeter,
  RewardReveal,
  StatusBadge,
  TargetFrame,
} from '../../../packages/primitives/src';
import { DocShell } from './doc-shell';
import { Localized, useDocsLocale } from './locale';

type PrimitiveId =
  | 'ability-bar'
  | 'ability-tooltip'
  | 'cast-bar'
  | 'target-frame'
  | 'mini-map'
  | 'map-marker'
  | 'compass-bar'
  | 'location-tag'
  | 'dialogue-box'
  | 'choice-prompt'
  | 'quest-log'
  | 'notification-stack'
  | 'damage-number'
  | 'health-bar'
  | 'resource-meter'
  | 'combo-counter'
  | 'cooldown-slot'
  | 'status-badge'
  | 'objective-chip'
  | 'quest-tracker'
  | 'floating-toast'
  | 'rarity-border'
  | 'loot-card'
  | 'loot-stack'
  | 'reward-reveal';

interface ApiRow {
  prop: string;
  descriptionZh: string;
  descriptionEn: string;
  type: string;
  defaultValue: string;
}

interface PrimitiveDoc {
  id: PrimitiveId;
  name: string;
  categoryZh: string;
  categoryEn: string;
  summaryZh: string;
  summaryEn: string;
  snippet: string;
  api: ApiRow[];
  tokenZh: string;
  tokenEn: string;
  Preview: () => JSX.Element;
}

const lootItems = [
  { id: 'shard', name: '星辉碎片', rarity: 'epic' as const, quantity: 3, value: '240', subtitle: '制作材料' },
  { id: 'core', name: '共鸣核心', rarity: 'legendary' as const, quantity: 1, value: '999', subtitle: '高稀有度' },
  { id: 'dust', name: '余烬粉尘', rarity: 'common' as const, quantity: 12, value: '30', subtitle: '可分解' },
  { id: 'orb', name: '脉冲晶核', rarity: 'rare' as const, quantity: 2, value: '128', subtitle: '能量道具' },
];

const questObjectives = [
  { id: 'beacon', label: '定位信标', state: 'complete' as const, meta: '主线' },
  { id: 'shards', label: '收集星辉碎片', progress: 2, max: 5, meta: '支线' },
  { id: 'vault', label: '进入遗迹核心', state: 'locked' as const, meta: '未解锁' },
];

const abilityItems = [
  { id: 'blink', label: '闪现', icon: 'B', ready: true, cost: '20' },
  { id: 'burst', label: '爆发', icon: 'Q', progress: 0.58, cost: '35' },
  { id: 'nova', label: '新星', icon: 'R', progress: 0.12, locked: true },
];

const mapMarkers = [
  { id: 'ally', x: 20, y: 38, tone: 'ally' as const, label: '友军' },
  { id: 'enemy', x: 72, y: 54, tone: 'enemy' as const, label: '巡逻' },
  { id: 'objective', x: 48, y: 28, tone: 'objective' as const, label: '信标', active: true },
];

const compassMarkers = [
  { id: 'gate', label: '门', heading: 80, tone: 'objective' as const },
  { id: 'patrol', label: '敌', heading: 220, tone: 'enemy' as const },
];

const choiceItems = [
  { id: 'left', label: '走左侧通道', description: '安全但奖励少' },
  { id: 'right', label: '强行突破', description: '危险但更快' },
];

const questLogItems = [
  { id: 'signal', title: '信标追踪', subtitle: '每日路线', objectives: questObjectives },
];

const notificationItems = [
  { id: 'loot', title: '发现掉落', message: '星辉碎片已加入背包。', variant: 'loot' as const },
  { id: 'warn', title: '敌人接近', message: '巡逻队正在靠近。', variant: 'warning' as const },
  { id: 'ready', title: '技能就绪', message: '闪现可以使用。', variant: 'success' as const },
  { id: 'route', title: '路线更新', message: '新的信标位置已标记。', variant: 'info' as const },
];

const commonRows: ApiRow[] = [
  row('className', '自定义类名。', 'Custom class name.', 'string', '-'),
];

const docs: Record<PrimitiveId, PrimitiveDoc> = {
  'ability-bar': {
    id: 'ability-bar',
    name: 'AbilityBar',
    categoryZh: '战斗 HUD',
    categoryEn: 'Combat HUD',
    summaryZh: '技能栏，组合技能冷却、就绪和锁定状态。',
    summaryEn: 'An ability bar for cooldown, ready, and locked states.',
    snippet: `import { AbilityBar, GameUiProvider } from '@tiny-playworks/game-ui';

const abilities = [
  { id: 'blink', label: '闪现', icon: 'B', ready: true, cost: '20' },
  { id: 'burst', label: '爆发', icon: 'Q', progress: 0.58, cost: '35' },
  { id: 'nova', label: '新星', icon: 'R', progress: 0.12, locked: true },
];

export function Demo() {
  return (
    <GameUiProvider>
      <AbilityBar abilities={abilities} />
    </GameUiProvider>
  );
}`,
    api: [
      row('abilities', '技能数组。', 'Ability item array.', 'AbilityBarItem[]', '-'),
      row('label', '可访问标签。', 'Accessible label.', 'string', "'Ability bar'"),
      ...commonRows,
    ],
    tokenZh: '使用 ability ready、locked、cooldown 和间距 token。',
    tokenEn: 'Uses ability ready, locked, cooldown, and spacing tokens.',
    Preview: AbilityBarPreview,
  },
  'ability-tooltip': {
    id: 'ability-tooltip',
    name: 'AbilityTooltip',
    categoryZh: '战斗 HUD',
    categoryEn: 'Combat HUD',
    summaryZh: '技能详情卡，展示说明、消耗、冷却和状态。',
    summaryEn: 'A tooltip card for ability description, cost, cooldown, and state.',
    snippet: `import { AbilityTooltip, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <AbilityTooltip name="闪现" description="短距离位移，穿过危险区域。" cost="20 MP" cooldown="8秒" />
    </GameUiProvider>
  );
}`,
    api: [
      row('name', '技能名称。', 'Ability name.', 'string', '-'),
      row('description', '技能说明。', 'Ability description.', 'ReactNode', '-'),
      row('cost', '消耗信息。', 'Cost information.', 'ReactNode', '-'),
      row('cooldown', '冷却信息。', 'Cooldown information.', 'ReactNode', '-'),
      row('state', '技能状态。', 'Ability state.', "'ready' | 'cooling' | 'locked'", "'ready'"),
      row('kind', '类型标签。', 'Kind label.', 'string', "'Ability'"),
      ...commonRows,
    ],
    tokenZh: '使用 ability ready、locked、surface 和 shadow token。',
    tokenEn: 'Uses ability ready, locked, surface, and shadow tokens.',
    Preview: AbilityTooltipPreview,
  },
  'cast-bar': {
    id: 'cast-bar',
    name: 'CastBar',
    categoryZh: '战斗 HUD',
    categoryEn: 'Combat HUD',
    summaryZh: '施法或引导进度条。',
    summaryEn: 'A cast or channel progress bar.',
    snippet: `import { CastBar, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <CastBar label="奥术光束" progress={0.72} state="channeling" />
    </GameUiProvider>
  );
}`,
    api: [
      row('label', '进度条标签。', 'Progress label.', 'string', '-'),
      row('progress', '进度，0 到 1。', 'Progress from 0 to 1.', 'number', '-'),
      row('state', '施法状态。', 'Cast state.', "'casting' | 'channeling' | 'complete' | 'interrupted'", "'casting'"),
      row('meta', '右侧辅助信息。', 'Right-side metadata.', 'ReactNode', '百分比'),
      ...commonRows,
    ],
    tokenZh: '使用 cast、ability ready 和 debuff token。',
    tokenEn: 'Uses cast, ability ready, and debuff tokens.',
    Preview: CastBarPreview,
  },
  'target-frame': {
    id: 'target-frame',
    name: 'TargetFrame',
    categoryZh: '战斗 HUD',
    categoryEn: 'Combat HUD',
    summaryZh: '目标框，组合目标名称、生命条和状态。',
    summaryEn: 'A target frame for name, health, shield, and statuses.',
    snippet: `import { TargetFrame, GameUiProvider } from '@tiny-playworks/game-ui';

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
    api: [
      row('name', '目标名称。', 'Target name.', 'string', '-'),
      row('health', '当前生命。', 'Current health.', 'number', '-'),
      row('maxHealth', '最大生命。', 'Maximum health.', 'number', '-'),
      row('faction', '目标阵营。', 'Target faction.', "'ally' | 'enemy' | 'neutral' | 'boss'", "'enemy'"),
      row('statuses', '状态徽章数组。', 'Status badge array.', 'StatusBadgeProps[]', '[]'),
      ...commonRows,
    ],
    tokenZh: '复用 target、health、shield 和 status token。',
    tokenEn: 'Reuses target, health, shield, and status tokens.',
    Preview: TargetFramePreview,
  },
  'mini-map': {
    id: 'mini-map',
    name: 'MiniMap',
    categoryZh: '地图探索',
    categoryEn: 'Map',
    summaryZh: '轻量小地图容器，使用 0-100 坐标放置点位。',
    summaryEn: 'A lightweight minimap that places markers with 0-100 coordinates.',
    snippet: `import { MiniMap, GameUiProvider } from '@tiny-playworks/game-ui';

const markers = [
  { id: 'ally', x: 20, y: 38, tone: 'ally' as const, label: '友军' },
  { id: 'enemy', x: 72, y: 54, tone: 'enemy' as const, label: '巡逻' },
  { id: 'objective', x: 48, y: 28, tone: 'objective' as const, label: '信标', active: true },
];

export function Demo() {
  return (
    <GameUiProvider>
      <MiniMap label="区域地图" markers={markers} />
    </GameUiProvider>
  );
}`,
    api: [
      row('markers', '地图点数组。', 'Map marker array.', 'MiniMapMarker[]', '-'),
      row('label', '地图标签。', 'Map label.', 'string', "'Mini map'"),
      ...commonRows,
    ],
    tokenZh: '使用 map line 和 marker token。',
    tokenEn: 'Uses map line and marker tokens.',
    Preview: MiniMapPreview,
  },
  'map-marker': {
    id: 'map-marker',
    name: 'MapMarker',
    categoryZh: '地图探索',
    categoryEn: 'Map',
    summaryZh: '地图点位，支持友军、敌人、目标和中立状态。',
    summaryEn: 'A map marker for ally, enemy, objective, and neutral tones.',
    snippet: `import { MapMarker, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <div style={{ position: 'relative', width: 220, height: 120 }}>
        <MapMarker x={48} y={28} tone="objective" label="信标" active />
      </div>
    </GameUiProvider>
  );
}`,
    api: [
      row('x', '横向坐标，0 到 100。', 'Horizontal coordinate from 0 to 100.', 'number', '-'),
      row('y', '纵向坐标，0 到 100。', 'Vertical coordinate from 0 to 100.', 'number', '-'),
      row('tone', '点位类型。', 'Marker tone.', "'ally' | 'enemy' | 'objective' | 'neutral'", "'neutral'"),
      row('label', '点位标签。', 'Marker label.', 'string', '-'),
      row('active', '是否高亮。', 'Whether marker is highlighted.', 'boolean', 'false'),
      ...commonRows,
    ],
    tokenZh: '使用 marker 和 map line token。',
    tokenEn: 'Uses marker and map line tokens.',
    Preview: MapMarkerPreview,
  },
  'compass-bar': {
    id: 'compass-bar',
    name: 'CompassBar',
    categoryZh: '地图探索',
    categoryEn: 'Map',
    summaryZh: '方向条，展示当前朝向和少量标记。',
    summaryEn: 'A compass bar for heading and lightweight markers.',
    snippet: `import { CompassBar, GameUiProvider } from '@tiny-playworks/game-ui';

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
    api: [
      row('heading', '当前朝向角度。', 'Current heading in degrees.', 'number', '-'),
      row('markers', '方向标记数组。', 'Compass marker array.', 'CompassMarker[]', '[]'),
      row('label', '可访问标签。', 'Accessible label.', 'string', "'Compass'"),
      ...commonRows,
    ],
    tokenZh: '使用 map line 和 marker token。',
    tokenEn: 'Uses map line and marker tokens.',
    Preview: CompassBarPreview,
  },
  'location-tag': {
    id: 'location-tag',
    name: 'LocationTag',
    categoryZh: '地图探索',
    categoryEn: 'Map',
    summaryZh: '地点标签，展示区域、地点名、危险等级和状态。',
    summaryEn: 'A location tag for zone, name, danger, and status.',
    snippet: `import { LocationTag, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <LocationTag name="灰烬门" zone="北区" danger="hostile" status="敌方巡逻" />
    </GameUiProvider>
  );
}`,
    api: [
      row('name', '地点名称。', 'Location name.', 'string', '-'),
      row('zone', '区域名称。', 'Zone name.', 'string', '-'),
      row('danger', '危险等级。', 'Danger level.', "'safe' | 'contested' | 'hostile'", "'safe'"),
      row('status', '状态文案。', 'Status text.', 'string', '-'),
      ...commonRows,
    ],
    tokenZh: '使用 map、marker 和 surface token。',
    tokenEn: 'Uses map, marker, and surface tokens.',
    Preview: LocationTagPreview,
  },
  'dialogue-box': {
    id: 'dialogue-box',
    name: 'DialogueBox',
    categoryZh: '系统叙事',
    categoryEn: 'Narrative',
    summaryZh: '角色对话框，展示说话人、文本和头像位。',
    summaryEn: 'A dialogue box for speaker, text, and portrait slot.',
    snippet: `import { DialogueBox, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <DialogueBox speaker="Mira" text="守住这道门，信标马上就会点亮。" tone="ally" />
    </GameUiProvider>
  );
}`,
    api: [
      row('speaker', '说话人。', 'Speaker name.', 'string', '-'),
      row('text', '对话文本。', 'Dialogue text.', 'ReactNode', '-'),
      row('portrait', '头像内容。', 'Portrait content.', 'ReactNode', 'speaker 首字'),
      row('tone', '对话语气。', 'Dialogue tone.', "'neutral' | 'ally' | 'warning'", "'neutral'"),
      ...commonRows,
    ],
    tokenZh: '使用 dialogue、speaker 和 surface token。',
    tokenEn: 'Uses dialogue, speaker, and surface tokens.',
    Preview: DialogueBoxPreview,
  },
  'choice-prompt': {
    id: 'choice-prompt',
    name: 'ChoicePrompt',
    categoryZh: '系统叙事',
    categoryEn: 'Narrative',
    summaryZh: '选择项展示列表，支持可选回调。',
    summaryEn: 'A choice list with optional callbacks.',
    snippet: `import { ChoicePrompt, GameUiProvider } from '@tiny-playworks/game-ui';

const choices = [
  { id: 'left', label: '走左侧通道', description: '安全但奖励少' },
  { id: 'right', label: '强行突破', description: '危险但更快' },
];

export function Demo() {
  return (
    <GameUiProvider>
      <ChoicePrompt title="选择路线" choices={choices} />
    </GameUiProvider>
  );
}`,
    api: [
      row('title', '选择标题。', 'Choice prompt title.', 'string', '-'),
      row('choices', '选择项数组。', 'Choice option array.', 'ChoicePromptOption[]', '-'),
      row('onChoice', '点击回调。', 'Click callback.', '(id: string) => void', '-'),
      ...commonRows,
    ],
    tokenZh: '使用 choice、surface 和 spacing token。',
    tokenEn: 'Uses choice, surface, and spacing tokens.',
    Preview: ChoicePromptPreview,
  },
  'quest-log': {
    id: 'quest-log',
    name: 'QuestLog',
    categoryZh: '系统叙事',
    categoryEn: 'Narrative',
    summaryZh: '任务日志，组合多组任务追踪面板。',
    summaryEn: 'A quest log that groups quest tracker panels.',
    snippet: `import { QuestLog, GameUiProvider } from '@tiny-playworks/game-ui';

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
    api: [
      row('quests', '任务数组。', 'Quest array.', 'QuestLogQuest[]', '-'),
      row('title', '日志标题。', 'Log title.', 'string', "'Quest log'"),
      row('activeId', '当前追踪任务 id。', 'Currently tracked quest id.', 'string', '-'),
      ...commonRows,
    ],
    tokenZh: '复用 QuestTracker、choice 和 spacing token。',
    tokenEn: 'Reuses QuestTracker, choice, and spacing tokens.',
    Preview: QuestLogPreview,
  },
  'notification-stack': {
    id: 'notification-stack',
    name: 'NotificationStack',
    categoryZh: '系统叙事',
    categoryEn: 'Narrative',
    summaryZh: '通知堆栈，复用浮动消息视觉。',
    summaryEn: 'A notification stack that reuses floating toast visuals.',
    snippet: `import { NotificationStack, GameUiProvider } from '@tiny-playworks/game-ui';

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
    api: [
      row('notifications', '通知数组。', 'Notification array.', 'NotificationStackItem[]', '-'),
      row('label', '可访问标签。', 'Accessible label.', 'string', "'Notifications'"),
      row('limit', '最多展示数量。', 'Maximum visible item count.', 'number', '3'),
      ...commonRows,
    ],
    tokenZh: '复用 FloatingToast 和 notification token。',
    tokenEn: 'Reuses FloatingToast and notification tokens.',
    Preview: NotificationStackPreview,
  },
  'damage-number': {
    id: 'damage-number',
    name: 'DamageNumber',
    categoryZh: '战斗反馈',
    categoryEn: 'Combat feedback',
    summaryZh: '用于伤害、治疗、暴击和 Miss 的即时飘字。',
    summaryEn: 'Instant floating numbers for damage, healing, critical hits, and misses.',
    snippet: `import { DamageNumber, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <DamageNumber value="128" variant="critical" prefix="暴击" />
      <DamageNumber value="42" variant="heal" prefix="治疗" />
      <DamageNumber value="MISS" variant="miss" />
    </GameUiProvider>
  );
}`,
    api: [
      row('value', '显示的数值或文本。', 'Number or text to render.', 'number | string', '-'),
      row('variant', '反馈类型。', 'Feedback variant.', "'damage' | 'heal' | 'critical' | 'miss'", "'damage'"),
      row('prefix', '数值前缀。', 'Prefix before the value.', 'string', '-'),
      row('size', '自定义字体尺寸，单位 px。', 'Custom font size in px.', 'number', '-'),
      ...commonRows,
    ],
    tokenZh: '使用伤害、治疗、暴击和动效 token。',
    tokenEn: 'Uses damage, healing, critical, and motion tokens.',
    Preview: DamageNumberPreview,
  },
  'health-bar': {
    id: 'health-bar',
    name: 'HealthBar',
    categoryZh: 'HUD',
    categoryEn: 'HUD',
    summaryZh: '生命值条，支持护盾和数值展示。',
    summaryEn: 'A health bar with shield and value display.',
    snippet: `import { HealthBar, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <HealthBar value={97} max={120} shield={18} label="生命" showValue />
      <HealthBar value={420} max={800} tone="boss" label="Boss" showValue />
    </GameUiProvider>
  );
}`,
    api: [
      row('value', '当前生命值。', 'Current health value.', 'number', '-'),
      row('max', '最大生命值。', 'Maximum health value.', 'number', '-'),
      row('shield', '额外护盾值。', 'Additional shield value.', 'number', '0'),
      row('label', '左侧标签。', 'Label text.', 'string', "'Health'"),
      row('tone', '视觉语气。', 'Visual tone.', "'hero' | 'danger' | 'boss'", "'hero'"),
      row('showValue', '是否显示数值。', 'Whether to show the numeric value.', 'boolean', 'false'),
      ...commonRows,
    ],
    tokenZh: '使用 HUD 生命、护盾、危险状态 token。',
    tokenEn: 'Uses HUD health, shield, and danger-state tokens.',
    Preview: HealthBarPreview,
  },
  'resource-meter': {
    id: 'resource-meter',
    name: 'ResourceMeter',
    categoryZh: 'HUD',
    categoryEn: 'HUD',
    summaryZh: '法力、能量、耐力等资源条。',
    summaryEn: 'A meter for mana, energy, or stamina.',
    snippet: `import { ResourceMeter, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <ResourceMeter value={67} max={90} kind="mana" label="法力" />
      <ResourceMeter value={44} max={100} kind="stamina" label="耐力" />
    </GameUiProvider>
  );
}`,
    api: [
      row('value', '当前资源值。', 'Current resource value.', 'number', '-'),
      row('max', '最大资源值。', 'Maximum resource value.', 'number', '-'),
      row('kind', '资源类型。', 'Resource kind.', "'mana' | 'energy' | 'stamina'", '-'),
      row('label', '自定义标签。', 'Custom label.', 'string', '按 kind 推导'),
      ...commonRows,
    ],
    tokenZh: '使用 mana、energy、stamina 三组 HUD token。',
    tokenEn: 'Uses the mana, energy, and stamina HUD token groups.',
    Preview: ResourceMeterPreview,
  },
  'combo-counter': {
    id: 'combo-counter',
    name: 'ComboCounter',
    categoryZh: '战斗反馈',
    categoryEn: 'Combat feedback',
    summaryZh: '连击计数，强调连续命中和节奏。',
    summaryEn: 'A combo counter for chained hits and rhythm.',
    snippet: `import { ComboCounter, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <ComboCounter count={12} label="连击" tier="稳定连击" />
    </GameUiProvider>
  );
}`,
    api: [
      row('count', '当前连击数。', 'Current combo count.', 'number', '-'),
      row('label', '计数标签。', 'Counter label.', 'string', "'Combo'"),
      row('tier', '连击阶段文案。', 'Combo tier text.', 'string', '按 count 推导'),
      row('active', '是否激活反馈动画。', 'Whether the feedback animation is active.', 'boolean', 'count > 0'),
      ...commonRows,
    ],
    tokenZh: '使用战斗强调色和短动效 token。',
    tokenEn: 'Uses combat accent and short motion tokens.',
    Preview: ComboCounterPreview,
  },
  'cooldown-slot': {
    id: 'cooldown-slot',
    name: 'CooldownSlot',
    categoryZh: 'HUD',
    categoryEn: 'HUD',
    summaryZh: '技能冷却槽，展示技能是否可用。',
    summaryEn: 'A cooldown slot that shows whether an ability is ready.',
    snippet: `import { CooldownSlot, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <CooldownSlot progress={0.62} label="爆发" icon="Q" />
      <CooldownSlot progress={1} label="闪避" icon="E" />
      <CooldownSlot progress={0.2} label="禁用" icon="R" disabled />
    </GameUiProvider>
  );
}`,
    api: [
      row('progress', '冷却进度，0 到 1。', 'Cooldown progress from 0 to 1.', 'number', '-'),
      row('label', '技能名称。', 'Ability label.', 'string', '-'),
      row('icon', '图标内容。', 'Icon content.', 'ReactNode', 'label 首字母'),
      row('ready', '是否可用。', 'Whether the slot is ready.', 'boolean', 'progress >= 1'),
      row('disabled', '是否禁用。', 'Whether the slot is disabled.', 'boolean', 'false'),
      ...commonRows,
    ],
    tokenZh: '使用冷却遮罩、就绪态和禁用态 token。',
    tokenEn: 'Uses cooldown mask, ready, and disabled state tokens.',
    Preview: CooldownSlotPreview,
  },
  'status-badge': {
    id: 'status-badge',
    name: 'StatusBadge',
    categoryZh: '状态',
    categoryEn: 'Status',
    summaryZh: '状态徽章，展示 buff、debuff、警告和持续时间。',
    summaryEn: 'A badge for buffs, debuffs, warnings, and durations.',
    snippet: `import { StatusBadge, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <StatusBadge label="急速" tone="buff" count={3} duration="12秒" />
      <StatusBadge label="灼烧" tone="debuff" duration="8秒" />
      <StatusBadge label="打断" tone="warning" />
    </GameUiProvider>
  );
}`,
    api: [
      row('label', '状态名称。', 'Status label.', 'string', '-'),
      row('tone', '状态类型。', 'Status tone.', "'buff' | 'debuff' | 'neutral' | 'warning'", '-'),
      row('count', '叠层数量。', 'Stack count.', 'number', '-'),
      row('duration', '持续时间文案。', 'Duration text.', 'string', '-'),
      ...commonRows,
    ],
    tokenZh: '使用状态色和紧凑文字 token。',
    tokenEn: 'Uses status color and compact text tokens.',
    Preview: StatusBadgePreview,
  },
  'objective-chip': {
    id: 'objective-chip',
    name: 'ObjectiveChip',
    categoryZh: '任务',
    categoryEn: 'Quest',
    summaryZh: '单个任务目标，展示状态、进度和辅助信息。',
    summaryEn: 'A single objective item for state, progress, and compact metadata.',
    snippet: `import { ObjectiveChip, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <ObjectiveChip label="定位信标" state="complete" meta="主线" />
      <ObjectiveChip label="收集星辉碎片" progress={2} max={5} meta="支线" />
      <ObjectiveChip label="进入遗迹核心" state="locked" meta="未解锁" />
    </GameUiProvider>
  );
}`,
    api: [
      row('label', '目标文案。', 'Objective label.', 'string', '-'),
      row('state', '目标状态。', 'Objective state.', "'active' | 'complete' | 'locked'", "'active'"),
      row('progress', '当前进度。', 'Current progress.', 'number', '-'),
      row('max', '最大进度。', 'Maximum progress.', 'number', '-'),
      row('icon', '自定义图标。', 'Custom icon.', 'ReactNode', '按 state 推导'),
      row('meta', '辅助信息。', 'Compact metadata.', 'ReactNode', '-'),
      ...commonRows,
    ],
    tokenZh: '复用任务状态、进度、边框和间距 token。',
    tokenEn: 'Reuses objective state, progress, border, and spacing tokens.',
    Preview: ObjectiveChipPreview,
  },
  'quest-tracker': {
    id: 'quest-tracker',
    name: 'QuestTracker',
    categoryZh: '任务',
    categoryEn: 'Quest',
    summaryZh: '任务追踪面板，组合多个目标并展示完成数。',
    summaryEn: 'A quest tracker panel that groups objectives and shows completion count.',
    snippet: `import { QuestTracker, GameUiProvider } from '@tiny-playworks/game-ui';

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
    api: [
      row('title', '面板标题。', 'Panel title.', 'string', '-'),
      row('subtitle', '副标题。', 'Subtitle.', 'string', '-'),
      row('objectives', '目标数组。', 'Objective array.', 'QuestTrackerObjective[]', '-'),
      ...commonRows,
    ],
    tokenZh: '复用 ObjectiveChip、面板、边框和间距 token。',
    tokenEn: 'Reuses ObjectiveChip, panel, border, and spacing tokens.',
    Preview: QuestTrackerPreview,
  },
  'floating-toast': {
    id: 'floating-toast',
    name: 'FloatingToast',
    categoryZh: '反馈',
    categoryEn: 'Feedback',
    summaryZh: '短消息提示，用于即时反馈。',
    summaryEn: 'A short toast for immediate feedback.',
    snippet: `import { FloatingToast, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <FloatingToast title="命中已触发" message="基础反馈已经开始播放。" variant="info" />
      <FloatingToast title="发现掉落" message="传奇掉落边框已激活。" variant="loot" />
    </GameUiProvider>
  );
}`,
    api: [
      row('title', '标题。', 'Title text.', 'string', '-'),
      row('message', '消息内容。', 'Message content.', 'ReactNode', '-'),
      row('variant', '提示类型。', 'Toast variant.', "'info' | 'success' | 'warning' | 'loot'", "'info'"),
      row('icon', '自定义图标。', 'Custom icon.', 'ReactNode', '按 variant 推导'),
      ...commonRows,
    ],
    tokenZh: '使用反馈色、浮层阴影和进入动效 token。',
    tokenEn: 'Uses feedback color, floating shadow, and entrance motion tokens.',
    Preview: FloatingToastPreview,
  },
  'rarity-border': {
    id: 'rarity-border',
    name: 'RarityBorder',
    categoryZh: '容器',
    categoryEn: 'Container',
    summaryZh: '稀有度边框，用来包裹奖励或卡片。',
    summaryEn: 'A rarity border for rewards or cards.',
    snippet: `import { RarityBorder, GameUiProvider } from '@tiny-playworks/game-ui';

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
    api: [
      row('children', '容器内容。', 'Container content.', 'ReactNode', '-'),
      row('tone', '稀有度。', 'Rarity tone.', "'common' | 'rare' | 'epic' | 'legendary'", "'common'"),
      row('active', '是否启用强调态。', 'Whether the active emphasis is enabled.', 'boolean', 'true'),
      ...commonRows,
    ],
    tokenZh: '使用 common、rare、epic、legendary 稀有度 token。',
    tokenEn: 'Uses common, rare, epic, and legendary rarity tokens.',
    Preview: RarityBorderPreview,
  },
  'loot-card': {
    id: 'loot-card',
    name: 'LootCard',
    categoryZh: '奖励',
    categoryEn: 'Reward',
    summaryZh: '单个掉落卡片，展示物品名称、稀有度和数量。',
    summaryEn: 'A single loot card for item name, rarity, and quantity.',
    snippet: `import { LootCard, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <LootCard name="星辉碎片" rarity="epic" quantity={3} value="240" subtitle="制作材料" />
    </GameUiProvider>
  );
}`,
    api: [
      row('name', '物品名称。', 'Item name.', 'string', '-'),
      row('rarity', '物品稀有度。', 'Item rarity.', "'common' | 'rare' | 'epic' | 'legendary'", "'common'"),
      row('quantity', '数量。', 'Quantity.', 'number', '-'),
      row('value', '右侧数值。', 'Right-side value.', 'string', '-'),
      row('subtitle', '副标题。', 'Subtitle.', 'string', '-'),
      row('icon', '自定义图标。', 'Custom icon.', 'ReactNode', 'name 首字'),
      row('selected', '是否选中。', 'Whether the card is selected.', 'boolean', 'false'),
      ...commonRows,
    ],
    tokenZh: '使用奖励卡片、稀有度和选中态 token。',
    tokenEn: 'Uses reward card, rarity, and selected-state tokens.',
    Preview: LootCardPreview,
  },
  'loot-stack': {
    id: 'loot-stack',
    name: 'LootStack',
    categoryZh: '奖励',
    categoryEn: 'Reward',
    summaryZh: '一组掉落卡片，支持数量截断。',
    summaryEn: 'A list of loot cards with overflow limiting.',
    snippet: `import { LootStack, GameUiProvider } from '@tiny-playworks/game-ui';

const items = [
  { id: 'shard', name: '星辉碎片', rarity: 'epic' as const, quantity: 3, value: '240', subtitle: '制作材料' },
  { id: 'core', name: '共鸣核心', rarity: 'legendary' as const, quantity: 1, value: '999', subtitle: '高稀有度' },
  { id: 'dust', name: '余烬粉尘', rarity: 'common' as const, quantity: 12, value: '30', subtitle: '可分解' },
  { id: 'orb', name: '脉冲晶核', rarity: 'rare' as const, quantity: 2, value: '128', subtitle: '能量道具' },
];

export function Demo() {
  return (
    <GameUiProvider>
      <LootStack items={items} label="掉落栈" limit={3} />
    </GameUiProvider>
  );
}`,
    api: [
      row('items', '掉落项数组。', 'Loot item array.', 'LootStackItem[]', '-'),
      row('label', '列表标签。', 'Stack label.', 'string', "'Loot stack'"),
      row('limit', '最多展示数量。', 'Maximum visible item count.', 'number', '4'),
      ...commonRows,
    ],
    tokenZh: '复用 LootCard、列表间距和溢出提示 token。',
    tokenEn: 'Reuses LootCard, list spacing, and overflow hint tokens.',
    Preview: LootStackPreview,
  },
  'reward-reveal': {
    id: 'reward-reveal',
    name: 'RewardReveal',
    categoryZh: '奖励',
    categoryEn: 'Reward',
    summaryZh: '奖励揭示面板，组合标题、奖励栈和领取动作。',
    summaryEn: 'A reward reveal panel with title, loot stack, and action.',
    snippet: `import { RewardReveal, GameUiProvider } from '@tiny-playworks/game-ui';

const items = [
  { id: 'shard', name: '星辉碎片', rarity: 'epic' as const, quantity: 3, value: '240', subtitle: '制作材料' },
  { id: 'core', name: '共鸣核心', rarity: 'legendary' as const, quantity: 1, value: '999', subtitle: '高稀有度' },
  { id: 'dust', name: '余烬粉尘', rarity: 'common' as const, quantity: 12, value: '30', subtitle: '可分解' },
  { id: 'orb', name: '脉冲晶核', rarity: 'rare' as const, quantity: 2, value: '128', subtitle: '能量道具' },
];

export function Demo() {
  return (
    <GameUiProvider>
      <RewardReveal title="战斗结算" items={items} state="revealed" actionLabel="领取" />
    </GameUiProvider>
  );
}`,
    api: [
      row('title', '面板标题。', 'Panel title.', 'string', '-'),
      row('items', '奖励项数组。', 'Reward item array.', 'LootStackItem[]', '-'),
      row('state', '揭示状态。', 'Reveal state.', "'sealed' | 'revealed' | 'claimed'", "'sealed'"),
      row('actionLabel', '操作按钮文案。', 'Action button label.', 'string', '-'),
      row('onAction', '操作回调。', 'Action callback.', '() => void', '-'),
      ...commonRows,
    ],
    tokenZh: '复用奖励、稀有度、按钮和状态 token。',
    tokenEn: 'Reuses reward, rarity, button, and state tokens.',
    Preview: RewardRevealPreview,
  },
};

const overviewOrder: PrimitiveId[] = [
  'ability-bar',
  'ability-tooltip',
  'cast-bar',
  'target-frame',
  'mini-map',
  'map-marker',
  'compass-bar',
  'location-tag',
  'dialogue-box',
  'choice-prompt',
  'quest-log',
  'notification-stack',
  'damage-number',
  'health-bar',
  'resource-meter',
  'combo-counter',
  'cooldown-slot',
  'status-badge',
  'objective-chip',
  'quest-tracker',
  'floating-toast',
  'rarity-border',
  'loot-card',
  'loot-stack',
  'reward-reveal',
];

export function PrimitiveOverview() {
  return (
    <>
      <div className="docs-card-grid">
        <a className="docs-component-link" href="/game-ui-lab/lab/">
          <span className="docs-component-link__meta">Live Lab</span>
          <strong>实验台 / Feedback Sandbox</strong>
          <Localized
            as="span"
            zh="进入完整实验台，查看 HUD、地图、叙事和通知组合效果。"
            en="Open the full lab for HUD, map, narrative, and notification composition."
          />
        </a>
      </div>
      <div className="docs-component-grid">
        {overviewOrder.map((id) => {
          const doc = docs[id];

          return (
            <a key={doc.id} className="docs-component-link" href={`/game-ui-lab/primitives/${doc.id}`}>
              <span className="docs-component-link__meta">
                {doc.categoryZh} / {doc.categoryEn}
              </span>
              <strong>{doc.name}</strong>
              <Localized as="span" zh={doc.summaryZh} en={doc.summaryEn} />
            </a>
          );
        })}
      </div>
    </>
  );
}

export function PrimitiveDocPage({ id }: { id: PrimitiveId }) {
  const doc = docs[id];
  const Preview = doc.Preview;

  return (
    <DocShell
      eyebrowZh={doc.categoryZh}
      eyebrowEn={doc.categoryEn}
      titleZh={doc.name}
      titleEn={doc.name}
      summaryZh={doc.summaryZh}
      summaryEn={doc.summaryEn}
    >
      <DemoBlock titleZh="代码演示" titleEn="Examples" code={doc.snippet}>
        <GameUiProvider className="docs-game-stage">
          <Preview />
        </GameUiProvider>
      </DemoBlock>

      <section className="docs-product-section">
        <Localized as="h2" className="docs-product-heading" zh="API" en="API" />
        <ApiTable rows={doc.api} />
      </section>

      <section className="docs-product-section">
        <Localized as="h2" className="docs-product-heading" zh="Design Token" en="Design Token" />
        <Localized as="p" className="docs-product-text" zh={doc.tokenZh} en={doc.tokenEn} />
      </section>

      <section className="docs-product-section">
        <a className="docs-component-link" href="/game-ui-lab/lab/">
          <span className="docs-component-link__meta">Live Lab</span>
          <strong>进入实验台</strong>
          <Localized
            as="span"
            zh="查看这个组件和其它 primitives 在完整 HUD 场景里的组合效果。"
            en="See this primitive composed with the rest of the HUD scene."
          />
        </a>
      </section>
    </DocShell>
  );
}

export function DemoBlock({
  children,
  code,
  titleZh,
  titleEn,
}: {
  children: ReactNode;
  code: string;
  titleZh: string;
  titleEn: string;
}) {
  return (
    <section className="docs-demo-block">
      <header className="docs-demo-block__header">
        <Localized as="h2" className="docs-product-heading" zh={titleZh} en={titleEn} />
      </header>
      <div className="docs-demo-block__preview">{children}</div>
      <pre className="docs-demo-block__code"><code>{code}</code></pre>
    </section>
  );
}

function ApiTable({ rows }: { rows: ApiRow[] }) {
  return (
    <div className="docs-api-table">
      <table>
        <thead>
          <tr>
            <Localized as="th" zh="属性" en="Property" />
            <Localized as="th" zh="说明" en="Description" />
            <Localized as="th" zh="类型" en="Type" />
            <Localized as="th" zh="默认值" en="Default" />
          </tr>
        </thead>
        <tbody>
          {rows.map((item) => (
            <tr key={item.prop}>
              <td><code>{item.prop}</code></td>
              <Localized as="td" zh={item.descriptionZh} en={item.descriptionEn} />
              <td><code>{item.type}</code></td>
              <td><code>{item.defaultValue}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function row(prop: string, descriptionZh: string, descriptionEn: string, type: string, defaultValue: string): ApiRow {
  return { defaultValue, descriptionEn, descriptionZh, prop, type };
}

function AbilityBarPreview() {
  return <AbilityBar abilities={abilityItems} />;
}

function AbilityTooltipPreview() {
  return <AbilityTooltip name="闪现" description="短距离位移，穿过危险区域。" cost="20 MP" cooldown="8秒" />;
}

function CastBarPreview() {
  return <CastBar label="奥术光束" progress={0.72} state="channeling" />;
}

function TargetFramePreview() {
  return (
    <TargetFrame
      name="遗迹守卫"
      faction="boss"
      level="Lv.18"
      health={420}
      maxHealth={800}
      statuses={[{ label: '灼烧', tone: 'debuff', duration: '8秒' }]}
    />
  );
}

function MiniMapPreview() {
  return <MiniMap label="区域地图" markers={mapMarkers} />;
}

function MapMarkerPreview() {
  return (
    <div style={{ position: 'relative', width: 220, height: 120 }}>
      <MapMarker x={48} y={28} tone="objective" label="信标" active />
    </div>
  );
}

function CompassBarPreview() {
  return <CompassBar heading={90} markers={compassMarkers} />;
}

function LocationTagPreview() {
  return <LocationTag name="灰烬门" zone="北区" danger="hostile" status="敌方巡逻" />;
}

function DialogueBoxPreview() {
  return <DialogueBox speaker="Mira" text="守住这道门，信标马上就会点亮。" tone="ally" />;
}

function ChoicePromptPreview() {
  return <ChoicePrompt title="选择路线" choices={choiceItems} />;
}

function QuestLogPreview() {
  return <QuestLog activeId="signal" quests={questLogItems} />;
}

function NotificationStackPreview() {
  return <NotificationStack notifications={notificationItems} limit={3} />;
}

function DamageNumberPreview() {
  return (
    <div className="docs-demo-row docs-demo-row--center">
      <DamageNumber value="128" variant="critical" prefix="暴击" />
      <DamageNumber value="42" variant="heal" prefix="治疗" />
      <DamageNumber value="MISS" variant="miss" />
    </div>
  );
}

function HealthBarPreview() {
  return (
    <div className="docs-demo-stack">
      <HealthBar value={97} max={120} shield={18} label="生命" showValue />
      <HealthBar value={420} max={800} tone="boss" label="Boss" showValue />
    </div>
  );
}

function ResourceMeterPreview() {
  return (
    <div className="docs-demo-stack">
      <ResourceMeter value={67} max={90} kind="mana" label="法力" />
      <ResourceMeter value={44} max={100} kind="stamina" label="耐力" />
    </div>
  );
}

function ComboCounterPreview() {
  return <ComboCounter count={12} label="连击" tier="稳定连击" />;
}

function CooldownSlotPreview() {
  return (
    <div className="docs-demo-row">
      <CooldownSlot progress={0.62} label="爆发" icon="Q" />
      <CooldownSlot progress={1} label="闪避" icon="E" />
      <CooldownSlot progress={0.2} label="禁用" icon="R" disabled />
    </div>
  );
}

function StatusBadgePreview() {
  return (
    <div className="docs-demo-row">
      <StatusBadge label="急速" tone="buff" count={3} duration="12秒" />
      <StatusBadge label="灼烧" tone="debuff" duration="8秒" />
      <StatusBadge label="打断" tone="warning" />
    </div>
  );
}

function ObjectiveChipPreview() {
  return (
    <div className="docs-demo-stack">
      <ObjectiveChip label="定位信标" state="complete" meta="主线" />
      <ObjectiveChip label="收集星辉碎片" progress={2} max={5} meta="支线" />
      <ObjectiveChip label="进入遗迹核心" state="locked" meta="未解锁" />
    </div>
  );
}

function QuestTrackerPreview() {
  return <QuestTracker title="信标追踪" subtitle="每日路线" objectives={questObjectives} />;
}

function FloatingToastPreview() {
  return (
    <div className="docs-demo-stack">
      <FloatingToast title="命中已触发" message="基础反馈已经开始播放。" variant="info" />
      <FloatingToast title="发现掉落" message="传奇掉落边框已激活。" variant="loot" />
    </div>
  );
}

function RarityBorderPreview() {
  return (
    <RarityBorder tone="legendary">
      <div className="docs-rarity-sample">
        <strong>传奇掉落</strong>
        <span>适合把奖励结果收在一个明确容器里。</span>
      </div>
    </RarityBorder>
  );
}

function LootCardPreview() {
  return (
    <LootCard
      name="星辉碎片"
      rarity="epic"
      quantity={3}
      value="240"
      subtitle="制作材料"
    />
  );
}

function LootStackPreview() {
  return <LootStack items={lootItems} label="掉落栈" limit={3} />;
}

function RewardRevealPreview() {
  return <RewardReveal title="战斗结算" items={lootItems} state="revealed" actionLabel="领取" />;
}
