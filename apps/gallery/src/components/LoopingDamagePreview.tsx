import React, { useEffect, useState } from 'react';
import { DamageNumber, type DamageNumberVariant } from '@tiny-playworks/game-ui';

interface LoopingDamagePreviewProps {
  items: Array<{
    value: string;
    variant: DamageNumberVariant;
    prefix?: string;
    size?: number;
  }>;
  className?: string;
  intervalMs?: number;
}

export function LoopingDamagePreview({
  items,
  className,
  intervalMs = 1800,
}: LoopingDamagePreviewProps) {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCycle((current) => current + 1);
    }, intervalMs);

    return () => {
      window.clearInterval(timer);
    };
  }, [intervalMs]);

  return (
    <div className={className}>
      {items.map((item) => (
        <DamageNumber
          key={`${item.variant}-${item.value}-${cycle}`}
          value={item.value}
          variant={item.variant}
          prefix={item.prefix}
          size={item.size}
        />
      ))}
    </div>
  );
}
