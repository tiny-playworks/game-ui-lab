import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { LootCard } from '../loot-card';
import type { LootStackItem } from '../loot-stack';
import {
  inventoryGridClass,
  inventoryGridListClass,
  inventoryGridSlotRecipe,
  mergeClass,
} from '../styles';
import type { GameUiCollectionRenderer } from '../types';

export interface InventoryGridSlot {
  id: string;
  item?: LootStackItem;
  locked?: boolean;
  equipped?: boolean;
  className?: string;
}

export interface InventoryGridProps {
  slots: InventoryGridSlot[];
  columns?: number;
  selectedId?: string;
  draggingId?: string;
  onSlotSelect?: (id: string, slot: InventoryGridSlot) => void;
  onSlotMove?: (fromId: string, toId: string, fromSlot: InventoryGridSlot, toSlot: InventoryGridSlot) => void;
  renderSlot?: GameUiCollectionRenderer<InventoryGridSlot>;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function InventoryGrid({
  slots,
  columns = 4,
  selectedId,
  draggingId,
  onSlotSelect,
  onSlotMove,
  renderSlot,
  label = 'Inventory',
  className,
  style,
}: InventoryGridProps) {
  const columnCount = Math.max(1, Math.floor(columns));
  const gridStyle = {
    ...style,
    gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
  } as CSSProperties;
  const ariaLabel = `${label} ${slots.length} slots`;

  return (
    <section className={mergeClass(inventoryGridClass, className)} data-columns={columnCount}>
      <ul className={inventoryGridListClass} style={gridStyle} role="list" aria-label={ariaLabel}>
        {slots.map((slot, index) => {
          const selected = selectedId === slot.id;
          const disabled = Boolean(slot.locked);
          const slotState = slot.locked
            ? 'locked'
            : !slot.item
              ? 'empty'
              : selected
                ? 'selected'
                : 'filled';
          const defaultCard = slot.item ? (
            <LootCard
              name={slot.item.name}
              rarity={slot.item.rarity}
              quantity={slot.item.quantity}
              value={slot.item.value}
              subtitle={slot.item.subtitle}
              icon={slot.item.icon}
              selected={selected}
              onClick={onSlotSelect && !disabled ? () => onSlotSelect(slot.id, slot) : undefined}
            />
          ) : null;
          const canDrag = Boolean(onSlotMove && slot.item && !slot.locked);
          const defaultNode = (
            <li
              className={mergeClass(
                inventoryGridSlotRecipe({ state: slotState, equipped: slot.equipped }),
                slot.className,
              )}
              data-selected={selected}
              data-dragging={draggingId === slot.id}
              data-locked={slot.locked ?? false}
              data-equipped={slot.equipped ?? false}
              data-empty={!slot.item}
              draggable={canDrag}
              onDragStart={
                canDrag
                  ? (event) => {
                      if (!event.dataTransfer) {
                        return;
                      }
                      event.dataTransfer.setData('text/plain', slot.id);
                      event.dataTransfer.effectAllowed = 'move';
                    }
                  : undefined
              }
              onDragOver={
                onSlotMove
                  ? (event) => {
                      event.preventDefault();
                      if (event.dataTransfer) {
                        event.dataTransfer.dropEffect = 'move';
                      }
                    }
                  : undefined
              }
              onDrop={
                onSlotMove
                  ? (event) => {
                      event.preventDefault();
                      if (!event.dataTransfer) {
                        return;
                      }
                      const fromId = event.dataTransfer.getData('text/plain');
                      const fromSlot = slots.find((entry) => entry.id === fromId);
                      if (!fromSlot || fromId === slot.id || slot.locked) {
                        return;
                      }
                      onSlotMove(fromId, slot.id, fromSlot, slot);
                    }
                  : undefined
              }
            >
              {defaultCard}
            </li>
          );

          return (
            <React.Fragment key={slot.id}>
              {renderSlot ? renderSlot(slot, { index, selected, disabled }, defaultCard) : defaultNode}
            </React.Fragment>
          );
        })}
      </ul>
    </section>
  );
}
