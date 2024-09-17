import React from 'react';
import {StyleSheet, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {darkColors, lightColors} from '../utils/colors';

const CustomButton = ({
  text = 'Button',
  color,
  marginTop = 12,
  pressHandler = () => {},
}) => {
  const theme = useColorScheme();
  const defaultColor =
    theme === 'dark'
      ? darkColors.brandAccentColor
      : lightColors.brandAccentColor;

  return (
    <TouchableOpacity
      onPress={pressHandler}
      style={[
        styles.container,
        {backgroundColor: color || defaultColor, marginTop: marginTop},
      ]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default CustomButton;
