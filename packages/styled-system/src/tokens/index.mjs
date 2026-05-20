const tokens = {
  "fonts.sans": {
    "value": "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
    "variable": "var(--game-ui-fonts-sans)"
  },
  "fonts.display": {
    "value": "\"Arial Black\", Impact, var(--game-ui-fonts-sans)",
    "variable": "var(--game-ui-fonts-display)"
  },
  "colors.background": {
    "value": "#080b13",
    "variable": "var(--game-ui-colors-background)"
  },
  "colors.surface": {
    "value": "rgba(16, 23, 42, 0.78)",
    "variable": "var(--game-ui-colors-surface)"
  },
  "colors.surfaceStrong": {
    "value": "rgba(25, 35, 63, 0.92)",
    "variable": "var(--game-ui-colors-surface-strong)"
  },
  "colors.line": {
    "value": "rgba(129, 230, 217, 0.28)",
    "variable": "var(--game-ui-colors-line)"
  },
  "colors.text": {
    "value": "#f8fafc",
    "variable": "var(--game-ui-colors-text)"
  },
  "colors.muted": {
    "value": "#9fb0ce",
    "variable": "var(--game-ui-colors-muted)"
  },
  "colors.accent": {
    "value": "#55f7d2",
    "variable": "var(--game-ui-colors-accent)"
  },
  "colors.accentStrong": {
    "value": "#1ee6ff",
    "variable": "var(--game-ui-colors-accent-strong)"
  },
  "colors.danger": {
    "value": "#ff4d7d",
    "variable": "var(--game-ui-colors-danger)"
  },
  "colors.heal": {
    "value": "#5cff9d",
    "variable": "var(--game-ui-colors-heal)"
  },
  "colors.critical": {
    "value": "#ffd166",
    "variable": "var(--game-ui-colors-critical)"
  },
  "colors.miss": {
    "value": "#b7c0d8",
    "variable": "var(--game-ui-colors-miss)"
  },
  "colors.loot": {
    "value": "#b47cff",
    "variable": "var(--game-ui-colors-loot)"
  },
  "colors.rarityCommon": {
    "value": "#9fb0ce",
    "variable": "var(--game-ui-colors-rarity-common)"
  },
  "colors.rarityRare": {
    "value": "#4cc9f0",
    "variable": "var(--game-ui-colors-rarity-rare)"
  },
  "colors.rarityEpic": {
    "value": "#b47cff",
    "variable": "var(--game-ui-colors-rarity-epic)"
  },
  "colors.rarityLegendary": {
    "value": "#ffd166",
    "variable": "var(--game-ui-colors-rarity-legendary)"
  },
  "colors.health": {
    "value": "#ff4d7d",
    "variable": "var(--game-ui-colors-health)"
  },
  "colors.shield": {
    "value": "#4cc9f0",
    "variable": "var(--game-ui-colors-shield)"
  },
  "colors.mana": {
    "value": "#7c8cff",
    "variable": "var(--game-ui-colors-mana)"
  },
  "colors.energy": {
    "value": "#ffd166",
    "variable": "var(--game-ui-colors-energy)"
  },
  "colors.stamina": {
    "value": "#5cff9d",
    "variable": "var(--game-ui-colors-stamina)"
  },
  "colors.debuff": {
    "value": "#ff6b6b",
    "variable": "var(--game-ui-colors-debuff)"
  },
  "colors.cooldownMask": {
    "value": "rgba(4, 8, 18, 0.72)",
    "variable": "var(--game-ui-colors-cooldown-mask)"
  },
  "colors.abilityReady": {
    "value": "#55f7d2",
    "variable": "var(--game-ui-colors-ability-ready)"
  },
  "colors.abilityLocked": {
    "value": "#64748b",
    "variable": "var(--game-ui-colors-ability-locked)"
  },
  "colors.cast": {
    "value": "#1ee6ff",
    "variable": "var(--game-ui-colors-cast)"
  },
  "colors.target": {
    "value": "#ff4d7d",
    "variable": "var(--game-ui-colors-target)"
  },
  "colors.mapLine": {
    "value": "rgba(129, 230, 217, 0.22)",
    "variable": "var(--game-ui-colors-map-line)"
  },
  "colors.markerAlly": {
    "value": "#5cff9d",
    "variable": "var(--game-ui-colors-marker-ally)"
  },
  "colors.markerEnemy": {
    "value": "#ff4d7d",
    "variable": "var(--game-ui-colors-marker-enemy)"
  },
  "colors.markerObjective": {
    "value": "#ffd166",
    "variable": "var(--game-ui-colors-marker-objective)"
  },
  "colors.dialogue": {
    "value": "rgba(25, 35, 63, 0.94)",
    "variable": "var(--game-ui-colors-dialogue)"
  },
  "colors.choice": {
    "value": "#b47cff",
    "variable": "var(--game-ui-colors-choice)"
  },
  "colors.speaker": {
    "value": "#ffd166",
    "variable": "var(--game-ui-colors-speaker)"
  },
  "colors.notification": {
    "value": "#55f7d2",
    "variable": "var(--game-ui-colors-notification)"
  },
  "colors.slotEmpty": {
    "value": "rgba(16, 23, 42, 0.42)",
    "variable": "var(--game-ui-colors-slot-empty)"
  },
  "colors.slotEquipped": {
    "value": "#55f7d2",
    "variable": "var(--game-ui-colors-slot-equipped)"
  },
  "colors.slotLocked": {
    "value": "#64748b",
    "variable": "var(--game-ui-colors-slot-locked)"
  },
  "colors.partyOffline": {
    "value": "#64748b",
    "variable": "var(--game-ui-colors-party-offline)"
  },
  "colors.partySelected": {
    "value": "#55f7d2",
    "variable": "var(--game-ui-colors-party-selected)"
  },
  "colors.currencyGold": {
    "value": "#ffd166",
    "variable": "var(--game-ui-colors-currency-gold)"
  },
  "colors.currencyGem": {
    "value": "#b47cff",
    "variable": "var(--game-ui-colors-currency-gem)"
  },
  "colors.currencyToken": {
    "value": "#55f7d2",
    "variable": "var(--game-ui-colors-currency-token)"
  },
  "spacing.1": {
    "value": "4px",
    "variable": "var(--game-ui-spacing-1)"
  },
  "spacing.2": {
    "value": "8px",
    "variable": "var(--game-ui-spacing-2)"
  },
  "spacing.3": {
    "value": "12px",
    "variable": "var(--game-ui-spacing-3)"
  },
  "spacing.4": {
    "value": "16px",
    "variable": "var(--game-ui-spacing-4)"
  },
  "spacing.5": {
    "value": "24px",
    "variable": "var(--game-ui-spacing-5)"
  },
  "radii.sm": {
    "value": "6px",
    "variable": "var(--game-ui-radii-sm)"
  },
  "radii.md": {
    "value": "10px",
    "variable": "var(--game-ui-radii-md)"
  },
  "radii.lg": {
    "value": "16px",
    "variable": "var(--game-ui-radii-lg)"
  },
  "shadows.soft": {
    "value": "0 14px 36px rgba(0, 0, 0, 0.38)",
    "variable": "var(--game-ui-shadows-soft)"
  },
  "shadows.glow": {
    "value": "0 0 28px rgba(85, 247, 210, 0.28)",
    "variable": "var(--game-ui-shadows-glow)"
  },
  "durations.fast": {
    "value": "160ms",
    "variable": "var(--game-ui-durations-fast)"
  },
  "durations.normal": {
    "value": "280ms",
    "variable": "var(--game-ui-durations-normal)"
  },
  "durations.slow": {
    "value": "720ms",
    "variable": "var(--game-ui-durations-slow)"
  },
  "easings.out": {
    "value": "cubic-bezier(0.16, 1, 0.3, 1)",
    "variable": "var(--game-ui-easings-out)"
  },
  "spacing.-1": {
    "value": "calc(var(--game-ui-spacing-1) * -1)",
    "variable": "var(--game-ui-spacing-1)"
  },
  "spacing.-2": {
    "value": "calc(var(--game-ui-spacing-2) * -1)",
    "variable": "var(--game-ui-spacing-2)"
  },
  "spacing.-3": {
    "value": "calc(var(--game-ui-spacing-3) * -1)",
    "variable": "var(--game-ui-spacing-3)"
  },
  "spacing.-4": {
    "value": "calc(var(--game-ui-spacing-4) * -1)",
    "variable": "var(--game-ui-spacing-4)"
  },
  "spacing.-5": {
    "value": "calc(var(--game-ui-spacing-5) * -1)",
    "variable": "var(--game-ui-spacing-5)"
  },
  "colors.colorPalette": {
    "value": "var(--game-ui-colors-color-palette)",
    "variable": "var(--game-ui-colors-color-palette)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar