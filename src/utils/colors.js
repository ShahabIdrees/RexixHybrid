import React from 'react';
import {useColorScheme} from 'react-native';

// Define your color schemes
export const darkColors = {
  primaryBG: '#121212',
  secondaryBG: '#1E1E1E',
  tertiaryBG: '#2A2A2A',
  cardBG: '#252525',
  primaryText: '#FFFFFF',
  secondaryText: '#B3B3B3',
  borderColor: '#333333',
  secondary: '#1A1A1A',
  brandAccentColor: '#FF4757', // Vibrant red for dark mode
  brandSecondaryColor: '#5352ED', // Vibrant purple/blue
  inputBackground: '#2C2C2C',
  inputTextColor: '#FFFFFF',
  placeholderColor: '#8A8A8A',
  linkColor: '#4A90E2',
  shadowColor: '#000000',
  success: '#2ED573',
  warning: '#FFA502',
  error: '#FF4757',
  info: '#70A1FF',
  divider: '#383838',
  inactive: '#6F6F6F',
  buttonDisabled: '#4A4A4A',
  textDisabled: '#6F6F6F',
  overlay: 'rgba(0, 0, 0, 0.7)',
  notification: '#FF4757',
  likeColor: '#FF4757',
  dislikeColor: '#5352ED',
  starColor: '#FFC312',
};

export const lightColors = {
  primaryBG: '#FFFFFF',
  secondaryBG: '#F8F8F8',
  tertiaryBG: '#F0F0F0',
  cardBG: '#FFFFFF',
  primaryText: '#121212',
  secondaryText: '#757575',
  borderColor: '#E0E0E0',
  secondary: '#F5F5F5',
  brandAccentColor: '#3A0050', // Deep purple for light mode
  brandSecondaryColor: '#6200EE', // Secondary purple
  inputBackground: '#F5F5F5',
  inputTextColor: '#121212',
  placeholderColor: '#9E9E9E',
  linkColor: '#2196F3',
  shadowColor: '#000000',
  success: '#2ED573',
  warning: '#FFA502',
  error: '#FF4757',
  info: '#70A1FF',
  divider: '#E0E0E0',
  inactive: '#BDBDBD',
  buttonDisabled: '#E0E0E0',
  textDisabled: '#9E9E9E',
  overlay: 'rgba(0, 0, 0, 0.5)',
  notification: '#FF4757',
  likeColor: '#FF4757',
  dislikeColor: '#5352ED',
  starColor: '#FFC312',
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
