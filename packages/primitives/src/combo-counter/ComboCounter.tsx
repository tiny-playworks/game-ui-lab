import { motion } from 'motion/react';
import React from 'react';
import {
  comboCounterLabelClass,
  comboCounterRecipe,
  comboCounterSuffixClass,
  comboCounterTierClass,
  comboCounterValueClass,
  mergeClass,
} from '../styles';

export interface ComboCounterProps {
  count: number;
  label?: string;
  tier?: string;
  active?: boolean;
  className?: string;
}

function getTier(count: number) {
  if (count >= 30) return 'Overdrive chain';
  if (count >= 15) return 'Fever streak';
  if (count >= 6) return 'Clean combo';
  return 'Opening hits';
}

export function ComboCounter({
  count,
  label = 'Combo',
  tier = getTier(count),
  active = count > 0,
  className,
}: ComboCounterProps) {
  return (
    <motion.div
      className={mergeClass(comboCounterRecipe({ active }), className)}
      data-active={active}
      initial={false}
      animate={{ scale: active ? [1, 1.06, 1] : 0.96, opacity: active ? 1 : 0.62 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      role="status"
      aria-label={`${label} ${count}`}
    >
      <span className={comboCounterLabelClass}>{label}</span>
      <span className={comboCounterValueClass}>
        {count}
        <span className={comboCounterSuffixClass}>x</span>
      </span>
      <span className={comboCounterTierClass}>{tier}</span>
    </motion.div>
  );
}
