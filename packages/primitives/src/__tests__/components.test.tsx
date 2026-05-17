import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from '@rstest/core';
import {
  ComboCounter,
  CooldownSlot,
  DamageNumber,
  FloatingToast,
  GameUiProvider,
  HealthBar,
  RarityBorder,
  ResourceMeter,
  StatusBadge,
} from '../index';

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

  it('renders health states with shield and values', () => {
    const { rerender } = render(<HealthBar value={0} max={120} label="Pilot HP" showValue />);

    expect(screen.getByLabelText('Pilot HP 0 of 120').getAttribute('data-empty')).toBe('true');
    expect(screen.getByText('0 / 120').textContent).toBe('0 / 120');

    rerender(<HealthBar value={120} max={120} label="Pilot HP" showValue />);

    expect(screen.getByLabelText('Pilot HP 120 of 120').getAttribute('data-full')).toBe('true');

    rerender(<HealthBar value={78} max={120} shield={34} label="Pilot HP" showValue />);

    expect(screen.getByLabelText('Pilot HP 78 of 120 plus 34 shield').getAttribute('data-shielded')).toBe('true');
    expect(screen.getByText('+34').textContent).toBe('+34');
  });

  it('renders resource meter kind and value', () => {
    render(<ResourceMeter value={42} max={80} kind="mana" label="Arcane" />);

    expect(screen.getByLabelText('Arcane 42 of 80').getAttribute('data-kind')).toBe('mana');
    expect(screen.getByText('Arcane').textContent).toBe('Arcane');
    expect(screen.getByText('42 / 80').textContent).toBe('42 / 80');
  });

  it('renders cooldown slot states', () => {
    const { rerender } = render(<CooldownSlot progress={0.45} label="Blink" icon="B" />);

    expect(screen.getByRole('status', { name: 'Blink cooldown 45%' }).getAttribute('data-ready')).toBe('false');
    expect(screen.getByText('B').textContent).toBe('B');

    rerender(<CooldownSlot progress={1} label="Blink" ready />);

    expect(screen.getByRole('status', { name: 'Blink ready' }).getAttribute('data-ready')).toBe('true');

    rerender(<CooldownSlot progress={0.2} label="Blink" disabled />);

    expect(screen.getByRole('status', { name: 'Blink disabled' }).getAttribute('data-disabled')).toBe('true');
  });

  it('renders status badge tone, count, and duration', () => {
    render(<StatusBadge label="Haste" tone="buff" count={3} duration="12s" />);

    expect(screen.getByRole('status', { name: 'Haste buff 3 stacks 12s' }).getAttribute('data-tone')).toBe('buff');
    expect(screen.getByText('x3').textContent).toBe('x3');
    expect(screen.getByText('12s').textContent).toBe('12s');
  });
});
