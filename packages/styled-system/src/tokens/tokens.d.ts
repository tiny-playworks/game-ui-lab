/* eslint-disable */
export type Token = `fonts.${FontToken}` | `colors.${ColorToken}` | `spacing.${SpacingToken}` | `radii.${RadiusToken}` | `shadows.${ShadowToken}` | `durations.${DurationToken}` | `easings.${EasingToken}`

export type ColorPalette = "background" | "surface" | "surfaceStrong" | "line" | "text" | "muted" | "accent" | "accentStrong" | "danger" | "heal" | "critical" | "miss" | "loot" | "rarityCommon" | "rarityRare" | "rarityEpic" | "rarityLegendary" | "health" | "shield" | "mana" | "energy" | "stamina" | "debuff" | "cooldownMask" | "abilityReady" | "abilityLocked" | "cast" | "target" | "mapLine" | "markerAlly" | "markerEnemy" | "markerObjective" | "dialogue" | "choice" | "speaker" | "notification"

export type FontToken = "sans" | "display"

export type ColorToken = "background" | "surface" | "surfaceStrong" | "line" | "text" | "muted" | "accent" | "accentStrong" | "danger" | "heal" | "critical" | "miss" | "loot" | "rarityCommon" | "rarityRare" | "rarityEpic" | "rarityLegendary" | "health" | "shield" | "mana" | "energy" | "stamina" | "debuff" | "cooldownMask" | "abilityReady" | "abilityLocked" | "cast" | "target" | "mapLine" | "markerAlly" | "markerEnemy" | "markerObjective" | "dialogue" | "choice" | "speaker" | "notification" | "colorPalette"

export type SpacingToken = "1" | "2" | "3" | "4" | "5" | "-1" | "-2" | "-3" | "-4" | "-5"

export type RadiusToken = "sm" | "md" | "lg"

export type ShadowToken = "soft" | "glow"

export type DurationToken = "fast" | "normal" | "slow"

export type EasingToken = "out"

export type Tokens = {
		fonts: FontToken
		colors: ColorToken
		spacing: SpacingToken
		radii: RadiusToken
		shadows: ShadowToken
		durations: DurationToken
		easings: EasingToken
} & { [token: string]: never }

export type TokenCategory = "aspectRatios" | "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "cursor" | "shadows" | "spacing" | "radii" | "borders" | "borderWidths" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"