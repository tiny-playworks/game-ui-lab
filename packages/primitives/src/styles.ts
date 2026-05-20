// @ts-nocheck
import { css, cva, cx } from '@tiny-playworks/styled-system/css';

export function mergeClass(...classes: Array<string | false | null | undefined>) {
  return cx(...classes.filter(Boolean));
}

const panelSurface = 'var(--game-ui-surface)';
const panelSurfaceStrong = 'var(--game-ui-surface-strong)';
const line = 'var(--game-ui-line)';
const text = 'var(--game-ui-text)';
const muted = 'var(--game-ui-muted)';
const accent = 'var(--game-ui-accent)';
const heal = 'var(--game-ui-heal)';
const danger = 'var(--game-ui-danger)';
const critical = 'var(--game-ui-critical)';
const loot = 'var(--game-ui-loot)';
const shield = 'var(--game-ui-shield)';
const mana = 'var(--game-ui-mana)';
const energy = 'var(--game-ui-energy)';
const stamina = 'var(--game-ui-stamina)';
const debuff = 'var(--game-ui-debuff)';
const radiusSm = 'var(--game-ui-radius-sm)';
const radiusMd = 'var(--game-ui-radius-md)';
const radiusLg = 'var(--game-ui-radius-lg)';
const space1 = 'var(--game-ui-space-1)';
const space2 = 'var(--game-ui-space-2)';
const space3 = 'var(--game-ui-space-3)';
const shadowSoft = 'var(--game-ui-shadow-soft)';
const shadowGlow = 'var(--game-ui-shadow-glow)';

const upperLabel = {
  color: muted,
  fontSize: '11px',
  fontWeight: '800',
  textTransform: 'uppercase',
} as const;

export const providerRootClass = css({
  color: text,
  fontFamily: 'var(--game-ui-font-sans)',
});

export const damageNumberRecipe = cva({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '56px',
    padding: '2px 8px',
    color: danger,
    fontFamily: 'var(--game-ui-font-display)',
    fontSize: 'var(--game-ui-damage-size, 34px)',
    lineHeight: '1',
    textShadow: '0 2px 0 rgba(0, 0, 0, 0.52), 0 0 18px currentColor',
    pointerEvents: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
  variants: {
    variant: {
      damage: { color: danger },
      heal: { color: heal },
      critical: { color: critical, letterSpacing: '0' },
      miss: { color: 'var(--game-ui-miss)', fontSize: 'calc(var(--game-ui-damage-size, 34px) * 0.72)' },
    },
  },
  defaultVariants: {
    variant: 'damage',
  },
});

export const damageNumberPrefixClass = css({
  marginRight: '4px',
  color: 'currentColor',
  fontSize: '0.56em',
});

