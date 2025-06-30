import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {useTranslation} from 'react-i18next';
import {AuthInput, CustomButton} from '../../components';
import {ArrowLeft, Check, Lock, ShieldCheck} from 'lucide-react-native';

const {width} = Dimensions.get('window');

const SetPassword = ({route, navigation}) => {
  const {email, firstName, lastName, dateOfBirth} = route.params || {
    email: 'user@example.com',
    firstName: '',
    lastName: '',
    dateOfBirth: null,
  };
  const {t} = useTranslation();
  const {colors} = useTheme();

  // Form state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Password strength
  const [strength, setStrength] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState(
    t('password.empty', 'Empty'),
  );

  // Form validation
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Password requirements
  const [requirements, setRequirements] = useState({
    minLength: false,
    uppercase: false,
    number: false,
    special: false,
  });

  // Update password strength and requirements when password changes
  useEffect(() => {
    if (!password) {
      setStrength(0);
      setStrengthLabel(t('password.empty', 'Empty'));
      setRequirements({
        minLength: false,
        uppercase: false,
        number: false,
        special: false,
      });
      return;
    }

    // Check requirements
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setRequirements({
      minLength: hasMinLength,
      uppercase: hasUppercase,
      number: hasNumber,
      special: hasSpecial,
    });

    // Calculate strength (0-3)
    let newStrength = 0;
    if (hasMinLength) newStrength++;
    if (hasUppercase) newStrength++;
    if (hasNumber) newStrength++;
    if (hasSpecial) newStrength++;

    // Normalize to 0-100
    const normalizedStrength = Math.min(
      Math.floor((newStrength / 4) * 100),
      100,
    );
    setStrength(normalizedStrength);

    // Set label based on strength
    if (normalizedStrength < 25) {
      setStrengthLabel(t('password.empty', 'Empty'));
    } else if (normalizedStrength < 50) {
      setStrengthLabel(t('password.weak', 'Weak'));
    } else if (normalizedStrength < 75) {
      setStrengthLabel(t('password.medium', 'Medium'));
    } else {
      setStrengthLabel(t('password.strong', 'Strong'));
    }
  }, [password, t]);

  // Get color based on strength
  const getStrengthColor = () => {
    if (strength < 25) return colors.error;
    if (strength < 50) return colors.error;
    if (strength < 75) return colors.warning;
    return colors.success;
  };

  const handleBlur = field => {
    setTouched({...touched, [field]: true});
  };

  const validate = () => {
    const newErrors = {};

    // Password validation
    if (!password) {
      newErrors.password = t(
        'validation.passwordRequired',
        'Password is required',
      );
    } else if (password.length < 8) {
      newErrors.password = t(
        'validation.passwordTooShort',
        'Password must be at least 8 characters',
      );
    } else if (strength < 50) {
      newErrors.password = t(
        'validation.passwordTooWeak',
        'Password is too weak',
      );
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = t(
        'validation.confirmPasswordRequired',
        'Please confirm your password',
      );
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = t(
        'validation.passwordsDoNotMatch',
        'Passwords do not match',
      );
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    setTouched({
      password: true,
      confirmPassword: true,
    });

    if (validate()) {
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        setLoading(false);

        // Navigate to interests selection with all user data
        navigation.navigate('InterestsSelection', {
          email,
          firstName,
          lastName,
          dateOfBirth,
          password,
        });
      }, 1500);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{backgroundColor: colors.primaryBG}}
      keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, {backgroundColor: colors.primaryBG}]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.primaryText} />
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <View
            style={[
              styles.iconCircle,
              {backgroundColor: colors.brandAccentColor},
            ]}>
            <ShieldCheck size={40} color="#FFFFFF" />
          </View>
        </View>

        <Text style={[styles.title, {color: colors.primaryText}]}>
          {t('password.setPassword', 'Set Your Password')}
        </Text>

        <Text style={[styles.description, {color: colors.secondaryText}]}>
          {t(
            'password.createStrong',
            'Create a strong password for your account',
          )}
        </Text>

        <View style={styles.formContainer}>
          <AuthInput
            placeholder={t('password.enterNew', 'Enter new password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
            touched={touched.password}
            onBlur={() => handleBlur('password')}
            returnKeyType="next"
            renderLeftIcon={() => (
              <Lock size={20} color={colors.secondaryText} />
            )}
          />

          {/* Password strength meter */}
          <View style={styles.strengthContainer}>
            <View style={styles.strengthMeterContainer}>
              <View
                style={[
                  styles.strengthMeter,
                  {
                    width: `${strength}%`,
                    backgroundColor: getStrengthColor(),
                  },
                ]}
              />
            </View>
            <Text style={[styles.strengthText, {color: getStrengthColor()}]}>
              {strengthLabel}
            </Text>
          </View>

          <AuthInput
            placeholder={t('password.confirmNew', 'Confirm new password')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            onBlur={() => handleBlur('confirmPassword')}
            returnKeyType="done"
            onSubmitEditing={handleContinue}
            renderLeftIcon={() => (
              <Lock size={20} color={colors.secondaryText} />
            )}
          />

          {/* Password requirements */}
          <View style={styles.requirementsContainer}>
            <Text
              style={[styles.requirementsTitle, {color: colors.secondaryText}]}>
              {t('password.requirements', 'Password Requirements:')}
            </Text>

            <View style={styles.requirementRow}>
              <View
                style={[
                  styles.checkCircle,
                  {
                    backgroundColor: requirements.minLength
                      ? colors.success
                      : colors.inputBackground,
                  },
                ]}>
                {requirements.minLength && <Check size={12} color="#FFFFFF" />}
              </View>
              <Text
                style={[
                  styles.requirementText,
                  {
                    color: requirements.minLength
                      ? colors.success
                      : colors.secondaryText,
                  },
                ]}>
                {t('password.minLength', 'Minimum 8 characters')}
              </Text>
            </View>

            <View style={styles.requirementRow}>
              <View
                style={[
                  styles.checkCircle,
                  {
                    backgroundColor: requirements.uppercase
                      ? colors.success
                      : colors.inputBackground,
                  },
                ]}>
                {requirements.uppercase && <Check size={12} color="#FFFFFF" />}
              </View>
              <Text
                style={[
                  styles.requirementText,
                  {
                    color: requirements.uppercase
                      ? colors.success
                      : colors.secondaryText,
                  },
                ]}>
                {t('password.uppercase', 'At least one uppercase letter')}
              </Text>
            </View>

            <View style={styles.requirementRow}>
              <View
                style={[
                  styles.checkCircle,
                  {
                    backgroundColor: requirements.number
                      ? colors.success
                      : colors.inputBackground,
                  },
                ]}>
                {requirements.number && <Check size={12} color="#FFFFFF" />}
              </View>
              <Text
                style={[
                  styles.requirementText,
                  {
                    color: requirements.number
                      ? colors.success
                      : colors.secondaryText,
                  },
                ]}>
                {t('password.number', 'At least one number')}
              </Text>
            </View>

            <View style={styles.requirementRow}>
              <View
                style={[
                  styles.checkCircle,
                  {
                    backgroundColor: requirements.special
                      ? colors.success
                      : colors.inputBackground,
                  },
                ]}>
                {requirements.special && <Check size={12} color="#FFFFFF" />}
              </View>
              <Text
                style={[
                  styles.requirementText,
                  {
                    color: requirements.special
                      ? colors.success
                      : colors.secondaryText,
                  },
                ]}>
                {t('password.special', 'At least one special character')}
              </Text>
            </View>
          </View>

          <CustomButton
            text={t('password.continue', 'Continue')}
            marginTop={32}
            loading={loading}
            pressHandler={handleContinue}
            disabled={strength < 50}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 8,
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Roboto-Bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    marginBottom: 32,
  },
  formContainer: {
    width: '100%',
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  strengthMeterContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  strengthMeter: {
    height: '100%',
    borderRadius: 3,
  },
  strengthText: {
    marginLeft: 12,
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    width: 60,
  },
  requirementsContainer: {
    marginTop: 24,
  },
  requirementsTitle: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginBottom: 12,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  requirementText: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
  },
});

export default SetPassword;
