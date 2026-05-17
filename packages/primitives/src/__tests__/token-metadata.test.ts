import { describe, expect, it } from '@rstest/core';
import { gameUiTokenGroups } from '@tiny-playworks/tokens';

describe('token metadata export', () => {
  it('exposes the gallery token groups', () => {
    expect(gameUiTokenGroups.map((group) => group.id)).toEqual([
      'color',
      'rarity',
      'hud',
      'motion',
      'glow',
      'radius',
      'spacing',
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
});
