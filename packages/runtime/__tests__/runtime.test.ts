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
