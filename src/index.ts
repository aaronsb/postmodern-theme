/**
 * Postmodern Theme
 *
 * A warm, HSL-based design system with dark/twilight/light modes,
 * ordered dithering patterns, and full color customization.
 *
 * Core entry point — framework-agnostic, no React dependency.
 * For React components, import from 'postmodern-theme/react'.
 */

// Types
export type {
  ModeConfig,
  SharedColorSettings,
  ModeLightnessSettings,
  ColorSettings,
  ColorHarmony,
  HSL,
  FontCategory,
  FontOption,
  FontSettings,
  BackgroundStyle,
  BackgroundStyleOption,
  ThemePreference,
  AppliedTheme,
} from './types';

// Harmony engine
export {
  modeConfigs,
  defaultSharedSettings,
  defaultLightnessSettings,
  defaultColorSettings,
  fontOptions,
  defaultFontSettings,
  backgroundStyleOptions,
  defaultBackgroundStyle,
  computeHarmony,
  applyHarmonyToCSS,
  getFontFamily,
  applyFontsToCSS,
  applyBackgroundStyle,
  hslToHex,
  setStoragePrefix,
  loadColorSettings,
  saveColorSettings,
  clearColorSettings,
  loadFontSettings,
  saveFontSettings,
  clearFontSettings,
  loadBackgroundStyle,
  saveBackgroundStyle,
  clearBackgroundStyle,
} from './harmony';
