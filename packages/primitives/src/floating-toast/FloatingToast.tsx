import { motion } from 'motion/react';
import React from 'react';
import type { ReactNode } from 'react';

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
      className={['game-ui-floating-toast', className].filter(Boolean).join(' ')}
      data-variant={variant}
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.98 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      role="status"
    >
      <span className="game-ui-floating-toast__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="game-ui-floating-toast__content">
        {title ? <span className="game-ui-floating-toast__title">{title}</span> : null}
        <span className="game-ui-floating-toast__message">{message}</span>
      </span>
    </motion.div>
  );
}