export const floatingToastRecipe = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space2,
    maxWidth: 'min(420px, 88vw)',
    padding: '10px 14px',
    border: `1px solid ${line}`,
    borderLeft: `4px solid ${accent}`,
    borderRadius: radiusMd,
    background: `linear-gradient(135deg, rgba(85, 247, 210, 0.12), transparent 44%), ${panelSurfaceStrong}`,
    boxShadow: `${shadowSoft}, ${shadowGlow}`,
    color: text,
    fontFamily: 'var(--game-ui-font-sans)',
  },
  variants: {
    variant: {
      info: { borderLeftColor: accent },
      success: { borderLeftColor: heal },
      warning: { borderLeftColor: critical },
      loot: { borderLeftColor: loot },
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

export const floatingToastIconRecipe = cva({
  base: {
    display: 'grid',
    width: '26px',
    height: '26px',
    placeItems: 'center',
    border: '1px solid currentColor',
    borderRadius: '999px',
    color: accent,
    fontSize: '13px',
    fontWeight: '800',
  },
  variants: {
    variant: {
      info: { color: accent },
      success: { color: heal },
      warning: { color: critical },
      loot: { color: loot },
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

export const floatingToastContentClass = css({ display: 'grid', gap: '2px' });
export const floatingToastTitleClass = css({ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase' });
export const floatingToastMessageClass = css({ color: muted, fontSize: '13px' });
export const floatingToastActionClass = css({
  minHeight: '28px',
  padding: '0 9px',
  border: `1px solid ${line}`,
  borderRadius: radiusSm,
  background: 'rgba(255, 255, 255, 0.06)',
  color: text,
  cursor: 'pointer',
  font: 'inherit',
  fontSize: '12px',
  fontWeight: '800',
});
export const floatingToastCloseClass = css({
  display: 'grid',
  width: '24px',
  height: '24px',
  placeItems: 'center',
  border: `1px solid ${line}`,
  borderRadius: '999px',
  background: 'rgba(255, 255, 255, 0.04)',
  color: muted,
  cursor: 'pointer',
  font: 'inherit',
  fontSize: '12px',
  fontWeight: '900',
});

export const comboCounterRecipe = cva({
  base: {
    display: 'inline-grid',
    minWidth: '152px',
    padding: '12px 16px',
    border: '1px solid rgba(255, 209, 102, 0.4)',
    borderRadius: radiusLg,
    background: `radial-gradient(circle at 20% 15%, rgba(255, 209, 102, 0.26), transparent 32%), linear-gradient(135deg, rgba(85, 247, 210, 0.12), rgba(180, 124, 255, 0.12)), ${panelSurface}`,
    boxShadow: `${shadowSoft}, 0 0 34px rgba(255, 209, 102, 0.18)`,
    color: text,
    fontFamily: 'var(--game-ui-font-sans)',
  },
  variants: {
    active: {
      true: {},
      false: { opacity: 0.62 },
    },
  },
  defaultVariants: {
    active: true,
  },
});

export const comboCounterLabelClass = css({
  color: critical,
  fontSize: '11px',
  fontWeight: '800',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
});
export const comboCounterValueClass = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '6px',
  color: critical,
  fontFamily: 'var(--game-ui-font-display)',
  fontSize: '48px',
  lineHeight: '0.9',
  textShadow: '0 0 20px rgba(255, 209, 102, 0.5)',
});
export const comboCounterSuffixClass = css({ fontFamily: 'var(--game-ui-font-sans)', fontSize: '18px', fontWeight: '900' });
export const comboCounterTierClass = css({ marginTop: '4px', color: muted, fontSize: '12px', fontWeight: '700' });

export const healthBarRecipe = cva({
  base: {
    display: 'grid',
    minWidth: '220px',
    gap: space1,
    color: text,
    fontFamily: 'var(--game-ui-font-sans)',
  },
  variants: {
    tone: {
      hero: {},
      danger: {},
      boss: {},
    },
    empty: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      tone: 'danger',
      css: {
        '--game-ui-health-fill-color': danger,
      },
    },
    {
      tone: 'boss',
      css: {
        '--game-ui-health-fill-color': debuff,
        '--game-ui-health-fill-end-color': critical,
      },
    },
    {
      empty: true,
      css: {
        '--game-ui-health-fill-opacity': '0.24',
      },
    },
  ],
  defaultVariants: {
    tone: 'hero',
    empty: false,
  },
});

export const healthBarToplineClass = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'center',
  gap: space2,
});
export const healthBarLabelClass = css({
  overflow: 'hidden',
  ...upperLabel,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
export const healthBarValueClass = css({ color: text, fontSize: '12px', fontWeight: '800' });
export const healthBarTrackClass = css({
  position: 'relative',
  display: 'block',
  overflow: 'hidden',
  height: '12px',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '999px',
  background: 'rgba(4, 8, 18, 0.74)',
  boxShadow: 'inset 0 1px 5px rgba(0, 0, 0, 0.5)',
});
export const healthBarFillClass = css({
  position: 'absolute',
  inset: '0 auto 0 0',
  display: 'block',
  width: 'var(--game-ui-health-ratio)',
  borderRadius: 'inherit',
  background: 'linear-gradient(90deg, var(--game-ui-health-fill-color, var(--game-ui-health)), var(--game-ui-health-fill-end-color, color-mix(in srgb, var(--game-ui-health), white 24%)))',
  boxShadow: '0 0 18px color-mix(in srgb, var(--game-ui-health), transparent 56%)',
  opacity: 'var(--game-ui-health-fill-opacity, 1)',
});
export const healthBarShieldClass = css({
  position: 'absolute',
  inset: '0 auto 0 var(--game-ui-health-ratio)',
  display: 'block',
  width: 'var(--game-ui-shield-ratio)',
  borderRadius: 'inherit',
  background: `linear-gradient(90deg, ${shield}, color-mix(in srgb, ${shield}, white 24%))`,
  boxShadow: `0 0 18px color-mix(in srgb, ${shield}, transparent 54%)`,
});
export const healthBarShieldValueClass = css({ color: shield, fontSize: '12px', fontWeight: '800' });

export const resourceMeterRecipe = cva({
  base: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    alignItems: 'center',
    gap: space2,
    minWidth: '190px',
    padding: '8px 10px',
    border: `1px solid ${line}`,
    borderRadius: radiusMd,
    background: panelSurface,
    boxShadow: shadowSoft,
    color: text,
    fontFamily: 'var(--game-ui-font-sans)',
  },
  variants: {
    kind: {
      mana: { '--game-ui-resource-color': mana },
      energy: { '--game-ui-resource-color': energy },
      stamina: { '--game-ui-resource-color': stamina },
    },
  },
  defaultVariants: {
    kind: 'mana',
  },
});
export const resourceMeterLabelClass = healthBarLabelClass;
export const resourceMeterValueClass = healthBarValueClass;
export const resourceMeterTrackClass = css({
  position: 'relative',
  display: 'block',
  overflow: 'hidden',
  gridColumn: '1 / -1',
  height: '8px',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '999px',
  background: 'rgba(4, 8, 18, 0.74)',
  boxShadow: 'inset 0 1px 5px rgba(0, 0, 0, 0.5)',
});
export const resourceMeterFillClass = css({
  position: 'absolute',
  inset: '0 auto 0 0',
  display: 'block',
  width: 'var(--game-ui-resource-ratio)',
  height: '100%',
  borderRadius: 'inherit',
  background: 'linear-gradient(90deg, var(--game-ui-resource-color), color-mix(in srgb, var(--game-ui-resource-color), white 24%))',
  boxShadow: '0 0 18px color-mix(in srgb, var(--game-ui-resource-color), transparent 56%)',
});

export const cooldownSlotRecipe = cva({
  base: {
    position: 'relative',
    display: 'grid',
    appearance: 'none',
    width: '72px',
    minWidth: '72px',
    gap: '5px',
    placeItems: 'center',
    padding: 0,
    border: 0,
    background: 'transparent',
    color: text,
    cursor: 'default',
    fontFamily: 'var(--game-ui-font-sans)',
    font: 'inherit',
  },
  variants: {
    ready: {
      true: { '--game-ui-cooldown-slot-color': heal },
      false: { '--game-ui-cooldown-slot-color': accent },
    },
    disabled: {
      true: { opacity: 0.48, '--game-ui-cooldown-slot-color': 'var(--game-ui-ability-locked)' },
      false: {},
    },
    selected: {
      true: {
        '--game-ui-cooldown-slot-color': critical,
        transform: 'translateY(-3px)',
      },
      false: {},
    },
  },
  defaultVariants: {
    ready: false,
    disabled: false,
    selected: false,
  },
});
export const cooldownSlotIconClass = css({
  position: 'relative',
  display: 'grid',
  overflow: 'hidden',
  width: '52px',
  height: '52px',
  placeItems: 'center',
  border: '1px solid color-mix(in srgb, var(--game-ui-cooldown-slot-color), transparent 34%)',
  borderRadius: radiusMd,
  background: `radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.18), transparent 34%), ${panelSurfaceStrong}`,
  boxShadow: shadowSoft,
  color: 'var(--game-ui-cooldown-slot-color)',
  fontSize: '20px',
  fontWeight: '900',
});
export const cooldownSlotMaskClass = css({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  width: '100%',
  height: 'var(--game-ui-cooldown-progress)',
  borderRadius: `${radiusMd} ${radiusMd} 0 0`,
  background: 'var(--game-ui-cooldown-mask)',
  pointerEvents: 'none',
});
export const cooldownSlotLabelClass = css({
  overflow: 'hidden',
  maxWidth: '72px',
  color: muted,
  fontSize: '11px',
  fontWeight: '800',
  textAlign: 'center',
  textOverflow: 'ellipsis',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
});

export const abilityBarClass = css({
  display: 'inline-flex',
  alignItems: 'end',
  gap: space2,
  padding: space2,
  border: `1px solid ${line}`,
  borderRadius: radiusLg,
  background: panelSurface,
  color: text,
  fontFamily: 'var(--game-ui-font-sans)',
});
export const abilityBarItemClass = css({ position: 'relative', display: 'grid', justifyItems: 'center' });
export const abilityBarCostClass = css({
  position: 'absolute',
  right: '7px',
  bottom: '22px',
  color: 'var(--game-ui-ability-ready)',
  fontSize: '10px',
  fontWeight: '900',
});

export const abilityTooltipRecipe = cva({
  base: {
    display: 'grid',
    gap: space1,
    maxWidth: '280px',
    padding: '12px',
    border: '1px solid color-mix(in srgb, var(--game-ui-ability-ready), transparent 42%)',
    borderRadius: radiusMd,
    background: panelSurfaceStrong,
    boxShadow: shadowSoft,
    color: text,
    fontFamily: 'var(--game-ui-font-sans)',
  },
  variants: {
    state: {
      ready: {},
      cooling: {},
      locked: { borderColor: 'var(--game-ui-ability-locked)', opacity: 0.72 },
    },
  },
  defaultVariants: {
    state: 'ready',
  },
});
export const abilityTooltipKindClass = css(upperLabel);
export const abilityTooltipNameClass = css({ color: 'var(--game-ui-ability-ready)', fontSize: '16px' });
export const abilityTooltipDescriptionClass = css({ color: muted, fontSize: '13px' });
export const abilityTooltipMetaClass = css({ display: 'flex', gap: space2, ...upperLabel });

export const castBarRecipe = cva({
  base: {
    '--game-ui-cast-fill': 'var(--game-ui-cast)',
    display: 'grid',
    minWidth: '260px',
    gap: space1,
    color: text,
    fontFamily: 'var(--game-ui-font-sans)',
  },
  variants: {
    state: {
      casting: {},
      channeling: {},
      complete: { '--game-ui-cast-fill': heal },
      interrupted: { '--game-ui-cast-fill': debuff },
    },
  },
  defaultVariants: {
    state: 'casting',
  },
});
export const castBarToplineClass = css({
  display: 'flex',
  justifyContent: 'space-between',
  gap: space2,
  color: muted,
  fontSize: '12px',
  fontWeight: '900',
  textTransform: 'uppercase',
});
export const castBarToplineStrongClass = css({ color: text });
export const castBarTrackClass = css({
  display: 'block',
  overflow: 'hidden',
  height: '12px',
  border: `1px solid ${line}`,
  borderRadius: '999px',
  background: 'rgba(4, 8, 18, 0.74)',
});
export const castBarFillClass = css({
  display: 'block',
  width: 'var(--game-ui-cast-progress)',
  height: '100%',
  borderRadius: 'inherit',
  background: 'linear-gradient(90deg, var(--game-ui-cast-fill), var(--game-ui-ability-ready))',
  boxShadow: '0 0 18px color-mix(in srgb, var(--game-ui-cast-fill), transparent 54%)',
});

export const targetFrameRecipe = cva({
  base: {
    display: 'grid',
    gap: space2,
    minWidth: '280px',
    padding: '12px',
    border: '1px solid color-mix(in srgb, var(--game-ui-target), transparent 40%)',
    borderRadius: radiusLg,
    background: panelSurface,
    color: text,
    fontFamily: 'var(--game-ui-font-sans)',
  },
  variants: {
    faction: {
      ally: { borderColor: 'color-mix(in srgb, var(--game-ui-marker-ally), transparent 38%)' },
      enemy: {},
      neutral: { borderColor: line },
      boss: {},
    },
  },
  defaultVariants: {
    faction: 'enemy',
  },
});
export const targetFrameHeaderClass = css({ display: 'flex', justifyContent: 'space-between', gap: space2 });
export const targetFrameCopyClass = css({ display: 'grid', gap: '2px' });
export const targetFrameMetaClass = css({ ...upperLabel, fontStyle: 'normal' });
export const targetFrameStatusesClass = css({ display: 'flex', flexWrap: 'wrap', gap: space1 });

export const statusBadgeRecipe = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    maxWidth: '100%',
    padding: '5px 8px',
    border: `1px solid ${line}`,
    borderRadius: '999px',
    background: panelSurface,
    color: text,
    fontFamily: 'var(--game-ui-font-sans)',
    fontSize: '12px',
    fontWeight: '800',
    whiteSpace: 'nowrap',
  },
  variants: {
    tone: {
      buff: { borderColor: 'color-mix(in srgb, var(--game-ui-stamina), transparent 40%)', color: stamina },
      debuff: { borderColor: 'color-mix(in srgb, var(--game-ui-debuff), transparent 36%)', color: debuff },
      neutral: {},
      warning: { borderColor: 'color-mix(in srgb, var(--game-ui-critical), transparent 36%)', color: critical },
    },
  },
  defaultVariants: {
    tone: 'neutral',
  },
});
export const statusBadgeMetaClass = css({ color: text, fontSize: '11px' });

export const objectiveChipRecipe = cva({
  base: {
    '--game-ui-objective-color': accent,
    '--game-ui-objective-progress': '0%',
    display: 'grid',
    gridTemplateColumns: '30px minmax(0, 1fr) auto',
    alignItems: 'center',
    gap: space2,
    minWidth: '240px',
    padding: '8px 10px',
    border: '1px solid color-mix(in srgb, var(--game-ui-objective-color), transparent 44%)',
    borderRadius: radiusMd,
    background: panelSurface,
    color: text,
    fontFamily: 'var(--game-ui-font-sans)',
  },
  variants: {
    state: {
      active: {},
      complete: { '--game-ui-objective-color': heal },
      locked: { '--game-ui-objective-color': muted, opacity: 0.62 },
    },
  },
  defaultVariants: {
    state: 'active',
  },
});
export const objectiveChipIconClass = css({
  display: 'grid',
  width: '30px',
  height: '30px',
  placeItems: 'center',
  border: '1px solid color-mix(in srgb, var(--game-ui-objective-color), transparent 34%)',
  borderRadius: radiusSm,
  color: 'var(--game-ui-objective-color)',
  fontSize: '11px',
  fontWeight: '900',
});
export const objectiveChipBodyClass = css({ display: 'grid', gap: '2px', minWidth: 0 });
export const objectiveChipLabelClass = css({ overflow: 'hidden', fontSize: '13px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' });
export const objectiveChipMetaClass = css({ overflow: 'hidden', ...upperLabel, textOverflow: 'ellipsis', whiteSpace: 'nowrap' });
export const objectiveChipProgressClass = css({ display: 'grid', gap: '4px', justifyItems: 'end', minWidth: '58px' });
export const objectiveChipProgressTextClass = objectiveChipMetaClass;
export const objectiveChipTrackClass = css({
  display: 'block',
  overflow: 'hidden',
  width: '58px',
  height: '5px',
  borderRadius: '999px',
  background: 'color-mix(in srgb, var(--game-ui-muted), transparent 74%)',
});
export const objectiveChipFillClass = css({
  display: 'block',
  width: 'var(--game-ui-objective-progress)',
  height: '100%',
  borderRadius: 'inherit',
  background: 'var(--game-ui-objective-color)',
});

export const questTrackerClass = css({
  display: 'grid',
  gap: space3,
  minWidth: '280px',
  padding: '14px',
  border: `1px solid ${line}`,
  borderRadius: radiusLg,
  background: panelSurface,
  color: text,
  fontFamily: 'var(--game-ui-font-sans)',
});
export const questTrackerHeaderClass = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'start',
  gap: space2,
});
export const questTrackerCopyClass = css({ display: 'grid', gap: '3px', minWidth: 0 });
export const questTrackerTitleClass = css({ overflow: 'hidden', fontSize: '15px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' });
export const questTrackerSubtitleClass = css(upperLabel);
export const questTrackerCountClass = css({ ...upperLabel, color: accent });
export const questTrackerListClass = css({ display: 'grid', gap: space2 });

