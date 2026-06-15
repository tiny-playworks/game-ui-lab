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

export const lootStackClass = css({
  display: "grid",
  gap: space2,
  minWidth: "240px",
  color: text,
  fontFamily: "var(--game-ui-font-sans)",
});

export const lootStackItemClass = css({
  minWidth: 0,
  listStyle: "none",
  "&::marker": {
    content: '""',
  },
});

export const lootStackLabelClass = css(upperLabel);

export const lootStackListClass = css({ display: "grid", gap: space2, padding: 0, margin: 0, listStyle: "none" });

export const lootStackOverflowClass = css({
  display: "grid",
  minHeight: "32px",
  placeItems: "center",
  border: `1px dashed ${line}`,
  borderRadius: radiusMd,
  color: muted,
  fontSize: "12px",
  fontWeight: "800",
});

export const lootStackToplineClass = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: space2,
});
