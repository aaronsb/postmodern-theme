/**
 * Postmodern Theme — Color Harmony Engine
 *
 * Computes color harmony based on mode (dark/twilight/light) and user-selected
 * hue/saturation values. The mode provides soft guidance rather than hard rules:
 * - Mode sets lightness constraints and foreground lightness
 * - User controls hue and saturation independently for bg and fg
 * - Primary accent color remains fully user-controlled
 *
 * Framework-agnostic: works with any DOM environment.
 */

import type {
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
} from './types';

// ============================================
// MODE CONFIGURATIONS
// ============================================

export const modeConfigs: Record<string, ModeConfig> = {
  dark: {
    lightStops: [5, 8, 10, 12, 15, 18],
    defaultLight: 10,
    fgLightness: 85,
    surfaceStep: 3,
    borderStep: 12,
    surfaceSatMult: 1.0,
    contrastRatio: '~12:1',
  },
  twilight: {
    lightStops: [12, 16, 20, 25, 30, 35],
    defaultLight: 16,
    bgMinSat: 15,
    fgLightness: 96,
    surfaceStep: 5,
    borderStep: 15,
    surfaceSatMult: 1.2,
    contrastRatio: '~12:1',
  },
  light: {
    lightStops: [88, 90, 92, 94, 96, 98],
    defaultLight: 94,
    fgLightness: 15,
    surfaceStep: -3,
    borderStep: -15,
    surfaceSatMult: 0.8,
    contrastRatio: '~12:1',
  },
};

// ============================================
// DEFAULT SETTINGS
// ============================================

export const defaultSharedSettings: SharedColorSettings = {
  bgHue: 18,
  bgSat: 8,
  fgHue: 18,
  fgSat: 15,
  primaryHue: 18,
  primarySat: 100,
  primaryLight: 60,
};

export const defaultLightnessSettings: ModeLightnessSettings = {
  dark: 10,
  twilight: 16,
  light: 94,
};

export const defaultColorSettings: ColorSettings = {
  shared: { ...defaultSharedSettings },
  lightness: { ...defaultLightnessSettings },
};

// ============================================
// FONT OPTIONS
// ============================================

export const fontOptions: Record<FontCategory, FontOption[]> = {
  display: [
    { id: 'space-grotesk', label: 'Space Grotesk', family: '"Space Grotesk", sans-serif', category: 'display' },
    { id: 'inter', label: 'Inter', family: '"Inter", sans-serif', category: 'display' },
    { id: 'system', label: 'System UI', family: 'system-ui, sans-serif', category: 'display' },
  ],
  body: [
    { id: 'ibm-plex-condensed', label: 'IBM Plex Condensed', family: '"IBM Plex Sans Condensed", sans-serif', category: 'body', style: 'condensed' },
    { id: 'ibm-plex', label: 'IBM Plex Sans', family: '"IBM Plex Sans", sans-serif', category: 'body' },
    { id: 'inter', label: 'Inter', family: '"Inter", sans-serif', category: 'body' },
    { id: 'system', label: 'System UI', family: 'system-ui, sans-serif', category: 'body' },
  ],
  mono: [
    { id: 'jetbrains', label: 'JetBrains Mono', family: '"JetBrains Mono", monospace', category: 'mono' },
    { id: 'fira-code', label: 'Fira Code', family: '"Fira Code", monospace', category: 'mono' },
    { id: 'ibm-plex-mono', label: 'IBM Plex Mono', family: '"IBM Plex Mono", monospace', category: 'mono' },
    { id: 'system', label: 'System Mono', family: 'ui-monospace, monospace', category: 'mono' },
  ],
};

export const defaultFontSettings: FontSettings = {
  display: 'space-grotesk',
  body: 'ibm-plex-condensed',
  mono: 'jetbrains',
};

// ============================================
// BACKGROUND STYLE OPTIONS
// ============================================

export const backgroundStyleOptions: BackgroundStyleOption[] = [
  { id: 'solid', label: 'Solid', description: 'Clean, solid background' },
  { id: 'dither-25', label: '25% Dither', description: 'Sparse dot pattern' },
  { id: 'dither-50', label: '50% Dither', description: 'Classic checkerboard' },
  { id: 'dither-75', label: '75% Dither', description: 'Dense dot pattern' },
];

export const defaultBackgroundStyle: BackgroundStyle = 'solid';

// ============================================
// COLOR HARMONY COMPUTATION
// ============================================

