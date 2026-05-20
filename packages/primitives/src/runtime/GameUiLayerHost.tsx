import React, { useEffect } from 'react';
import type { CSSProperties } from 'react';
import type { ToastEventRecord } from '@tiny-playworks/game-ui-runtime';
import { DamageNumber } from '../damage-number';
import { FloatingToast } from '../floating-toast';
import { RewardReveal } from '../reward-reveal';
import {
  gameUiDebugLayerClass,
  gameUiFeedbackItemClass,
  gameUiFeedbackLayerClass,
  gameUiHudLayerClass,
  gameUiLayerClass,
  gameUiLayerHostClass,
  gameUiModalLayerClass,
  gameUiNotificationLayerClass,
  mergeClass,
} from '../styles';
import { useGameUiLayer, useGameUiRuntime } from './GameUiRuntimeProvider';

export interface GameUiLayerHostProps {
  className?: string;
}

export function GameUiLayerHost({ className }: GameUiLayerHostProps) {
  const runtime = useGameUiRuntime();
  const feedback = useGameUiLayer('feedback');
  const notification = useGameUiLayer('notification');
  const modal = useGameUiLayer('modal');

  return (
    <div className={mergeClass(gameUiLayerHostClass, className)} data-game-ui-layer-host="">
      <div className={mergeClass(gameUiLayerClass, gameUiHudLayerClass)} data-game-ui-layer="hud" />
      <div className={mergeClass(gameUiLayerClass, gameUiFeedbackLayerClass)} data-game-ui-layer="feedback">
        {feedback.damage.map((damage) => (
          <span
            key={damage.id}
            className={gameUiFeedbackItemClass}
            style={{
              '--game-ui-feedback-x': damage.anchor ? `${damage.anchor.x}%` : undefined,
              '--game-ui-feedback-y': damage.anchor ? `${damage.anchor.y}%` : undefined,
            } as CSSProperties}
          >
            <DamageNumber
              value={damage.value}
              variant={damage.variant}
              prefix={damage.prefix}
              size={damage.size}
              onExitComplete={() => runtime.dispatch({ type: 'damage:complete', id: damage.id })}
            />
          </span>
        ))}
      </div>
      <div className={mergeClass(gameUiLayerClass, gameUiNotificationLayerClass)} data-game-ui-layer="notification">
        {notification.toasts.map((toast) => (
          <RuntimeToast key={toast.id} toast={toast} />
        ))}
      </div>
      <div className={mergeClass(gameUiLayerClass, gameUiModalLayerClass)} data-game-ui-layer="modal" data-active={Boolean(modal.reward)}>
        {modal.reward ? (
          <RewardReveal
            title={modal.reward.title}
            items={modal.reward.items}
            state={modal.reward.state}
            revealLabel="Reveal"
            claimLabel="Claim"
            onReveal={() => runtime.dispatch({ type: 'reward-reveal:update', payload: { id: modal.reward!.id, state: 'revealed' } })}
            onClaim={() => {
              runtime.dispatch({ type: 'reward-reveal:clear' });
              runtime.notify({ title: 'Loot claimed', message: 'Reward moved to inventory.', variant: 'loot' });
            }}
          />
        ) : null}
      </div>
      <div className={mergeClass(gameUiLayerClass, gameUiDebugLayerClass)} data-game-ui-layer="debug" />
    </div>
  );
}

function RuntimeToast({ toast }: { toast: ToastEventRecord }) {
  const runtime = useGameUiRuntime();

  useEffect(() => {
    const durationMs = toast.durationMs ?? 3200;
    if (durationMs <= 0) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      runtime.dismiss(toast.id);
    }, durationMs);

    return () => window.clearTimeout(timer);
  }, [runtime, toast.durationMs, toast.id]);

  return (
    <FloatingToast
      title={toast.title}
      message={toast.message}
      variant={toast.variant}
      icon={toast.icon}
      closable={toast.closable ?? true}
      onClose={() => runtime.dismiss(toast.id)}
    />
  );
}
