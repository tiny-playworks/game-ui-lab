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
    name: 'AbilityBar',
    usage: '<AbilityBar abilities={abilities} />',
    states: ['ready', 'cooling', 'locked'],
    props: [
      { name: 'abilities', type: 'AbilityBarItem[]', description: 'Ability slots rendered in order.' },
      { name: 'label', type: 'string', description: 'Accessible group label.' },
    ],
  },
  {
    name: 'AbilityTooltip',
    usage: '<AbilityTooltip name="Blink" description="Dash through danger." cost="20 MP" cooldown="8s" />',
    states: ['ready', 'cooling', 'locked'],
    props: [
      { name: 'name', type: 'string', description: 'Ability name.' },
      { name: 'description', type: 'ReactNode', description: 'Ability description.' },
      { name: 'cost', type: 'ReactNode', description: 'Optional cost detail.' },
      { name: 'cooldown', type: 'ReactNode', description: 'Optional cooldown detail.' },
    ],
  },
  {
    name: 'CastBar',
    usage: '<CastBar label="Arc Beam" progress={0.72} state="channeling" />',
    states: ['casting', 'channeling', 'complete', 'interrupted'],
    props: [
      { name: 'label', type: 'string', description: 'Cast label.' },
      { name: 'progress', type: 'number', description: 'Progress from 0 to 1.' },
      { name: 'state', type: 'casting | channeling | complete | interrupted', description: 'Cast state.' },
    ],
  },
  {
    name: 'TargetFrame',
    usage: '<TargetFrame name="Warden" faction="boss" health={420} maxHealth={800} />',
    states: ['ally', 'enemy', 'neutral', 'boss'],
    props: [
      { name: 'name', type: 'string', description: 'Target name.' },
      { name: 'health', type: 'number', description: 'Current health.' },
      { name: 'maxHealth', type: 'number', description: 'Maximum health.' },
      { name: 'statuses', type: 'StatusBadgeProps[]', description: 'Optional target statuses.' },
    ],
  },
  {
    name: 'MiniMap',
    usage: '<MiniMap label="Sector map" markers={markers} />',
    states: ['ally markers', 'enemy markers', 'objective markers'],
    props: [
      { name: 'markers', type: 'MiniMapMarker[]', description: 'Map markers using 0-100 coordinates.' },
      { name: 'label', type: 'string', description: 'Accessible map label.' },
    ],
  },
  {
    name: 'MapMarker',
    usage: '<MapMarker x={48} y={28} tone="objective" label="Beacon" active />',
    states: ['ally', 'enemy', 'objective', 'neutral'],
    props: [
      { name: 'x', type: 'number', description: 'Horizontal coordinate from 0 to 100.' },
      { name: 'y', type: 'number', description: 'Vertical coordinate from 0 to 100.' },
      { name: 'tone', type: 'ally | enemy | objective | neutral', description: 'Marker tone.' },
    ],
  },
  {
    name: 'CompassBar',
    usage: '<CompassBar heading={90} markers={markers} />',
    states: ['heading', 'objective marker', 'enemy marker'],
    props: [
      { name: 'heading', type: 'number', description: 'Current heading in degrees.' },
      { name: 'markers', type: 'CompassMarker[]', description: 'Compact compass markers.' },
    ],
  },
  {
    name: 'LocationTag',
    usage: '<LocationTag name="Ash Gate" zone="North" danger="hostile" status="Enemy patrol" />',
    states: ['safe', 'contested', 'hostile'],
    props: [
      { name: 'name', type: 'string', description: 'Location name.' },
      { name: 'zone', type: 'string', description: 'Optional zone label.' },
      { name: 'danger', type: 'safe | contested | hostile', description: 'Danger level.' },
    ],
  },
  {
    name: 'DialogueBox',
    usage: '<DialogueBox speaker="Mira" text="Hold the gate." tone="ally" />',
    states: ['neutral', 'ally', 'warning'],
    props: [
      { name: 'speaker', type: 'string', description: 'Speaker name.' },
      { name: 'text', type: 'ReactNode', description: 'Dialogue text.' },
      { name: 'portrait', type: 'ReactNode', description: 'Optional portrait slot.' },
    ],
  },
  {
    name: 'ChoicePrompt',
    usage: '<ChoicePrompt title="Choose route" choices={choices} />',
    states: ['enabled', 'disabled'],
    props: [
      { name: 'title', type: 'string', description: 'Choice prompt title.' },
      { name: 'choices', type: 'ChoicePromptOption[]', description: 'Choice options.' },
      { name: 'onChoice', type: '(id: string) => void', description: 'Optional click callback.' },
    ],
  },
  {
    name: 'QuestLog',
    usage: '<QuestLog activeId="signal" quests={quests} />',
    states: ['quest list', 'tracked quest'],
    props: [
      { name: 'quests', type: 'QuestLogQuest[]', description: 'Quest tracker groups.' },
      { name: 'activeId', type: 'string', description: 'Optional tracked quest id.' },
    ],
  },
  {
    name: 'NotificationStack',
    usage: '<NotificationStack notifications={notifications} limit={3} />',
    states: ['info', 'success', 'warning', 'loot', 'overflow'],
    props: [
      { name: 'notifications', type: 'NotificationStackItem[]', description: 'Toast-like notifications.' },
      { name: 'limit', type: 'number', description: 'Maximum visible notifications.' },
    ],
  },
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
    name: 'ObjectiveChip',
    usage: '<ObjectiveChip label="Collect shards" progress={2} max={5} meta="Side quest" />',
    states: ['active', 'complete', 'locked', 'progress'],
    props: [
      { name: 'label', type: 'string', description: 'Objective label.' },
      { name: 'state', type: 'active | complete | locked', description: 'Objective completion state.' },
      { name: 'progress', type: 'number', description: 'Optional current progress.' },
      { name: 'max', type: 'number', description: 'Optional maximum progress.' },
      { name: 'meta', type: 'ReactNode', description: 'Compact secondary detail.' },
    ],
  },
  {
    name: 'QuestTracker',
    usage: '<QuestTracker title="Signal Hunt" subtitle="Daily route" objectives={objectives} />',
    states: ['active objectives', 'completed count', 'locked objectives'],
    props: [
      { name: 'title', type: 'string', description: 'Quest tracker title.' },
      { name: 'subtitle', type: 'string', description: 'Optional tracker subtitle.' },
      { name: 'objectives', type: 'QuestTrackerObjective[]', description: 'Objective list rendered as chips.' },
      { name: 'className', type: 'string', description: 'Optional class name for layout control.' },
    ],
  },
  {
    name: 'LootCard',
    usage: '<LootCard name="Neon Shard" rarity="epic" quantity={3} value="240g" />',
    states: ['common', 'rare', 'epic', 'legendary', 'selected'],
    props: [
      { name: 'name', type: 'string', description: 'Loot item name.' },
      { name: 'rarity', type: 'common | rare | epic | legendary', description: 'Loot rarity tone.' },
      { name: 'quantity', type: 'number', description: 'Optional stack quantity.' },
      { name: 'value', type: 'string', description: 'Optional compact value text.' },
      { name: 'subtitle', type: 'string', description: 'Optional item category or source.' },
    ],
  },
  {
    name: 'LootStack',
    usage: '<LootStack label="Wave drops" items={items} limit={3} />',
    states: ['empty', 'capped', 'overflow'],
    props: [
      { name: 'items', type: 'LootStackItem[]', description: 'Loot items rendered as compact cards.' },
      { name: 'label', type: 'string', description: 'Accessible list label and stack heading.' },
      { name: 'limit', type: 'number', description: 'Maximum visible items before the overflow marker.' },
      { name: 'className', type: 'string', description: 'Optional class name for layout control.' },
    ],
  },
  {
    name: 'RewardReveal',
    usage: '<RewardReveal title="Cache unlocked" state="revealed" items={items} actionLabel="Claim" />',
    states: ['sealed', 'revealed', 'claimed'],
    props: [
      { name: 'title', type: 'string', description: 'Reward panel title.' },
      { name: 'items', type: 'LootStackItem[]', description: 'Reward contents shown in the reveal panel.' },
      { name: 'state', type: 'sealed | revealed | claimed', description: 'Reveal flow state.' },
      { name: 'actionLabel', type: 'string', description: 'Optional claim or continue action label.' },
      { name: 'onAction', type: '() => void', description: 'Optional action handler.' },
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
