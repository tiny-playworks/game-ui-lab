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

export const targetFrameCopyClass = css({ display: "grid", gap: "2px" });

export const targetFrameHeaderClass = css({ display: "flex", justifyContent: "space-between", gap: space2 });

export const targetFrameMetaClass = css({ ...upperLabel, fontStyle: "normal" });

export const targetFrameRecipe = cva({
  base: {
    display: "grid",
    gap: space2,
    minWidth: "280px",
    padding: "12px",
    border: "1px solid color-mix(in srgb, var(--game-ui-target), transparent 40%)",
    borderRadius: radiusLg,
    background: panelSurface,
    color: text,
    fontFamily: "var(--game-ui-font-sans)",
  },
  variants: {
    faction: {
      ally: { borderColor: "color-mix(in srgb, var(--game-ui-marker-ally), transparent 38%)" },
      enemy: {},
      neutral: { borderColor: line },
      boss: {},
    },
  },
  defaultVariants: {
    faction: "enemy",
  },
});

export const targetFrameStatusesClass = css({ display: "flex", flexWrap: "wrap", gap: space1 });
