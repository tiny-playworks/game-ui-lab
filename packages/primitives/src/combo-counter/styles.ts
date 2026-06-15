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

export const comboCounterLabelClass = css({
  color: critical,
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});

export const comboCounterRecipe = cva({
  base: {
    display: "inline-grid",
    minWidth: "152px",
    padding: "12px 16px",
    border: "1px solid rgba(255, 209, 102, 0.4)",
    borderRadius: radiusLg,
    background: `radial-gradient(circle at 20% 15%, rgba(255, 209, 102, 0.26), transparent 32%), linear-gradient(135deg, rgba(85, 247, 210, 0.12), rgba(180, 124, 255, 0.12)), ${panelSurface}`,
    boxShadow: `${shadowSoft}, 0 0 34px rgba(255, 209, 102, 0.18)`,
    color: text,
    fontFamily: "var(--game-ui-font-sans)",
  },
  variants: {
    active: {
      true: {},
      false: { opacity: 0.62 },
    },
  },
  defaultVariants: {
    active: true,
  },
});

export const comboCounterSuffixClass = css({
  fontFamily: "var(--game-ui-font-sans)",
  fontSize: "18px",
  fontWeight: "900",
});

export const comboCounterTierClass = css({ marginTop: "4px", color: muted, fontSize: "12px", fontWeight: "700" });

export const comboCounterValueClass = css({
  display: "flex",
  alignItems: "baseline",
  gap: "6px",
  color: critical,
  fontFamily: "var(--game-ui-font-display)",
  fontSize: "48px",
  lineHeight: "0.9",
  textShadow: "0 0 20px rgba(255, 209, 102, 0.5)",
});
