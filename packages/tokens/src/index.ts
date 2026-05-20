export const gameUiTokenCssExport = '@tiny-playworks/tokens/css';

export type GameUiThemeName = 'default' | 'arcade';

export type GameUiTokenGroupId =
  | 'color'
  | 'rarity'
  | 'hud'
  | 'motion'
  | 'ability'
  | 'map'
  | 'narrative'
  | 'inventory'
  | 'party'
  | 'economy'
  | 'glow'
  | 'radius'
  | 'spacing';

export type GameUiTokenSampleKind = 'swatch' | 'text' | 'border' | 'motion' | 'shadow' | 'radius' | 'spacing';

type PandaTokenCategory = 'colors' | 'spacing' | 'radii' | 'shadows' | 'durations' | 'easings';

interface GameUiTokenDefinitionInput {
  key: string;
  name: string;
  cssVar: `--game-ui-${string}`;
  value: string;
  group: GameUiTokenGroupId;
  pandaCategory: PandaTokenCategory;
  pandaName: string;
  description: string;
  sample: {
    kind: GameUiTokenSampleKind;
    label?: string;
  };
}

const tokenDefinitions = [
  token('background', 'Background', '--game-ui-bg', '#080b13', 'color', 'colors', 'background', 'Base darkness for HUD scenes.', 'swatch'),
  token('surface', 'Surface', '--game-ui-surface', 'rgba(16, 23, 42, 0.78)', 'color', 'colors', 'surface', 'Default panel surface.', 'swatch'),
  token('surfaceStrong', 'Surface strong', '--game-ui-surface-strong', 'rgba(25, 35, 63, 0.92)', 'color', 'colors', 'surfaceStrong', 'Raised card and toast surface.', 'swatch'),
  token('line', 'Line', '--game-ui-line', 'rgba(129, 230, 217, 0.28)', 'color', 'colors', 'line', 'Subtle border tone.', 'border'),
  token('text', 'Text', '--game-ui-text', '#f8fafc', 'color', 'colors', 'text', 'Primary text tone.', 'text'),
  token('muted', 'Muted', '--game-ui-muted', '#9fb0ce', 'color', 'colors', 'muted', 'Secondary labels and meta text.', 'text'),
  token('accent', 'Accent', '--game-ui-accent', '#55f7d2', 'color', 'colors', 'accent', 'Primary active accent.', 'swatch'),
  token('accentStrong', 'Accent strong', '--game-ui-accent-strong', '#1ee6ff', 'color', 'colors', 'accentStrong', 'High-energy accent edge.', 'swatch'),
  token('danger', 'Danger', '--game-ui-danger', '#ff4d7d', 'color', 'colors', 'danger', 'Damage and hostile feedback.', 'swatch'),
  token('heal', 'Heal', '--game-ui-heal', '#5cff9d', 'color', 'colors', 'heal', 'Recovery and success feedback.', 'swatch'),
  token('critical', 'Critical', '--game-ui-critical', '#ffd166', 'color', 'colors', 'critical', 'Critical hit and combo highlight.', 'swatch'),
  token('miss', 'Miss', '--game-ui-miss', '#b7c0d8', 'color', 'colors', 'miss', 'Missed or neutral combat text.', 'text'),
  token('loot', 'Loot', '--game-ui-loot', '#b47cff', 'color', 'colors', 'loot', 'Loot and reward emphasis.', 'swatch'),

  token('rarityCommon', 'Common', '--game-ui-rarity-common', '#9fb0ce', 'rarity', 'colors', 'rarityCommon', 'Baseline rarity frame tone.', 'border'),
  token('rarityRare', 'Rare', '--game-ui-rarity-rare', '#4cc9f0', 'rarity', 'colors', 'rarityRare', 'Rare loot tone.', 'border'),
  token('rarityEpic', 'Epic', '--game-ui-rarity-epic', '#b47cff', 'rarity', 'colors', 'rarityEpic', 'Epic loot tone.', 'border'),
  token('rarityLegendary', 'Legendary', '--game-ui-rarity-legendary', '#ffd166', 'rarity', 'colors', 'rarityLegendary', 'Top rarity highlight.', 'border'),

  token('health', 'Health', '--game-ui-health', '#ff4d7d', 'hud', 'colors', 'health', 'Primary health fill.', 'swatch'),
  token('shield', 'Shield', '--game-ui-shield', '#4cc9f0', 'hud', 'colors', 'shield', 'Temporary protection fill.', 'swatch'),
  token('mana', 'Mana', '--game-ui-mana', '#7c8cff', 'hud', 'colors', 'mana', 'Mana resource fill.', 'swatch'),
  token('energy', 'Energy', '--game-ui-energy', '#ffd166', 'hud', 'colors', 'energy', 'Energy resource fill.', 'swatch'),
  token('stamina', 'Stamina', '--game-ui-stamina', '#5cff9d', 'hud', 'colors', 'stamina', 'Stamina resource fill.', 'swatch'),
  token('debuff', 'Debuff', '--game-ui-debuff', '#ff6b6b', 'hud', 'colors', 'debuff', 'Negative status tone.', 'swatch'),
  token('cooldownMask', 'Cooldown mask', '--game-ui-cooldown-mask', 'rgba(4, 8, 18, 0.72)', 'hud', 'colors', 'cooldownMask', 'Cooldown overlay mask.', 'swatch'),

  token('durationFast', 'Fast duration', '--game-ui-duration-fast', '160ms', 'motion', 'durations', 'fast', 'Fast micro-interaction duration.', 'motion'),
  token('durationNormal', 'Normal duration', '--game-ui-duration-normal', '280ms', 'motion', 'durations', 'normal', 'Default transition duration.', 'motion'),
  token('durationSlow', 'Slow duration', '--game-ui-duration-slow', '720ms', 'motion', 'durations', 'slow', 'Long feedback animation duration.', 'motion'),
  token('easeOut', 'Ease out', '--game-ui-ease-out', 'cubic-bezier(0.16, 1, 0.3, 1)', 'motion', 'easings', 'out', 'Default exit and arrival easing.', 'motion'),

  token('abilityReady', 'Ability ready', '--game-ui-ability-ready', '#55f7d2', 'ability', 'colors', 'abilityReady', 'Ready ability state.', 'swatch'),
  token('abilityLocked', 'Ability locked', '--game-ui-ability-locked', '#64748b', 'ability', 'colors', 'abilityLocked', 'Locked ability state.', 'swatch'),
  token('cast', 'Cast', '--game-ui-cast', '#1ee6ff', 'ability', 'colors', 'cast', 'Cast progress fill.', 'swatch'),
  token('target', 'Target', '--game-ui-target', '#ff4d7d', 'ability', 'colors', 'target', 'Hostile target emphasis.', 'swatch'),

  token('mapLine', 'Map line', '--game-ui-map-line', 'rgba(129, 230, 217, 0.22)', 'map', 'colors', 'mapLine', 'Map grid and frame line.', 'border'),
  token('markerAlly', 'Ally marker', '--game-ui-marker-ally', '#5cff9d', 'map', 'colors', 'markerAlly', 'Ally marker tone.', 'swatch'),
  token('markerEnemy', 'Enemy marker', '--game-ui-marker-enemy', '#ff4d7d', 'map', 'colors', 'markerEnemy', 'Enemy marker tone.', 'swatch'),
  token('markerObjective', 'Objective marker', '--game-ui-marker-objective', '#ffd166', 'map', 'colors', 'markerObjective', 'Objective marker tone.', 'swatch'),

  token('dialogue', 'Dialogue', '--game-ui-dialogue', 'rgba(25, 35, 63, 0.94)', 'narrative', 'colors', 'dialogue', 'Dialogue panel surface.', 'swatch'),
  token('choice', 'Choice', '--game-ui-choice', '#b47cff', 'narrative', 'colors', 'choice', 'Choice and quest emphasis.', 'swatch'),
  token('speaker', 'Speaker', '--game-ui-speaker', '#ffd166', 'narrative', 'colors', 'speaker', 'Speaker label tone.', 'swatch'),
  token('notification', 'Notification', '--game-ui-notification', '#55f7d2', 'narrative', 'colors', 'notification', 'Notification count tone.', 'swatch'),

  token('slotEmpty', 'Slot empty', '--game-ui-slot-empty', 'rgba(16, 23, 42, 0.42)', 'inventory', 'colors', 'slotEmpty', 'Empty inventory slot surface.', 'swatch'),
  token('slotEquipped', 'Slot equipped', '--game-ui-slot-equipped', '#55f7d2', 'inventory', 'colors', 'slotEquipped', 'Equipped slot highlight.', 'swatch'),
  token('slotLocked', 'Slot locked', '--game-ui-slot-locked', '#64748b', 'inventory', 'colors', 'slotLocked', 'Locked inventory slot tone.', 'swatch'),

  token('partyOffline', 'Party offline', '--game-ui-party-offline', '#64748b', 'party', 'colors', 'partyOffline', 'Offline party member tone.', 'swatch'),
  token('partySelected', 'Party selected', '--game-ui-party-selected', '#55f7d2', 'party', 'colors', 'partySelected', 'Selected party member accent.', 'swatch'),

  token('currencyGold', 'Currency gold', '--game-ui-currency-gold', '#ffd166', 'economy', 'colors', 'currencyGold', 'Gold or coin currency tone.', 'swatch'),
  token('currencyGem', 'Currency gem', '--game-ui-currency-gem', '#b47cff', 'economy', 'colors', 'currencyGem', 'Premium gem currency tone.', 'swatch'),
  token('currencyToken', 'Currency token', '--game-ui-currency-token', '#55f7d2', 'economy', 'colors', 'currencyToken', 'Event token currency tone.', 'swatch'),

  token('shadowSoft', 'Soft shadow', '--game-ui-shadow-soft', '0 14px 36px rgba(0, 0, 0, 0.38)', 'glow', 'shadows', 'soft', 'Default elevated panel shadow.', 'shadow'),
  token('shadowGlow', 'Glow shadow', '--game-ui-shadow-glow', '0 0 28px rgba(85, 247, 210, 0.28)', 'glow', 'shadows', 'glow', 'Accent glow shadow.', 'shadow'),

  token('radiusSm', 'Small radius', '--game-ui-radius-sm', '6px', 'radius', 'radii', 'sm', 'Small control radius.', 'radius'),
  token('radiusMd', 'Medium radius', '--game-ui-radius-md', '10px', 'radius', 'radii', 'md', 'Default component radius.', 'radius'),
  token('radiusLg', 'Large radius', '--game-ui-radius-lg', '16px', 'radius', 'radii', 'lg', 'Large HUD panel radius.', 'radius'),

  token('space1', 'Space 1', '--game-ui-space-1', '4px', 'spacing', 'spacing', '1', 'Smallest spacing step.', 'spacing'),
  token('space2', 'Space 2', '--game-ui-space-2', '8px', 'spacing', 'spacing', '2', 'Compact component gap.', 'spacing'),
  token('space3', 'Space 3', '--game-ui-space-3', '12px', 'spacing', 'spacing', '3', 'Default component gap.', 'spacing'),
  token('space4', 'Space 4', '--game-ui-space-4', '16px', 'spacing', 'spacing', '4', 'Large component gap.', 'spacing'),
  token('space5', 'Space 5', '--game-ui-space-5', '24px', 'spacing', 'spacing', '5', 'Section and cluster spacing.', 'spacing'),
] as const;

