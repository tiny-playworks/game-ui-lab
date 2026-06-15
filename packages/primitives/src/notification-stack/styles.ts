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

export const notificationStackClass = css({ display: "grid", gap: space2, maxWidth: "420px" });

export const notificationStackOverflowClass = css({
  justifySelf: "end",
  color: "var(--game-ui-notification)",
  fontFamily: "var(--game-ui-font-sans)",
  fontSize: "11px",
  fontWeight: "900",
  textTransform: "uppercase",
});
