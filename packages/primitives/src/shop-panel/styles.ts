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

export const shopPanelActionClass = css({
  minHeight: "30px",
  padding: "0 10px",
  border: `1px solid ${line}`,
  borderRadius: radiusSm,
  background: "rgba(255, 255, 255, 0.06)",
  color: text,
  cursor: "pointer",
  font: "inherit",
  fontSize: "12px",
  fontWeight: "900",
  _disabled: {
    cursor: "not-allowed",
    opacity: 0.5,
  },
});

export const shopPanelClass = css({
  display: "grid",
  gap: space3,
  minWidth: "300px",
  padding: space3,
  border: `1px solid ${line}`,
  borderRadius: radiusLg,
  background: panelSurfaceStrong,
  boxShadow: shadowSoft,
  color: text,
  fontFamily: "var(--game-ui-font-sans)",
  pointerEvents: "auto",
});

export const shopPanelGridClass = css({ display: "grid", gap: space2 });

export const shopPanelHeaderClass = css({ display: "grid", gap: space2 });

export const shopPanelItemClass = css({
  display: "grid",
  gap: space2,
  padding: space2,
  border: `1px solid ${line}`,
  borderRadius: radiusMd,
  background: panelSurface,
});

export const shopPanelMetaClass = css({ color: muted, fontSize: "11px", fontWeight: "800" });

export const shopPanelPriceClass = css({ color: critical, fontSize: "12px", fontWeight: "900" });

export const shopPanelTitleClass = css({ fontSize: "18px", fontWeight: "900" });
