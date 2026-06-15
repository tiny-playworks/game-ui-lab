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

export const lootCardBodyClass = css({ display: "grid", gap: "2px", minWidth: 0 });

export const lootCardIconClass = css({
  display: "grid",
  width: "38px",
  height: "38px",
  placeItems: "center",
  border: "1px solid color-mix(in srgb, var(--game-ui-loot-rarity-color), transparent 28%)",
  borderRadius: radiusSm,
  background: "color-mix(in srgb, var(--game-ui-loot-rarity-color), transparent 84%)",
  color: "var(--game-ui-loot-rarity-color)",
  fontSize: "15px",
  fontWeight: "900",
});

export const lootCardMetaClass = css({ display: "grid", gap: "2px", minWidth: 0, justifyItems: "end" });

export const lootCardNameClass = css({
  overflow: "hidden",
  fontSize: "13px",
  fontWeight: "900",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const lootCardQuantityClass = css({
  color: "var(--game-ui-loot-rarity-color)",
  fontSize: "12px",
  fontWeight: "900",
});

export const lootCardRecipe = cva({
  base: {
    "--game-ui-loot-rarity-color": "var(--game-ui-rarity-common)",
    display: "grid",
    appearance: "none",
    gridTemplateColumns: "38px minmax(0, 1fr) auto",
    alignItems: "center",
    gap: space2,
    minWidth: "210px",
    padding: "8px 10px",
    border: "1px solid color-mix(in srgb, var(--game-ui-loot-rarity-color), transparent 36%)",
    borderRadius: radiusMd,
    background: `linear-gradient(135deg, color-mix(in srgb, var(--game-ui-loot-rarity-color), transparent 88%), transparent 48%), ${panelSurface}`,
    boxShadow: shadowSoft,
    color: text,
    cursor: "default",
    fontFamily: "var(--game-ui-font-sans)",
    font: "inherit",
    textAlign: "left",
  },
  variants: {
    rarity: {
      common: {},
      rare: { "--game-ui-loot-rarity-color": "var(--game-ui-rarity-rare)" },
      epic: { "--game-ui-loot-rarity-color": "var(--game-ui-rarity-epic)" },
      legendary: { "--game-ui-loot-rarity-color": "var(--game-ui-rarity-legendary)" },
    },
    selected: {
      true: {
        boxShadow: `${shadowSoft}, 0 0 24px color-mix(in srgb, var(--game-ui-loot-rarity-color), transparent 70%)`,
      },
      false: {},
    },
  },
  defaultVariants: {
    rarity: "common",
    selected: false,
  },
});

export const lootCardTextClass = css({
  overflow: "hidden",
  color: muted,
  fontSize: "11px",
  fontWeight: "700",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
