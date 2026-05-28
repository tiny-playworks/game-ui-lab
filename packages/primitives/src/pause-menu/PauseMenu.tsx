import React from 'react';
import type { CSSProperties } from 'react';
import { mergeClass, pauseMenuActionsClass, pauseMenuClass, pauseMenuItemRecipe, pauseMenuTitleClass } from '../styles';

export interface PauseMenuItem {
  id: string;
  label: string;
  disabled?: boolean;
  danger?: boolean;
}

export interface PauseMenuProps {
  open: boolean;
  title?: string;
  items: PauseMenuItem[];
  onSelect?: (id: string, item: PauseMenuItem) => void;
  onResume?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function PauseMenu({
  open,
  title = 'Paused',
  items,
  onSelect,
  onResume,
  className,
  style,
}: PauseMenuProps) {
  if (!open) {
    return null;
  }

  return (
    <dialog className={mergeClass(pauseMenuClass, className)} style={style} open aria-label={title} data-open={open}>
      <header className={pauseMenuTitleClass}>{title}</header>
      <div className={pauseMenuActionsClass} role="menu">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            className={pauseMenuItemRecipe({ danger: item.danger })}
            disabled={item.disabled}
            onClick={() => onSelect?.(item.id, item)}
          >
            {item.label}
          </button>
        ))}
        {onResume ? (
          <button type="button" className={pauseMenuItemRecipe({ danger: false })} onClick={onResume}>
            Resume
          </button>
        ) : null}
      </div>
    </dialog>
  );
}
