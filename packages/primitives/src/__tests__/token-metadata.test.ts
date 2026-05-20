import { describe, expect, it } from '@rstest/core';
import {
  createGameUiTokenStyle,
  gameUiPreset,
  gameUiThemeNames,
  gameUiThemes,
  gameUiTokenGroups,
  gameUiTokens,
  gameUiTokenVars,
} from '@tiny-playworks/tokens';

describe('token metadata export', () => {
  it('exposes the documented token groups', () => {
    expect(gameUiTokenGroups.map((group) => group.id)).toEqual([
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
    ]);
  });

  it('exposes the expansion token metadata used by ability, map, and narrative primitives', () => {
    expect(gameUiTokenGroups.find((group) => group.id === 'ability')?.tokens.map((token) => token.cssVar)).toEqual([
      '--game-ui-ability-ready',
      '--game-ui-ability-locked',
      '--game-ui-cast',
      '--game-ui-target',
    ]);
    expect(gameUiTokenGroups.find((group) => group.id === 'map')?.tokens.map((token) => token.cssVar)).toEqual([
      '--game-ui-map-line',
      '--game-ui-marker-ally',
      '--game-ui-marker-enemy',
      '--game-ui-marker-objective',
    ]);
    expect(gameUiTokenGroups.find((group) => group.id === 'narrative')?.tokens.map((token) => token.cssVar)).toEqual([
      '--game-ui-dialogue',
      '--game-ui-choice',
      '--game-ui-speaker',
      '--game-ui-notification',
    ]);
  });

  it('exposes the HUD token metadata used by persistent overlays', () => {
    const hudGroup = gameUiTokenGroups.find((group) => group.id === 'hud');

    expect(hudGroup?.tokens.map((token) => token.cssVar)).toEqual([
      '--game-ui-health',
      '--game-ui-shield',
      '--game-ui-mana',
      '--game-ui-energy',
      '--game-ui-stamina',
      '--game-ui-debuff',
      '--game-ui-cooldown-mask',
    ]);
  });

  it('keeps display metadata for every token item', () => {
    for (const group of gameUiTokenGroups) {
      expect(group.tokens.length).toBeGreaterThan(0);

      for (const token of group.tokens) {
        expect(token.cssVar.startsWith('--game-ui-')).toBe(true);
        expect(token.description.length).toBeGreaterThan(0);
        expect(token.sample.kind.length).toBeGreaterThan(0);
      }
    }
  });

  it('exposes ergonomic token helpers for direct consumption and scoped overrides', () => {
    expect(gameUiTokens.space1).toBe('var(--game-ui-space-1)');
    expect(gameUiTokens.radiusLg).toBe('var(--game-ui-radius-lg)');
    expect(gameUiTokenVars.space1).toBe('--game-ui-space-1');
    expect(gameUiTokenVars.health).toBe('--game-ui-health');
    expect(gameUiTokens.abilityReady).toBe('var(--game-ui-ability-ready)');
    expect(gameUiTokenVars.markerObjective).toBe('--game-ui-marker-objective');
  });

  it('keeps theme names and token keys aligned', () => {
    const tokenNames = Object.keys(gameUiTokenVars).sort();

    expect(gameUiThemeNames).toEqual(['default', 'arcade']);
    expect(Object.keys(gameUiThemes.default).sort()).toEqual(tokenNames);
    expect(Object.keys(gameUiThemes.arcade).sort()).toEqual(tokenNames);
  });

  it('exposes panda preset and scoped token style helpers', () => {
    const style = createGameUiTokenStyle({ accent: '#ffffff' });

    expect(gameUiPreset.name).toBe('@tiny-playworks/game-ui');
    expect(style['--game-ui-accent']).toBe('#ffffff');
    expect(style['--game-ui-colors-accent']).toBe('#ffffff');
  });
});
