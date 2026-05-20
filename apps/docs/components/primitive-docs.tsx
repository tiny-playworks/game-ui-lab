import type { JSX, ReactNode } from 'react';
import {
  AbilityBar,
  AbilityTooltip,
  BuffBar,
  CastBar,
  ChatFeed,
  ChoicePrompt,
  ComboCounter,
  CompassBar,
  CooldownSlot,
  CurrencyBar,
  DamageNumber,
  DeathScreen,
  DialogueBox,
  FloatingToast,
  GameTimer,
  GameUiProvider,
  HealthBar,
  InventoryGrid,
  LoadingOverlay,
  LocationTag,
  LootCard,
  LootStack,
  MapMarker,
  MiniMap,
  NotificationStack,
  ObjectiveChip,
  PartyFrame,
  PauseMenu,
  QuestLog,
  QuestTracker,
  RarityBorder,
  ResourceMeter,
  RewardReveal,
  ShopPanel,
  StatusBadge,
  TargetFrame,
} from '@tiny-playworks/game-ui';
import { DocShell } from './doc-shell';
import { Localized, useDocsLocale } from './locale';
import { primitiveSnippets } from './primitive-snippets';

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
  | 'reward-reveal'
  | 'buff-bar'
  | 'inventory-grid'
  | 'currency-bar'
  | 'party-frame'
  | 'pause-menu'
  | 'game-timer'
  | 'loading-overlay'
  | 'death-screen'
  | 'shop-panel'
  | 'chat-feed';

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
  snippetZh: string;
  snippetEn: string;
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

const classAndStyleRows: ApiRow[] = [
  ...commonRows,
  row('style', '内联样式。', 'Inline styles.', 'CSSProperties', '-'),
];

const collectionRendererType = 'GameUiCollectionRenderer<T>';

const overflowLabelRow = row(
  'overflowLabel',
  '溢出数量文案。',
  'Overflow count label.',
  '(count: number) => ReactNode',
  '默认 +N more',
);

