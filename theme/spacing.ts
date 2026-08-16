/**
 * The app's spacing scale, corner radii and screen padding. No raw numbers in screens.
 */

/**
 * The only gap/padding/margin values allowed in the app: 4, 8, 12, 16, 20, 24, 32, 48.
 * Named so styles read as `padding: spacing.lg` rather than `padding: 16`.
 */
export const spacing = {
  /** 4 */
  xs: 4,
  /** 8 */
  sm: 8,
  /** 12 */
  md: 12,
  /** 16 */
  lg: 16,
  /** 20 */
  xl: 20,
  /** 24 */
  xxl: 24,
  /** 32 */
  xxxl: 32,
  /** 48 */
  huge: 48,
} as const;

/** e.g. 'xs' | 'sm' | 'md' … */
export type SpacingName = keyof typeof spacing;

/** e.g. 4 | 8 | 12 … */
export type SpacingValue = (typeof spacing)[SpacingName];

/** Corner radii. Note primary buttons are deliberately sharp (4), not rounded. */
export const radius = {
  /** Text inputs — 12 */
  input: 12,
  /** Cards and panels — 12 */
  card: 12,
  /** Pills and filter chips — fully rounded */
  pill: 999,
  /** Primary (black) buttons — 4 */
  button: 4,
} as const;

/** e.g. 'input' | 'card' | 'pill' | 'button' */
export type RadiusName = keyof typeof radius;

/** e.g. 12 | 999 | 4 */
export type RadiusValue = (typeof radius)[RadiusName];

/** Layout constants that apply to every screen. */
export const layout = {
  /** Left and right padding for all screen content — 20 */
  screenHorizontalPadding: 20,
} as const;
