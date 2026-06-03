import { describe, expect, it } from '@rstest/core';
import { createGameUiRuntime } from '../src';

describe('game ui runtime', () => {
  it('starts with empty layers', () => {
    const runtime = createGameUiRuntime();
    const state = runtime.getState();

    expect(state.layers.feedback.damage).toHaveLength(0);
    expect(state.layers.notification.toasts).toHaveLength(0);
    expect(state.layers.hud.cooldowns).toEqual({});
    expect(state.layers.modal.reward).toBeUndefined();
    expect(state.layers.narrative).toEqual({ dialogueQueue: [] });
  });

  it('emits damage and returns a stable id', () => {
    const runtime = createGameUiRuntime({ now: () => 100 });

    const id = runtime.emitDamage({ value: 128, variant: 'critical' });

    expect(id).toBe('damage-1');
    expect(runtime.getState().layers.feedback.damage[0]).toMatchObject({
      id,
      value: 128,
      variant: 'critical',
      createdAt: 100,
    });
  });

  it('caps toast notifications by fifo order', () => {
    const runtime = createGameUiRuntime({ toastLimit: 2 });

    runtime.notify({ message: 'one' });
    runtime.notify({ message: 'two' });
    runtime.notify({ message: 'three' });

    expect(runtime.getState().layers.notification.toasts.map((toast) => toast.message)).toEqual(['two', 'three']);
  });

  it('dismisses one toast', () => {
    const runtime = createGameUiRuntime();
    const first = runtime.notify({ message: 'one' });
    runtime.notify({ message: 'two' });

    runtime.dismiss(first);

    expect(runtime.getState().layers.notification.toasts.map((toast) => toast.message)).toEqual(['two']);
  });

  it('clears one layer without touching others', () => {
    const runtime = createGameUiRuntime();
    runtime.emitDamage({ value: 64 });
    runtime.notify({ message: 'ready' });

    runtime.clearLayer('feedback');

    expect(runtime.getState().layers.feedback.damage).toHaveLength(0);
    expect(runtime.getState().layers.notification.toasts).toHaveLength(1);
  });

  it('clears hud to default structure', () => {
    const runtime = createGameUiRuntime();
    runtime.setCombo(5);
    runtime.upsertBuff({ id: 'haste', label: 'Haste', tone: 'buff' });

    runtime.clearLayer('hud');

    expect(runtime.getState().layers.hud).toEqual({ cooldowns: {} });
  });

  it('increments and resets combo', () => {
    const runtime = createGameUiRuntime();

    runtime.setCombo(2, 'Chain');
    runtime.incrementCombo(3);

    expect(runtime.getState().layers.hud.combo).toEqual({ count: 5, label: 'Chain' });

    runtime.resetCombo();

    expect(runtime.getState().layers.hud.combo).toBeUndefined();
  });

  it('tracks quest objectives', () => {
    const runtime = createGameUiRuntime();

    runtime.trackQuest({
      title: 'Signal hunt',
      objectives: [{ id: 'beacon', label: 'Find beacon', state: 'active' }],
    });
    runtime.dispatch({
      type: 'quest:objective:update',
      payload: { id: 'beacon', patch: { state: 'complete' } },
    });

    expect(runtime.getState().layers.hud.quest?.objectives[0].state).toBe('complete');
  });

  it('updates map markers and selection', () => {
    const runtime = createGameUiRuntime();

    runtime.setMapMarkers({
      label: 'Sector',
      markers: [{ id: 'enemy', x: 40, y: 50, tone: 'enemy' }],
    });
    runtime.dispatch({ type: 'map:select', id: 'enemy' });

    expect(runtime.getState().layers.hud.map?.selectedId).toBe('enemy');
  });

  it('tracks richer ability, resource, inventory, and shop state', () => {
    const runtime = createGameUiRuntime();

    runtime.dispatch({
      type: 'cooldown:update',
      payload: {
        id: 'burst',
        label: 'Burst',
        progress: 0.4,
        active: true,
        variant: 'ultimate',
        resourceCost: '35 MP',
        comboHint: 'Chain +2',
        cooldownText: '4.2s',
        triggerKey: '2',
      },
    });
    runtime.dispatch({ type: 'ability:select', id: 'burst' });
    runtime.dispatch({
      type: 'resource:update',
      payload: { id: 'mana', label: 'Mana', value: 42, max: 100, kind: 'mana' },
    });
    runtime.dispatch({
      type: 'inventory:set',
      payload: {
        title: 'Bag',
        selectedId: 'weapon',
        slots: [
          {
            id: 'weapon',
            item: { id: 'blade', name: 'Arc Blade', rarity: 'epic' },
            slotType: 'weapon',
            compareState: 'upgrade',
            stackCount: 2,
          },
        ],
      },
    });
    runtime.dispatch({
      type: 'inventory:slot:update',
      payload: { id: 'weapon', patch: { equipped: true } },
    });
    runtime.dispatch({
      type: 'shop:open',
      payload: {
        id: 'vendor',
        title: 'Vendor',
        items: [{ id: 'potion', name: 'Potion', price: 50, stock: 0, unavailableReason: 'Need more gold' }],
        currencies: [],
        selectedId: 'potion',
      },
    });
    runtime.dispatch({ type: 'shop:item:select', id: 'potion' });

    const state = runtime.getState();

    expect(state.layers.hud.cooldowns.burst.resourceCost).toBe('35 MP');
    expect(state.layers.hud.selectedAbilityId).toBe('burst');
    expect(state.layers.hud.resources?.mana.value).toBe(42);
    expect(state.layers.modal.inventory?.slots[0]).toMatchObject({
      id: 'weapon',
      equipped: true,
      compareState: 'upgrade',
      stackCount: 2,
    });
    expect(state.layers.modal.shop?.selectedId).toBe('potion');
    expect(state.layers.modal.shop?.items[0].unavailableReason).toBe('Need more gold');
  });

  it('upserts and removes buffs', () => {
    const runtime = createGameUiRuntime();

    runtime.upsertBuff({ id: 'haste', label: 'Haste', tone: 'buff', count: 2 });
    runtime.upsertBuff({ id: 'haste', label: 'Haste', tone: 'buff', count: 3 });
    runtime.dispatch({ type: 'buff:remove', id: 'haste' });

    expect(runtime.getState().layers.hud.buffs).toEqual([]);
  });

  it('queues dialogue and advances the narrative layer', () => {
    const runtime = createGameUiRuntime();

    runtime.enqueueDialogue({ speaker: 'Guide', text: 'Hold position.' });
    runtime.enqueueDialogue({ speaker: 'Guide', text: 'Move out.' });

    expect(runtime.getState().layers.narrative?.dialogueQueue).toHaveLength(2);
    expect(runtime.getState().layers.narrative?.dialogueQueue[0].speaker).toBe('Guide');

    runtime.advanceDialogue();

    expect(runtime.getState().layers.narrative?.dialogueQueue).toHaveLength(1);
    expect(runtime.getState().layers.narrative?.dialogueQueue[0].text).toBe('Move out.');
  });

  it('shows choices in narrative layer', () => {
    const runtime = createGameUiRuntime();

    runtime.showChoices({
      title: 'Route',
      options: [{ id: 'left', label: 'Left path' }],
    });
    runtime.dispatch({ type: 'choice:select', id: 'left' });

    expect(runtime.getState().layers.narrative?.choices?.selectedId).toBe('left');
  });

  it('sets party members and selection', () => {
    const runtime = createGameUiRuntime();

    runtime.setParty({
      members: [{ id: 'pilot', name: 'Pilot', health: 80, maxHealth: 100 }],
      selectedId: 'pilot',
    });
    runtime.dispatch({ type: 'party:select', id: 'pilot' });

    expect(runtime.getState().layers.hud.party?.members[0].name).toBe('Pilot');
    expect(runtime.getState().layers.hud.party?.selectedId).toBe('pilot');
  });

  it('opens quest log modal and activates a quest', () => {
    const runtime = createGameUiRuntime();

    runtime.openQuestLog({
      title: 'Log',
      quests: [{ id: 'a', title: 'Alpha', objectives: [{ id: 'o1', label: 'Step' }] }],
      activeId: 'a',
    });
    runtime.dispatch({ type: 'quest-log:activate', id: 'a' });

    expect(runtime.getState().layers.modal.questLog?.activeId).toBe('a');
  });

  it('opens shop and clears reward modal', () => {
    const runtime = createGameUiRuntime();

    runtime.dispatch({
      type: 'reward-reveal:show',
      payload: { id: 'cache', title: 'Cache', items: [], state: 'sealed' },
    });
    runtime.dispatch({
      type: 'shop:open',
      payload: {
        id: 'vendor',
        title: 'Vendor',
        items: [{ id: 'potion', name: 'Potion', price: 50 }],
        currencies: [{ id: 'gold', label: 'Gold', amount: 200, tone: 'gold' }],
      },
    });

    expect(runtime.getState().layers.modal.reward).toBeUndefined();
    expect(runtime.getState().layers.modal.shop?.title).toBe('Vendor');
  });

  it('notifies subscribers until unsubscribe', () => {
    const runtime = createGameUiRuntime();
    const states: number[] = [];
    const unsubscribe = runtime.subscribe((state) => {
      states.push(state.layers.notification.toasts.length);
    });

    runtime.notify({ message: 'one' });
    unsubscribe();
    runtime.notify({ message: 'two' });

    expect(states).toEqual([1]);
  });
});
