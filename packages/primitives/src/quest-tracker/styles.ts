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

export const questTrackerClass = css({
  display: "grid",
  gap: space3,
  minWidth: "280px",
  padding: "14px",
  border: `1px solid ${line}`,
  borderRadius: radiusLg,
  background: panelSurface,
  color: text,
  fontFamily: "var(--game-ui-font-sans)",
});

export const questTrackerCopyClass = css({ display: "grid", gap: "3px", minWidth: 0 });

export const questTrackerCountClass = css({ ...upperLabel, color: accent });

export const questTrackerHeaderClass = css({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  alignItems: "start",
  gap: space2,
});

export const questTrackerListClass = css({ display: "grid", gap: space2 });

export const questTrackerSubtitleClass = css(upperLabel);

export const questTrackerTitleClass = css({
  overflow: "hidden",
  fontSize: "15px",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
