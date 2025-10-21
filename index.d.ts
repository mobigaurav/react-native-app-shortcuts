export interface Shortcut {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  data?: { [key: string]: any };
}

export interface EventSubscription {
  remove(): void;
}

declare class AppShortcuts {
  /**
   * Set dynamic shortcuts for the app
   */
  setShortcuts(shortcuts: Shortcut[]): Promise<boolean>;

  /**
   * Clear all dynamic shortcuts
   */
  clearShortcuts(): Promise<boolean>;

  /**
   * Get initial shortcut if app was launched via shortcut
   */
  getInitialShortcut(): Promise<Shortcut | null>;

  /**
   * Listen for shortcut press events
   */
  onShortcutPressed(callback: (shortcut: Shortcut) => void): EventSubscription;

  /**
   * Remove shortcut press listener
   */
  removeShortcutListener(): void;

  /**
   * Check if shortcuts are supported on current platform
   */
  isSupported(): boolean;
}

declare const appShortcuts: AppShortcuts;
export default appShortcuts;