import { describe, expect, it } from '@rstest/core';
import { gameUiTokenGroups } from '@tiny-playworks/tokens';

describe('token metadata export', () => {
  it('exposes the gallery token groups', () => {
    expect(gameUiTokenGroups.map((group) => group.id)).toEqual([
      'color',
      'rarity',
      'motion',
      'glow',
      'radius',
      'spacing',
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
