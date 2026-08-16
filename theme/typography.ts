/**
 * Font families and the five text styles the whole app is built from.
 */

import type { TextStyle } from 'react-native';

import { colors } from './colors';

/**
 * The exact names exported by @expo-google-fonts. These strings must match the
 * keys passed to useFonts() in app/_layout.tsx or text will silently fall back
 * to the system font.
 */
export const fontFamily = {
  /** Jost Light — the TRUSTEES wordmark */
  wordmark: 'Jost_300Light',
  /** Jost Regular — the tagline under the wordmark */
  tagline: 'Jost_400Regular',
  /** Manrope ExtraBold — headings */
  heading: 'Manrope_800ExtraBold',
  /** Manrope Regular — body copy */
  body: 'Manrope_400Regular',
  /** Manrope SemiBold — button labels */
  button: 'Manrope_600SemiBold',
} as const;

/** e.g. 'Jost_300Light' | 'Manrope_400Regular' … */
export type FontFamilyValue = (typeof fontFamily)[keyof typeof fontFamily];

/**
 * Headings use a "tight" line height: multiply the font size by this.
 * CLAUDE.md says tight but not by how much — 1.1 is the value chosen here.
 */
export const LINE_HEIGHT_TIGHT = 1.1;

/** Comfortable line height multiplier for body copy. */
export const LINE_HEIGHT_BODY = 1.5;

export const typography = {
  /**
   * TRUSTEES wordmark. The 32px size is a default chosen here — CLAUDE.md
   * specifies only the family, casing and letter spacing.
   */
  wordmark: {
    fontFamily: fontFamily.wordmark,
    fontSize: 32,
    textTransform: 'uppercase',
    letterSpacing: 8,
    color: colors.ink,
  },
  /** The small uppercase line under the wordmark. */
  tagline: {
    fontFamily: fontFamily.tagline,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: colors.textMuted,
  },
  /** Section and screen headings. Pair with heading(size) to get the line height. */
  heading: {
    fontFamily: fontFamily.heading,
    color: colors.ink,
  },
  /** Default body copy. */
  body: {
    fontFamily: fontFamily.body,
    color: colors.textMuted,
  },
  /** Button labels. */
  button: {
    fontFamily: fontFamily.button,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
} satisfies Record<string, TextStyle>;

/** e.g. 'wordmark' | 'tagline' | 'heading' | 'body' | 'button' */
export type TypographyName = keyof typeof typography;

/** A heading at a given size, with the tight line height already worked out. */
export const heading = (fontSize: number): TextStyle => ({
  ...typography.heading,
  fontSize,
  lineHeight: Math.round(fontSize * LINE_HEIGHT_TIGHT),
});

/** Body copy at a given size, with a comfortable line height already worked out. */
export const body = (fontSize: number): TextStyle => ({
  ...typography.body,
  fontSize,
  lineHeight: Math.round(fontSize * LINE_HEIGHT_BODY),
});
