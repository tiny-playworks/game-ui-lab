import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from '@rstest/core';
import { ComboCounter, DamageNumber, FloatingToast, GameUiProvider, RarityBorder } from '../index';

describe('game ui primitives', () => {
  it('renders token provider with theme attribute', () => {
    render(
      <GameUiProvider>
        <span>ready</span>
      </GameUiProvider>,
    );

    expect(screen.getByText('ready').parentElement?.getAttribute('data-game-ui-theme')).toBe('default');
  });

  it('renders a damage number variant', () => {
    render(<DamageNumber value="128" variant="critical" prefix="CRIT" />);

    expect(screen.getByText('128').getAttribute('data-variant')).toBe('critical');
    expect(screen.getByText('CRIT').textContent).toBe('CRIT');
  });

  it('renders a floating toast message', () => {
    render(<FloatingToast title="Loot found" message="Neon shard added" variant="loot" />);

    expect(screen.getByText('Loot found').textContent).toBe('Loot found');
    expect(screen.getByText('Neon shard added').textContent).toBe('Neon shard added');
  });

  it('renders combo count', () => {
    render(<ComboCounter count={12} />);

    expect(screen.getByLabelText('Combo 12').textContent).toContain('12');
    expect(screen.getByText('Clean combo').textContent).toBe('Clean combo');
  });

  it('renders a rarity border tone', () => {
    render(<RarityBorder tone="legendary">Legendary cache</RarityBorder>);

    expect(screen.getByText('Legendary cache').closest('.game-ui-rarity-border')?.getAttribute('data-tone')).toBe('legendary');
  });
});
