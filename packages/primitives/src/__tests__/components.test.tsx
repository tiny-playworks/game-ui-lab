import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from '@rstest/core';
import {
  ComboCounter,
  CooldownSlot,
  DamageNumber,
  FloatingToast,
  GameUiProvider,
  HealthBar,
  LootCard,
  LootStack,
  ObjectiveChip,
  QuestTracker,
  RarityBorder,
  ResourceMeter,
  RewardReveal,
  StatusBadge,
} from '../index';

afterEach(() => {
  cleanup();
});

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

  it('renders a loot card with rarity and quantity metadata', () => {
    render(<LootCard name="Neon Shard" rarity="epic" quantity={3} value="240g" subtitle="Crafting drop" />);

    expect(screen.getByRole('article', { name: 'Neon Shard epic loot' }).getAttribute('data-rarity')).toBe('epic');
    expect(screen.getByText('Neon Shard').textContent).toBe('Neon Shard');
    expect(screen.getByText('x3').textContent).toBe('x3');
    expect(screen.getByText('240g').textContent).toBe('240g');
  });

  it('renders objective chip states and progress', () => {
    const { rerender } = render(<ObjectiveChip label="Collect shards" progress={2} max={5} />);

    expect(screen.getByRole('status', { name: 'Collect shards active 2 / 5' }).getAttribute('data-state')).toBe('active');
    expect(screen.getByText('2 / 5').textContent).toBe('2 / 5');

    rerender(<ObjectiveChip label="Open gate" state="complete" />);

    expect(screen.getByRole('status', { name: 'Open gate complete' }).getAttribute('data-state')).toBe('complete');

    rerender(<ObjectiveChip label="Enter vault" state="locked" />);

    expect(screen.getByRole('status', { name: 'Enter vault locked' }).getAttribute('data-state')).toBe('locked');
  });

  it('renders quest tracker objectives and completion count', () => {
    render(
      <QuestTracker
        title="Signal Hunt"
        subtitle="Daily route"
        objectives={[
          { id: 'beacon', label: 'Find beacon', state: 'complete' },
          { id: 'shards', label: 'Collect shards', progress: 2, max: 5 },
          { id: 'vault', label: 'Enter vault', state: 'locked' },
        ]}
      />,
    );

    expect(screen.getByRole('region', { name: 'Signal Hunt 1 of 3 complete' }).textContent).toContain('1 / 3');
    expect(screen.getByText('Daily route').textContent).toBe('Daily route');
    expect(screen.getByText('Find beacon').textContent).toBe('Find beacon');
    expect(screen.getByText('Collect shards').textContent).toBe('Collect shards');
    expect(screen.getByText('Enter vault').textContent).toBe('Enter vault');
  });

  it('renders a loot stack with capped visible items', () => {
    render(
      <LootStack
        label="Wave drops"
        limit={2}
        items={[
          { id: 'credits', name: 'Credits', rarity: 'common', quantity: 120 },
          { id: 'core', name: 'Pulse Core', rarity: 'rare', quantity: 1 },
          { id: 'shard', name: 'Neon Shard', rarity: 'epic', quantity: 3 },
        ]}
      />,
    );

    expect(screen.getByRole('list', { name: 'Wave drops 3 items' }).getAttribute('data-overflow')).toBe('1');
    expect(screen.getByText('Credits').textContent).toBe('Credits');
    expect(screen.getByText('Pulse Core').textContent).toBe('Pulse Core');
    expect(screen.getByText('+1 more').textContent).toBe('+1 more');
  });

  it('renders reward reveal states and action', () => {
    const { rerender } = render(
      <RewardReveal
        title="Cache unlocked"
        state="sealed"
        items={[{ id: 'cache', name: 'Ancient Cache', rarity: 'legendary' }]}
      />,
    );

    expect(screen.getByRole('status', { name: 'Cache unlocked sealed reward with 1 item' }).getAttribute('data-state')).toBe('sealed');
    expect(screen.getByText('Sealed').textContent).toBe('Sealed');

    rerender(
      <RewardReveal
        title="Cache unlocked"
        state="revealed"
        actionLabel="Claim"
        items={[{ id: 'cache', name: 'Ancient Cache', rarity: 'legendary' }]}
      />,
    );

    expect(screen.getByRole('status', { name: 'Cache unlocked revealed reward with 1 item' }).getAttribute('data-state')).toBe('revealed');
    expect(screen.getByRole('button', { name: 'Claim' }).textContent).toBe('Claim');
  });
});
