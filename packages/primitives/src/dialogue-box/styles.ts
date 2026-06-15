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

export const dialogueBoxContentClass = css({ display: "grid", gap: space1 });

export const dialogueBoxPortraitClass = css({
  display: "grid",
  width: "52px",
  height: "52px",
  placeItems: "center",
  border: "1px solid color-mix(in srgb, var(--game-ui-speaker), transparent 34%)",
  borderRadius: radiusMd,
  color: "var(--game-ui-speaker)",
  fontWeight: "900",
});

export const dialogueBoxRecipe = cva({
  base: {
    display: "grid",
    gridTemplateColumns: "52px minmax(0, 1fr)",
    gap: space3,
    maxWidth: "520px",
    padding: "14px",
    border: "1px solid color-mix(in srgb, var(--game-ui-speaker), transparent 48%)",
    borderRadius: radiusLg,
    background: "var(--game-ui-dialogue)",
    color: text,
    fontFamily: "var(--game-ui-font-sans)",
  },
  variants: {
    tone: {
      neutral: {},
      ally: {},
      warning: { borderColor: debuff },
    },
  },
  defaultVariants: {
    tone: "neutral",
  },
});

export const dialogueBoxSpeakerClass = css({
  color: "var(--game-ui-speaker)",
  fontSize: "13px",
  textTransform: "uppercase",
});

export const dialogueBoxTextClass = css({ color: text, fontSize: "14px", lineHeight: "1.5" });
