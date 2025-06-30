import React, {createContext, useState, useEffect, useContext} from 'react';
import {useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from '../services/i18next';
import {darkColors, lightColors} from '../utils/colors';

// Create context
export const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({children}) => {
  // Get system theme
  const systemTheme = useColorScheme();

  // State for theme and language
  const [theme, setTheme] = useState('system'); // 'system', 'light', or 'dark'
  const [language, setLanguage] = useState('en');

  // Determine the actual theme based on system or user preference
  const actualTheme = theme === 'system' ? systemTheme : theme;

  // Get colors based on the actual theme
  const colors = actualTheme === 'dark' ? darkColors : lightColors;

  // Load saved theme and language preferences
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        const savedLanguage = await AsyncStorage.getItem('language');

        if (savedTheme) setTheme(savedTheme);
        if (savedLanguage) {
          setLanguage(savedLanguage);
          i18next.changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Failed to load preferences:', error);
      }
    };

    loadPreferences();
  }, []);

  // Save theme preference when it changes
  const toggleTheme = async newTheme => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  // Save language preference when it changes
  const changeLanguage = async newLanguage => {
    try {
      await AsyncStorage.setItem('language', newLanguage);
      i18next.changeLanguage(newLanguage);
      setLanguage(newLanguage);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        actualTheme,
        colors,
        language,
        toggleTheme,
        changeLanguage,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
