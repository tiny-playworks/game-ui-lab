import type { JSX, ReactNode } from 'react';
import {
  ComboCounter,
  CooldownSlot,
  DamageNumber,
  FloatingToast,
  GameUiProvider,
  HealthBar,
  LootCard,
  LootStack,
  RarityBorder,
  ResourceMeter,
  RewardReveal,
  StatusBadge,
} from '@tiny-playworks/game-ui';
import { DocShell } from './doc-shell';
import { Localized, useDocsLocale } from './locale';

type PrimitiveId =
  | 'damage-number'
  | 'health-bar'
  | 'resource-meter'
  | 'combo-counter'
  | 'cooldown-slot'
  | 'status-badge'
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
  whenZh: string;
  whenEn: string;
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

const commonRows: ApiRow[] = [
  row('className', '自定义类名。', 'Custom class name.', 'string', '-'),
];

const docs: Record<PrimitiveId, PrimitiveDoc> = {
  'damage-number': {
    id: 'damage-number',
    name: 'DamageNumber',
    categoryZh: '战斗反馈',
    categoryEn: 'Combat feedback',
    summaryZh: '用于伤害、治疗、暴击和 Miss 的即时飘字。',
    summaryEn: 'Instant floating numbers for damage, healing, critical hits, and misses.',
    whenZh: '当玩家需要马上知道一次命中结果时使用。不要把它当普通文本标签。',
    whenEn: 'Use it when players need immediate hit feedback. Do not use it as ordinary text.',
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
    whenZh: '适合角色、Boss、单位血量这类持续状态。',
    whenEn: 'Use it for persistent HP states such as characters, bosses, and units.',
    snippet: `import { HealthBar, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <HealthBar value={97} max={120} shield={18} label="生命" showValue />
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
    whenZh: '适合需要持续读取和消耗的资源。',
    whenEn: 'Use it for resources that are continuously read and spent.',
    snippet: `import { ResourceMeter, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <ResourceMeter value={67} max={90} kind="mana" label="法力" />
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
    whenZh: '适合短时间内连续触发的战斗反馈。',
    whenEn: 'Use it for short-window combat chains.',
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
    whenZh: '适合技能栏、快捷键和主动能力。',
    whenEn: 'Use it for skill bars, hotkeys, and active abilities.',
    snippet: `import { CooldownSlot, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <CooldownSlot progress={0.62} label="爆发" icon="Q" />
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
    whenZh: '适合小面积状态信息，不适合承载长文本。',
    whenEn: 'Use it for compact status information, not long messages.',
    snippet: `import { StatusBadge, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <StatusBadge label="急速" tone="buff" count={3} duration="12秒" />
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
  'floating-toast': {
    id: 'floating-toast',
    name: 'FloatingToast',
    categoryZh: '反馈',
    categoryEn: 'Feedback',
    summaryZh: '短消息提示，用于即时反馈。',
    summaryEn: 'A short toast for immediate feedback.',
    whenZh: '适合掉落、成功、警告等轻量反馈。',
    whenEn: 'Use it for lightweight loot, success, and warning feedback.',
    snippet: `import { FloatingToast, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <FloatingToast title="命中已触发" message="基础反馈已经开始播放。" variant="info" />
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
    whenZh: '适合强调稀有度层级的容器。',
    whenEn: 'Use it for containers that need rarity hierarchy.',
    snippet: `import { RarityBorder, GameUiProvider } from '@tiny-playworks/game-ui';

export function Demo() {
  return (
    <GameUiProvider>
      <RarityBorder tone="legendary">
        <div>传奇掉落</div>
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
    whenZh: '适合背包、掉落列表和奖励清单。',
    whenEn: 'Use it in inventories, drop lists, and reward summaries.',
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
    whenZh: '适合战斗结果、宝箱内容和一次性奖励列表。',
    whenEn: 'Use it for battle results, chest contents, and reward lists.',
    snippet: `import { LootStack, GameUiProvider } from '@tiny-playworks/game-ui';

const items = [
  { id: 'shard', name: '星辉碎片', rarity: 'epic', quantity: 3 },
  { id: 'core', name: '共鸣核心', rarity: 'legendary' },
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
    whenZh: '适合结算、开箱、领取奖励这些完整反馈。',
    whenEn: 'Use it for complete reward flows such as results, chests, and claims.',
    snippet: `import { RewardReveal, GameUiProvider } from '@tiny-playworks/game-ui';

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
  'damage-number',
  'health-bar',
  'resource-meter',
  'combo-counter',
  'cooldown-slot',
  'status-badge',
  'floating-toast',
  'rarity-border',
  'loot-card',
  'loot-stack',
  'reward-reveal',
];

export function PrimitiveOverview() {
  return (
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
      <section className="docs-product-section">
        <Localized as="h2" className="docs-product-heading" zh="何时使用" en="When To Use" />
        <Localized as="p" className="docs-product-text" zh={doc.whenZh} en={doc.whenEn} />
      </section>

      <DemoBlock titleZh="代码演示" titleEn="Examples" code={doc.snippet}>
        <GameUiProvider>
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
