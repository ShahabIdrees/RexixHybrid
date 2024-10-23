// themeStyles.js
import {StyleSheet, useColorScheme} from 'react-native';
import {darkColors, lightColors} from '../utils/colors';
import {hp} from '../utils/environment';
import {shadow} from 'react-native-paper';

const commonStyles = {
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  title: {
    fontSize: hp(16),
    fontFamily: 'Roboto-Bold',
  },
  largeTitle: {
    fontSize: hp(20),
    fontFamily: 'Roboto-Bold',
  },
  label: {
    fontSize: hp(14),
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
  },
  boldLabel: {
    fontSize: hp(14),
    fontFamily: 'Roboto-Bold',
  },
  largeLabel: {
    fontSize: hp(16),
    fontFamily: 'Roboto-Medium',
  },
  smallLabel: {
    fontSize: hp(12),
    fontFamily: 'Roboto-Regular',
  },
  heading: {
    fontSize: hp(24),
    fontFamily: 'Roboto-Bold',
  },
  subHeading: {
    fontSize: hp(20),
    fontFamily: 'Roboto-Medium',
  },
  text: {
    fontSize: hp(14),
    fontFamily: 'Roboto-Regular',
  },
  boldText: {
    fontSize: hp(14),
    fontFamily: 'Roboto-Bold',
  },
  prompt: {
    fontSize: hp(16),
    fontFamily: 'Roboto-Regular',
    marginVertical: 10,
  },
  shadow: {
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdown: {
    padding: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  dropdownPlaceholderStyle: {},
  dropdownSelectedTextStyle: {},
  dropdownInputSearchStyle: {},
};

const darkThemeStyles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    backgroundColor: darkColors.background,
    borderColor: darkColors.borderColor,
  },
  title: {
    ...commonStyles.title,
    color: darkColors.primaryText,
  },
  largeTitle: {
    ...commonStyles.largeTitle,
    color: darkColors.primaryText,
  },
  label: {
    ...commonStyles.label,

    color: darkColors.primaryText,
  },
  boldLabel: {
    ...commonStyles.boldLabel,
    color: darkColors.primaryText,
  },
  smallLabel: {
    ...commonStyles.smallLabel,
    color: darkColors.primaryText,
  },
  largeLabel: {
    ...commonStyles.largeLabel,
    color: darkColors.primaryText,
  },
  heading: {
    ...commonStyles.heading,
    color: darkColors.primaryText,
  },
  subHeading: {
    ...commonStyles.subHeading,
    color: darkColors.primaryText,
  },
  text: {
    ...commonStyles.text,
    color: darkColors.primaryText,
  },
  boldText: {
    ...commonStyles.boldText,
    color: darkColors.primaryText,
  },
  prompt: {
    ...commonStyles.prompt,
    color: darkColors.primaryText,
  },
  shadow: {
    ...commonStyles.shadow,
    shadowColor: darkColors.shadowColor,
  },
  dropdown: {
    ...commonStyles.dropdown,
    backgroundColor: darkColors.secondary,
  },
  dropdownPlaceholderStyle: {
    ...commonStyles.dropdownPlaceholderStyle,
  },
  dropdownSelectedTextStyle: {
    ...commonStyles.dropdownSelectedTextStyle,
  },
  dropdownInputSearchStyle: {
    ...commonStyles.dropdownInputSearchStyle,
  },
});

const lightThemeStyles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    backgroundColor: lightColors.background,
    borderColor: lightColors.borderColor,
  },
  title: {
    ...commonStyles.title,
    color: lightColors.primaryText,
  },
  largeTitle: {
    ...commonStyles.largeTitle,
    color: lightColors.primaryText,
  },
  label: {
    ...commonStyles.label,
    color: lightColors.primaryText,
  },
  boldLabel: {
    ...commonStyles.boldLabel,
    color: lightColors.primaryText,
  },
  smallLabel: {
    ...commonStyles.smallLabel,
    color: lightColors.primaryText,
  },
  largeLabel: {
    ...commonStyles.largeLabel,
    color: lightColors.primaryText,
  },
  heading: {
    ...commonStyles.heading,
    color: lightColors.primaryText,
  },
  subHeading: {
    ...commonStyles.subHeading,
    color: lightColors.primaryText,
  },
  text: {
    ...commonStyles.text,
    color: lightColors.primaryText,
  },
  boldText: {
    ...commonStyles.boldText,
    color: lightColors.primaryText,
  },
  prompt: {
    ...commonStyles.prompt,
    color: lightColors.primaryText,
  },
  shadow: {
    ...commonStyles.shadow,
    shadowColor: lightColors.shadowColor,
  },
  dropdown: {
    ...commonStyles.dropdown,
    backgroundColor: lightColors.secondary,
  },
  dropdownPlaceholderStyle: {
    ...commonStyles.dropdownPlaceholderStyle,
  },
  dropdownSelectedTextStyle: {
    ...commonStyles.dropdownSelectedTextStyle,
  },
  dropdownInputSearchStyle: {
    ...commonStyles.dropdownInputSearchStyle,
  },
});

const useCommonStyles = () => {
  const colorScheme = useColorScheme(); // 'dark' or 'light'
  // Return the respective color set based on the color scheme
  return colorScheme === 'dark' ? darkThemeStyles : lightThemeStyles;
};
export {useCommonStyles};

export {darkThemeStyles, lightThemeStyles};
