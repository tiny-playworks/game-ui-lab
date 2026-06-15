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

export const chatFeedClass = css({
  display: "grid",
  gap: space2,
  minWidth: "240px",
  maxHeight: "220px",
  padding: space2,
  border: `1px solid ${line}`,
  borderRadius: radiusMd,
  background: panelSurface,
  color: text,
  fontFamily: "var(--game-ui-font-sans)",
  overflow: "hidden",
});

export const chatFeedItemRecipe = cva({
  base: {
    display: "grid",
    gap: "2px",
    padding: "4px 6px",
    borderRadius: radiusSm,
    fontSize: "12px",
    fontWeight: "700",
  },
  variants: {
    tone: {
      info: { color: text },
      system: { color: muted },
      party: { color: heal },
      combat: { color: danger },
      loot: { color: loot },
    },
  },
  defaultVariants: { tone: "info" },
});

export const chatFeedListClass = css({
  display: "grid",
  gap: space1,
  padding: 0,
  margin: 0,
  listStyle: "none",
  overflow: "auto",
});

export const chatFeedOverflowClass = css({ color: muted, fontSize: "11px", fontWeight: "700", listStyle: "none" });
