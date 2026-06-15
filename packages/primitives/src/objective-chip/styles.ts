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

export const objectiveChipBodyClass = css({ display: "grid", gap: "2px", minWidth: 0 });

export const objectiveChipFillClass = css({
  display: "block",
  width: "var(--game-ui-objective-progress)",
  height: "100%",
  borderRadius: "inherit",
  background: "var(--game-ui-objective-color)",
});

export const objectiveChipIconClass = css({
  display: "grid",
  width: "30px",
  height: "30px",
  placeItems: "center",
  border: "1px solid color-mix(in srgb, var(--game-ui-objective-color), transparent 34%)",
  borderRadius: radiusSm,
  color: "var(--game-ui-objective-color)",
  fontSize: "11px",
  fontWeight: "900",
});

export const objectiveChipLabelClass = css({
  overflow: "hidden",
  fontSize: "13px",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const objectiveChipMetaClass = css({
  overflow: "hidden",
  ...upperLabel,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const objectiveChipProgressClass = css({ display: "grid", gap: "4px", justifyItems: "end", minWidth: "58px" });

export const objectiveChipProgressTextClass = objectiveChipMetaClass;

export const objectiveChipRecipe = cva({
  base: {
    "--game-ui-objective-color": accent,
    "--game-ui-objective-progress": "0%",
    display: "grid",
    gridTemplateColumns: "30px minmax(0, 1fr) auto",
    alignItems: "center",
    gap: space2,
    minWidth: "240px",
    padding: "8px 10px",
    border: "1px solid color-mix(in srgb, var(--game-ui-objective-color), transparent 44%)",
    borderRadius: radiusMd,
    background: panelSurface,
    color: text,
    fontFamily: "var(--game-ui-font-sans)",
  },
  variants: {
    state: {
      active: {},
      complete: { "--game-ui-objective-color": heal },
      locked: { "--game-ui-objective-color": muted, opacity: 0.62 },
    },
  },
  defaultVariants: {
    state: "active",
  },
});

export const objectiveChipTrackClass = css({
  display: "block",
  overflow: "hidden",
  width: "58px",
  height: "5px",
  borderRadius: "999px",
  background: "color-mix(in srgb, var(--game-ui-muted), transparent 74%)",
});
