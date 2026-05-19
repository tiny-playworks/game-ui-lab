import React from 'react';
import { FloatingToast } from '../floating-toast';
import type { FloatingToastProps } from '../floating-toast';

export interface NotificationStackItem extends FloatingToastProps {
  id: string;
}

export interface NotificationStackProps {
  notifications: NotificationStackItem[];
  label?: string;
  limit?: number;
  className?: string;
}

export function NotificationStack({
  notifications,
  label = 'Notifications',
  limit = 3,
  className,
}: NotificationStackProps) {
  const visibleItems = notifications.slice(0, limit);

  return (
    <section className={['game-ui-notification-stack', className].filter(Boolean).join(' ')} aria-label={`${label} ${notifications.length} items`}>
      {visibleItems.map(({ id, ...notification }) => (
        <FloatingToast key={id} {...notification} />
      ))}
      {notifications.length > visibleItems.length ? (
        <span className="game-ui-notification-stack__overflow">+{notifications.length - visibleItems.length} more</span>
      ) : null}
    </section>
  );
}
