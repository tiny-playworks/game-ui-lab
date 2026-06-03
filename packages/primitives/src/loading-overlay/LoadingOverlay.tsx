import React from "react";
import type { CSSProperties } from "react";
import {
  loadingOverlayClass,
  loadingOverlayMessageClass,
  loadingOverlayProgressClass,
  loadingOverlayTitleClass,
  mergeClass,
} from "../styles";

export interface LoadingOverlayProps {
  open: boolean;
  title?: string;
  message?: string;
  progress?: number;
  className?: string;
  style?: CSSProperties;
}

export function LoadingOverlay({ open, title = "Loading", message, progress, className, style }: LoadingOverlayProps) {
  if (!open) {
    return null;
  }

  const clampedProgress = progress === undefined ? undefined : Math.max(0, Math.min(1, progress));
  const overlayStyle = {
    ...style,
    "--game-ui-loading-progress": clampedProgress === undefined ? undefined : `${clampedProgress * 100}%`,
  } as CSSProperties;

  return (
    <output
      className={mergeClass(loadingOverlayClass, className)}
      style={overlayStyle}
      aria-live="polite"
      aria-label={title}
      data-open={open}
      data-progress={clampedProgress !== undefined}
    >
      <strong className={loadingOverlayTitleClass}>{title}</strong>
      {message ? <p className={loadingOverlayMessageClass}>{message}</p> : null}
      {clampedProgress !== undefined ? (
        <progress
          className={loadingOverlayProgressClass}
          max={100}
          value={Math.round(clampedProgress * 100)}
          aria-label={`${title} progress`}
        />
      ) : null}
    </output>
  );
}