const docs: Record<PrimitiveId, PrimitiveDoc> = {
  'ability-bar': {
    id: 'ability-bar',
    name: 'AbilityBar',
    categoryZh: '战斗 HUD',
    categoryEn: 'Combat HUD',
    summaryZh: '技能栏，组合技能冷却、就绪和锁定状态。',
    summaryEn: 'An ability bar for cooldown, ready, and locked states.',
    ...primitiveSnippets['ability-bar'],
    api: [
      row('abilities', '技能数组。', 'Ability item array.', 'AbilityBarItem[]', '-'),
      row('selectedId', '当前选中的技能 id。', 'Selected ability id.', 'string', '-'),
      row('onAbilityClick', '技能点击回调。', 'Ability click callback.', '(id, item) => void', '-'),
      row('renderAbility', '自定义技能项渲染。', 'Custom ability renderer.', collectionRendererType.replace('<T>', '<AbilityBarItem>'), '-'),
      row('label', '可访问标签。', 'Accessible label.', 'string', "'Ability bar'"),
      ...classAndStyleRows,
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
    ...primitiveSnippets['ability-tooltip'],
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
    ...primitiveSnippets['cast-bar'],
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
    ...primitiveSnippets['target-frame'],
    api: [
      row('name', '目标名称。', 'Target name.', 'string', '-'),
      row('health', '当前生命。', 'Current health.', 'number', '-'),
      row('maxHealth', '最大生命。', 'Maximum health.', 'number', '-'),
      row('shield', '护盾值。', 'Shield value passed to HealthBar.', 'number', '0'),
      row('faction', '目标阵营。', 'Target faction.', "'ally' | 'enemy' | 'neutral' | 'boss'", "'enemy'"),
      row('level', '等级或副标题文案。', 'Level or subtitle text.', 'string', '-'),
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
    ...primitiveSnippets['mini-map'],
    api: [
      row('markers', '地图点数组。', 'Map marker array.', 'MiniMapMarker[]', '-'),
      row('selectedId', '当前选中的点位 id。', 'Selected marker id.', 'string', '-'),
      row('onMarkerSelect', '点位选择回调。', 'Marker select callback.', '(id, marker) => void', '-'),
      row(
        'renderMarker',
        '自定义点位渲染。',
        'Custom marker renderer.',
        collectionRendererType.replace('<T>', '<MiniMapMarker>'),
        '-',
      ),
      row('label', '地图标签。', 'Map label.', 'string', "'Mini map'"),
      ...classAndStyleRows,
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
    ...primitiveSnippets['map-marker'],
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
    ...primitiveSnippets['compass-bar'],
    api: [
      row('heading', '当前朝向角度。', 'Current heading in degrees.', 'number', '-'),
      row('markers', '方向标记数组。', 'Compass marker array.', 'CompassMarker[]', '[]'),
      row('range', '方向条可视角度范围。', 'Visible heading range.', 'number', '120'),
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
    ...primitiveSnippets['location-tag'],
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
    ...primitiveSnippets['dialogue-box'],
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
    ...primitiveSnippets['choice-prompt'],
    api: [
      row('title', '选择标题。', 'Choice prompt title.', 'string', '-'),
      row('choices', '选择项数组。', 'Choice option array.', 'ChoicePromptOption[]', '-'),
      row('selectedId', '当前选中项 id。', 'Selected choice id.', 'string', '-'),
      row('onChoice', '点击回调。', 'Click callback.', '(id, choice) => void', '-'),
      row('label', '可访问标签。', 'Accessible label.', 'string', 'title'),
      ...classAndStyleRows,
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
    summaryZh: '任务日志；runtime.openQuestLog 可在 LayerHost 模态层打开。',
    summaryEn: 'Quest log; runtime.openQuestLog opens it in the LayerHost modal layer.',
    ...primitiveSnippets['quest-log'],
    api: [
      row('quests', '任务数组。', 'Quest array.', 'QuestLogQuest[]', '-'),
      row('title', '日志标题。', 'Log title.', 'string', "'Quest log'"),
      row('activeId', '当前追踪任务 id。', 'Currently tracked quest id.', 'string', '-'),
      row('onActiveChange', '切换追踪任务回调。', 'Tracked quest change callback.', '(id, quest) => void', '-'),
      row(
        'renderQuest',
        '自定义任务项渲染。',
        'Custom quest renderer.',
        collectionRendererType.replace('<T>', '<QuestLogQuest>'),
        '-',
      ),
      row('questCountLabel', '任务数量文案。', 'Quest count label.', '(count) => ReactNode', '-'),
      row('activeLabel', '当前追踪标签。', 'Active quest label.', '(id) => ReactNode', '-'),
      ...classAndStyleRows,
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
    ...primitiveSnippets['notification-stack'],
    api: [
      row('notifications', '通知数组。', 'Notification array.', 'NotificationStackItem[]', '-'),
      row(
        'renderNotification',
        '自定义通知渲染。',
        'Custom notification renderer.',
        collectionRendererType.replace('<T>', '<NotificationStackItem>'),
        '-',
      ),
      overflowLabelRow,
      row('label', '可访问标签。', 'Accessible label.', 'string', "'Notifications'"),
      row('limit', '最多展示数量。', 'Maximum visible item count.', 'number', '3'),
      ...classAndStyleRows,
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
    ...primitiveSnippets['damage-number'],
    api: [
      row('value', '显示的数值或文本。', 'Number or text to render.', 'number | string', '-'),
      row('variant', '反馈类型。', 'Feedback variant.', "'damage' | 'heal' | 'critical' | 'miss'", "'damage'"),
      row('prefix', '数值前缀。', 'Prefix before the value.', 'string', '-'),
      row('size', '自定义字体尺寸，单位 px。', 'Custom font size in px.', 'number', '-'),
      row('motion', '动效模式。', 'Motion mode.', "'live' | 'static' | 'none'", "'live'"),
      row('onExitComplete', '飘字结束回调。', 'Called when live motion completes.', '() => void', '-'),
      ...classAndStyleRows,
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
    ...primitiveSnippets['health-bar'],
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
    ...primitiveSnippets['resource-meter'],
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
    ...primitiveSnippets['combo-counter'],
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
    ...primitiveSnippets['cooldown-slot'],
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
    ...primitiveSnippets['status-badge'],
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
    ...primitiveSnippets['objective-chip'],
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
    ...primitiveSnippets['quest-tracker'],
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
    ...primitiveSnippets['floating-toast'],
    api: [
      row('title', '标题。', 'Title text.', 'string', '-'),
      row('message', '消息内容。', 'Message content.', 'ReactNode', '-'),
      row('variant', '提示类型。', 'Toast variant.', "'info' | 'success' | 'warning' | 'loot'", "'info'"),
      row('icon', '自定义图标。', 'Custom icon.', 'ReactNode', '按 variant 推导'),
      row('action', '可选操作按钮。', 'Optional action button.', '{ label: string; onClick: () => void }', '-'),
      row('durationMs', '自动关闭时长（毫秒）。', 'Auto-dismiss duration in ms.', 'number', '-'),
      row('closable', '是否显示关闭按钮。', 'Whether to show a close button.', 'boolean', 'false'),
      row('onClose', '关闭回调。', 'Close callback.', '() => void', '-'),
      row('motion', '动效模式。', 'Motion mode.', "'live' | 'static' | 'none'", "'live'"),
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
    ...primitiveSnippets['rarity-border'],
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
    ...primitiveSnippets['loot-card'],
    api: [
      row('name', '物品名称。', 'Item name.', 'string', '-'),
      row('rarity', '物品稀有度。', 'Item rarity.', "'common' | 'rare' | 'epic' | 'legendary'", "'common'"),
      row('quantity', '数量。', 'Quantity.', 'number', '-'),
      row('value', '右侧数值。', 'Right-side value.', 'string', '-'),
      row('subtitle', '副标题。', 'Subtitle.', 'string', '-'),
      row('icon', '自定义图标。', 'Custom icon.', 'ReactNode', 'name 首字'),
      row('selected', '是否选中。', 'Whether the card is selected.', 'boolean', 'false'),
      row('onClick', '点击回调。', 'Click callback.', '() => void', '-'),
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
    ...primitiveSnippets['loot-stack'],
    api: [
      row('items', '掉落项数组。', 'Loot item array.', 'LootStackItem[]', '-'),
      row('selectedId', '当前选中的掉落 id。', 'Selected loot item id.', 'string', '-'),
      row('onItemSelect', '掉落选择回调。', 'Loot item select callback.', '(id, item) => void', '-'),
      row(
        'renderItem',
        '自定义掉落项渲染。',
        'Custom loot item renderer.',
        collectionRendererType.replace('<T>', '<LootStackItem>'),
        '-',
      ),
      overflowLabelRow,
      row('label', '列表标签。', 'Stack label.', 'string', "'Loot stack'"),
      row('limit', '最多展示数量。', 'Maximum visible item count.', 'number', '4'),
      ...classAndStyleRows,
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
    ...primitiveSnippets['reward-reveal'],
    api: [
      row('title', '面板标题。', 'Panel title.', 'string', '-'),
      row('items', '奖励项数组。', 'Reward item array.', 'LootStackItem[]', '-'),
      row('state', '揭示状态。', 'Reveal state.', "'sealed' | 'revealed' | 'claimed'", "'sealed'"),
      row('actionLabel', '操作按钮文案。', 'Action button label.', 'string', '-'),
      row('onAction', '操作回调。', 'Action callback.', '() => void', '-'),
      row('revealLabel', '揭示按钮文案。', 'Reveal button label.', 'string', '-'),
      row('claimLabel', '领取按钮文案。', 'Claim button label.', 'string', '-'),
      row('onReveal', '揭示奖励回调。', 'Reveal callback.', '() => void', '-'),
      row('onClaim', '领取奖励回调。', 'Claim callback.', '() => void', '-'),
      ...commonRows,
    ],
    tokenZh: '复用奖励、稀有度、按钮和状态 token。',
    tokenEn: 'Reuses reward, rarity, button, and state tokens.',
    Preview: RewardRevealPreview,
  },
  'buff-bar': {
    id: 'buff-bar',
    name: 'BuffBar',
    categoryZh: '状态',
    categoryEn: 'Status',
    summaryZh: '持久 Buff/Debuff 横条；可由 runtime.upsertBuff 驱动 LayerHost。',
    summaryEn: 'A persistent buff/debuff strip; runtime.upsertBuff drives LayerHost.',
    ...primitiveSnippets['buff-bar'],
    api: [
      row('buffs', '状态数组。', 'Buff array.', 'BuffBarBuff[]', '-'),
      row('limit', '最多展示数量。', 'Visible buff limit.', 'number', '6'),
      row('selectedId', '选中 id。', 'Selected buff id.', 'string', '-'),
      row('onBuffSelect', '选择回调。', 'Select callback.', '(id, buff) => void', '-'),
      row(
        'renderBuff',
        '自定义 Buff 渲染。',
        'Custom buff renderer.',
        collectionRendererType.replace('<T>', '<BuffBarBuff>'),
        '-',
      ),
      overflowLabelRow,
      row('label', '列表标签。', 'List label.', 'string', "'Buff bar'"),
      ...classAndStyleRows,
    ],
    tokenZh: '复用 StatusBadge 与 debuff token。',
    tokenEn: 'Reuses StatusBadge and debuff tokens.',
    Preview: BuffBarPreview,
  },
  'inventory-grid': {
    id: 'inventory-grid',
    name: 'InventoryGrid',
    categoryZh: '背包',
    categoryEn: 'Inventory',
    summaryZh: '背包/装备格子网格，支持 HTML5 拖拽交换（onSlotMove）。',
    summaryEn: 'Inventory grid with HTML5 drag-and-drop slot moves (onSlotMove).',
    ...primitiveSnippets['inventory-grid'],
    api: [
      row('slots', '格子数组。', 'Slot array.', 'InventoryGridSlot[]', '-'),
      row('columns', '列数。', 'Column count.', 'number', '4'),
      row('onSlotSelect', '选择回调。', 'Select callback.', '(id, slot) => void', '-'),
      row('selectedId', '当前选中格子 id。', 'Selected slot id.', 'string', '-'),
      row('onSlotMove', '拖拽交换回调。', 'Drag move callback.', '(fromId, toId, from, to) => void', '-'),
      row('draggingId', '正在拖拽的格子 id。', 'Dragging slot id.', 'string', '-'),
      row(
        'renderSlot',
        '自定义格子渲染。',
        'Custom slot renderer.',
        collectionRendererType.replace('<T>', '<InventoryGridSlot>'),
        '-',
      ),
      row('label', '可访问标签。', 'Accessible label.', 'string', "'Inventory'"),
      ...classAndStyleRows,
    ],
    tokenZh: '使用 inventory slot empty/equipped token。',
    tokenEn: 'Uses inventory slot empty and equipped tokens.',
    Preview: InventoryGridPreview,
  },
  'currency-bar': {
    id: 'currency-bar',
    name: 'CurrencyBar',
    categoryZh: '经济',
    categoryEn: 'Economy',
    summaryZh: '顶部货币条。',
    summaryEn: 'A compact top-bar currency readout.',
    ...primitiveSnippets['currency-bar'],
    api: [
      row('currencies', '货币数组。', 'Currency array.', 'CurrencyBarEntry[]', '-'),
      row('compact', '紧凑模式。', 'Compact layout.', 'boolean', 'false'),
      ...classAndStyleRows,
    ],
    tokenZh: '使用 economy gold/gem/token token。',
    tokenEn: 'Uses economy gold, gem, and token tones.',
    Preview: CurrencyBarPreview,
  },
  'party-frame': {
    id: 'party-frame',
    name: 'PartyFrame',
    categoryZh: '小队',
    categoryEn: 'Party',
    summaryZh: '小队成员状态列表；runtime.setParty 可驱动 LayerHost。',
    summaryEn: 'Party member list; use runtime.setParty with LayerHost.',
    ...primitiveSnippets['party-frame'],
    api: [
      row('members', '队员数组。', 'Member array.', 'PartyFrameMember[]', '-'),
      row('selectedId', '选中队员 id。', 'Selected member id.', 'string', '-'),
      row('onMemberSelect', '选择回调。', 'Select callback.', '(id, member) => void', '-'),
      row(
        'renderMember',
        '自定义队员渲染。',
        'Custom member renderer.',
        collectionRendererType.replace('<T>', '<PartyFrameMember>'),
        '-',
      ),
      row('label', '列表标签。', 'List label.', 'string', "'Party'"),
      ...classAndStyleRows,
    ],
    tokenZh: '使用 party offline/selected token。',
    tokenEn: 'Uses party offline and selected tokens.',
    Preview: PartyFramePreview,
  },
  'pause-menu': {
    id: 'pause-menu',
    name: 'PauseMenu',
    categoryZh: '系统',
    categoryEn: 'System',
    summaryZh: '暂停菜单覆盖层。',
    summaryEn: 'A pause menu overlay.',
    ...primitiveSnippets['pause-menu'],
    api: [
      row('open', '是否打开。', 'Whether open.', 'boolean', '-'),
      row('items', '菜单项。', 'Menu items.', 'PauseMenuItem[]', '-'),
      row('onResume', '继续回调。', 'Resume callback.', '() => void', '-'),
      row('onSelect', '菜单项回调。', 'Menu item callback.', '(id, item) => void', '-'),
      row('title', '标题。', 'Title.', 'string', "'Paused'"),
      ...classAndStyleRows,
    ],
    tokenZh: '使用 surface 与 danger token。',
    tokenEn: 'Uses surface and danger tokens.',
    Preview: PauseMenuPreview,
  },
  'game-timer': {
    id: 'game-timer',
    name: 'GameTimer',
    categoryZh: '系统',
    categoryEn: 'System',
    summaryZh: 'Boss/机制倒计时。',
    summaryEn: 'A boss or mechanic countdown timer.',
    ...primitiveSnippets['game-timer'],
    api: [
      row('remainingMs', '剩余毫秒。', 'Remaining milliseconds.', 'number', '-'),
      row('totalMs', '总时长毫秒。', 'Total milliseconds.', 'number', '-'),
      row('label', '计时器标签。', 'Timer label.', 'string', '-'),
      row('variant', '展示形态。', 'Display variant.', "'bar' | 'ring'", "'bar'"),
      row('warningThreshold', '进入警告态的剩余比例阈值。', 'Remaining ratio threshold for warning state.', 'number', '-'),
      ...classAndStyleRows,
    ],
    tokenZh: '使用 danger 警告态与 accent 进度 token。',
    tokenEn: 'Uses danger warning and accent progress tokens.',
    Preview: GameTimerPreview,
  },
  'loading-overlay': {
    id: 'loading-overlay',
    name: 'LoadingOverlay',
    categoryZh: '系统',
    categoryEn: 'System',
    summaryZh: '加载覆盖层。',
    summaryEn: 'A loading overlay screen.',
    ...primitiveSnippets['loading-overlay'],
    api: [
      row('open', '是否打开。', 'Whether open.', 'boolean', '-'),
      row('title', '标题。', 'Title.', 'string', "'Loading'"),
      row('message', '说明文案。', 'Message text.', 'string', '-'),
      row('progress', '可选进度 0-1。', 'Optional progress 0-1.', 'number', '-'),
      ...classAndStyleRows,
    ],
    tokenZh: '使用 accent 进度与 surface token。',
    tokenEn: 'Uses accent progress and surface tokens.',
    Preview: LoadingOverlayPreview,
  },
  'death-screen': {
    id: 'death-screen',
    name: 'DeathScreen',
    categoryZh: '系统',
    categoryEn: 'System',
    summaryZh: '死亡/失败屏。',
    summaryEn: 'A death or fail screen.',
    ...primitiveSnippets['death-screen'],
    api: [
      row('open', '是否打开。', 'Whether open.', 'boolean', '-'),
      row('title', '标题。', 'Title.', 'string', "'Defeated'"),
      row('message', '说明文案。', 'Message text.', 'string', '-'),
      row('actionLabel', '主按钮文案。', 'Primary button label.', 'string', "'Retry'"),
      row('onAction', '主操作回调。', 'Primary action callback.', '() => void', '-'),
      row('secondaryLabel', '次要按钮文案。', 'Secondary button label.', 'string', '-'),
      row('onSecondary', '次要操作回调。', 'Secondary action callback.', '() => void', '-'),
      ...classAndStyleRows,
    ],
    tokenZh: '使用 danger 与 primary button token。',
    tokenEn: 'Uses danger and primary button tokens.',
    Preview: DeathScreenPreview,
  },
  'shop-panel': {
    id: 'shop-panel',
    name: 'ShopPanel',
    categoryZh: '经济',
    categoryEn: 'Economy',
    summaryZh: '轻量商店面板；runtime shop:open 由 LayerHost 渲染。',
    summaryEn: 'Lightweight shop; LayerHost renders runtime shop:open.',
    ...primitiveSnippets['shop-panel'],
    api: [
      row('title', '商店标题。', 'Shop title.', 'string', '-'),
      row('items', '商品数组。', 'Shop items.', 'ShopPanelItem[]', '-'),
      row('currencies', '货币条。', 'Currency bar entries.', 'CurrencyBarEntry[]', '[]'),
      row('selectedId', '当前选中商品 id。', 'Selected item id.', 'string', '-'),
      row('onPurchase', '购买回调。', 'Purchase callback.', '(id, item) => void', '-'),
      ...classAndStyleRows,
    ],
    tokenZh: '复用 LootCard 与 CurrencyBar token。',
    tokenEn: 'Reuses LootCard and CurrencyBar tokens.',
    Preview: ShopPanelPreview,
  },
  'chat-feed': {
    id: 'chat-feed',
    name: 'ChatFeed',
    categoryZh: '系统',
    categoryEn: 'System',
    summaryZh: '战斗日志/聊天 feed。',
    summaryEn: 'A combat log or chat feed.',
    ...primitiveSnippets['chat-feed'],
    api: [
      row('messages', '消息数组。', 'Message array.', 'ChatFeedMessage[]', '-'),
      row('limit', '可见条数。', 'Visible message limit.', 'number', '8'),
      row(
        'renderMessage',
        '自定义消息渲染。',
        'Custom message renderer.',
        collectionRendererType.replace('<T>', '<ChatFeedMessage>'),
        '-',
      ),
      overflowLabelRow,
      row('label', '可访问标签。', 'Accessible label.', 'string', "'Chat feed'"),
      ...classAndStyleRows,
    ],
    tokenZh: '使用 combat/loot/system tone token。',
    tokenEn: 'Uses combat, loot, and system tone tokens.',
    Preview: ChatFeedPreview,
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
  'buff-bar',
  'inventory-grid',
  'currency-bar',
  'party-frame',
  'pause-menu',
  'game-timer',
  'loading-overlay',
  'death-screen',
  'shop-panel',
  'chat-feed',
];

export function PrimitiveOverview() {
  return (
    <>
      <div className="docs-card-grid">
        <a className="docs-component-link" href="/game-ui-lab/lab/">
          <span className="docs-component-link__meta">Live Lab</span>
          <Localized as="strong" zh="实验台" en="Feedback Sandbox" />
          <Localized
            as="span"
            zh="进入完整实验台，查看 HUD、地图、叙事和通知组合效果。"
            en="Open the full lab for HUD, map, narrative, and notification composition."
          />
        </a>
        <a className="docs-component-link" href="/game-ui-lab/runtime/runtime-api">
          <span className="docs-component-link__meta">Runtime</span>
          <strong>Runtime API</strong>
          <Localized
            as="span"
            zh="分层 runtime 与 GameUiLayerHost 接线说明。"
            en="Layered runtime and GameUiLayerHost wiring reference."
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
  const { locale } = useDocsLocale();
  const snippet = locale === 'zh' ? doc.snippetZh : doc.snippetEn;

  return (
    <DocShell
      eyebrowZh={doc.categoryZh}
      eyebrowEn={doc.categoryEn}
      titleZh={doc.name}
      titleEn={doc.name}
      summaryZh={doc.summaryZh}
      summaryEn={doc.summaryEn}
    >
      <DemoBlock key={locale} titleZh="代码演示" titleEn="Examples" code={snippet}>
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
          <Localized as="strong" zh="进入实验台" en="Open Lab" />
          <Localized
            as="span"
            zh="查看这个组件和其它 primitives 在完整 HUD 场景里的组合效果。"
            en="See this primitive composed with the rest of the HUD scene."
          />
        </a>
        <a className="docs-component-link" href="/game-ui-lab/runtime/runtime-api">
          <span className="docs-component-link__meta">Runtime</span>
          <Localized as="strong" zh="Runtime API" en="Runtime API" />
          <Localized
            as="span"
            zh="查看哪些状态由 headless runtime 与 LayerHost 渲染。"
            en="See which states are driven by the headless runtime and LayerHost."
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

function useDemoZh() {
  const { locale } = useDocsLocale();
  return locale === 'zh';
}

function abilityItemsFor(isZh: boolean) {
  if (isZh) {
    return abilityItems;
  }

  return [
    { id: 'blink', label: 'Blink', icon: 'B', ready: true, cost: '20' },
    { id: 'burst', label: 'Burst', icon: 'Q', progress: 0.58, cost: '35' },
    { id: 'nova', label: 'Nova', icon: 'R', progress: 0.12, locked: true },
  ];
}

function lootItemsFor(isZh: boolean) {
  if (isZh) {
    return lootItems;
  }

  return [
    { id: 'shard', name: 'Astral Shard', rarity: 'epic' as const, quantity: 3, value: '240', subtitle: 'Crafting' },
    { id: 'core', name: 'Resonance Core', rarity: 'legendary' as const, quantity: 1, value: '999', subtitle: 'Boss drop' },
    { id: 'dust', name: 'Ember Dust', rarity: 'common' as const, quantity: 12, value: '30', subtitle: 'Salvage' },
    { id: 'orb', name: 'Pulse Core', rarity: 'rare' as const, quantity: 2, value: '128', subtitle: 'Energy' },
  ];
}

function questObjectivesFor(isZh: boolean) {
  if (isZh) {
    return questObjectives;
  }

  return [
    { id: 'beacon', label: 'Locate beacon', state: 'complete' as const, meta: 'Main' },
    { id: 'shards', label: 'Collect shards', progress: 2, max: 5, meta: 'Side' },
    { id: 'vault', label: 'Enter vault core', state: 'locked' as const, meta: 'Locked' },
  ];
}

function mapMarkersFor(isZh: boolean) {
  if (isZh) {
    return mapMarkers;
  }

  return [
    { id: 'ally', x: 20, y: 38, tone: 'ally' as const, label: 'Ally' },
    { id: 'enemy', x: 72, y: 54, tone: 'enemy' as const, label: 'Patrol' },
    { id: 'objective', x: 48, y: 28, tone: 'objective' as const, label: 'Beacon', active: true },
  ];
}

function choiceItemsFor(isZh: boolean) {
  if (isZh) {
    return choiceItems;
  }

  return [
    { id: 'left', label: 'Take the left path', description: 'Safer, fewer rewards' },
    { id: 'right', label: 'Force the breach', description: 'Risky but faster' },
  ];
}

function notificationItemsFor(isZh: boolean) {
  if (isZh) {
    return notificationItems;
  }

  return [
    { id: 'loot', title: 'Loot found', message: 'Astral shard added to inventory.', variant: 'loot' as const },
    { id: 'warn', title: 'Enemy nearby', message: 'Patrol is closing in.', variant: 'warning' as const },
    { id: 'ready', title: 'Ability ready', message: 'Blink is available.', variant: 'success' as const },
    { id: 'route', title: 'Route updated', message: 'New beacon marked on the map.', variant: 'info' as const },
  ];
}

function AbilityBarPreview() {
  const isZh = useDemoZh();
  return <AbilityBar abilities={abilityItemsFor(isZh)} />;
}

function AbilityTooltipPreview() {
  const isZh = useDemoZh();
  return (
    <AbilityTooltip
      name={isZh ? '闪现' : 'Blink'}
      description={isZh ? '短距离位移，穿过危险区域。' : 'Short blink through danger zones.'}
      cost="20 MP"
      cooldown={isZh ? '8秒' : '8s'}
    />
  );
}

function CastBarPreview() {
  const isZh = useDemoZh();
  return <CastBar label={isZh ? '奥术光束' : 'Arc Beam'} progress={0.72} state="channeling" />;
}

function TargetFramePreview() {
  const isZh = useDemoZh();
  return (
    <TargetFrame
      name={isZh ? '遗迹守卫' : 'Warden'}
      faction="boss"
      level="Lv.18"
      health={420}
      maxHealth={800}
      statuses={[{ label: isZh ? '灼烧' : 'Burn', tone: 'debuff', duration: isZh ? '8秒' : '8s' }]}
    />
  );
}

function MiniMapPreview() {
  const isZh = useDemoZh();
  return <MiniMap label={isZh ? '区域地图' : 'Sector map'} markers={mapMarkersFor(isZh)} />;
}

function MapMarkerPreview() {
  const isZh = useDemoZh();
  return (
    <div style={{ position: 'relative', width: 220, height: 120 }}>
      <MapMarker x={48} y={28} tone="objective" label={isZh ? '信标' : 'Beacon'} active />
    </div>
  );
}

function CompassBarPreview() {
  const isZh = useDemoZh();
  const markers = isZh
    ? compassMarkers
    : [
        { id: 'gate', label: 'Gate', heading: 80, tone: 'objective' as const },
        { id: 'patrol', label: 'Enemy', heading: 220, tone: 'enemy' as const },
      ];
  return <CompassBar heading={90} markers={markers} />;
}

function LocationTagPreview() {
  const isZh = useDemoZh();
  return (
    <LocationTag
      name={isZh ? '灰烬门' : 'Ash Gate'}
      zone={isZh ? '北区' : 'North'}
      danger="hostile"
      status={isZh ? '敌方巡逻' : 'Enemy patrol'}
    />
  );
}

function DialogueBoxPreview() {
  const isZh = useDemoZh();
  return (
    <DialogueBox
      speaker="Mira"
      text={isZh ? '守住这道门，信标马上就会点亮。' : 'Hold this gate—the beacon lights in a moment.'}
      tone="ally"
    />
  );
}

function ChoicePromptPreview() {
  const isZh = useDemoZh();
  return <ChoicePrompt title={isZh ? '选择路线' : 'Choose a route'} choices={choiceItemsFor(isZh)} />;
}

function QuestLogPreview() {
  const isZh = useDemoZh();
  const objectives = questObjectivesFor(isZh);
  return (
    <QuestLog
      activeId="signal"
      quests={[
        {
          id: 'signal',
          title: isZh ? '信标追踪' : 'Signal hunt',
          subtitle: isZh ? '每日路线' : 'Daily route',
          objectives,
        },
      ]}
    />
  );
}

function NotificationStackPreview() {
  const isZh = useDemoZh();
  return <NotificationStack notifications={notificationItemsFor(isZh)} limit={3} />;
}

function DamageNumberPreview() {
  const isZh = useDemoZh();
  return (
    <div className="docs-demo-row docs-demo-row--center">
      <DamageNumber motion="static" value="128" variant="critical" prefix={isZh ? '暴击' : 'CRIT'} />
      <DamageNumber motion="static" value="42" variant="heal" prefix={isZh ? '治疗' : 'HEAL'} />
      <DamageNumber motion="static" value="MISS" variant="miss" />
    </div>
  );
}

function HealthBarPreview() {
  const isZh = useDemoZh();
  return (
    <div className="docs-demo-stack">
      <HealthBar value={97} max={120} shield={18} label={isZh ? '生命' : 'Health'} showValue />
      <HealthBar value={420} max={800} tone="boss" label="Boss" showValue />
    </div>
  );
}

function ResourceMeterPreview() {
  const isZh = useDemoZh();
  return (
    <div className="docs-demo-stack">
      <ResourceMeter value={67} max={90} kind="mana" label={isZh ? '法力' : 'Mana'} />
      <ResourceMeter value={44} max={100} kind="stamina" label={isZh ? '耐力' : 'Stamina'} />
    </div>
  );
}

function ComboCounterPreview() {
  const isZh = useDemoZh();
  return <ComboCounter count={12} label={isZh ? '连击' : 'Combo'} tier={isZh ? '稳定连击' : 'Steady chain'} />;
}

function CooldownSlotPreview() {
  const isZh = useDemoZh();
  return (
    <div className="docs-demo-row">
      <CooldownSlot progress={0.62} label={isZh ? '爆发' : 'Burst'} icon="Q" />
      <CooldownSlot progress={1} label={isZh ? '闪避' : 'Dodge'} icon="E" />
      <CooldownSlot progress={0.2} label={isZh ? '禁用' : 'Locked'} icon="R" disabled />
    </div>
  );
}

function StatusBadgePreview() {
  const isZh = useDemoZh();
  return (
    <div className="docs-demo-row">
      <StatusBadge label={isZh ? '急速' : 'Haste'} tone="buff" count={3} duration={isZh ? '12秒' : '12s'} />
      <StatusBadge label={isZh ? '灼烧' : 'Burn'} tone="debuff" duration={isZh ? '8秒' : '8s'} />
      <StatusBadge label={isZh ? '打断' : 'Interrupt'} tone="warning" />
    </div>
  );
}

function ObjectiveChipPreview() {
  const isZh = useDemoZh();
  const objectives = questObjectivesFor(isZh);
  return (
    <div className="docs-demo-stack">
      <ObjectiveChip label={objectives[0].label} state="complete" meta={objectives[0].meta} />
      <ObjectiveChip label={objectives[1].label} progress={2} max={5} meta={objectives[1].meta} />
      <ObjectiveChip label={objectives[2].label} state="locked" meta={objectives[2].meta} />
    </div>
  );
}

function QuestTrackerPreview() {
  const isZh = useDemoZh();
  return (
    <QuestTracker
      title={isZh ? '信标追踪' : 'Signal hunt'}
      subtitle={isZh ? '每日路线' : 'Daily route'}
      objectives={questObjectivesFor(isZh)}
    />
  );
}

function FloatingToastPreview() {
  const isZh = useDemoZh();
  const items = notificationItemsFor(isZh);
  return (
    <div className="docs-demo-stack">
      <FloatingToast title={items[0].title} message={items[0].message} variant={items[0].variant} />
      <FloatingToast title={items[3].title} message={items[3].message} variant={items[3].variant} />
    </div>
  );
}

function RarityBorderPreview() {
  return (
    <RarityBorder tone="legendary">
      <div className="docs-rarity-sample">
        <Localized as="strong" zh="传奇掉落" en="Legendary drop" />
        <Localized
          as="span"
          zh="适合把奖励结果收在一个明确容器里。"
          en="Wrap reward results in a clear container."
        />
      </div>
    </RarityBorder>
  );
}

function LootCardPreview() {
  const isZh = useDemoZh();
  const item = lootItemsFor(isZh)[0];
  return <LootCard name={item.name} rarity={item.rarity} quantity={item.quantity} value={item.value} subtitle={item.subtitle} />;
}

function LootStackPreview() {
  const isZh = useDemoZh();
  return <LootStack items={lootItemsFor(isZh)} label={isZh ? '掉落栈' : 'Loot stack'} limit={3} />;
}

function RewardRevealPreview() {
  const isZh = useDemoZh();
  return (
    <RewardReveal
      title={isZh ? '战斗结算' : 'Combat results'}
      items={lootItemsFor(isZh)}
      state="revealed"
      actionLabel={isZh ? '领取' : 'Claim'}
    />
  );
}

function BuffBarPreview() {
  const isZh = useDemoZh();
  return (
    <BuffBar
      buffs={[
        { id: 'haste', label: isZh ? '急速' : 'Haste', tone: 'buff', count: 2 },
        { id: 'burn', label: isZh ? '灼烧' : 'Burn', tone: 'debuff', duration: isZh ? '8秒' : '8s' },
      ]}
      limit={4}
    />
  );
}

function InventoryGridPreview() {
  const items = lootItemsFor(useDemoZh());
  return (
    <InventoryGrid
      columns={3}
      slots={[
        { id: 'a', item: items[0] },
        { id: 'b', locked: true },
        { id: 'c', equipped: true, item: items[1] },
      ]}
    />
  );
}

function CurrencyBarPreview() {
  const isZh = useDemoZh();
  return (
    <CurrencyBar
      currencies={[
        { id: 'gold', label: isZh ? '金币' : 'Gold', amount: 240, tone: 'gold', icon: 'G' },
        { id: 'gem', label: isZh ? '水晶' : 'Gems', amount: 12, tone: 'gem', icon: '◆' },
      ]}
    />
  );
}

function PartyFramePreview() {
  const isZh = useDemoZh();
  return (
    <PartyFrame
      members={[
        { id: 'pilot', name: isZh ? '领航员' : 'Pilot', health: 320, maxHealth: 420, shield: 24 },
        {
          id: 'support',
          name: isZh ? '支援' : 'Support',
          health: 180,
          maxHealth: 360,
          status: { label: isZh ? '护盾' : 'Shield', tone: 'buff' },
        },
      ]}
      selectedId="pilot"
    />
  );
}

function PauseMenuPreview() {
  const isZh = useDemoZh();
  return (
    <PauseMenu
      open
      title={isZh ? '暂停' : 'Paused'}
      items={[
        { id: 'settings', label: isZh ? '设置' : 'Settings' },
        { id: 'quit', label: isZh ? '退出' : 'Quit', danger: true },
      ]}
      onResume={() => undefined}
    />
  );
}

function GameTimerPreview() {
  return <GameTimer remainingMs={12000} totalMs={30000} label="Boss" variant="ring" warningThreshold={0.25} />;
}

function LoadingOverlayPreview() {
  const isZh = useDemoZh();
  return (
    <LoadingOverlay
      open
      title={isZh ? '加载中' : 'Loading'}
      message={isZh ? '同步世界状态' : 'Syncing world state'}
      progress={0.56}
    />
  );
}

function DeathScreenPreview() {
  const isZh = useDemoZh();
  return (
    <DeathScreen
      open
      title={isZh ? '战败' : 'Defeated'}
      message={isZh ? '再试一次，调整技能节奏。' : 'Try again and adjust your ability tempo.'}
      actionLabel={isZh ? '重试' : 'Retry'}
      secondaryLabel={isZh ? '返回营地' : 'Return to camp'}
    />
  );
}

function ShopPanelPreview() {
  const isZh = useDemoZh();
  return (
    <ShopPanel
      title={isZh ? '补给站' : 'Supply post'}
      items={[{ id: 'potion', name: isZh ? '治疗药剂' : 'Healing potion', rarity: 'rare', price: '20g' }]}
      currencies={[{ id: 'gold', label: isZh ? '金币' : 'Gold', amount: 120, tone: 'gold' }]}
    />
  );
}

function ChatFeedPreview() {
  const isZh = useDemoZh();
  return (
    <ChatFeed
      messages={[
        { id: '1', author: isZh ? '系统' : 'System', text: isZh ? 'Boss 已进入战斗' : 'Boss engaged', tone: 'combat' },
        { id: '2', author: isZh ? '队友' : 'Ally', text: isZh ? '左侧通道更安全' : 'Left path is safer', tone: 'party' },
      ]}
    />
  );
}