function token(
  key: string,
  name: string,
  cssVar: `--game-ui-${string}`,
  value: string,
  group: GameUiTokenGroupId,
  pandaCategory: PandaTokenCategory,
  pandaName: string,
  description: string,
  sampleKind: GameUiTokenSampleKind,
): GameUiTokenDefinitionInput {
  return {
    key,
    name,
    cssVar,
    value,
    group,
    pandaCategory,
    pandaName,
    description,
    sample: { kind: sampleKind },
  };
}

export type GameUiTokenName = (typeof tokenDefinitions)[number]['key'];
export type GameUiTokenOverrides = Partial<Record<GameUiTokenName, string>>;

export interface GameUiTokenDefinition {
  name: string;
  cssVar: `--game-ui-${string}`;
  value: string;
  group: GameUiTokenGroupId;
  description: string;
  sample: {
    kind: GameUiTokenSampleKind;
    label?: string;
  };
}

export interface GameUiTokenGroupDefinition {
  id: GameUiTokenGroupId;
  title: string;
  description: string;
  tokens: GameUiTokenDefinition[];
}

const groupMeta: Record<GameUiTokenGroupId, { title: string; description: string }> = {
  color: {
    title: 'Color tokens',
    description: 'Core scene colors for surface, readability, and combat feedback spikes.',
  },
  rarity: {
    title: 'Rarity tokens',
    description: 'Tones that power rarity frames, loot chips, and collectible emphasis.',
  },
  hud: {
    title: 'HUD tokens',
    description: 'Persistent overlay tones for health, resources, cooldowns, and status states.',
  },
  motion: {
    title: 'Motion tokens',
    description: 'Timing and easing used by feedback transitions.',
  },
  ability: {
    title: 'Ability tokens',
    description: 'Ability, cast, and target feedback tones.',
  },
  map: {
    title: 'Map tokens',
    description: 'Map frame, marker, and objective tones.',
  },
  narrative: {
    title: 'Narrative tokens',
    description: 'Dialogue, choice, and notification tones.',
  },
  inventory: {
    title: 'Inventory tokens',
    description: 'Grid slot surfaces for empty, equipped, and locked states.',
  },
  party: {
    title: 'Party tokens',
    description: 'Party frame offline and selection accents.',
  },
  economy: {
    title: 'Economy tokens',
    description: 'Currency bar tones for gold, gems, and tokens.',
  },
  glow: {
    title: 'Glow tokens',
    description: 'Shadow and glow styles for elevated HUD layers.',
  },
  radius: {
    title: 'Radius tokens',
    description: 'Corner radius scale for controls and panels.',
  },
  spacing: {
    title: 'Spacing tokens',
    description: 'Small spacing scale for dense HUD primitives.',
  },
};

