# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

RexixHybrid is a React Native mobile application targeting both iOS and Android platforms. The app features a social review/rating platform with user authentication, product/brand reviews, messaging, and search functionality. The app supports dark/light themes and internationalization (i18n).

## Development Commands

### Setup
```bash
# Install dependencies
npm install

# Setup environment (Android SDK paths, etc.)
npm run setup

# iOS-specific: Install CocoaPods dependencies
cd ios && pod install && cd ..
```

### Running the Application
```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Code Quality
```bash
# Run linter
npm run lint

# Run tests
npm test
```

### Platform-Specific Development

#### Android
- Android project files are in `android/`
- Build configuration: `android/app/build.gradle`
- Main manifest: `android/app/src/main/AndroidManifest.xml`
- Debug keystore: `android/app/debug.keystore`

#### iOS
- iOS project files are in `ios/`
- Xcode project: `ios/RexixHybrid.xcodeproj/`
- Requires CocoaPods: run `pod install` after dependency changes
- Native configuration: `ios/RexixHybrid/Info.plist`

## Architecture

### Entry Point
- `index.js` - Registers the app with React Native
- `App.tsx` - Main app component with providers and navigation setup

### Navigation Structure
The app uses React Navigation with a hybrid stack/tab pattern:

1. **MainStackNavigator** (`src/navigation/main-stack-navigator.js`):
   - Initial route: Login screen
   - Contains auth screens (Login, Signup, OTP, etc.)
   - Contains main app entry point (Home screen with tabs)
   - Contains modal/detail screens (Product, Brand, Comments, etc.)

2. **BottomTabNavigator** (embedded in MainStackNavigator as "Home" screen):
   - HomeTab: Feed/home content
   - ExploreTab: Search/discovery
   - AddPostTab: Create new review/post
   - NotificationsTab: User notifications
   - SettingsTab: App settings

### Key Architectural Patterns

#### Theme System
The app has a comprehensive theming system with dark/light mode support:

- **ThemeContext** (`src/contexts/ThemeContext.js`): Provides theme state and color palette
  - Supports 'system', 'light', or 'dark' modes
  - Persists theme preference to AsyncStorage
  - Exposes `useTheme()` hook for components
  
- **Color Definitions** (`src/utils/colors.js`):
  - `darkColors`: Color palette for dark mode
  - `lightColors`: Color palette for light mode
  - Includes semantic colors (brandAccentColor, primaryBG, primaryText, etc.)

- **Common Styles** (`src/common-styling/theme-styling.js`):
  - Provides `useCommonStyles()` hook for theme-aware styles
  - Contains pre-defined text styles (title, label, heading, etc.)
  - Includes common UI patterns (container, shadow, dropdown)

**Pattern**: Always use `useTheme()` hook to access colors and theme state. Avoid hardcoding colors.

#### Internationalization (i18n)
- Configuration: `src/services/i18next.js`
- Translation files: `src/locale/en.json`
- Managed through ThemeContext alongside theme preferences
- Use `i18next.t('key')` or `useTranslation()` hook for translated strings

#### Responsive Sizing
- `src/utils/environment.js` provides `hp()` function for height-proportional sizing
- Based on a reference height of 826px
- Use `hp(value)` for consistent sizing across devices

### Directory Structure

```
src/
├── assets/
│   ├── fonts/          # Roboto and Amiri font families
│   ├── icons/          # SVG icons with index.js for exports
│   └── svgs/           # Additional SVG graphics
├── common-styling/
│   └── theme-styling.js    # Reusable theme-aware styles
├── components/
│   ├── tabs/           # Tab components for Product, Reviews, Services
│   └── *.js            # Reusable UI components
├── contexts/
│   └── ThemeContext.js # Theme and language management
├── locale/
│   └── en.json         # English translations
├── navigation/
│   ├── main-stack-navigator.js          # Primary stack navigator
│   ├── bottom-tab-navigator.js          # Bottom tabs (alternate implementation)
│   └── authentication-stack-navigator.js # Auth flow navigator
├── screens/
│   ├── auth/           # Authentication screens
│   └── main/           # Main app screens
├── services/
│   └── i18next.js      # i18n configuration
└── utils/
    ├── colors.js       # Color palettes
    ├── environment.js  # Device dimensions and responsive helpers
    └── helper-functions.js
```

## Working with the Codebase

### Adding New Screens
1. Create screen component in `src/screens/main/` or `src/screens/auth/`
2. Export from corresponding `index.js` 
3. Add to `MainStackNavigator` in `src/navigation/main-stack-navigator.js`
4. Use `useTheme()` hook for theme-aware styling

### Adding New Components
1. Create component in `src/components/`
2. Use `useTheme()` for colors and `hp()` for sizing
3. Export from `src/components/index.js`
4. Consider using `useCommonStyles()` for consistent styling

### SVG Assets
- SVGs are configured via `react-native-svg-transformer` in `metro.config.js`
- Import directly as components: `import Icon from './assets/icons/icon.svg'`
- All icons exported through `src/assets/icons/index.js`

### Native Dependencies
- After installing a dependency with native code, run:
  ```bash
  cd ios && pod install && cd ..
  ```
- May need to rebuild the app: `npm run ios` or `npm run android`

### Key Dependencies
- **Navigation**: `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`
- **UI Libraries**: `react-native-paper`, `lucide-react-native` (icons)
- **Image Handling**: `react-native-image-picker`, `react-native-reanimated-carousel`
- **Theming**: Custom implementation via Context API
- **Storage**: `@react-native-async-storage/async-storage`

## Important Configuration Files

- `metro.config.js`: Metro bundler config with SVG transformer support
- `babel.config.js`: Babel config with react-native-reanimated plugin (must be last)
- `.eslintrc.js`: ESLint configuration
- `jest.config.js`: Jest testing configuration
- `app.json`: App name and display name

## Platform Requirements

- Node.js >= 18
- For iOS: Xcode, CocoaPods
- For Android: Android SDK (configured in `setup-env.sh`)
- React Native 0.74.1

## Testing

- Test framework: Jest (configured with 'react-native' preset)
- No test files currently exist in the codebase
- Run tests with: `npm test`

## Environment Setup

The `setup-env.sh` script configures:
- `ANDROID_HOME` environment variable
- Android SDK tool paths
- React Native packager hostname

Run with: `npm run setup` or `./setup-env.sh`
