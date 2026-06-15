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

export const buffBarClass = css({
  display: "grid",
  gap: space2,
  minWidth: "200px",
  color: text,
  fontFamily: "var(--game-ui-font-sans)",
});

export const buffBarItemButtonClass = css({
  display: "inline-flex",
  padding: 0,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  '&[data-selected="true"]': {
    boxShadow: `0 0 0 2px ${accent}`,
    borderRadius: "999px",
  },
});

export const buffBarItemClass = css({ display: "inline-flex", listStyle: "none" });

export const buffBarListClass = css({
  display: "flex",
  flexWrap: "wrap",
  gap: space2,
  padding: 0,
  margin: 0,
  listStyle: "none",
});

export const buffBarOverflowClass = css({
  display: "grid",
  minHeight: "28px",
  minWidth: "40px",
  placeItems: "center",
  border: `1px dashed ${line}`,
  borderRadius: "999px",
  color: muted,
  fontSize: "11px",
  fontWeight: "800",
  listStyle: "none",
});