/** Compute color harmony from mode and user settings */
export function computeHarmony(mode: string, settings: ColorSettings): ColorHarmony {
  const config = modeConfigs[mode] || modeConfigs.dark;
  const { shared, lightness } = settings;

  const bgLight = lightness[mode as keyof ModeLightnessSettings] ?? config.defaultLight;

  let effectiveBgSat = shared.bgSat;
  if (config.bgMinSat !== undefined) {
    effectiveBgSat = Math.max(effectiveBgSat, config.bgMinSat);
  }

  const surfaceSat = effectiveBgSat * config.surfaceSatMult;
  const borderL = bgLight + config.borderStep;

  return {
    bg: { h: shared.bgHue, s: effectiveBgSat, l: bgLight },
    fg: { h: shared.fgHue, s: shared.fgSat, l: config.fgLightness },
    border: {
      h: shared.bgHue,
      s: effectiveBgSat + 2,
      l: Math.max(5, Math.min(95, borderL)),
    },
    surface: { h: shared.bgHue, s: surfaceSat },
    surfaceStep: config.surfaceStep,
    contrastRatio: config.contrastRatio,
  };
}

// ============================================
// CSS APPLICATION
// ============================================

/** Apply computed harmony to CSS custom properties */
export function applyHarmonyToCSS(harmony: ColorHarmony, primary: HSL) {
  const root = document.documentElement;

  root.style.setProperty('--bg-h', String(harmony.bg.h));
  root.style.setProperty('--bg-s', `${harmony.bg.s}%`);
  root.style.setProperty('--bg-l', `${harmony.bg.l}%`);

  root.style.setProperty('--fg-h', String(harmony.fg.h));
  root.style.setProperty('--fg-s', `${harmony.fg.s}%`);
  root.style.setProperty('--fg-l', `${harmony.fg.l}%`);

  root.style.setProperty('--border-h', String(harmony.border.h));
  root.style.setProperty('--border-s', `${harmony.border.s}%`);
  root.style.setProperty('--border-l', `${harmony.border.l}%`);

  root.style.setProperty('--surface-s', `${harmony.surface.s}%`);
  root.style.setProperty('--surface-step', `${harmony.surfaceStep}%`);

  root.style.setProperty('--primary-h', String(primary.h));
  root.style.setProperty('--primary-s', `${primary.s}%`);
  root.style.setProperty('--primary-l', `${primary.l}%`);
}

/** Get font family string from font ID and category */
export function getFontFamily(category: FontCategory, fontId: string): string {
  const options = fontOptions[category];
  const font = options.find(f => f.id === fontId);
  return font?.family || options[0].family;
}

/** Apply font settings to CSS custom properties */
export function applyFontsToCSS(settings: FontSettings) {
  const root = document.documentElement;
  root.style.setProperty('--font-display', getFontFamily('display', settings.display));
  root.style.setProperty('--font-body', getFontFamily('body', settings.body));
  root.style.setProperty('--font-mono', getFontFamily('mono', settings.mono));
}

/** Apply background dither style to document body */
export function applyBackgroundStyle(style: BackgroundStyle) {
  const body = document.body;
  body.classList.remove('dither-25', 'dither-50', 'dither-75');
  if (style !== 'solid') {
    body.classList.add(style);
  }
}

// ============================================
// COLOR UTILITIES
// ============================================

/** Convert HSL values to hex color string */
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

// ============================================
// PERSISTENCE (configurable key prefix)
// ============================================

let storagePrefix = 'pm';

/** Set the localStorage key prefix (default: 'pm') */
export function setStoragePrefix(prefix: string) {
  storagePrefix = prefix;
}

function key(name: string): string {
  return `${storagePrefix}-${name}`;
}

export function loadColorSettings(): ColorSettings | null {
  try {
    const stored = localStorage.getItem(key('color-settings'));
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.shared && parsed?.lightness) return parsed;
    }
  } catch { /* ignore */ }
  return null;
}

export function saveColorSettings(settings: ColorSettings) {
  localStorage.setItem(key('color-settings'), JSON.stringify(settings));
}

export function clearColorSettings() {
  localStorage.removeItem(key('color-settings'));
}

export function loadFontSettings(): FontSettings | null {
  try {
    const stored = localStorage.getItem(key('font-settings'));
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.display && parsed?.body && parsed?.mono) return parsed;
    }
  } catch { /* ignore */ }
  return null;
}

export function saveFontSettings(settings: FontSettings) {
  localStorage.setItem(key('font-settings'), JSON.stringify(settings));
}

export function clearFontSettings() {
  localStorage.removeItem(key('font-settings'));
}

export function loadBackgroundStyle(): BackgroundStyle | null {
  try {
    const stored = localStorage.getItem(key('background-style'));
    if (stored && ['solid', 'dither-25', 'dither-50', 'dither-75'].includes(stored)) {
      return stored as BackgroundStyle;
    }
  } catch { /* ignore */ }
  return null;
}

export function saveBackgroundStyle(style: BackgroundStyle) {
  localStorage.setItem(key('background-style'), style);
}

export function clearBackgroundStyle() {
  localStorage.removeItem(key('background-style'));
}
