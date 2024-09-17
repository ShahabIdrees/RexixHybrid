import React from 'react';
import {useColorScheme} from 'react-native';

// Define your color schemes
export const darkColors = {
  primaryBG: '#000000',
  primaryText: '#DEDDDE',
  borderColor: '#DEDDDE',
  secondary: '#1A1A1A',
  brandAccentColor: '#B00814',
  inputBackground: '#303134',
  inputTextColor: '#E3E3E3',
  placeholderColor: '#E3E3E3',
  linkColor: '#4A90E2',
};

export const lightColors = {
  primaryBG: '#F2F2F2',
  primaryText: '#000000',
  borderColor: 'rgba(0,0,0,0.5)',
  secondary: '#E4E6EB',
  brandAccentColor: '#3A0050',
  inputBackground: '#ECEFF7',
  inputTextColor: '#000000',
  placeholderColor: '#5F6368',
  linkColor: '#1E90FF',
};

// Create a custom hook to get the current color scheme
const useAppColors = () => {
  const colorScheme = useColorScheme(); // 'dark' or 'light'

  // Return the respective color set based on the color scheme
  return colorScheme === 'dark' ? darkColors : lightColors;
};

// Component that uses the color scheme
const ColorSchemeProvider = () => {
  const colors = useAppColors();

  // You can use colors in your component
  // Since no UI is required, we return null
  return null;
};

export default ColorSchemeProvider;
export {useAppColors}; // Exporting the custom hook for reuse in other components
