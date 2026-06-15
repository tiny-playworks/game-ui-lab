import type { DamageEventRecord, GameUiRuntime, ToastEventRecord } from "@tiny-playworks/game-ui-runtime";

export interface PixiDisplayObject {
  x: number;
  y: number;
  destroy(): void;
}

export interface PixiFeedbackContainer {
  addChild(child: PixiDisplayObject): void;
  removeChild?(child: PixiDisplayObject): void;
}

export interface PixiTextFactory {
  createLabel(text: string, options?: { variant?: DamageEventRecord["variant"]; size?: number }): PixiDisplayObject;
}

export interface PixiFeedbackBridgeOptions {
  container: PixiFeedbackContainer;
  factory: PixiTextFactory;
  stageWidth?: number;
  stageHeight?: number;
  onDamageAdd?: (node: PixiDisplayObject, record: DamageEventRecord) => void;
  /**
   * Called when a damage number should be removed from the screen.
   * @warning **CRITICAL**: If you provide this callback to handle custom removal animations (e.g. fade out),
   * you MUST call the `done()` function when your animation finishes. Otherwise, the PixiDisplayObject will
   * never be destroyed, leading to a memory leak.
   */
  onDamageRemove?: (node: PixiDisplayObject, record: DamageEventRecord, done: () => void) => void;
  onToastAdd?: (node: PixiDisplayObject, record: ToastEventRecord, index: number) => void;
  /**
   * Called when a toast should be removed from the screen.
   * @warning **CRITICAL**: If you provide this callback to handle custom removal animations (e.g. slide out),
   * you MUST call the `done()` function when your animation finishes. Otherwise, the PixiDisplayObject will
   * never be destroyed, leading to a memory leak.
   */
  onToastRemove?: (node: PixiDisplayObject, record: ToastEventRecord, done: () => void) => void;
}

const variantFill: Record<DamageEventRecord["variant"], string> = {
  damage: "#ff4d7d",
  heal: "#5cff9d",
  critical: "#ffd166",
  miss: "#b7c0d8",
};

function anchorToPosition(anchor: DamageEventRecord["anchor"] | undefined, width: number, height: number) {
  return {
    x: ((anchor?.x ?? 50) / 100) * width,
    y: ((anchor?.y ?? 40) / 100) * height,
  };
}

export function createPixiFeedbackBridge(runtime: GameUiRuntime, options: PixiFeedbackBridgeOptions): () => void {
  const width = options.stageWidth ?? 800;
  const height = options.stageHeight ?? 600;
  const damageNodes = new Map<string, PixiDisplayObject>();
  const damageRecords = new Map<string, DamageEventRecord>();
  const toastNodes = new Map<string, PixiDisplayObject>();
  const toastRecords = new Map<string, ToastEventRecord>();

  function syncDamage(records: DamageEventRecord[]) {
    const activeIds = new Set(records.map((record) => record.id));

    for (const [id, node] of damageNodes) {
      if (!activeIds.has(id)) {
        const record = damageRecords.get(id);
        if (options.onDamageRemove && record) {
          options.onDamageRemove(node, record, () => {
            node.destroy();
          });
        } else {
          node.destroy();
        }
        damageNodes.delete(id);
        damageRecords.delete(id);
      }
    }

    for (const record of records) {
      if (damageNodes.has(record.id)) {
        continue;
      }

      const label = `${record.prefix ? `${record.prefix} ` : ""}${record.value}`;
      const node = options.factory.createLabel(label, {
        variant: record.variant,
        size: record.size,
      });
      const position = anchorToPosition(record.anchor, width, height);
      node.x = position.x;
      node.y = position.y;
      options.container.addChild(node);
      damageNodes.set(record.id, node);
      damageRecords.set(record.id, record);

      if (options.onDamageAdd) {
        options.onDamageAdd(node, record);
      }
    }
  }

  function syncToasts(records: ToastEventRecord[]) {
    const activeIds = new Set(records.map((record) => record.id));

    for (const [id, node] of toastNodes) {
      if (!activeIds.has(id)) {
        const record = toastRecords.get(id);
        if (options.onToastRemove && record) {
          options.onToastRemove(node, record, () => {
            node.destroy();
          });
        } else {
          node.destroy();
        }
        toastNodes.delete(id);
        toastRecords.delete(id);
      }
    }

    records.forEach((record, index) => {
      if (toastNodes.has(record.id)) {
        return;
      }

      const node = options.factory.createLabel(record.title ? `${record.title}: ${record.message}` : record.message, {
        variant: "damage",
      });
      node.x = width * 0.72;
      node.y = height * 0.12 + index * 36;
      options.container.addChild(node);
      toastNodes.set(record.id, node);
      toastRecords.set(record.id, record);

      if (options.onToastAdd) {
        options.onToastAdd(node, record, index);
      }
    });
  }

  function sync(state = runtime.getState()) {
    syncDamage(state.layers.feedback.damage);
    syncToasts(state.layers.notification.toasts);
  }

  sync();

  return runtime.subscribe((state) => {
    sync(state);
  });
}

export function createSimplePixiTextFactory(): PixiTextFactory {
  return {
    createLabel(text, options) {
      const fill = options?.variant ? variantFill[options.variant] : "#f8fafc";
      return {
        x: 0,
        y: 0,
        destroy() {
          void fill;
          void text;
        },
      };
    },
  };
}
