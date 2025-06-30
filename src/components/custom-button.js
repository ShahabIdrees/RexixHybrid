import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import {useTheme} from '../contexts/ThemeContext';

const CustomButton = ({
  text = 'Button',
  color,
  backgroundColor,
  marginTop = 12,
  marginBottom = 0,
  pressHandler = () => {},
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  size = 'medium',
  variant = 'filled',
  width = '100%',
  borderRadius = 10,
  renderIcon,
}) => {
  const {colors} = useTheme();

  // Determine background color
  const bgColor = backgroundColor || color || colors.brandAccentColor;

  // Determine text color based on variant
  const textColor = variant === 'outlined' ? bgColor : '#FFFFFF';

  // Determine button height based on size
  const getButtonHeight = () => {
    switch (size) {
      case 'small':
        return 40;
      case 'large':
        return 56;
      default:
        return 48; // medium
    }
  };

  // Determine text size based on button size
  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'large':
        return 18;
      default:
        return 16; // medium
    }
  };

  return (
    <TouchableOpacity
      onPress={pressHandler}
      disabled={disabled || loading}
      style={[
        styles.container,
        {
          backgroundColor:
            variant === 'outlined'
              ? 'transparent'
              : disabled
              ? colors.buttonDisabled
              : bgColor,
          borderColor: bgColor,
          borderWidth: variant === 'outlined' ? 1.5 : 0,
          marginTop,
          marginBottom,
          height: getButtonHeight(),
          width,
          borderRadius,
          opacity: disabled && !loading ? 0.7 : 1,
        },
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <View style={styles.contentContainer}>
          {renderIcon && iconPosition === 'left' && (
            <View style={styles.leftIcon}>{renderIcon()}</View>
          )}
          <Text
            style={[
              styles.text,
              {
                color: disabled ? colors.textDisabled : textColor,
                fontSize: getTextSize(),
              },
            ]}>
            {text}
          </Text>
          {renderIcon && iconPosition === 'right' && (
            <View style={styles.rightIcon}>{renderIcon()}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default CustomButton;