export const mapMarkerRecipe = cva({
  base: {
    '--game-ui-marker-color': muted,
    position: 'absolute',
    top: 'var(--game-ui-marker-y)',
    left: 'var(--game-ui-marker-x)',
    display: 'inline-flex',
    appearance: 'none',
    alignItems: 'center',
    gap: '5px',
    padding: 0,
    border: 0,
    background: 'transparent',
    color: 'var(--game-ui-marker-color)',
    cursor: 'default',
    fontFamily: 'var(--game-ui-font-sans)',
    font: 'inherit',
    fontSize: '10px',
    fontWeight: '900',
    transform: 'translate(-50%, -50%)',
  },
  variants: {
    tone: {
      ally: { '--game-ui-marker-color': 'var(--game-ui-marker-ally)' },
      enemy: { '--game-ui-marker-color': 'var(--game-ui-marker-enemy)' },
      objective: { '--game-ui-marker-color': 'var(--game-ui-marker-objective)' },
      neutral: {},
    },
    active: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    tone: 'neutral',
    active: false,
  },
});
export const mapMarkerDotRecipe = cva({
  base: {
    display: 'grid',
    width: '12px',
    height: '12px',
    placeItems: 'center',
    border: '2px solid var(--game-ui-marker-color)',
    borderRadius: '999px',
    background: 'rgba(4, 8, 18, 0.84)',
    boxShadow: '0 0 16px color-mix(in srgb, var(--game-ui-marker-color), transparent 58%)',
  },
  variants: {
    active: {
      true: { width: '16px', height: '16px' },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
  },
});
export const mapMarkerLabelClass = css({
  padding: '2px 5px',
  border: '1px solid color-mix(in srgb, var(--game-ui-marker-color), transparent 46%)',
  borderRadius: '999px',
  background: panelSurface,
});
export const miniMapClass = css({
  position: 'relative',
  overflow: 'hidden',
  width: '260px',
  height: '180px',
  border: '1px solid var(--game-ui-map-line)',
  borderRadius: radiusLg,
  background: `linear-gradient(var(--game-ui-map-line) 1px, transparent 1px), linear-gradient(90deg, var(--game-ui-map-line) 1px, transparent 1px), radial-gradient(circle at 28% 20%, color-mix(in srgb, var(--game-ui-marker-objective), transparent 82%), transparent 28%), ${panelSurface}`,
  backgroundSize: '32px 32px, 32px 32px, auto, auto',
  color: text,
  fontFamily: 'var(--game-ui-font-sans)',
});
export const miniMapGridClass = css({
  position: 'absolute',
  inset: '12px',
  border: '1px solid color-mix(in srgb, var(--game-ui-map-line), transparent 20%)',
  borderRadius: radiusMd,
});
export const miniMapLabelClass = css({
  position: 'absolute',
  right: '10px',
  bottom: '8px',
  color: muted,
  fontSize: '11px',
  fontWeight: '900',
  textTransform: 'uppercase',
});

export const compassBarClass = css({
  display: 'grid',
  minWidth: '280px',
  gap: space1,
  color: text,
  fontFamily: 'var(--game-ui-font-sans)',
});
export const compassBarHeadingClass = css({ color: 'var(--game-ui-marker-objective)', fontSize: '12px', fontWeight: '900', textAlign: 'center' });
export const compassBarTrackClass = css({
  position: 'relative',
  display: 'block',
  height: '30px',
  border: '1px solid var(--game-ui-map-line)',
  borderRadius: '999px',
  background: `linear-gradient(90deg, transparent 24%, var(--game-ui-map-line) 25%, transparent 26% 74%, var(--game-ui-map-line) 75%, transparent 76%), ${panelSurface}`,
});
export const compassBarMarkerRecipe = cva({
  base: {
    position: 'absolute',
    top: '50%',
    left: 'var(--game-ui-compass-position)',
    color: muted,
    fontSize: '10px',
    fontWeight: '900',
    transform: 'translate(-50%, -50%)',
  },
  variants: {
    tone: {
      ally: { color: 'var(--game-ui-marker-ally)' },
      enemy: { color: 'var(--game-ui-marker-enemy)' },
      objective: { color: 'var(--game-ui-marker-objective)' },
      neutral: {},
    },
  },
  defaultVariants: {
    tone: 'neutral',
  },
});

export const locationTagRecipe = cva({
  base: {
    display: 'inline-grid',
    gap: '2px',
    minWidth: '160px',
    padding: '9px 11px',
    border: '1px solid var(--game-ui-map-line)',
    borderRadius: radiusMd,
    background: panelSurface,
    color: text,
    fontFamily: 'var(--game-ui-font-sans)',
  },
  variants: {
    danger: {
      safe: {},
      contested: { borderColor: 'var(--game-ui-marker-objective)' },
      hostile: { borderColor: 'var(--game-ui-marker-enemy)' },
    },
  },
  defaultVariants: {
    danger: 'safe',
  },
});
export const locationTagMetaClass = css(upperLabel);

export const dialogueBoxRecipe = cva({
  base: {
    display: 'grid',
    gridTemplateColumns: '52px minmax(0, 1fr)',
    gap: space3,
    maxWidth: '520px',
    padding: '14px',
    border: '1px solid color-mix(in srgb, var(--game-ui-speaker), transparent 48%)',
    borderRadius: radiusLg,
    background: 'var(--game-ui-dialogue)',
    color: text,
    fontFamily: 'var(--game-ui-font-sans)',
  },
  variants: {
    tone: {
      neutral: {},
      ally: {},
      warning: { borderColor: debuff },
    },
  },
  defaultVariants: {
    tone: 'neutral',
  },
});
export const dialogueBoxPortraitClass = css({
  display: 'grid',
  width: '52px',
  height: '52px',
  placeItems: 'center',
  border: '1px solid color-mix(in srgb, var(--game-ui-speaker), transparent 34%)',
  borderRadius: radiusMd,
  color: 'var(--game-ui-speaker)',
  fontWeight: '900',
});
export const dialogueBoxContentClass = css({ display: 'grid', gap: space1 });
export const dialogueBoxSpeakerClass = css({ color: 'var(--game-ui-speaker)', fontSize: '13px', textTransform: 'uppercase' });
export const dialogueBoxTextClass = css({ color: text, fontSize: '14px', lineHeight: '1.5' });

export const choicePromptClass = css({
  display: 'grid',
  gap: space2,
  minWidth: '280px',
  padding: '12px',
  border: '1px solid color-mix(in srgb, var(--game-ui-choice), transparent 42%)',
  borderRadius: radiusLg,
  background: panelSurface,
  color: text,
  fontFamily: 'var(--game-ui-font-sans)',
});
export const choicePromptTitleClass = css({ color: 'var(--game-ui-choice)', fontSize: '13px', textTransform: 'uppercase' });
export const choicePromptChoicesClass = css({ display: 'grid', gap: space2 });
export const choicePromptChoiceClass = css({
  display: 'grid',
  gap: '2px',
  padding: '9px 10px',
  border: '1px solid color-mix(in srgb, var(--game-ui-choice), transparent 58%)',
  borderRadius: radiusMd,
  background: 'color-mix(in srgb, var(--game-ui-choice), transparent 90%)',
  color: text,
  cursor: 'pointer',
  font: 'inherit',
  textAlign: 'left',
  _disabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
});
export const choicePromptChoiceDescriptionClass = css({ color: muted });

export const questLogClass = css({
  display: 'grid',
  gap: space3,
  minWidth: '320px',
  color: text,
  fontFamily: 'var(--game-ui-font-sans)',
});
export const questLogHeaderClass = css({ display: 'flex', justifyContent: 'space-between', ...upperLabel });
export const questLogListClass = css({ display: 'grid', gap: space3 });
export const questLogQuestClass = css({
  display: 'block',
  width: '100%',
  padding: 0,
  border: 0,
  borderRadius: radiusLg,
  background: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  font: 'inherit',
  textAlign: 'left',
  '&[data-active="true"]': {
    boxShadow: `0 0 0 2px ${accent}`,
  },
});
export const questLogActiveClass = css({ color: 'var(--game-ui-choice)', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase' });

export const notificationStackClass = css({ display: 'grid', gap: space2, maxWidth: '420px' });
export const notificationStackOverflowClass = css({
  justifySelf: 'end',
  color: 'var(--game-ui-notification)',
  fontFamily: 'var(--game-ui-font-sans)',
  fontSize: '11px',
  fontWeight: '900',
  textTransform: 'uppercase',
});

export const lootCardRecipe = cva({
  base: {
    '--game-ui-loot-rarity-color': 'var(--game-ui-rarity-common)',
    display: 'grid',
    appearance: 'none',
    gridTemplateColumns: '38px minmax(0, 1fr) auto',
    alignItems: 'center',
    gap: space2,
    minWidth: '210px',
    padding: '8px 10px',
    border: '1px solid color-mix(in srgb, var(--game-ui-loot-rarity-color), transparent 36%)',
    borderRadius: radiusMd,
    background: `linear-gradient(135deg, color-mix(in srgb, var(--game-ui-loot-rarity-color), transparent 88%), transparent 48%), ${panelSurface}`,
    boxShadow: shadowSoft,
    color: text,
    cursor: 'default',
    fontFamily: 'var(--game-ui-font-sans)',
    font: 'inherit',
    textAlign: 'left',
  },
  variants: {
    rarity: {
      common: {},
      rare: { '--game-ui-loot-rarity-color': 'var(--game-ui-rarity-rare)' },
      epic: { '--game-ui-loot-rarity-color': 'var(--game-ui-rarity-epic)' },
      legendary: { '--game-ui-loot-rarity-color': 'var(--game-ui-rarity-legendary)' },
    },
    selected: {
      true: { boxShadow: `${shadowSoft}, 0 0 24px color-mix(in srgb, var(--game-ui-loot-rarity-color), transparent 70%)` },
      false: {},
    },
  },
  defaultVariants: {
    rarity: 'common',
    selected: false,
  },
});

export const gameUiLayerHostClass = css({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  zIndex: 20,
});
export const gameUiLayerClass = css({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
});
export const gameUiHudLayerClass = css({ zIndex: 10 });
export const gameUiFeedbackLayerClass = css({ zIndex: 20 });
export const gameUiNotificationLayerClass = css({
  zIndex: 30,
  display: 'grid',
  alignContent: 'start',
  justifyContent: 'end',
  gap: space2,
  padding: space3,
});
export const gameUiModalLayerClass = css({
  zIndex: 40,
  display: 'grid',
  placeItems: 'center',
  padding: space3,
  pointerEvents: 'none',
  '&[data-active="true"]': {
    background: 'rgba(3, 7, 18, 0.32)',
    pointerEvents: 'auto',
  },
});
export const gameUiDebugLayerClass = css({ zIndex: 50 });
export const gameUiFeedbackItemClass = css({
  position: 'absolute',
  left: 'var(--game-ui-feedback-x, 50%)',
  top: 'var(--game-ui-feedback-y, 50%)',
  transform: 'translate(-50%, -50%)',
});
export const lootCardIconClass = css({
  display: 'grid',
  width: '38px',
  height: '38px',
  placeItems: 'center',
  border: '1px solid color-mix(in srgb, var(--game-ui-loot-rarity-color), transparent 28%)',
  borderRadius: radiusSm,
  background: 'color-mix(in srgb, var(--game-ui-loot-rarity-color), transparent 84%)',
  color: 'var(--game-ui-loot-rarity-color)',
  fontSize: '15px',
  fontWeight: '900',
});
export const lootCardBodyClass = css({ display: 'grid', gap: '2px', minWidth: 0 });
export const lootCardMetaClass = css({ display: 'grid', gap: '2px', minWidth: 0, justifyItems: 'end' });
export const lootCardNameClass = css({ overflow: 'hidden', fontSize: '13px', fontWeight: '900', textOverflow: 'ellipsis', whiteSpace: 'nowrap' });
export const lootCardTextClass = css({ overflow: 'hidden', color: muted, fontSize: '11px', fontWeight: '700', textOverflow: 'ellipsis', whiteSpace: 'nowrap' });
export const lootCardQuantityClass = css({ color: 'var(--game-ui-loot-rarity-color)', fontSize: '12px', fontWeight: '900' });

export const lootStackClass = css({ display: 'grid', gap: space2, minWidth: '240px', color: text, fontFamily: 'var(--game-ui-font-sans)' });
export const lootStackToplineClass = css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: space2 });
export const lootStackLabelClass = css(upperLabel);
export const lootStackListClass = css({ display: 'grid', gap: space2, padding: 0, margin: 0, listStyle: 'none' });
export const lootStackItemClass = css({
  minWidth: 0,
  listStyle: 'none',
  '&::marker': {
    content: '""',
  },
});
export const lootStackOverflowClass = css({
  display: 'grid',
  minHeight: '32px',
  placeItems: 'center',
  border: `1px dashed ${line}`,
  borderRadius: radiusMd,
  color: muted,
  fontSize: '12px',
  fontWeight: '800',
});

export const rewardRevealRecipe = cva({
  base: {
    position: 'relative',
    display: 'grid',
    gap: space3,
    minWidth: '280px',
    padding: '14px',
    border: '1px solid color-mix(in srgb, var(--game-ui-loot), transparent 42%)',
    borderRadius: radiusLg,
    background: `radial-gradient(circle at 20% 0%, color-mix(in srgb, var(--game-ui-loot), transparent 78%), transparent 34%), ${panelSurfaceStrong}`,
    boxShadow: `${shadowSoft}, 0 0 28px color-mix(in srgb, var(--game-ui-loot), transparent 82%)`,
    color: text,
    fontFamily: 'var(--game-ui-font-sans)',
  },
  variants: {
    state: {
      sealed: {},
      revealed: {},
      claimed: { opacity: 0.72 },
    },
  },
  defaultVariants: {
    state: 'sealed',
  },
});
export const rewardRevealHeaderClass = css({ display: 'grid', gap: '3px' });
export const rewardRevealStateClass = css({ color: loot, fontSize: '11px', fontWeight: '900', textTransform: 'uppercase' });
export const rewardRevealTitleClass = css({ fontSize: '16px' });
export const rewardRevealActionClass = css({
  minHeight: '34px',
  border: '1px solid color-mix(in srgb, var(--game-ui-loot), transparent 28%)',
  borderRadius: radiusMd,
  background: 'color-mix(in srgb, var(--game-ui-loot), transparent 84%)',
  color: text,
  cursor: 'pointer',
  font: 'inherit',
  fontSize: '12px',
  fontWeight: '900',
  textTransform: 'uppercase',
});

export const rarityBorderRecipe = cva({
  base: {
    '--game-ui-rarity-color': 'var(--game-ui-rarity-common)',
    position: 'relative',
    display: 'grid',
    overflow: 'hidden',
    border: '1px solid color-mix(in srgb, var(--game-ui-rarity-color), transparent 26%)',
    borderRadius: radiusLg,
    background: 'linear-gradient(135deg, color-mix(in srgb, var(--game-ui-rarity-color), transparent 86%), transparent 42%), rgba(9, 14, 28, 0.78)',
    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.04), 0 0 28px color-mix(in srgb, var(--game-ui-rarity-color), transparent 78%)',
    '&::before': {
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      background: 'linear-gradient(120deg, transparent 0 34%, color-mix(in srgb, var(--game-ui-rarity-color), transparent 56%) 48%, transparent 62% 100%)',
      content: '""',
      opacity: 0,
      transform: 'translateX(-70%)',
    },
    '& > *': {
      position: 'relative',
      zIndex: 1,
    },
  },
  variants: {
    tone: {
      common: {},
      rare: { '--game-ui-rarity-color': 'var(--game-ui-rarity-rare)' },
      epic: { '--game-ui-rarity-color': 'var(--game-ui-rarity-epic)' },
      legendary: { '--game-ui-rarity-color': 'var(--game-ui-rarity-legendary)' },
    },
    active: {
      true: {
        '&::before': {
          animation: 'game-ui-rarity-sweep 1.8s var(--game-ui-ease-out) infinite',
          opacity: 0.9,
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
            opacity: 0.18,
            transform: 'none',
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    tone: 'common',
    active: true,
  },
});
