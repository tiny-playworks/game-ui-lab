import React from "react";
import type { ReactNode } from "react";
import type { CSSProperties } from "react";
import { CurrencyBar } from "../currency-bar/CurrencyBar";
import type { CurrencyBarEntry } from "../currency-bar/CurrencyBar";
import { LootCard } from "../loot-card/LootCard";
import type { LootCardProps, LootRarity } from "../loot-card/LootCard";
import {
  mergeClass,
  shopPanelActionClass,
  shopPanelClass,
  shopPanelGridClass,
  shopPanelHeaderClass,
  shopPanelItemClass,
  shopPanelMetaClass,
  shopPanelPriceClass,
  shopPanelTitleClass,
} from "../styles";

export interface ShopPanelItem extends LootCardProps {
  id: string;
  price: string | number;
  stock?: number;
  discount?: ReactNode;
  unavailableReason?: ReactNode;
  details?: ReactNode;
  disabled?: boolean;
  purchaseLabel?: string;
}

export interface ShopPanelProps {
  title: string;
  items: ShopPanelItem[];
  currencies?: CurrencyBarEntry[];
  selectedId?: string;
  onItemSelect?: (id: string, item: ShopPanelItem) => void;
  onPurchase?: (id: string, item: ShopPanelItem) => void;
  className?: string;
  style?: CSSProperties;
}

const emptyCurrencies: CurrencyBarEntry[] = [];

export function ShopPanel({
  title,
  items,
  currencies = emptyCurrencies,
  selectedId,
  onItemSelect,
  onPurchase,
  className,
  style,
}: ShopPanelProps) {
  return (
    <section className={mergeClass(shopPanelClass, className)} style={style} aria-label={title}>
      <header className={shopPanelHeaderClass}>
        <h2 className={shopPanelTitleClass}>{title}</h2>
        {currencies.length ? <CurrencyBar currencies={currencies} compact /> : null}
      </header>
      <ul className={shopPanelGridClass}>
        {items.map((item) => {
          const {
            id,
            price,
            name,
            rarity = "common" as LootRarity,
            stock,
            discount,
            unavailableReason,
            details,
            disabled,
            purchaseLabel,
            ...cardProps
          } = item;
          const selected = selectedId === id;
          const soldOut = typeof stock === "number" && stock <= 0;
          const purchaseDisabled = Boolean(disabled || soldOut || unavailableReason);
          const buttonLabel = purchaseLabel ?? `Buy ${name}`;

          return (
            <li
              key={id}
              className={shopPanelItemClass}
              data-selected={selected}
              data-disabled={purchaseDisabled}
              data-stock={stock}
            >
              <LootCard
                name={name}
                rarity={rarity}
                {...cardProps}
                selected={selected}
                onClick={onItemSelect ? () => onItemSelect(id, item) : cardProps.onClick}
              />
              <span className={shopPanelPriceClass}>{typeof price === "number" ? price.toLocaleString() : price}</span>
              {discount ? <span className={shopPanelMetaClass}>{discount}</span> : null}
              {typeof stock === "number" ? (
                <span className={shopPanelMetaClass}>{soldOut ? "Sold out" : `${stock} left`}</span>
              ) : null}
              {unavailableReason ? <span className={shopPanelMetaClass}>{unavailableReason}</span> : null}
              {details ? <span className={shopPanelMetaClass}>{details}</span> : null}
              {onPurchase ? (
                <button
                  className={shopPanelActionClass}
                  type="button"
                  aria-label={buttonLabel}
                  disabled={purchaseDisabled}
                  onClick={() => onPurchase(id, item)}
                >
                  {purchaseLabel ?? "Buy"}
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
