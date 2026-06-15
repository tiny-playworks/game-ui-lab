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

export const miniMapClass = css({
  position: "relative",
  overflow: "hidden",
  width: "260px",
  height: "180px",
  border: "1px solid var(--game-ui-map-line)",
  borderRadius: radiusLg,
  background: `linear-gradient(var(--game-ui-map-line) 1px, transparent 1px), linear-gradient(90deg, var(--game-ui-map-line) 1px, transparent 1px), radial-gradient(circle at 28% 20%, color-mix(in srgb, var(--game-ui-marker-objective), transparent 82%), transparent 28%), ${panelSurface}`,
  backgroundSize: "32px 32px, 32px 32px, auto, auto",
  color: text,
  fontFamily: "var(--game-ui-font-sans)",
});

export const miniMapGridClass = css({
  position: "absolute",
  inset: "12px",
  border: "1px solid color-mix(in srgb, var(--game-ui-map-line), transparent 20%)",
  borderRadius: radiusMd,
});

export const miniMapLabelClass = css({
  position: "absolute",
  right: "10px",
  bottom: "8px",
  color: muted,
  fontSize: "11px",
  fontWeight: "900",
  textTransform: "uppercase",
});

export const miniMapPathClass = css({
  position: "absolute",
  left: "16px",
  bottom: "28px",
  padding: "2px 6px",
  border: "1px solid color-mix(in srgb, var(--game-ui-accent), transparent 52%)",
  borderRadius: "999px",
  background: panelSurface,
  color: accent,
  fontSize: "10px",
  fontWeight: "900",
});

export const miniMapPlayerClass = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "0",
  height: "0",
  borderLeft: "6px solid transparent",
  borderRight: "6px solid transparent",
  borderBottom: "14px solid var(--game-ui-accent)",
  filter: "drop-shadow(0 0 10px var(--game-ui-accent))",
  transform: "translate(-50%, -50%) rotate(var(--game-ui-player-heading))",
});

export const miniMapScanClass = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "var(--game-ui-scan-radius)",
  aspectRatio: "1",
  border: "1px dashed color-mix(in srgb, var(--game-ui-accent), transparent 30%)",
  borderRadius: "999px",
  transform: "translate(-50%, -50%)",
});

export const miniMapZoneClass = css({
  position: "absolute",
  top: "var(--game-ui-zone-y)",
  left: "var(--game-ui-zone-x)",
  width: "var(--game-ui-zone-width)",
  height: "var(--game-ui-zone-height)",
  border: "1px solid color-mix(in srgb, var(--game-ui-danger), transparent 28%)",
  borderRadius: radiusMd,
  background: "color-mix(in srgb, var(--game-ui-danger), transparent 88%)",
  color: critical,
  fontSize: "9px",
  fontWeight: "900",
  padding: "2px",
  transform: "translate(-50%, -50%)",
});

export const miniMapZoomClass = css({
  position: "absolute",
  left: "10px",
  top: "8px",
  color: muted,
  fontSize: "10px",
  fontWeight: "900",
});
