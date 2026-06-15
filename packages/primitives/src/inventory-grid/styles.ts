// @ts-nocheck
import { css, cva } from "@tiny-playworks/styled-system/css";
import {
  panelSurface,
  panelSurfaceStrong,
  line,
  text,
  muted,
  accent,
  heal,
  danger,
  critical,
  loot,
  shield,
  mana,
  energy,
  stamina,
  debuff,
  radiusSm,
  radiusMd,
  radiusLg,
  space1,
  space2,
  space3,
  space4,
  space5,
  shadowSoft,
  shadowGlow,
  upperLabel,
} from "../tokens";

export const inventoryGridClass = css({
  display: "grid",
  gap: space2,
  minWidth: "220px",
  color: text,
  fontFamily: "var(--game-ui-font-sans)",
});

export const inventoryGridActionClass = css({
  minHeight: "26px",
  padding: "0 8px",
  border: `1px solid ${line}`,
  borderRadius: radiusSm,
  background: "rgba(255, 255, 255, 0.06)",
  color: text,
  cursor: "pointer",
  font: "inherit",
  fontSize: "11px",
  fontWeight: "900",
});

export const inventoryGridListClass = css({
  display: "grid",
  gap: space2,
  padding: 0,
  margin: 0,
  listStyle: "none",
});

export const inventoryGridMetaClass = css({ color: muted, fontSize: "11px", fontWeight: "800" });

export const inventoryGridSlotRecipe = cva({
  base: {
    display: "grid",
    minHeight: "72px",
    padding: space2,
    border: `1px solid ${line}`,
    borderRadius: radiusMd,
    background: "var(--game-ui-slot-empty, color-mix(in srgb, var(--game-ui-surface), transparent 12%))",
    transition: "border-color var(--game-ui-duration-fast), box-shadow var(--game-ui-duration-fast)",
    listStyle: "none",
  },
  variants: {
    state: {
      empty: { borderStyle: "dashed" },
      filled: {},
      selected: { boxShadow: `0 0 0 2px ${accent}` },
      locked: { opacity: 0.55, cursor: "not-allowed" },
    },
    equipped: {
      true: {
        borderColor: accent,
        boxShadow: `0 0 16px color-mix(in srgb, ${accent}, transparent 78%)`,
      },
      false: {},
    },
  },
  defaultVariants: {
    state: "empty",
    equipped: false,
  },
});
