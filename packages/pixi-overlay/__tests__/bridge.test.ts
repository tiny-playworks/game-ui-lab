import { describe, expect, it } from '@rstest/core';
import { createGameUiRuntime } from '@tiny-playworks/game-ui-runtime';
import { createPixiFeedbackBridge, createSimplePixiTextFactory } from '../src';

describe('pixi feedback bridge', () => {
  it('creates labels for damage and removes them when records clear', () => {
    const runtime = createGameUiRuntime();
    let active = 0;

    const unsubscribe = createPixiFeedbackBridge(runtime, {
      container: {
        addChild() {
          active += 1;
        },
      },
      factory: {
        createLabel() {
          return {
            x: 0,
            y: 0,
            destroy() {
              active -= 1;
            },
          };
        },
      },
      stageWidth: 400,
      stageHeight: 300,
    });

    const id = runtime.emitDamage({ value: 42, variant: 'critical', anchor: { x: 50, y: 50 } });
    expect(active).toBe(1);

    runtime.dispatch({ type: 'damage:complete', id });
    expect(active).toBe(0);

    unsubscribe();
  });

  it('tracks toast notifications', () => {
    const runtime = createGameUiRuntime({ toastLimit: 2 });
    let count = 0;

    createPixiFeedbackBridge(runtime, {
      container: {
        addChild() {
          count += 1;
        },
      },
      factory: createSimplePixiTextFactory(),
    });

    runtime.notify({ message: 'Ready' });
    runtime.notify({ message: 'Loot' });
    expect(count).toBe(2);
  });
});
