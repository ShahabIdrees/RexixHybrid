import React from 'react';
import {StyleSheet, TextInput, View, useColorScheme} from 'react-native';
import {darkColors, lightColors} from '../utils/colors';
import {
  darkThemeStyles,
  lightThemeStyles,
} from '../common-styling/theme-styling';

const AuthInput = ({placeholder = 'Enter'}) => {
  const theme = useColorScheme();
  const colors = theme === 'dark' ? darkColors : lightColors;
  const commonStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;

  return (
    <TextInput
      style={[
        styles.container,
        {
          backgroundColor: colors.inputBackground,
          color: colors.inputTextColor,
          // borderColor: colors.borderColor,
        },
      ]}
      placeholder={placeholder}
      placeholderTextColor={colors.placeholderColor}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    marginTop: 8,
    elevation: 2,
    paddingHorizontal: 10,
    borderRadius: 8,
    // paddingVertical: 8,
    fontSize: 16,
    fontFamily: 'Inter',
    // borderWidth: 0.1,
  },
});

export default AuthInput;
