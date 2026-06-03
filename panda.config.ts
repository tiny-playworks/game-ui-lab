import { defineConfig } from "@pandacss/dev";
import { gameUiPreset } from "./packages/tokens/src";

export default defineConfig({
  jsxFramework: "react",
  outdir: "packages/styled-system/src",
  importMap: "@tiny-playworks/styled-system",
  prefix: "game-ui",
  strictTokens: true,
  preflight: false,
  include: ["./packages/primitives/src/**/*.{ts,tsx}", "./apps/docs/components/**/*.{ts,tsx}"],
  exclude: [],
  presets: [gameUiPreset],
  staticCss: {
    css: [
      {
        properties: {
          animation: ["game-ui-rarity-sweep 1.8s var(--game-ui-ease-out) infinite"],
        },
      },
    ],
  },
  theme: {
    extend: {
      keyframes: {
        "game-ui-rarity-sweep": {
          "0%": { transform: "translateX(-80%)" },
          "52%, 100%": { transform: "translateX(90%)" },
        },
      },
    },
  },
});
