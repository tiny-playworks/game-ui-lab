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

export const castBarFillClass = css({
  display: "block",
  width: "var(--game-ui-cast-progress)",
  height: "100%",
  borderRadius: "inherit",
  background: "linear-gradient(90deg, var(--game-ui-cast-fill), var(--game-ui-ability-ready))",
  boxShadow: "0 0 18px color-mix(in srgb, var(--game-ui-cast-fill), transparent 54%)",
});

export const castBarRecipe = cva({
  base: {
    "--game-ui-cast-fill": "var(--game-ui-cast)",
    display: "grid",
    minWidth: "260px",
    gap: space1,
    color: text,
    fontFamily: "var(--game-ui-font-sans)",
  },
  variants: {
    state: {
      casting: {},
      channeling: {},
      complete: { "--game-ui-cast-fill": heal },
      interrupted: { "--game-ui-cast-fill": debuff },
    },
  },
  defaultVariants: {
    state: "casting",
  },
});

export const castBarToplineClass = css({
  display: "flex",
  justifyContent: "space-between",
  gap: space2,
  color: muted,
  fontSize: "12px",
  fontWeight: "900",
  textTransform: "uppercase",
});

export const castBarToplineStrongClass = css({ color: text });

export const castBarTrackClass = css({
  display: "block",
  overflow: "hidden",
  height: "12px",
  border: `1px solid ${line}`,
  borderRadius: "999px",
  background: "rgba(4, 8, 18, 0.74)",
});
