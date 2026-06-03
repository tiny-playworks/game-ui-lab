import React from "react";
import type { CSSProperties } from "react";
import {
  gameTimerBarClass,
  gameTimerLabelClass,
  gameTimerRecipe,
  gameTimerRingClass,
  gameTimerValueClass,
  mergeClass,
} from "../styles";

export interface GameTimerProps {
  remainingMs: number;
  totalMs: number;
  label?: string;
  variant?: "bar" | "ring";
  warningThreshold?: number;
  className?: string;
  style?: CSSProperties;
}

function clampProgress(remainingMs: number, totalMs: number) {
  if (totalMs <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(1, remainingMs / totalMs));
}

function formatTime(remainingMs: number) {
  const seconds = Math.max(0, Math.ceil(remainingMs / 1000));
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

export function GameTimer({
  remainingMs,
  totalMs,
  label,
  variant = "bar",
  warningThreshold = 0.25,
  className,
  style,
}: GameTimerProps) {
  const progress = clampProgress(remainingMs, totalMs);
  const warning = progress <= warningThreshold;
  const timeLabel = formatTime(remainingMs);
  const timerStyle = {
    ...style,
    "--game-ui-timer-progress": `${progress * 100}%`,
  } as CSSProperties;

  return (
    <div
      className={mergeClass(gameTimerRecipe({ variant, warning }), className)}
      style={timerStyle}
      role="timer"
      aria-label={label ? `${label} ${timeLabel}` : timeLabel}
      data-variant={variant}
      data-warning={warning}
    >
      {label ? <span className={gameTimerLabelClass}>{label}</span> : null}
      <span className={gameTimerValueClass}>{timeLabel}</span>
      {variant === "ring" ? (
        <span className={gameTimerRingClass} aria-hidden="true" />
      ) : (
        <span className={gameTimerBarClass} aria-hidden="true" />
      )}
    </div>
  );
}
