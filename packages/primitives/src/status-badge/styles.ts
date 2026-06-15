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

export const statusBadgeMetaClass = css({ color: text, fontSize: "11px" });

export const statusBadgeRecipe = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    maxWidth: "100%",
    padding: "5px 8px",
    border: `1px solid ${line}`,
    borderRadius: "999px",
    background: panelSurface,
    color: text,
    fontFamily: "var(--game-ui-font-sans)",
    fontSize: "12px",
    fontWeight: "800",
    whiteSpace: "nowrap",
  },
  variants: {
    tone: {
      buff: { borderColor: "color-mix(in srgb, var(--game-ui-stamina), transparent 40%)", color: stamina },
      debuff: { borderColor: "color-mix(in srgb, var(--game-ui-debuff), transparent 36%)", color: debuff },
      neutral: {},
      warning: { borderColor: "color-mix(in srgb, var(--game-ui-critical), transparent 36%)", color: critical },
    },
  },
  defaultVariants: {
    tone: "neutral",
  },
});
