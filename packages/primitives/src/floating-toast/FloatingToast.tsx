import { motion } from 'motion/react';
import React from 'react';
import type { ReactNode } from 'react';
import {
  floatingToastContentClass,
  floatingToastIconRecipe,
  floatingToastMessageClass,
  floatingToastRecipe,
  floatingToastTitleClass,
  mergeClass,
} from '../styles';

export type FloatingToastVariant = 'info' | 'success' | 'warning' | 'loot';

export interface FloatingToastProps {
  title?: string;
  message: ReactNode;
  variant?: FloatingToastVariant;
  icon?: ReactNode;
  className?: string;
}

const defaultIcons: Record<FloatingToastVariant, string> = {
  info: 'i',
  success: '+',
  warning: '!',
  loot: '*',
};

export function FloatingToast({
  title,
  message,
  variant = 'info',
  icon = defaultIcons[variant],
  className,
}: FloatingToastProps) {
  return (
    <motion.div
      className={mergeClass(floatingToastRecipe({ variant }), className)}
      data-variant={variant}
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.98 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      role="status"
    >
      <span className={floatingToastIconRecipe({ variant })} aria-hidden="true">
        {icon}
      </span>
      <span className={floatingToastContentClass}>
        {title ? <span className={floatingToastTitleClass}>{title}</span> : null}
        <span className={floatingToastMessageClass}>{message}</span>
      </span>
    </motion.div>
  );
}
