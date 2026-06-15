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

export const abilityBarClass = css({
  display: "inline-flex",
  alignItems: "end",
  gap: space2,
  minInlineSize: 0,
  margin: 0,
  padding: space2,
  border: `1px solid ${line}`,
  borderRadius: radiusLg,
  background: panelSurface,
  color: text,
  fontFamily: "var(--game-ui-font-sans)",
});

export const abilityBarCostClass = css({
  position: "absolute",
  right: "7px",
  bottom: "22px",
  color: "var(--game-ui-ability-ready)",
  fontSize: "10px",
  fontWeight: "900",
});

export const abilityBarItemClass = css({ position: "relative", display: "grid", justifyItems: "center" });
