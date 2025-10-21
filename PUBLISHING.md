# Publishing Guide

## Pre-Publication Checklist

### 1. Update Personal Information
Replace these placeholders:
- `yourusername` → Your GitHub username
- `your.email@example.com` → Your email
- `[Your Name]` → Your actual name
- Buy Me a Coffee URLs → Your profile

### 2. Test Package Locally
```bash
# Test package creation
npm pack

# Install locally in test project
npm install /path/to/react-native-app-shortcuts-1.0.0.tgz
```

### 3. Version Management
```bash
# Update version
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0
```

## Publishing Steps

### 1. NPM Account Setup
```bash
# Create NPM account at npmjs.com
# Login to NPM
npm login
```

### 2. Publish to NPM
```bash
# Dry run (check what will be published)
npm publish --dry-run

# Publish to NPM
npm publish
```

### 3. GitHub Release
```bash
# Push to GitHub
git add .
git commit -m "Release v1.0.0"
git tag v1.0.0
git push origin main --tags

# Create GitHub release
# Go to GitHub → Releases → Create new release
```

## Post-Publication

### 1. Verify Publication
- Check package on npmjs.com
- Test installation: `npm install react-native-app-shortcuts`
- Verify GitHub release

### 2. Promote Package
- Share on Twitter/LinkedIn
- Post in React Native communities
- Submit to awesome-react-native lists

### 3. Monitor
- Watch for issues/PRs
- Monitor download stats
- Respond to community feedback

## Maintenance

### Regular Updates
- Fix bugs promptly
- Update dependencies
- Improve documentation
- Add new features based on feedback

### Version Strategy
- **Patch** (1.0.x): Bug fixes
- **Minor** (1.x.0): New features, backward compatible
- **Major** (x.0.0): Breaking changes

## Files Included in NPM Package
- `index.js` - Main entry point
- `index.d.ts` - TypeScript definitions
- `ios/` - iOS native code
- `android/` - Android native code
- `RNAppShortcuts.podspec` - CocoaPods spec
- `README.md` - Documentation
- `LICENSE` - MIT license
- `CHANGELOG.md` - Version history