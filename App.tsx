/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';
import MainStackNavigator from './src/navigation/main-stack-navigator';
import { I18nextProvider } from 'react-i18next';
import i18next from './src/services/i18next';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
// Main app content with access to theme context
const AppContent = () => {
  const { actualTheme, colors } = useTheme();
  
  return (
    <>
      <StatusBar
        barStyle={actualTheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.primaryBG}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryBG }}>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

function App(): React.JSX.Element {
  // Hide splash screen after app is ready
  useEffect(() => {
    try {
      SplashScreen.hide();
    } catch (error) {
      console.log('SplashScreen not available');
    }
  }, []);

  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18next}>
        <AppContent />
      </I18nextProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
