import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Image,
  ScrollView,
  Dimensions,
  Keyboard,
} from 'react-native';
import {AppIcon} from '../../assets/svgs';
import {AuthInput, CustomButton} from '../../components';
import {useTheme} from '../../contexts/ThemeContext';
import {useTranslation} from 'react-i18next';
import {Mail, Lock, LogIn, Github, Facebook, Chrome} from 'lucide-react-native';

const {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const {t} = useTranslation();
  const {colors, actualTheme} = useTheme();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Form validation
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Listen for keyboard events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = t('validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('validation.emailInvalid');
    }

    // Password validation
    if (!password) {
      newErrors.password = t('validation.passwordRequired');
    } else if (password.length < 6) {
      newErrors.password = t('validation.passwordTooShort');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = field => {
    setTouched({...touched, [field]: true});
  };

  const handleLoginPress = async () => {
    setTouched({email: true, password: true});

    if (validate()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Home');
      }, 1500);
    }
  };

  // Social login icons
  const renderSocialIcons = () => {
    if (keyboardVisible && height < 700) return null;

    return (
      <>
        <View style={styles.dividerContainer}>
          <View style={[styles.divider, {backgroundColor: colors.divider}]} />
          <Text style={[styles.dividerText, {color: colors.secondaryText}]}>
            {t('login.orLoginWith')}
          </Text>
          <View style={[styles.divider, {backgroundColor: colors.divider}]} />
        </View>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity
            style={[styles.socialButton, {backgroundColor: colors.cardBG}]}
            onPress={() => console.log('Google login')}>
            <Chrome size={24} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, {backgroundColor: colors.cardBG}]}
            onPress={() => console.log('Facebook login')}>
            <Facebook size={24} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, {backgroundColor: colors.cardBG}]}
            onPress={() => console.log('Github login')}>
            <Github
              size={24}
              color={actualTheme === 'dark' ? '#FFFFFF' : '#000000'}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  // Sign up link
  const renderSignUpLink = () => {
    return (
      <View style={styles.signupContainer}>
        <Text style={[styles.signupText, {color: colors.secondaryText}]}>
          {t('login.signUpPrompt')}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.signupLink, {color: colors.brandAccentColor}]}>
            {t('login.signUp')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: colors.primaryBG}}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        bounces={false}>
        <View style={[styles.container, {backgroundColor: colors.primaryBG}]}>
          <View
            style={[
              styles.headerContainer,
              keyboardVisible && styles.headerContainerCompact,
            ]}>
            <AppIcon
              width={keyboardVisible ? 60 : 80}
              height={keyboardVisible ? 60 : 80}
            />
            {!keyboardVisible && (
              <>
                <Text style={[styles.title, {color: colors.primaryText}]}>
                  {t('appName', 'Rexix')}
                </Text>
                <Text style={[styles.subtitle, {color: colors.secondaryText}]}>
                  {t('login.welcomeBack', 'Welcome back!')}
                </Text>
              </>
            )}
          </View>

          <View style={styles.formContainer}>
            <AuthInput
              placeholder={t('login.emailPlaceholder', 'Enter your email')}
              icon="mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={errors.email}
              touched={touched.email}
              onBlur={() => handleBlur('email')}
              returnKeyType="next"
              renderLeftIcon={() => (
                <Mail size={20} color={colors.secondaryText} />
              )}
            />

            <AuthInput
              placeholder={t(
                'login.passwordPlaceholder',
                'Enter your password',
              )}
              icon="lock"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
              touched={touched.password}
              onBlur={() => handleBlur('password')}
              returnKeyType="done"
              onSubmitEditing={handleLoginPress}
              renderLeftIcon={() => (
                <Lock size={20} color={colors.secondaryText} />
              )}
            />

            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text
                style={[styles.forgotPasswordText, {color: colors.linkColor}]}>
                {t('login.forgotPassword', 'Forgot Password?')}
              </Text>
            </TouchableOpacity>

            <CustomButton
              text={t('login.login')}
              marginTop={24}
              loading={loading}
              pressHandler={handleLoginPress}
              icon="log-in"
              iconPosition="right"
              renderIcon={() => <LogIn size={20} color="#FFFFFF" />}
            />
          </View>

          {renderSocialIcons()}

          {!keyboardVisible || height >= 700 ? renderSignUpLink() : null}
        </View>
      </ScrollView>

      {keyboardVisible && height < 700 && (
        <View
          style={[
            styles.floatingSignupContainer,
            {backgroundColor: colors.primaryBG},
          ]}>
          {renderSignUpLink()}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  headerContainerCompact: {
    marginBottom: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Roboto-Bold',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 'auto',
    paddingVertical: 16,
  },
  signupText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  signupLink: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    marginLeft: 4,
  },
  floatingSignupContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
});

export default Login;
