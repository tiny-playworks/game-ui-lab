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

export const choicePromptChoiceClass = css({
  display: "grid",
  gap: "2px",
  padding: "9px 10px",
  border: "1px solid color-mix(in srgb, var(--game-ui-choice), transparent 58%)",
  borderRadius: radiusMd,
  background: "color-mix(in srgb, var(--game-ui-choice), transparent 90%)",
  color: text,
  cursor: "pointer",
  font: "inherit",
  textAlign: "left",
  _disabled: {
    cursor: "not-allowed",
    opacity: 0.5,
  },
});

export const choicePromptChoiceDescriptionClass = css({ color: muted });

export const choicePromptChoicesClass = css({ display: "grid", gap: space2 });

export const choicePromptClass = css({
  display: "grid",
  gap: space2,
  minWidth: "280px",
  padding: "12px",
  border: "1px solid color-mix(in srgb, var(--game-ui-choice), transparent 42%)",
  borderRadius: radiusLg,
  background: panelSurface,
  color: text,
  fontFamily: "var(--game-ui-font-sans)",
});

export const choicePromptTitleClass = css({
  color: "var(--game-ui-choice)",
  fontSize: "13px",
  textTransform: "uppercase",
});
