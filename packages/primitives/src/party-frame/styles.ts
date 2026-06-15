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

export const partyFrameClass = css({
  display: "grid",
  gap: space2,
  minWidth: "220px",
  color: text,
  fontFamily: "var(--game-ui-font-sans)",
});

export const partyFrameListClass = css({ display: "grid", gap: space2, padding: 0, margin: 0, listStyle: "none" });

export const partyFrameMemberRecipe = cva({
  base: {
    display: "grid",
    gap: space2,
    width: "100%",
    padding: space2,
    border: `1px solid ${line}`,
    borderRadius: radiusMd,
    background: panelSurface,
    color: text,
    textAlign: "left",
  },
  variants: {
    selected: {
      true: { borderColor: accent, boxShadow: shadowGlow },
      false: {},
    },
    offline: {
      true: {
        opacity: 0.5,
        color: "var(--game-ui-party-offline, var(--game-ui-muted))",
      },
      false: {},
    },
  },
  defaultVariants: {
    selected: false,
    offline: false,
  },
});

export const partyFrameMetaClass = css({
  color: muted,
  fontSize: "10px",
  fontWeight: "800",
  textTransform: "uppercase",
});

export const partyFrameNameClass = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: space2,
});

export const partyFrameStatusesClass = css({ display: "flex", flexWrap: "wrap", gap: space1 });
