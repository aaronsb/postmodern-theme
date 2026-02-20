/**
 * Theme Harmony Hook
 *
 * Initializes and applies color harmony, fonts, and background settings on
 * app startup. Call once at the app root level.
 */

import { useEffect } from 'react';
import { useThemeStore } from './theme-store';
import {
  loadColorSettings,
  defaultColorSettings,
  computeHarmony,
  applyHarmonyToCSS,
  loadFontSettings,
  defaultFontSettings,
  applyFontsToCSS,
  loadBackgroundStyle,
  defaultBackgroundStyle,
  applyBackgroundStyle,
} from '../harmony';

export function useThemeHarmony() {
  const { appliedTheme } = useThemeStore();

  useEffect(() => {
    const colorSettings = loadColorSettings() || defaultColorSettings;

    const harmony = computeHarmony(appliedTheme, colorSettings);
    applyHarmonyToCSS(harmony, {
      h: colorSettings.shared.primaryHue,
      s: colorSettings.shared.primarySat,
      l: colorSettings.shared.primaryLight,
    });

    const fontSettings = loadFontSettings() || defaultFontSettings;
    applyFontsToCSS(fontSettings);

    const bgStyle = loadBackgroundStyle() || defaultBackgroundStyle;
    applyBackgroundStyle(bgStyle);
  }, [appliedTheme]);
}
