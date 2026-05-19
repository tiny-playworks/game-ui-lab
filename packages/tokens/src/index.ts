export const gameUiTokenCssExport = '@tiny-playworks/tokens/css';

export const gameUiTokenVars = {
  background: '--game-ui-bg',
  surface: '--game-ui-surface',
  surfaceStrong: '--game-ui-surface-strong',
  line: '--game-ui-line',
  text: '--game-ui-text',
  muted: '--game-ui-muted',
  accent: '--game-ui-accent',
  accentStrong: '--game-ui-accent-strong',
  danger: '--game-ui-danger',
  heal: '--game-ui-heal',
  critical: '--game-ui-critical',
  miss: '--game-ui-miss',
  loot: '--game-ui-loot',
  rarityCommon: '--game-ui-rarity-common',
  rarityRare: '--game-ui-rarity-rare',
  rarityEpic: '--game-ui-rarity-epic',
  rarityLegendary: '--game-ui-rarity-legendary',
  health: '--game-ui-health',
  shield: '--game-ui-shield',
  mana: '--game-ui-mana',
  energy: '--game-ui-energy',
  stamina: '--game-ui-stamina',
  debuff: '--game-ui-debuff',
  cooldownMask: '--game-ui-cooldown-mask',
  abilityReady: '--game-ui-ability-ready',
  abilityLocked: '--game-ui-ability-locked',
  cast: '--game-ui-cast',
  target: '--game-ui-target',
  mapLine: '--game-ui-map-line',
  markerAlly: '--game-ui-marker-ally',
  markerEnemy: '--game-ui-marker-enemy',
  markerObjective: '--game-ui-marker-objective',
  dialogue: '--game-ui-dialogue',
  choice: '--game-ui-choice',
  speaker: '--game-ui-speaker',
  notification: '--game-ui-notification',
  radiusSm: '--game-ui-radius-sm',
  radiusMd: '--game-ui-radius-md',
  radiusLg: '--game-ui-radius-lg',
  space1: '--game-ui-space-1',
  space2: '--game-ui-space-2',
  space3: '--game-ui-space-3',
  space4: '--game-ui-space-4',
  space5: '--game-ui-space-5',
  shadowSoft: '--game-ui-shadow-soft',
  shadowGlow: '--game-ui-shadow-glow',
  durationFast: '--game-ui-duration-fast',
  durationNormal: '--game-ui-duration-normal',
  durationSlow: '--game-ui-duration-slow',
  easeOut: '--game-ui-ease-out',
} as const;

export type GameUiTokenName = keyof typeof gameUiTokenVars;

export const gameUiTokens = Object.fromEntries(
  Object.entries(gameUiTokenVars).map(([key, value]) => [key, `var(${value})`]),
) as {
  [K in GameUiTokenName]: `var(${(typeof gameUiTokenVars)[K]})`;
};

export type GameUiTokenGroupId =
  | 'color'
  | 'rarity'
  | 'hud'
  | 'ability'
  | 'map'
  | 'narrative'
  | 'motion'
  | 'glow'
  | 'radius'
  | 'spacing';
export type GameUiTokenSampleKind = 'swatch' | 'text' | 'border' | 'motion' | 'shadow' | 'radius' | 'spacing';

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

