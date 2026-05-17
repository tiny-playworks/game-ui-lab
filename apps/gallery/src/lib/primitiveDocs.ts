export interface PrimitivePropDoc {
  name: string;
  type: string;
  description: string;
}

export interface PrimitiveDoc {
  name: string;
  usage: string;
  states: string[];
  props: PrimitivePropDoc[];
}

export const primitiveDocs: PrimitiveDoc[] = [
  {
    name: 'DamageNumber',
    usage: '<DamageNumber value="512" variant="critical" prefix="CRIT" />',
    states: ['damage', 'critical', 'heal', 'miss'],
    props: [
      { name: 'value', type: 'number | string', description: 'Displayed combat value or text.' },
      { name: 'variant', type: 'damage | heal | critical | miss', description: 'Visual tone and motion profile.' },
      { name: 'prefix', type: 'string', description: 'Optional small label before the value.' },
      { name: 'size', type: 'number', description: 'Optional pixel size override.' },
    ],
  },
  {
    name: 'FloatingToast',
    usage: '<FloatingToast title="Loot" message="Epic shard acquired" variant="loot" />',
    states: ['info', 'success', 'warning', 'loot'],
    props: [
      { name: 'title', type: 'string', description: 'Optional short toast title.' },
      { name: 'message', type: 'ReactNode', description: 'Main feedback message.' },
      { name: 'variant', type: 'info | success | warning | loot', description: 'Feedback tone.' },
      { name: 'icon', type: 'ReactNode', description: 'Optional icon override.' },
    ],
  },
  {
    name: 'ComboCounter',
    usage: '<ComboCounter count={18} />',
    states: ['opening', 'clean combo', 'fever streak', 'overdrive'],
    props: [
      { name: 'count', type: 'number', description: 'Current combo count.' },
      { name: 'label', type: 'string', description: 'Optional counter label.' },
      { name: 'tier', type: 'string', description: 'Optional tier text override.' },
      { name: 'active', type: 'boolean', description: 'Controls active visual emphasis.' },
    ],
  },
  {
    name: 'HealthBar',
    usage: '<HealthBar value={82} max={120} shield={24} label="Pilot HP" showValue />',
    states: ['empty', 'full', 'shielded'],
    props: [
      { name: 'value', type: 'number', description: 'Current health amount.' },
      { name: 'max', type: 'number', description: 'Maximum health amount.' },
      { name: 'shield', type: 'number', description: 'Optional temporary shield layer.' },
      { name: 'tone', type: 'hero | danger | boss', description: 'HUD bar tone.' },
      { name: 'showValue', type: 'boolean', description: 'Shows the numeric value readout.' },
    ],
  },
  {
    name: 'ResourceMeter',
    usage: '<ResourceMeter value={52} max={90} kind="mana" label="Arcane" />',
    states: ['mana', 'energy', 'stamina'],
    props: [
      { name: 'value', type: 'number', description: 'Current resource amount.' },
      { name: 'max', type: 'number', description: 'Maximum resource amount.' },
      { name: 'kind', type: 'mana | energy | stamina', description: 'Resource color and default label.' },
      { name: 'label', type: 'string', description: 'Optional label override.' },
    ],
  },
  {
    name: 'CooldownSlot',
    usage: '<CooldownSlot progress={0.58} label="Burst" icon="Q" />',
    states: ['ready', 'cooling', 'disabled'],
    props: [
      { name: 'progress', type: 'number', description: 'Readiness from 0 to 1.' },
      { name: 'label', type: 'string', description: 'Ability label and accessible name.' },
      { name: 'icon', type: 'ReactNode', description: 'Compact slot icon.' },
      { name: 'ready', type: 'boolean', description: 'Optional ready state override.' },
      { name: 'disabled', type: 'boolean', description: 'Marks the slot unavailable.' },
    ],
  },
  {
    name: 'StatusBadge',
    usage: '<StatusBadge label="Haste" tone="buff" count={3} duration="12s" />',
    states: ['buff', 'debuff', 'neutral', 'warning'],
    props: [
      { name: 'label', type: 'string', description: 'Status name.' },
      { name: 'tone', type: 'buff | debuff | neutral | warning', description: 'Status tone.' },
      { name: 'count', type: 'number', description: 'Optional stack count.' },
      { name: 'duration', type: 'string', description: 'Optional remaining duration text.' },
    ],
  },
  {
    name: 'RarityBorder',
    usage: '<RarityBorder tone="legendary">Legendary cache</RarityBorder>',
    states: ['common', 'rare', 'epic', 'legendary'],
    props: [
      { name: 'children', type: 'ReactNode', description: 'Framed content.' },
      { name: 'tone', type: 'common | rare | epic | legendary', description: 'Rarity frame tone.' },
      { name: 'active', type: 'boolean', description: 'Controls sweep animation.' },
    ],
  },
  {
    name: 'GameUiProvider',
    usage: '<GameUiProvider><YourHud /></GameUiProvider>',
    states: ['default theme'],
    props: [
      { name: 'children', type: 'ReactNode', description: 'Game UI subtree.' },
      { name: 'theme', type: 'default', description: 'Theme token scope.' },
      { name: 'className', type: 'string', description: 'Optional root class.' },
    ],
  },
];
