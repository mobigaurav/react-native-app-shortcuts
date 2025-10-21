# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added
- Initial release of react-native-app-shortcuts
- iOS 3D Touch / Force Touch shortcuts support
- Android App Shortcuts (API 25+) support
- Dynamic shortcuts that can be updated at runtime
- Custom icons support (SF Symbols for iOS, drawable resources for Android)
- Deep linking integration
- TypeScript support with full type definitions
- Comprehensive error handling and edge case management
- Cross-platform API with single interface
- Event subscription system for shortcut activation
- Initial shortcut detection for app launch scenarios

### Features
- `setShortcuts()` - Set dynamic shortcuts
- `clearShortcuts()` - Remove all shortcuts
- `onShortcutPressed()` - Listen for shortcut events
- `getInitialShortcut()` - Handle app launch via shortcuts
- `isSupported()` - Platform support detection

### Platform Support
- iOS 9.0+ with 3D Touch, Force Touch, and Long Press
- Android 7.1+ (API 25+) with App Shortcuts and Pinned Shortcuts

### Documentation
- Comprehensive README with examples
- TypeScript definitions
- Contributing guidelines
- MIT License

---

## Template for Future Releases

## [Unreleased]

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security