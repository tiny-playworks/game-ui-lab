import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { StatusBadge } from '../status-badge';
import type { StatusBadgeProps } from '../status-badge';
import {
  buffBarClass,
  buffBarItemButtonClass,
  buffBarItemClass,
  buffBarListClass,
  buffBarOverflowClass,
  mergeClass,
} from '../styles';
import type { GameUiCollectionRenderer } from '../types';

export interface BuffBarBuff extends StatusBadgeProps {
  id: string;
  className?: string;
}

export interface BuffBarProps {
  buffs: BuffBarBuff[];
  selectedId?: string;
  onBuffSelect?: (id: string, buff: BuffBarBuff) => void;
  renderBuff?: GameUiCollectionRenderer<BuffBarBuff>;
  overflowLabel?: (count: number) => ReactNode;
  label?: string;
  limit?: number;
  className?: string;
  style?: CSSProperties;
}

function pluralizeBuffs(count: number) {
  return count === 1 ? '1 buff' : `${count} buffs`;
}

export function BuffBar({
  buffs,
  selectedId,
  onBuffSelect,
  renderBuff,
  overflowLabel,
  label = 'Buff bar',
  limit = 6,
  className,
  style,
}: BuffBarProps) {
  const visibleLimit = Math.max(0, Math.floor(limit));
  const visibleBuffs = buffs.slice(0, visibleLimit);
  const overflow = Math.max(0, buffs.length - visibleBuffs.length);
  const ariaLabel = `${label} ${pluralizeBuffs(buffs.length)}`;

  return (
    <div className={mergeClass(buffBarClass, className)} style={style} data-overflow={overflow}>
      <ul className={buffBarListClass} aria-label={ariaLabel} role="list">
        {visibleBuffs.map((buff, index) => {
          const selected = selectedId === buff.id;
          const { id, className: buffClassName, ...badgeProps } = buff;
          const badge = <StatusBadge {...badgeProps} className={buffClassName} />;
          const defaultNode = (
            <li className={buffBarItemClass} data-selected={selected}>
              {onBuffSelect ? (
                <button
                  type="button"
                  className={buffBarItemButtonClass}
                  data-selected={selected}
                  aria-pressed={selected}
                  aria-label={`${buff.label} ${buff.tone}`}
                  onClick={() => onBuffSelect(id, buff)}
                >
                  {badge}
                </button>
              ) : (
                badge
              )}
            </li>
          );

          return (
            <React.Fragment key={id}>
              {renderBuff ? renderBuff(buff, { index, selected, disabled: false }, badge) : defaultNode}
            </React.Fragment>
          );
        })}
        {overflow > 0 ? (
          <li className={buffBarOverflowClass}>
            <span>{overflowLabel ? overflowLabel(overflow) : `+${overflow}`}</span>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
