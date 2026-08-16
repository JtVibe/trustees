/**
 * The app's entire colour palette. Nothing outside this file may define a hex value.
 */

export const colors = {
  /** Page background */
  background: '#F7F7F7',
  /** Cards, elevated panels */
  surface: '#FFFFFF',
  /** Hero banner panel, trust strip */
  panel: '#ECEBEB',
  /** Primary text, buttons, active states */
  ink: '#000000',
  /** Text on black */
  inkInverse: '#FFFFFF',
  /** Secondary / body copy */
  textMuted: '#555556',
  /** Input and card borders */
  border: '#E2E2E2',
  /** Search bar and input fills */
  fieldFill: '#F1F0F0',
  /** Offers tile ONLY — the app is otherwise monochrome */
  offers: '#6160BB',
  /** Sales tile ONLY — the app is otherwise monochrome */
  sales: '#CB3430',
} as const;

/** e.g. 'background' | 'surface' | 'ink' … */
export type ColorName = keyof typeof colors;

/** e.g. '#F7F7F7' | '#FFFFFF' … */
export type ColorValue = (typeof colors)[ColorName];

/**
 * A palette colour made see-through, e.g. alpha(colors.inkInverse, 0.7).
 * Screens use this instead of the `opacity` style prop, which would fade a
 * whole view and its children rather than just one colour.
 */
export const alpha = (color: string, value: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${value})`;
};

/** The only see-through levels the app uses. Pass these to alpha(). */
export const opacity = {
  /** Body copy sitting on top of a photo — 0.7 */
  overPhoto: 0.7,
  /** Inactive dots and disabled marks — 0.3 */
  inactive: 0.3,
} as const;

/**
 * Bottom-of-screen fade for full-bleed photo screens: clear at the top,
 * solid ink at the bottom, so white text stays readable over any photo.
 * Feed it straight to <LinearGradient colors={scrim} />.
 */
export const scrim = [
  alpha(colors.ink, 0),
  alpha(colors.ink, 0.7),
  colors.ink,
] as const;
