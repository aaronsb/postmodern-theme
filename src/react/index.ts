/**
 * Postmodern Theme — React Integration
 *
 * Theme store, initialization hook, and UI components.
 * Requires react and zustand as peer dependencies.
 *
 * Usage:
 *   import { useThemeHarmony, AppearancePanel } from 'postmodern-theme/react'
 */

// Store
export { useThemeStore, setThemeStorageKey } from './theme-store';

// Hook
export { useThemeHarmony } from './use-theme-harmony';

// Components
export {
  HueGrid,
  SaturationGrid,
  LightnessGrid,
  SVGrid,
  ColorPreview,
  Section,
  Subsection,
  Toggle,
  AppearancePanel,
} from './components';

export type { AppearancePanelProps } from './components';