const groupOrder: GameUiTokenGroupId[] = [
  'color',
  'rarity',
  'hud',
  'motion',
  'ability',
  'map',
  'narrative',
  'inventory',
  'party',
  'economy',
  'glow',
  'radius',
  'spacing',
];

export const gameUiTokenVars = Object.fromEntries(
  tokenDefinitions.map((definition) => [definition.key, definition.cssVar]),
) as {
  [K in GameUiTokenName]: Extract<(typeof tokenDefinitions)[number], { key: K }>['cssVar'];
};

export const gameUiTokens = Object.fromEntries(
  tokenDefinitions.map((definition) => [definition.key, `var(${definition.cssVar})`]),
) as {
  [K in GameUiTokenName]: `var(${(typeof gameUiTokenVars)[K]})`;
};

export const gameUiTokenGroups: GameUiTokenGroupDefinition[] = groupOrder.map((group) => ({
  id: group,
  ...groupMeta[group],
  tokens: tokenDefinitions
    .filter((definition) => definition.group === group)
    .map(({ name, cssVar, value, description, sample }) => ({
      name,
      cssVar,
      value,
      group,
      description,
      sample,
    })),
}));

export const gameUiThemeNames = ['default', 'arcade'] as const satisfies readonly GameUiThemeName[];

const defaultThemeValues = Object.fromEntries(
  tokenDefinitions.map((definition) => [definition.key, definition.value]),
) as Record<GameUiTokenName, string>;

