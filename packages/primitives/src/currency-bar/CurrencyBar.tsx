import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import {
  currencyBarClass,
  currencyBarItemClass,
  currencyBarItemRecipe,
  currencyBarListClass,
  mergeClass,
} from '../styles';

export type CurrencyTone = 'gold' | 'silver' | 'gem' | 'token' | 'neutral';

export interface CurrencyBarEntry {
  id: string;
  label: string;
  amount: number | string;
  icon?: ReactNode;
  tone?: CurrencyTone;
  className?: string;
}

export interface CurrencyBarProps {
  currencies: CurrencyBarEntry[];
  compact?: boolean;
  className?: string;
  style?: CSSProperties;
}

function formatAmount(amount: number | string) {
  return typeof amount === 'number' ? amount.toLocaleString() : amount;
}

export function CurrencyBar({
  currencies,
  compact = false,
  className,
  style,
}: CurrencyBarProps) {
  return (
    <section
      className={mergeClass(currencyBarClass, className)}
      style={style}
      aria-label="Currency bar"
      data-compact={compact}
    >
      <ul className={currencyBarListClass}>
        {currencies.map((currency) => (
          <li key={currency.id} className={mergeClass(currencyBarItemClass, currency.className)} aria-label={`${currency.label} ${formatAmount(currency.amount)}`} data-tone={currency.tone ?? 'neutral'}>
            <span className={currencyBarItemRecipe({ tone: currency.tone ?? 'neutral', compact })}>
              {currency.icon ? <span aria-hidden="true">{currency.icon}</span> : null}
              <span>{currency.label}</span>
              <strong>{formatAmount(currency.amount)}</strong>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
