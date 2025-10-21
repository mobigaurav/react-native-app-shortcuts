import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

const { RNAppShortcuts } = NativeModules;

class AppShortcuts {
  constructor() {
    this.eventEmitter = RNAppShortcuts ? new NativeEventEmitter(RNAppShortcuts) : null;
    this.shortcutListener = null;
  }

  /**
   * Set dynamic shortcuts for the app
   * @param {Array} shortcuts - Array of shortcut objects
   */
  setShortcuts(shortcuts) {
    if (!RNAppShortcuts) {
      console.warn('RNAppShortcuts native module not found');
      return Promise.resolve();
    }
    return RNAppShortcuts.setShortcuts(shortcuts);
  }

  /**
   * Clear all dynamic shortcuts
   */
  clearShortcuts() {
    if (!RNAppShortcuts) {
      console.warn('RNAppShortcuts native module not found');
      return Promise.resolve();
    }
    return RNAppShortcuts.clearShortcuts();
  }

  /**
   * Get initial shortcut if app was launched via shortcut
   */
  getInitialShortcut() {
    if (!RNAppShortcuts) {
      console.warn('RNAppShortcuts native module not found');
      return Promise.resolve(null);
    }
    return RNAppShortcuts.getInitialShortcut();
  }

  /**
   * Listen for shortcut press events
   * @param {Function} callback - Callback function to handle shortcut press
   */
  onShortcutPressed(callback) {
    if (!this.eventEmitter) {
      console.warn('RNAppShortcuts event emitter not available');
      return;
    }

    this.shortcutListener = this.eventEmitter.addListener('onShortcutPressed', callback);
    return this.shortcutListener;
  }

  /**
   * Remove shortcut press listener
   */
  removeShortcutListener() {
    if (this.shortcutListener) {
      this.shortcutListener.remove();
      this.shortcutListener = null;
    }
  }

  /**
   * Check if shortcuts are supported on current platform
   */
  isSupported() {
    return !!RNAppShortcuts && (Platform.OS === 'ios' || Platform.OS === 'android');
  }
}

export default new AppShortcuts();