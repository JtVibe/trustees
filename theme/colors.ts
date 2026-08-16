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