export const gameUiTokenGroups: GameUiTokenGroupDefinition[] = [
  {
    id: 'color',
    title: 'Color tokens',
    description: 'Core scene colors for surface, readability, and combat feedback spikes.',
    tokens: [
      {
        name: 'Background',
        cssVar: '--game-ui-bg',
        value: '#080b13',
        group: 'color',
        description: 'Base page darkness for the lab shell.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Surface',
        cssVar: '--game-ui-surface',
        value: 'rgba(16, 23, 42, 0.78)',
        group: 'color',
        description: 'Default panel surface for readable dark cards.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Surface strong',
        cssVar: '--game-ui-surface-strong',
        value: 'rgba(25, 35, 63, 0.92)',
        group: 'color',
        description: 'Raised card and toast surface for stronger separation.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Line',
        cssVar: '--game-ui-line',
        value: 'rgba(129, 230, 217, 0.28)',
        group: 'color',
        description: 'Subtle border tone for shells and data cards.',
        sample: { kind: 'border' },
      },
      {
        name: 'Text',
        cssVar: '--game-ui-text',
        value: '#f8fafc',
        group: 'color',
        description: 'High-contrast text tone used on dark surfaces.',
        sample: { kind: 'text' },
      },
      {
        name: 'Muted',
        cssVar: '--game-ui-muted',
        value: '#9fb0ce',
        group: 'color',
        description: 'Secondary copy tone for notes and labels.',
        sample: { kind: 'text' },
      },
      {
        name: 'Accent',
        cssVar: '--game-ui-accent',
        value: '#55f7d2',
        group: 'color',
        description: 'Primary active accent for navigation and lab feedback.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Danger',
        cssVar: '--game-ui-danger',
        value: '#ff4d7d',
        group: 'color',
        description: 'Damage emphasis color for hostile spikes.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Heal',
        cssVar: '--game-ui-heal',
        value: '#5cff9d',
        group: 'color',
        description: 'Recovery and success feedback highlight.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Critical',
        cssVar: '--game-ui-critical',
        value: '#ffd166',
        group: 'color',
        description: 'Critical-hit and combo energy highlight.',
        sample: { kind: 'swatch' },
      },
    ],
  },
  {
    id: 'rarity',
    title: 'Rarity tokens',
    description: 'Tones that power rarity frames, loot chips, and collectible emphasis.',
    tokens: [
      {
        name: 'Common',
        cssVar: '--game-ui-rarity-common',
        value: '#9fb0ce',
        group: 'rarity',
        description: 'Baseline rarity frame tone.',
        sample: { kind: 'border' },
      },
      {
        name: 'Rare',
        cssVar: '--game-ui-rarity-rare',
        value: '#4cc9f0',
        group: 'rarity',
        description: 'Rare tone for higher-value loot framing.',
        sample: { kind: 'border' },
      },
      {
        name: 'Epic',
        cssVar: '--game-ui-rarity-epic',
        value: '#b47cff',
        group: 'rarity',
        description: 'Epic tone for brighter rarity sweeps.',
        sample: { kind: 'border' },
      },
      {
        name: 'Legendary',
        cssVar: '--game-ui-rarity-legendary',
        value: '#ffd166',
        group: 'rarity',
        description: 'Top rarity highlight for strong border emphasis.',
        sample: { kind: 'border' },
      },
    ],
  },
  {
    id: 'hud',
    title: 'HUD tokens',
    description: 'Persistent overlay tones for health, resources, cooldowns, and status states.',
    tokens: [
      {
        name: 'Health',
        cssVar: '--game-ui-health',
        value: '#ff4d7d',
        group: 'hud',
        description: 'Primary health fill for player and boss HUD bars.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Shield',
        cssVar: '--game-ui-shield',
        value: '#4cc9f0',
        group: 'hud',
        description: 'Shield overlay for temporary protection layers.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Mana',
        cssVar: '--game-ui-mana',
        value: '#7c8cff',
        group: 'hud',
        description: 'Mana resource fill for spell and ability costs.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Energy',
        cssVar: '--game-ui-energy',
        value: '#ffd166',
        group: 'hud',
        description: 'Energy resource fill for fast tactical actions.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Stamina',
        cssVar: '--game-ui-stamina',
        value: '#5cff9d',
        group: 'hud',
        description: 'Stamina resource fill for movement and endurance states.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Debuff',
        cssVar: '--game-ui-debuff',
        value: '#ff6b6b',
        group: 'hud',
        description: 'Negative status tone for persistent combat effects.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Cooldown mask',
        cssVar: '--game-ui-cooldown-mask',
        value: 'rgba(4, 8, 18, 0.72)',
        group: 'hud',
        description: 'Overlay mask used to show ability cooldown progress.',
        sample: { kind: 'swatch' },
      },
    ],
  },
  {
    id: 'motion',
    title: 'Motion tokens',
    description: 'Shared durations and easing choices that keep feedback readable under dark contrast.',
    tokens: [
      {
        name: 'Fast',
        cssVar: '--game-ui-duration-fast',
        value: '160ms',
        group: 'motion',
        description: 'Fast interaction timing for hover, nav, and state nudges.',
        sample: { kind: 'motion', label: '160ms' },
      },
      {
        name: 'Normal',
        cssVar: '--game-ui-duration-normal',
        value: '280ms',
        group: 'motion',
        description: 'Standard transition pace for toasts and card state changes.',
        sample: { kind: 'motion', label: '280ms' },
      },
      {
        name: 'Slow',
        cssVar: '--game-ui-duration-slow',
        value: '720ms',
        group: 'motion',
        description: 'Longer arc for animated combat float and ambient loops.',
        sample: { kind: 'motion', label: '720ms' },
      },
      {
        name: 'Ease out',
        cssVar: '--game-ui-ease-out',
        value: 'cubic-bezier(0.16, 1, 0.3, 1)',
        group: 'motion',
        description: 'Shared ease curve for responsive, readable feedback.',
        sample: { kind: 'motion', label: 'ease-out' },
      },
    ],
  },
  {
    id: 'ability',
    title: 'Ability tokens',
    description: 'Ability and target tones for skill bars, cast feedback, and target frames.',
    tokens: [
      {
        name: 'Ability ready',
        cssVar: '--game-ui-ability-ready',
        value: '#55f7d2',
        group: 'ability',
        description: 'Ready-state highlight for usable abilities.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Ability locked',
        cssVar: '--game-ui-ability-locked',
        value: '#64748b',
        group: 'ability',
        description: 'Muted locked-state tone for unavailable abilities.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Cast',
        cssVar: '--game-ui-cast',
        value: '#1ee6ff',
        group: 'ability',
        description: 'Cast and channel progress highlight.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Target',
        cssVar: '--game-ui-target',
        value: '#ff4d7d',
        group: 'ability',
        description: 'Target frame emphasis for focused entities.',
        sample: { kind: 'swatch' },
      },
    ],
  },
  {
    id: 'map',
    title: 'Map tokens',
    description: 'Map grid and marker tones for compact navigation surfaces.',
    tokens: [
      {
        name: 'Map line',
        cssVar: '--game-ui-map-line',
        value: 'rgba(129, 230, 217, 0.22)',
        group: 'map',
        description: 'Subtle minimap grid and compass line color.',
        sample: { kind: 'border' },
      },
      {
        name: 'Marker ally',
        cssVar: '--game-ui-marker-ally',
        value: '#5cff9d',
        group: 'map',
        description: 'Friendly marker tone.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Marker enemy',
        cssVar: '--game-ui-marker-enemy',
        value: '#ff4d7d',
        group: 'map',
        description: 'Hostile marker tone.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Marker objective',
        cssVar: '--game-ui-marker-objective',
        value: '#ffd166',
        group: 'map',
        description: 'Objective marker tone.',
        sample: { kind: 'swatch' },
      },
    ],
  },
  {
    id: 'narrative',
    title: 'Narrative tokens',
    description: 'Dialogue, choice, speaker, and notification tones for narrative UI.',
    tokens: [
      {
        name: 'Dialogue',
        cssVar: '--game-ui-dialogue',
        value: 'rgba(25, 35, 63, 0.94)',
        group: 'narrative',
        description: 'Dialogue panel surface.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Choice',
        cssVar: '--game-ui-choice',
        value: '#b47cff',
        group: 'narrative',
        description: 'Choice prompt accent tone.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Speaker',
        cssVar: '--game-ui-speaker',
        value: '#ffd166',
        group: 'narrative',
        description: 'Speaker name and portrait accent tone.',
        sample: { kind: 'swatch' },
      },
      {
        name: 'Notification',
        cssVar: '--game-ui-notification',
        value: '#55f7d2',
        group: 'narrative',
        description: 'System notification accent tone.',
        sample: { kind: 'swatch' },
      },
    ],
  },
  {
    id: 'glow',
    title: 'Glow tokens',
    description: 'Controlled shadows and glow peaks so the shell stays restrained while feedback remains bright.',
    tokens: [
      {
        name: 'Soft shadow',
        cssVar: '--game-ui-shadow-soft',
        value: '0 14px 36px rgba(0, 0, 0, 0.38)',
        group: 'glow',
        description: 'Card elevation without turning the shell into a light source.',
        sample: { kind: 'shadow' },
      },
      {
        name: 'Glow shadow',
        cssVar: '--game-ui-shadow-glow',
        value: '0 0 28px rgba(85, 247, 210, 0.28)',
        group: 'glow',
        description: 'Controlled accent glow reserved for active feedback and highlights.',
        sample: { kind: 'shadow' },
      },
    ],
  },
  {
    id: 'radius',
    title: 'Radius tokens',
    description: 'Rounded geometry for chips, frames, and data cards.',
    tokens: [
      {
        name: 'Radius sm',
        cssVar: '--game-ui-radius-sm',
        value: '6px',
        group: 'radius',
        description: 'Small edge radius for utility elements.',
        sample: { kind: 'radius' },
      },
      {
        name: 'Radius md',
        cssVar: '--game-ui-radius-md',
        value: '10px',
        group: 'radius',
        description: 'Standard radius for most cards and buttons.',
        sample: { kind: 'radius' },
      },
      {
        name: 'Radius lg',
        cssVar: '--game-ui-radius-lg',
        value: '16px',
        group: 'radius',
        description: 'Large radius for stage frames and major surfaces.',
        sample: { kind: 'radius' },
      },
    ],
  },
  {
    id: 'spacing',
    title: 'Spacing tokens',
    description: 'Core spacing scale for stacked cards, HUD clusters, and small utility rows.',
    tokens: [
      {
        name: 'Space 1',
        cssVar: '--game-ui-space-1',
        value: '4px',
        group: 'spacing',
        description: 'Tight spacing for compact UI detail.',
        sample: { kind: 'spacing' },
      },
      {
        name: 'Space 2',
        cssVar: '--game-ui-space-2',
        value: '8px',
        group: 'spacing',
        description: 'Default gap for inline utility elements.',
        sample: { kind: 'spacing' },
      },
      {
        name: 'Space 3',
        cssVar: '--game-ui-space-3',
        value: '12px',
        group: 'spacing',
        description: 'Card interior spacing for token rows and callouts.',
        sample: { kind: 'spacing' },
      },
      {
        name: 'Space 4',
        cssVar: '--game-ui-space-4',
        value: '16px',
        group: 'spacing',
        description: 'Standard section gap for overview cards.',
        sample: { kind: 'spacing' },
      },
      {
        name: 'Space 5',
        cssVar: '--game-ui-space-5',
        value: '24px',
        group: 'spacing',
        description: 'Large spacing step for grouped stage content.',
        sample: { kind: 'spacing' },
      },
    ],
  },
];
