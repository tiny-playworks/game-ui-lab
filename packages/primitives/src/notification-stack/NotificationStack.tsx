import React from "react";
import type { CSSProperties, ReactNode } from "react";
import { FloatingToast } from "../floating-toast/FloatingToast";
import type { FloatingToastProps } from "../floating-toast/FloatingToast";
import { mergeClass } from "../styles";
import { notificationStackClass, notificationStackOverflowClass } from "./styles";
import type { GameUiCollectionRenderer } from "../types";

export interface NotificationStackItem extends FloatingToastProps {
  id: string;
}

export interface NotificationStackProps {
  notifications: NotificationStackItem[];
  renderNotification?: GameUiCollectionRenderer<NotificationStackItem>;
  overflowLabel?: (count: number) => ReactNode;
  label?: string;
  limit?: number;
  className?: string;
  style?: CSSProperties;
}

export function NotificationStack({
  notifications,
  renderNotification,
  overflowLabel,
  label = "Notifications",
  limit = 3,
  className,
  style,
}: NotificationStackProps) {
  const visibleItems = notifications.slice(0, limit);

  return (
    <section
      className={mergeClass(notificationStackClass, className)}
      aria-label={`${label} ${notifications.length} items`}
      style={style}
    >
      {visibleItems.map(({ id, ...notification }, index) => {
        const item = { id, ...notification };
        const defaultNode = <FloatingToast {...notification} />;

        return (
          <React.Fragment key={id}>
            {renderNotification
              ? renderNotification(item, { index, selected: false, disabled: false }, defaultNode)
              : defaultNode}
          </React.Fragment>
        );
      })}
      {notifications.length > visibleItems.length ? (
        <span className={notificationStackOverflowClass}>
          {overflowLabel
            ? overflowLabel(notifications.length - visibleItems.length)
            : `+${notifications.length - visibleItems.length} more`}
        </span>
      ) : null}
    </section>
  );
}
