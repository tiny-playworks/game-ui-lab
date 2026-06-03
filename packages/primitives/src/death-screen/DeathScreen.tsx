import React from "react";
import type { CSSProperties } from "react";
import {
  deathScreenActionsClass,
  deathScreenClass,
  deathScreenMessageClass,
  deathScreenPrimaryClass,
  deathScreenSecondaryClass,
  deathScreenTitleClass,
  mergeClass,
} from "../styles";

export interface DeathScreenProps {
  open: boolean;
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function DeathScreen({
  open,
  title = "Defeated",
  message,
  actionLabel = "Retry",
  onAction,
  secondaryLabel,
  onSecondary,
  className,
  style,
}: DeathScreenProps) {
  if (!open) {
    return null;
  }

  return (
    <dialog className={mergeClass(deathScreenClass, className)} style={style} open aria-label={title} data-open={open}>
      <h2 className={deathScreenTitleClass}>{title}</h2>
      {message ? <p className={deathScreenMessageClass}>{message}</p> : null}
      <div className={deathScreenActionsClass}>
        {onAction ? (
          <button type="button" className={deathScreenPrimaryClass} onClick={onAction}>
            {actionLabel}
          </button>
        ) : null}
        {secondaryLabel && onSecondary ? (
          <button type="button" className={deathScreenSecondaryClass} onClick={onSecondary}>
            {secondaryLabel}
          </button>
        ) : null}
      </div>
    </dialog>
  );
}
