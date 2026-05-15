import { describe, expect, it } from '@rstest/core';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('token css contract', () => {
  it('keeps the token css variables available', () => {
    const css = readFileSync(resolve(process.cwd(), '../tokens/src/index.css'), 'utf8');

    expect(css).toContain('--game-ui-accent');
    expect(css).toContain('--game-ui-rarity-legendary');
    expect(css).toContain('--game-ui-duration-normal');
  });
});
