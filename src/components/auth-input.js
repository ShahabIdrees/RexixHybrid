import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useTheme} from '../contexts/ThemeContext';
import {Eye, EyeOff} from 'lucide-react-native';

const AuthInput = ({
  placeholder = 'Enter',
  value = '',
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  icon,
  error,
  touched,
  onBlur,
  maxLength,
  returnKeyType = 'next',
  onSubmitEditing,
  autoFocus = false,
  editable = true,
  renderLeftIcon,
}) => {
  const {colors, actualTheme} = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = e => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const getBorderColor = () => {
    if (error && touched) return colors.error;
    if (isFocused) return colors.brandAccentColor;
    return colors.borderColor;
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.inputBackground,
            borderColor: getBorderColor(),
            borderWidth: isFocused ? 1.5 : 1,
          },
        ]}>
        {renderLeftIcon ? (
          <View style={styles.iconContainer}>{renderLeftIcon()}</View>
        ) : (
          icon && (
            <View style={styles.iconContainer}>
              {/* This is a fallback for backward compatibility */}
            </View>
          )
        )}
        <TextInput
          style={[
            styles.input,
            {
              color: colors.inputTextColor,
              flex: 1,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholderColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          autoFocus={autoFocus}
          editable={editable}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconContainer}>
            {isPasswordVisible ? (
              <EyeOff size={20} color={colors.secondaryText} />
            ) : (
              <Eye size={20} color={colors.secondaryText} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && touched && (
        <Text style={[styles.errorText, {color: colors.error}]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 12,
  },
  container: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  input: {
    height: '100%',
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  iconContainer: {
    paddingHorizontal: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontFamily: 'Roboto-Regular',
  },
});

export default AuthInput;
