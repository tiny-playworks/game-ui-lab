import React from 'react';
import type { CSSProperties } from 'react';
import { CurrencyBar } from '../currency-bar';
import type { CurrencyBarEntry } from '../currency-bar';
import { LootCard } from '../loot-card';
import type { LootCardProps, LootRarity } from '../loot-card';
import {
  mergeClass,
  shopPanelClass,
  shopPanelGridClass,
  shopPanelHeaderClass,
  shopPanelItemClass,
  shopPanelPriceClass,
  shopPanelTitleClass,
} from '../styles';

export interface ShopPanelItem extends LootCardProps {
  id: string;
  price: string | number;
}

export interface ShopPanelProps {
  title: string;
  items: ShopPanelItem[];
  currencies?: CurrencyBarEntry[];
  selectedId?: string;
  onPurchase?: (id: string, item: ShopPanelItem) => void;
  className?: string;
  style?: CSSProperties;
}

export function ShopPanel({
  title,
  items,
  currencies = [],
  selectedId,
  onPurchase,
  className,
  style,
}: ShopPanelProps) {
  return (
    <section className={mergeClass(shopPanelClass, className)} style={style} aria-label={title} role="region">
      <header className={shopPanelHeaderClass}>
        <h2 className={shopPanelTitleClass}>{title}</h2>
        {currencies.length ? <CurrencyBar currencies={currencies} compact /> : null}
      </header>
      <ul className={shopPanelGridClass} role="list">
        {items.map((item) => {
          const { id, price, name, rarity = 'common' as LootRarity, ...cardProps } = item;
          const selected = selectedId === id;
          return (
            <li key={id} className={shopPanelItemClass} data-selected={selected}>
              <LootCard name={name} rarity={rarity} {...cardProps} selected={selected} />
              <span className={shopPanelPriceClass}>{typeof price === 'number' ? price.toLocaleString() : price}</span>
              {onPurchase ? (
                <button type="button" aria-label="Buy" onClick={() => onPurchase(id, item)}>
                  Buy
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
