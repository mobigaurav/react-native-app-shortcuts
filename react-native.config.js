module.exports = {
  dependency: {
    platforms: {
      android: {
        sourceDir: '../android/',
        packageImportPath: 'import com.appshortcuts.RNAppShortcutsPackage;',
      },
      ios: {
        podspecPath: '../RNAppShortcuts.podspec',
      },
    },
  },
};