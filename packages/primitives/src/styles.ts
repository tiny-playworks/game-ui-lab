// @ts-nocheck
import { css, cva, cx } from "@tiny-playworks/styled-system/css";

export function mergeClass(...classes: Array<string | false | null | undefined>) {
  return cx(...classes.filter(Boolean));
}

export * from "./tokens";
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
  radiusSm,
  radiusMd,
  radiusLg,
  space1,
  space2,
  space3,
  shadowSoft,
  shadowGlow,
} from "./tokens";

export const providerRootClass = css({
  color: text,
  fontFamily: "var(--game-ui-font-sans)",
});

export const gameUiLayerHostClass = css({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 20,
});
export const gameUiLayerClass = css({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
});
export const gameUiHudLayerClass = css({
  zIndex: 10,
  display: "grid",
  alignContent: "start",
  gap: space3,
  padding: space3,
  pointerEvents: "auto",
});
export const gameUiHudClusterClass = css({ display: "grid", gap: space2, maxWidth: "360px" });
export const gameUiNarrativeLayerClass = css({
  zIndex: 35,
  display: "grid",
  alignContent: "end",
  justifyContent: "center",
  gap: space3,
  padding: space3,
  pointerEvents: "auto",
});
export const gameUiFeedbackLayerClass = css({ zIndex: 20 });
export const gameUiNotificationLayerClass = css({
  zIndex: 30,
  display: "grid",
  alignContent: "start",
  justifyContent: "end",
  gap: space2,
  padding: space3,
});
export const gameUiModalLayerClass = css({
  zIndex: 40,
  display: "grid",
  placeItems: "center",
  padding: space3,
  pointerEvents: "none",
  '&[data-active="true"]': {
    background: "rgba(3, 7, 18, 0.32)",
    pointerEvents: "auto",
  },
});
export const gameUiDebugLayerClass = css({ zIndex: 50 });
export const gameUiFeedbackItemClass = css({
  position: "absolute",
  left: "var(--game-ui-feedback-x, 50%)",
  top: "var(--game-ui-feedback-y, 50%)",
  transform: "translate(-50%, -50%)",
});
