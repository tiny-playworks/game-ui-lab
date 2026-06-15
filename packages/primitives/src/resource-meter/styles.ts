// @ts-nocheck
import { css, cva } from "@tiny-playworks/styled-system/css";
import { healthBarLabelClass, healthBarValueClass } from "../health-bar/styles";
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

export const resourceMeterFillClass = css({
  position: "absolute",
  inset: "0 auto 0 0",
  display: "block",
  width: "var(--game-ui-resource-ratio)",
  height: "100%",
  borderRadius: "inherit",
  background:
    "linear-gradient(90deg, var(--game-ui-resource-color), color-mix(in srgb, var(--game-ui-resource-color), white 24%))",
  boxShadow: "0 0 18px color-mix(in srgb, var(--game-ui-resource-color), transparent 56%)",
});

export const resourceMeterLabelClass = healthBarLabelClass;

export const resourceMeterRecipe = cva({
  base: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "center",
    gap: space2,
    minWidth: "190px",
    padding: "8px 10px",
    border: `1px solid ${line}`,
    borderRadius: radiusMd,
    background: panelSurface,
    boxShadow: shadowSoft,
    color: text,
    fontFamily: "var(--game-ui-font-sans)",
  },
  variants: {
    kind: {
      mana: { "--game-ui-resource-color": mana },
      energy: { "--game-ui-resource-color": energy },
      stamina: { "--game-ui-resource-color": stamina },
    },
  },
  defaultVariants: {
    kind: "mana",
  },
});

export const resourceMeterTrackClass = css({
  position: "relative",
  display: "block",
  overflow: "hidden",
  gridColumn: "1 / -1",
  height: "8px",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  borderRadius: "999px",
  background: "rgba(4, 8, 18, 0.74)",
  boxShadow: "inset 0 1px 5px rgba(0, 0, 0, 0.5)",
});

export const resourceMeterValueClass = healthBarValueClass;
