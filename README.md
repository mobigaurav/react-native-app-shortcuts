# react-native-app-shortcuts

[![npm version](https://badge.fury.io/js/react-native-app-shortcuts.svg)](https://badge.fury.io/js/react-native-app-shortcuts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg)](https://github.com/yourusername/react-native-app-shortcuts)

A comprehensive React Native library for implementing native app shortcuts on both iOS and Android platforms.

## ☕ Support This Project

If this library helps you build amazing apps, consider buying me a coffee!

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support%20my%20work-FFDD00?style=flat&labelColor=101010&logo=buy-me-a-coffee&logoColor=FFDD00)](https://www.buymeacoffee.com/mobigaurav)

## ✨ Features

- 🎯 **iOS 3D Touch / Force Touch shortcuts** - Native iOS app shortcuts
- 🤖 **Android App Shortcuts (API 25+)** - Modern Android shortcuts
- 🔄 **Dynamic shortcuts** - Update shortcuts at runtime
- 🎨 **Custom icons support** - SF Symbols (iOS) & Drawable resources (Android)
- 🔗 **Deep linking integration** - Navigate directly to specific screens
- 📱 **Cross-platform** - Single API for both platforms
- 🔧 **TypeScript support** - Full type definitions included
- ⚡ **Production ready** - Battle-tested in enterprise applications

## 📦 Installation

```bash
npm install react-native-app-shortcuts
# or
yarn add react-native-app-shortcuts
```

> **Note**: This library requires React Native 0.60+ and uses auto-linking.

### 🍎 iOS Setup

1. **Add to Podfile** (if using manual linking):
```ruby
pod 'RNAppShortcuts', :path => '../node_modules/react-native-app-shortcuts'
```

2. **Update AppDelegate.m**:
```objc
#import <RNAppShortcuts/RNAppShortcuts.h>

- (void)application:(UIApplication *)application performActionForShortcutItem:(UIApplicationShortcutItem *)shortcutItem completionHandler:(void (^)(BOOL))completionHandler {
    [RNAppShortcuts handleShortcutItem:shortcutItem];
    completionHandler(YES);
}
```

3. **Run pod install**:
```bash
cd ios && pod install
```

### 🤖 Android Setup

1. **Add package to MainApplication.java** (if using manual linking):
```java
import com.appshortcuts.RNAppShortcutsPackage;

@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNAppShortcutsPackage() // Add this line
    );
}
```

2. **Handle shortcuts in MainActivity.java**:
```java
import com.appshortcuts.RNAppShortcutsModule;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    RNAppShortcutsModule.handleShortcut(getIntent());
}

@Override
protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    RNAppShortcutsModule.handleShortcut(intent);
}
```

## 💡 Advanced Usage

### Dynamic Shortcuts Based on User State

```javascript
// Update shortcuts based on user authentication
const updateShortcuts = (isLoggedIn, userDevices) => {
  const shortcuts = [];
  
  if (isLoggedIn) {
    shortcuts.push({
      id: 'profile',
      title: 'My Profile',
      icon: 'person.circle',
      data: { screen: 'Profile' }
    });
    
    // Add device-specific shortcuts
    userDevices.slice(0, 2).forEach(device => {
      shortcuts.push({
        id: `device_${device.id}`,
        title: device.name,
        subtitle: `Control ${device.type}`,
        icon: 'gear',
        data: { screen: 'DeviceControl', deviceId: device.id }
      });
    });
  } else {
    shortcuts.push({
      id: 'login',
      title: 'Sign In',
      icon: 'person.badge.key',
      data: { screen: 'Login' }
    });
  }
  
  AppShortcuts.setShortcuts(shortcuts);
};
```

### Error Handling

```javascript
try {
  await AppShortcuts.setShortcuts(shortcuts);
  console.log('Shortcuts updated successfully');
} catch (error) {
  console.error('Failed to update shortcuts:', error);
}
```

## 🚀 Quick Start

```javascript
import AppShortcuts from 'react-native-app-shortcuts';

// 1. Set up shortcuts
AppShortcuts.setShortcuts([
  {
    id: 'compose',
    title: 'Compose Message',
    subtitle: 'Start a new conversation',
    icon: 'plus.message', // iOS: SF Symbol, Android: drawable
    data: { screen: 'Compose', action: 'new' }
  },
  {
    id: 'search',
    title: 'Search',
    subtitle: 'Find messages and contacts',
    icon: 'magnifyingglass',
    data: { screen: 'Search' }
  }
]);

// 2. Listen for shortcut activation
AppShortcuts.onShortcutPressed((shortcut) => {
  console.log('Shortcut activated:', shortcut);
  
  // Navigate based on shortcut data
  switch (shortcut.data.screen) {
    case 'Compose':
      navigation.navigate('ComposeScreen');
      break;
    case 'Search':
      navigation.navigate('SearchScreen');
      break;
  }
});

// 3. Handle app launch via shortcut
AppShortcuts.getInitialShortcut().then((shortcut) => {
  if (shortcut) {
    console.log('App launched via shortcut:', shortcut);
    // Handle initial navigation
    handleShortcutNavigation(shortcut);
  }
});
```

## 📚 API Reference

### Methods

| Method | Description | Returns |
|--------|-------------|----------|
| `setShortcuts(shortcuts)` | Set dynamic shortcuts for the app | `Promise<boolean>` |
| `clearShortcuts()` | Remove all dynamic shortcuts | `Promise<boolean>` |
| `onShortcutPressed(callback)` | Listen for shortcut press events | `EventSubscription` |
| `getInitialShortcut()` | Get shortcut that launched the app | `Promise<Shortcut \| null>` |
| `isSupported()` | Check if shortcuts are supported | `boolean` |

### Event Handling

```javascript
// Set up listener
const subscription = AppShortcuts.onShortcutPressed((shortcut) => {
  // Handle shortcut
});

// Clean up listener
subscription.remove();
```

## 🔧 TypeScript Support

```typescript
interface Shortcut {
  id: string;                    // Unique identifier
  title: string;                 // Display title
  subtitle?: string;             // Optional subtitle
  icon?: string;                 // Icon name/resource
  data?: { [key: string]: any }; // Custom data payload
}

interface EventSubscription {
  remove(): void;
}
```

## 📱 Platform Support

| Platform | Version | Features |
|----------|---------|----------|
| **iOS** | 9.0+ | 3D Touch, Force Touch, Long Press |
| **Android** | 7.1+ (API 25+) | App Shortcuts, Pinned Shortcuts |

### Icon Guidelines

- **iOS**: Use SF Symbol names (e.g., `plus.circle`, `gear`, `bell.fill`)
- **Android**: Use drawable resource names (e.g., `ic_add`, `ic_settings`)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🐛 **Report bugs** - Open an issue with details
2. 💡 **Suggest features** - Share your ideas
3. 🔧 **Submit PRs** - Fix bugs or add features
4. 📖 **Improve docs** - Help others understand

### Development Setup

```bash
git clone https://github.com/mobigaurav/react-native-app-shortcuts.git
cd react-native-app-shortcuts
npm install
```

## 📄 License

MIT © [Your Name](https://github.com/yourusername)

## 🙏 Acknowledgments

- Originally developed for enterprise use at Pentair
- Inspired by the React Native community's need for native shortcuts
- Thanks to all contributors and users!

## 📞 Support

- 📧 **Email**: mobigaurav@gmail.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/react-native-app-shortcuts/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/react-native-app-shortcuts/discussions)

---

**Made with ❤️ for the React Native community**

If this library saved you time, consider [buying me a coffee](https://www.buymeacoffee.com/mobigaurav) ☕