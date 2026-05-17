import { describe, expect, it } from '@rstest/core';
import { primitiveDocs } from '../lib/primitiveDocs';

describe('primitive docs metadata', () => {
  it('documents every public primitive shown in the gallery', () => {
    expect(primitiveDocs.map((doc) => doc.name)).toEqual([
      'DamageNumber',
      'FloatingToast',
      'ComboCounter',
      'HealthBar',
      'ResourceMeter',
      'CooldownSlot',
      'StatusBadge',
      'LootCard',
      'LootStack',
      'RewardReveal',
      'RarityBorder',
      'GameUiProvider',
    ]);
  });

  it('keeps each primitive doc actionable', () => {
    for (const doc of primitiveDocs) {
      expect(doc.usage).toContain(`<${doc.name}`);
      expect(doc.states.length).toBeGreaterThan(0);
      expect(doc.props.length).toBeGreaterThan(0);

      for (const prop of doc.props) {
        expect(prop.name.length).toBeGreaterThan(0);
        expect(prop.type.length).toBeGreaterThan(0);
        expect(prop.description.length).toBeGreaterThan(0);
      }
    }
  });
});
