import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from '@rstest/core';
import { createGameUiRuntime } from '@tiny-playworks/game-ui-runtime';
import {
  AbilityBar,
  AbilityTooltip,
  CastBar,
  ChoicePrompt,
  ComboCounter,
  CompassBar,
  CooldownSlot,
  DamageNumber,
  DialogueBox,
  FloatingToast,
  GameUiLayerHost,
  GameUiProvider,
  GameUiRuntimeProvider,
  HealthBar,
  LocationTag,
  LootCard,
  LootStack,
  MapMarker,
  MiniMap,
  NotificationStack,
  ObjectiveChip,
  QuestLog,
  QuestTracker,
  RarityBorder,
  ResourceMeter,
  RewardReveal,
  StatusBadge,
  TargetFrame,
  useGameUiRuntime,
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

  it('renders provider theme and scoped token overrides', () => {
    render(
      <GameUiProvider theme="arcade" tokens={{ accent: '#ffffff' }} style={{ marginTop: 12 }}>
        <span>arcade</span>
      </GameUiProvider>,
    );

    const provider = screen.getByText('arcade').parentElement;

    expect(provider?.getAttribute('data-game-ui-theme')).toBe('arcade');
    expect(provider?.getAttribute('style')).toContain('margin-top: 12px');
    expect(provider?.getAttribute('style')).toContain('--game-ui-accent: #ffffff');
    expect(provider?.getAttribute('style')).toContain('--game-ui-colors-accent: #ffffff');
  });

  it('renders a damage number variant', () => {
    render(<DamageNumber value="128" variant="critical" prefix="CRIT" />);

    expect(screen.getByText('128').getAttribute('data-variant')).toBe('critical');
    expect(screen.getByText('CRIT').textContent).toBe('CRIT');
  });

  it('renders a static damage number without relying on remount animation', () => {
    render(<DamageNumber value="128" variant="critical" motion="static" />);

    expect(screen.getByText('128').getAttribute('data-motion')).toBe('static');
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

    expect(screen.getByText('Legendary cache').getAttribute('data-tone')).toBe('legendary');
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
    expect(screen.getByText('B').querySelector('[data-game-ui-slot="cooldown-mask"]')).toBeTruthy();

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

  it('renders an ability bar with ready and locked slots', () => {
    render(
      <AbilityBar
        abilities={[
          { id: 'blink', label: 'Blink', icon: 'B', ready: true, cost: '20' },
          { id: 'nova', label: 'Nova', icon: 'N', progress: 0.25, locked: true },
        ]}
      />,
    );

    expect(screen.getByRole('group', { name: 'Ability bar' }).textContent).toContain('20');
    expect(screen.getByRole('status', { name: 'Blink ready' }).getAttribute('data-ready')).toBe('true');
    expect(screen.getByRole('status', { name: 'Nova disabled' }).getAttribute('data-disabled')).toBe('true');
  });

  it('handles ability clicks and ignores locked abilities', () => {
    const selected: string[] = [];

    render(
      <AbilityBar
        selectedId="blink"
        onAbilityClick={(id) => selected.push(id)}
        abilities={[
          { id: 'blink', label: 'Blink', icon: 'B', ready: true },
          { id: 'nova', label: 'Nova', icon: 'N', locked: true },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Blink ready' }));

    expect(selected).toEqual(['blink']);
    expect(screen.getByRole('button', { name: 'Blink ready' }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.queryByRole('button', { name: 'Nova disabled' })).toBeNull();
    expect(screen.getByRole('status', { name: 'Nova disabled' }).getAttribute('data-disabled')).toBe('true');
  });

  it('allows ability bars to customize rendered ability items', () => {
    render(
      <AbilityBar
        selectedId="blink"
        abilities={[
          { id: 'blink', label: 'Blink', icon: 'B', ready: true, className: 'ability-item' },
          { id: 'nova', label: 'Nova', icon: 'N', locked: true },
        ]}
        renderAbility={(ability, state, defaultNode) => (
          <div data-testid={`ability-${ability.id}`} data-index={state.index} data-selected={state.selected} data-disabled={state.disabled}>
            {defaultNode}
            <span>{state.selected ? 'selected' : 'idle'}</span>
          </div>
        )}
      />,
    );

    expect(screen.getByTestId('ability-blink').getAttribute('data-index')).toBe('0');
    expect(screen.getByTestId('ability-blink').getAttribute('data-selected')).toBe('true');
    expect(screen.getByTestId('ability-nova').getAttribute('data-disabled')).toBe('true');
    expect(screen.getByText('selected').textContent).toBe('selected');
  });

  it('renders ability tooltip metadata', () => {
    render(<AbilityTooltip name="Blink" description="Dash through danger." cost="20 MP" cooldown="8s" state="ready" />);

    expect(screen.getByRole('tooltip', { name: 'Blink ready' }).getAttribute('data-state')).toBe('ready');
    expect(screen.getByText('Cost 20 MP').textContent).toBe('Cost 20 MP');
    expect(screen.getByText('Cooldown 8s').textContent).toBe('Cooldown 8s');
  });

  it('renders cast bar state and progress', () => {
    render(<CastBar label="Arc Beam" progress={0.72} state="channeling" />);

    expect(screen.getByRole('status', { name: 'Arc Beam channeling 72%' }).getAttribute('data-state')).toBe('channeling');
    expect(screen.getByText('72%').textContent).toBe('72%');
  });

  it('renders a target frame with health and statuses', () => {
    render(
      <TargetFrame
        name="Warden"
        faction="boss"
        health={420}
        maxHealth={800}
        statuses={[{ label: 'Burn', tone: 'debuff', duration: '8s' }]}
      />,
    );

    expect(screen.getByRole('status', { name: 'Warden boss target' }).getAttribute('data-faction')).toBe('boss');
    expect(screen.getByText('Burn').textContent).toBe('Burn');
  });

  it('renders standalone and grouped map markers', () => {
    render(
      <>
        <MapMarker x={25} y={70} tone="objective" label="Beacon" active />
        <MiniMap
          label="Sector map"
          markers={[
            { id: 'ally', x: 18, y: 40, tone: 'ally', label: 'Ally' },
            { id: 'enemy', x: 72, y: 52, tone: 'enemy', label: 'Enemy' },
          ]}
        />
      </>,
    );

    const marker = screen.getByLabelText('Beacon objective marker');
    expect(marker.getAttribute('data-tone')).toBe('objective');
    expect(marker.getAttribute('data-active')).toBe('true');
    expect(marker.getAttribute('style')).toContain('--game-ui-marker-x: 25%');
    expect(screen.getByLabelText('Sector map with 2 markers').textContent).toContain('Sector map');
  });

  it('selects loot and map items through collection callbacks', () => {
    const selectedLoot: string[] = [];
    const selectedMarker: string[] = [];

    render(
      <>
        <LootStack
          selectedId="core"
          onItemSelect={(id) => selectedLoot.push(id)}
          items={[
            { id: 'credits', name: 'Credits', rarity: 'common', quantity: 120 },
            { id: 'core', name: 'Pulse Core', rarity: 'rare', quantity: 1 },
          ]}
        />
        <MiniMap
          selectedId="enemy"
          onMarkerSelect={(id) => selectedMarker.push(id)}
          markers={[
            { id: 'ally', x: 18, y: 40, tone: 'ally', label: 'Ally' },
            { id: 'enemy', x: 72, y: 52, tone: 'enemy', label: 'Enemy' },
          ]}
        />
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Pulse Core rare loot' }));
    fireEvent.click(screen.getByRole('button', { name: 'Enemy enemy marker' }));

    expect(selectedLoot).toEqual(['core']);
    expect(selectedMarker).toEqual(['enemy']);
    expect(screen.getByRole('button', { name: 'Pulse Core rare loot' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('renders compass markers and location danger', () => {
    render(
      <>
        <CompassBar heading={90} markers={[{ id: 'gate', label: 'Gate', heading: 120, tone: 'objective' }]} />
        <LocationTag name="Ash Gate" zone="North" danger="hostile" status="Enemy patrol" />
      </>,
    );

    expect(screen.getByRole('status', { name: 'Compass 90deg' }).textContent).toContain('Gate');
    expect(screen.getByText('Gate').getAttribute('style')).toContain('--game-ui-compass-position: 75%');
    expect(screen.getByLabelText('Ash Gate hostile location').getAttribute('data-danger')).toBe('hostile');
  });

  it('renders dialogue and choice prompt callbacks', () => {
    let selected = '';

    render(
      <>
        <DialogueBox speaker="Mira" text="Hold the gate." tone="ally" />
        <ChoicePrompt
          title="Choose route"
          choices={[
            { id: 'left', label: 'Left path', description: 'Safer' },
            { id: 'right', label: 'Right path', disabled: true },
          ]}
          onChoice={(id) => {
            selected = id;
          }}
        />
      </>,
    );

    expect(screen.getByLabelText('Mira dialogue').textContent).toContain('Hold the gate.');
    fireEvent.click(screen.getByRole('button', { name: 'Left path Safer' }));
    expect(selected).toBe('left');
  });

  it('exposes richer choice prompt option state and metadata', () => {
    const selected: string[] = [];

    render(
      <ChoicePrompt
        title="Choose route"
        label="Route choices"
        selectedId="right"
        choices={[
          { id: 'left', label: 'Left path', icon: 'L', meta: 'Safe', className: 'route-choice' },
          { id: 'right', label: 'Right path', description: 'Fast', meta: 'Risky' },
        ]}
        onChoice={(id, choice) => selected.push(`${id}:${choice.label}`)}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Left path Safe' }));

    expect(screen.getByRole('group', { name: 'Route choices' }).textContent).toContain('Risky');
    expect(screen.getByRole('button', { name: 'Right path Fast Risky' }).getAttribute('data-selected')).toBe('true');
    expect(selected).toEqual(['left:Left path']);
  });

  it('renders quest log and notification stack', () => {
    render(
      <>
        <QuestLog
          activeId="signal"
          quests={[
            {
              id: 'signal',
              title: 'Signal Hunt',
              objectives: [{ id: 'beacon', label: 'Find beacon', state: 'complete' }],
            },
          ]}
        />
        <NotificationStack
          notifications={[
            { id: 'loot', title: 'Loot', message: 'Cache found', variant: 'loot' },
            { id: 'warn', title: 'Warning', message: 'Patrol nearby', variant: 'warning' },
            { id: 'info', title: 'Info', message: 'Route updated', variant: 'info' },
            { id: 'ok', title: 'Ready', message: 'Skill online', variant: 'success' },
          ]}
          limit={2}
        />
      </>,
    );

    expect(screen.getByLabelText('Quest log').textContent).toContain('Signal Hunt');
    expect(screen.getByLabelText('Notifications 4 items').textContent).toContain('+2 more');
  });

  it('allows collection primitives to customize item and overflow rendering', () => {
    render(
      <>
        <LootStack
          label="Drops"
          limit={1}
          overflowLabel={(count) => `${count} hidden`}
          renderItem={(item, state, defaultNode) => (
            <li data-testid={`loot-${item.id}`} data-selected={state.selected}>
              {defaultNode}
            </li>
          )}
          selectedId="credits"
          items={[
            { id: 'credits', name: 'Credits', rarity: 'common', quantity: 120 },
            { id: 'core', name: 'Pulse Core', rarity: 'rare', quantity: 1 },
          ]}
        />
        <MiniMap
          selectedId="enemy"
          renderMarker={(marker, state, defaultNode) => (
            <span data-testid={`marker-${marker.id}`} data-selected={state.selected}>
              {defaultNode}
            </span>
          )}
          markers={[
            { id: 'ally', x: 18, y: 40, tone: 'ally', label: 'Ally' },
            { id: 'enemy', x: 72, y: 52, tone: 'enemy', label: 'Enemy' },
          ]}
        />
        <NotificationStack
          limit={1}
          overflowLabel={(count) => `${count} queued`}
          renderNotification={(notification, state, defaultNode) => (
            <div data-testid={`toast-${notification.id}`} data-index={state.index}>
              {defaultNode}
            </div>
          )}
          notifications={[
            { id: 'loot', title: 'Loot', message: 'Cache found', variant: 'loot' },
            { id: 'warn', title: 'Warning', message: 'Patrol nearby', variant: 'warning' },
          ]}
        />
      </>,
    );

    expect(screen.getByTestId('loot-credits').getAttribute('data-selected')).toBe('true');
    expect(screen.getByTestId('marker-enemy').getAttribute('data-selected')).toBe('true');
    expect(screen.getByTestId('toast-loot').getAttribute('data-index')).toBe('0');
    expect(screen.getByText('1 hidden').textContent).toBe('1 hidden');
    expect(screen.getByText('1 queued').textContent).toBe('1 queued');
  });

  it('activates quests through quest log callbacks', () => {
    const active: string[] = [];

    render(
      <QuestLog
        activeId="signal"
        onActiveChange={(id) => active.push(id)}
        quests={[
          {
            id: 'signal',
            title: 'Signal Hunt',
            objectives: [{ id: 'beacon', label: 'Find beacon', state: 'complete' }],
          },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(active).toEqual(['signal']);
    expect(screen.getByRole('button').getAttribute('data-active')).toBe('true');
  });

  it('allows quest logs to customize quest and label rendering', () => {
    render(
      <QuestLog
        activeId="signal"
        questCountLabel={(count) => `${count} tracked`}
        activeLabel={(id) => `Now tracking ${id}`}
        renderQuest={(quest, state, defaultNode) => (
          <div data-testid={`quest-${quest.id}`} data-selected={state.selected}>
            {defaultNode}
          </div>
        )}
        quests={[
          {
            id: 'signal',
            title: 'Signal Hunt',
            objectives: [{ id: 'beacon', label: 'Find beacon', state: 'complete' }],
          },
        ]}
      />,
    );

    expect(screen.getByText('1 tracked').textContent).toBe('1 tracked');
    expect(screen.getByText('Now tracking signal').textContent).toBe('Now tracking signal');
    expect(screen.getByTestId('quest-signal').getAttribute('data-selected')).toBe('true');
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

  it('renders runtime layers and dismisses runtime notifications', () => {
    const runtime = createGameUiRuntime();

    render(
      <GameUiRuntimeProvider runtime={runtime}>
        <GameUiLayerHost />
      </GameUiRuntimeProvider>,
    );

    act(() => {
      runtime.emitDamage({ value: 88, anchor: { x: 42, y: 36 } });
      runtime.notify({ message: 'Skill ready', durationMs: 0, closable: true });
    });

    expect(screen.getByText('88').textContent).toBe('88');
    expect(screen.getByText('Skill ready').textContent).toBe('Skill ready');

    fireEvent.click(screen.getByRole('button', { name: 'Close notification' }));

    expect(screen.queryByText('Skill ready')).toBeNull();
  });

  it('throws when runtime hook is used outside the runtime provider', () => {
    function NeedsRuntime() {
      useGameUiRuntime();
      return null;
    }

    expect(() => render(<NeedsRuntime />)).toThrow('useGameUiRuntime must be used inside GameUiRuntimeProvider');
  });
});
