/**
 * Theme Store
 *
 * Zustand store managing theme mode (light/dark/twilight/system) with
 * localStorage persistence. Listens for system preference changes.
 */

import { create } from 'zustand';
import type { ThemePreference, AppliedTheme } from '../types';

interface ThemeStore {
  theme: ThemePreference;
  appliedTheme: AppliedTheme;
  setTheme: (theme: ThemePreference) => void;
  cycleTheme: () => void;
}

const THEME_CLASSES = ['dark', 'twilight'] as const;
const THEME_CYCLE: AppliedTheme[] = ['light', 'twilight', 'dark'];

let storageKey = 'pm-theme';

/** Set the localStorage key for theme preference */
export function setThemeStorageKey(key: string) {
  storageKey = key;
}

const applyTheme = (theme: AppliedTheme) => {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.remove(...THEME_CLASSES);
  if (theme === 'dark') document.documentElement.classList.add('dark');
  else if (theme === 'twilight') document.documentElement.classList.add('twilight');
};

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const resolveTheme = (preference: ThemePreference): AppliedTheme => {
  return preference === 'system' ? getSystemTheme() : preference;
};

const getInitialTheme = (): ThemePreference => {
  if (typeof window === 'undefined') return 'system';
  const stored = localStorage.getItem(storageKey);
  if (stored === 'dark' || stored === 'light' || stored === 'twilight' || stored === 'system') {
    return stored;
  }
  return 'system';
};

export const useThemeStore = create<ThemeStore>((set, get) => {
  const initialPreference = getInitialTheme();
  const initialApplied = resolveTheme(initialPreference);
  applyTheme(initialApplied);

  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (get().theme === 'system') {
        const newApplied = getSystemTheme();
        applyTheme(newApplied);
        set({ appliedTheme: newApplied });
      }
    });
  }

  return {
    theme: initialPreference,
    appliedTheme: initialApplied,

    setTheme: (theme: ThemePreference) => {
      localStorage.setItem(storageKey, theme);
      const applied = resolveTheme(theme);
      applyTheme(applied);
      set({ theme, appliedTheme: applied });
    },

    cycleTheme: () => {
      const current = get().appliedTheme;
      const currentIndex = THEME_CYCLE.indexOf(current);
      const nextIndex = (currentIndex + 1) % THEME_CYCLE.length;
      get().setTheme(THEME_CYCLE[nextIndex]);
    },
  };
});
