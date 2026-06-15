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

export const healthBarFillClass = css({
  position: "absolute",
  inset: "0 auto 0 0",
  display: "block",
  width: "var(--game-ui-health-ratio)",
  borderRadius: "inherit",
  background:
    "linear-gradient(90deg, var(--game-ui-health-fill-color, var(--game-ui-health)), var(--game-ui-health-fill-end-color, color-mix(in srgb, var(--game-ui-health), white 24%)))",
  boxShadow: "0 0 18px color-mix(in srgb, var(--game-ui-health), transparent 56%)",
  opacity: "var(--game-ui-health-fill-opacity, 1)",
});

export const healthBarLabelClass = css({
  overflow: "hidden",
  ...upperLabel,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const healthBarRecipe = cva({
  base: {
    display: "grid",
    minWidth: "220px",
    gap: space1,
    color: text,
    fontFamily: "var(--game-ui-font-sans)",
  },
  variants: {
    tone: {
      hero: {},
      danger: {},
      boss: {},
    },
    empty: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      tone: "danger",
      css: {
        "--game-ui-health-fill-color": danger,
      },
    },
    {
      tone: "boss",
      css: {
        "--game-ui-health-fill-color": debuff,
        "--game-ui-health-fill-end-color": critical,
      },
    },
    {
      empty: true,
      css: {
        "--game-ui-health-fill-opacity": "0.24",
      },
    },
  ],
  defaultVariants: {
    tone: "hero",
    empty: false,
  },
});

export const healthBarShieldClass = css({
  position: "absolute",
  inset: "0 auto 0 var(--game-ui-health-ratio)",
  display: "block",
  width: "var(--game-ui-shield-ratio)",
  borderRadius: "inherit",
  background: `linear-gradient(90deg, ${shield}, color-mix(in srgb, ${shield}, white 24%))`,
  boxShadow: `0 0 18px color-mix(in srgb, ${shield}, transparent 54%)`,
});

export const healthBarShieldValueClass = css({ color: shield, fontSize: "12px", fontWeight: "800" });

export const healthBarToplineClass = css({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  alignItems: "center",
  gap: space2,
});

export const healthBarTrackClass = css({
  position: "relative",
  display: "block",
  overflow: "hidden",
  height: "12px",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  borderRadius: "999px",
  background: "rgba(4, 8, 18, 0.74)",
  boxShadow: "inset 0 1px 5px rgba(0, 0, 0, 0.5)",
});

export const healthBarValueClass = css({ color: text, fontSize: "12px", fontWeight: "800" });
