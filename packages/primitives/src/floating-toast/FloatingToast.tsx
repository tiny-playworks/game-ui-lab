import { domAnimation, LazyMotion, m } from "motion/react";
import React from "react";
import type { ReactNode } from "react";
import { mergeClass } from "../styles";
import {
  floatingToastActionClass,
  floatingToastCloseClass,
  floatingToastContentClass,
  floatingToastIconRecipe,
  floatingToastMessageClass,
  floatingToastRecipe,
  floatingToastTitleClass,
} from "./styles";
import type { GameUiMotionMode } from "../types";

export type FloatingToastVariant = "info" | "success" | "warning" | "loot";

export interface FloatingToastProps {
  title?: string;
  message: ReactNode;
  variant?: FloatingToastVariant;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  durationMs?: number;
  closable?: boolean;
  onClose?: () => void;
  motion?: GameUiMotionMode;
  className?: string;
}

const defaultIcons: Record<FloatingToastVariant, string> = {
  info: "i",
  success: "+",
  warning: "!",
  loot: "*",
};

export function FloatingToast({
  title,
  message,
  variant = "info",
  icon = defaultIcons[variant],
  action,
  closable = false,
  onClose,
  motion = "live",
  className,
}: FloatingToastProps) {
  const content = (
    <>
      <span className={floatingToastIconRecipe({ variant })} aria-hidden="true">
        {icon}
      </span>
      <span className={floatingToastContentClass}>
        {title ? <span className={floatingToastTitleClass}>{title}</span> : null}
        <span className={floatingToastMessageClass}>{message}</span>
      </span>
      {action ? (
        <button className={floatingToastActionClass} type="button" onClick={action.onClick}>
          {action.label}
        </button>
      ) : null}
      {closable ? (
        <button className={floatingToastCloseClass} type="button" aria-label="Close notification" onClick={onClose}>
          x
        </button>
      ) : null}
    </>
  );

  if (motion !== "live") {
    return (
      <output
        className={mergeClass(floatingToastRecipe({ variant }), className)}
        data-variant={variant}
        data-motion={motion}
      >
        {content}
      </output>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.output
        className={mergeClass(floatingToastRecipe({ variant }), className)}
        data-variant={variant}
        data-motion={motion}
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -18, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {content}
      </m.output>
    </LazyMotion>
  );
}
