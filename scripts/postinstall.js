#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📱 @mobigaurav/react-native-app-shortcuts: Post-install setup');

// Check React Native version
try {
  const packageJsonPath = path.join(process.cwd(), '../../package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const rnVersion = packageJson.dependencies?.['react-native'] || packageJson.devDependencies?.['react-native'];
    
    if (rnVersion) {
      console.log(`✅ React Native version detected: ${rnVersion}`);
      
      // Check if version is compatible
      const versionNumber = rnVersion.replace(/[^0-9.]/g, '');
      const majorVersion = parseInt(versionNumber.split('.')[0]);
      const minorVersion = parseInt(versionNumber.split('.')[1]);
      
      if (majorVersion === 0 && minorVersion < 60) {
        console.log('⚠️  Warning: This library requires React Native 0.60+');
        console.log('   Please upgrade your React Native version or use manual linking');
      } else {
        console.log('✅ React Native version is compatible');
      }
    }
  }
} catch (error) {
  console.log('ℹ️  Could not detect React Native version');
}

console.log('');
console.log('📚 Next steps:');
console.log('   1. For iOS: Add shortcut handling to AppDelegate.m');
console.log('   2. For Android: Add shortcut handling to MainActivity.java');
console.log('   3. Check the README for detailed setup instructions');
console.log('');
console.log('🎉 Installation complete! Happy coding!');
console.log('');
console.log('💝 If this library helps you, consider buying me a coffee:');
console.log('   https://www.buymeacoffee.com/mobigaurav');
console.log('');