const arcadeOverrides = {
  background: '#090716',
  surface: 'rgba(28, 20, 54, 0.78)',
  surfaceStrong: 'rgba(41, 24, 76, 0.94)',
  line: 'rgba(255, 122, 217, 0.36)',
  accent: '#ff7ad9',
  accentStrong: '#48f5ff',
  danger: '#ff335f',
  heal: '#76ff7a',
  critical: '#ffb000',
  loot: '#c084fc',
  rarityRare: '#48f5ff',
  rarityEpic: '#c084fc',
  rarityLegendary: '#ffb000',
  health: '#ff335f',
  shield: '#7dd3fc',
  mana: '#48f5ff',
  abilityReady: '#76ff7a',
  markerObjective: '#ffdd66',
  choice: '#ff7ad9',
  shadowGlow: '0 0 32px rgba(255, 122, 217, 0.34)',
} satisfies GameUiTokenOverrides;

export const gameUiThemes: Record<GameUiThemeName, Record<GameUiTokenName, string>> = {
  default: defaultThemeValues,
  arcade: {
    ...defaultThemeValues,
    ...arcadeOverrides,
  },
};

export function createGameUiTokenStyle(tokens: GameUiTokenOverrides = {}) {
  return Object.fromEntries(
    Object.entries(tokens).flatMap(([key, value]) => {
      if (!value) return [];

      const definition = tokenDefinitions.find((item) => item.key === key);
      if (!definition) return [];

      return [
        [definition.cssVar, value],
        [getPandaCssVar(definition), value],
      ];
    }),
  ) as Record<`--${string}`, string>;
}

export function createGameUiThemeCss(themeName: GameUiThemeName) {
  const values = gameUiThemes[themeName];

  return tokenDefinitions.flatMap((definition) => {
    const value = values[definition.key as GameUiTokenName];

    return [
      `  ${definition.cssVar}: ${value};`,
      `  ${getPandaCssVar(definition)}: ${value};`,
    ];
  });
}

function getPandaCssVar(definition: GameUiTokenDefinitionInput) {
  return `--game-ui-${definition.pandaCategory}-${definition.pandaName.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}` as const;
}

function createPandaTokens(category: PandaTokenCategory) {
  return Object.fromEntries(
    tokenDefinitions
      .filter((definition) => definition.pandaCategory === category)
      .map((definition) => [
        definition.pandaName,
        {
          value: definition.value,
          description: definition.description,
        },
      ]),
  );
}

export const gameUiPreset = {
  name: '@tiny-playworks/game-ui',
  theme: {
    extend: {
      tokens: {
        fonts: {
          sans: {
            value: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          },
          display: {
            value: '"Arial Black", Impact, {fonts.sans}',
          },
        },
        colors: createPandaTokens('colors'),
        spacing: createPandaTokens('spacing'),
        radii: createPandaTokens('radii'),
        shadows: createPandaTokens('shadows'),
        durations: createPandaTokens('durations'),
        easings: createPandaTokens('easings'),
      },
    },
  },
};
