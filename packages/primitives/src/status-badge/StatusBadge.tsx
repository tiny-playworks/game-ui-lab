import React from "react";
import { mergeClass } from "../styles";
import { statusBadgeMetaClass, statusBadgeRecipe } from "./styles";

export type StatusBadgeTone = "buff" | "debuff" | "neutral" | "warning";

export interface StatusBadgeProps {
  label: string;
  tone: StatusBadgeTone;
  count?: number;
  duration?: string;
  className?: string;
}

export function StatusBadge({ label, tone, count, duration, className }: StatusBadgeProps) {
  const stackLabel = count ? ` ${count} stacks` : "";
  const durationLabel = duration ? ` ${duration}` : "";

  return (
    <output
      className={mergeClass(statusBadgeRecipe({ tone }), className)}
      data-tone={tone}
      aria-label={`${label} ${tone}${stackLabel}${durationLabel}`}
    >
      <span>{label}</span>
      {count ? <span className={statusBadgeMetaClass}>x{count}</span> : null}
      {duration ? <span className={statusBadgeMetaClass}>{duration}</span> : null}
    </output>
  );
}
