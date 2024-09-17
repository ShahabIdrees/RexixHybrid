/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { AuthenticationStackNavigator } from './src/navigation';
import {Login}  from './src/screens/auth';
import MainStackNavigator from './src/navigation/main-stack-navigator';
import { I18nextProvider } from 'react-i18next';
import i18next from './src/services/i18next';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): React.JSX.Element {

  return (
    <I18nextProvider i18n={i18next}>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          {/* <AuthenticationStackNavigator /> */}
          {/* <Login /> */}
          {/* <Login/> */}
          <MainStackNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </I18nextProvider>
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
