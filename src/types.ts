/**
 * Postmodern Theme — Type Definitions
 *
 * All TypeScript interfaces for the theme harmony system.
 */

/** Configuration for a single theme mode (dark/twilight/light) */
export interface ModeConfig {
  /** Available lightness stops for the background picker */
  lightStops: number[];
  /** Default lightness for this mode */
  defaultLight: number;
  /** Minimum background saturation (twilight needs visible color) */
  bgMinSat?: number;
  /** Foreground lightness (mode-controlled for guaranteed contrast) */
  fgLightness: number;
  /** Surface stepping: how much lighter/darker each elevation level */
  surfaceStep: number;
  /** Border contrast relative to background lightness */
  borderStep: number;
  /** Saturation multiplier for elevated surfaces */
  surfaceSatMult: number;
  /** Approximate contrast ratio (for display) */
  contrastRatio: string;
}

/** User-controlled color settings shared across all modes */
export interface SharedColorSettings {
  bgHue: number;
  bgSat: number;
  fgHue: number;
  fgSat: number;
  primaryHue: number;
  primarySat: number;
  primaryLight: number;
}

/** Per-mode background lightness settings */
export interface ModeLightnessSettings {
  dark: number;
  twilight: number;
  light: number;
}

/** Combined color settings for storage and use */
export interface ColorSettings {
  shared: SharedColorSettings;
  lightness: ModeLightnessSettings;
}

/** Computed color harmony result */
export interface ColorHarmony {
  bg: { h: number; s: number; l: number };
  fg: { h: number; s: number; l: number };
  border: { h: number; s: number; l: number };
  surface: { h: number; s: number };
  surfaceStep: number;
  contrastRatio: string;
}

/** HSL color triplet */
export interface HSL {
  h: number;
  s: number;
  l: number;
}

/** Font category for the typography system */
export type FontCategory = 'display' | 'body' | 'mono';

/** A font option within a category */
export interface FontOption {
  id: string;
  label: string;
  family: string;
  category: FontCategory;
  style?: string;
}

/** User-selected font settings */
export interface FontSettings {
  display: string;
  body: string;
  mono: string;
}

/** Background texture style */
export type BackgroundStyle = 'solid' | 'dither-25' | 'dither-50' | 'dither-75';

/** A background style option for the picker */
export interface BackgroundStyleOption {
  id: BackgroundStyle;
  label: string;
  description: string;
}

/** Theme mode preference */
export type ThemePreference = 'light' | 'dark' | 'twilight' | 'system';

/** Resolved (applied) theme mode */
export type AppliedTheme = 'light' | 'dark' | 'twilight';
