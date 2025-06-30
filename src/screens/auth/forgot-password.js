import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { AuthInput, CustomButton } from '../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPassword = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  
  const handleResetPassword = () => {
    // Reset states
    setError('');
    
    // Validate email
    if (!email) {
      setError(t('forgotPassword.emailRequired', 'Please enter your email address'));
      return;
    }
    
    if (!validateEmail(email)) {
      setError(t('forgotPassword.invalidEmail', 'Please enter a valid email address'));
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };
  
  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: colors.primaryBG }}
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { backgroundColor: colors.primaryBG }]}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.primaryText} />
        </TouchableOpacity>
        
        <View style={styles.iconContainer}>
          <View style={[styles.iconCircle, { backgroundColor: colors.brandAccentColor }]}>
            <Icon name={success ? "email-check" : "lock-reset"} size={40} color="#FFFFFF" />
          </View>
        </View>
        
        <Text style={[styles.title, { color: colors.primaryText }]}>
          {success 
            ? t('forgotPassword.checkEmail', 'Check Your Email') 
            : t('forgotPassword.resetPassword', 'Reset Password')
          }
        </Text>
        
        <Text style={[styles.description, { color: colors.secondaryText }]}>
          {success
            ? t('forgotPassword.resetLinkSent', 'We have sent a password reset link to your email address.')
            : t('forgotPassword.enterEmail', 'Enter your email address and we\'ll send you a link to reset your password.')
          }
        </Text>
        
        {!success ? (
          <>
            <View style={styles.formContainer}>
              <AuthInput
                placeholder={t('forgotPassword.emailPlaceholder', 'Enter your email')}
                icon="email-outline"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error) setError('');
                }}
                keyboardType="email-address"
                returnKeyType="done"
                onSubmitEditing={handleResetPassword}
              />
              
              {error ? (
                <Text style={[styles.errorText, { color: colors.error }]}>
                  {error}
                </Text>
              ) : null}
              
              <CustomButton
                text={t('forgotPassword.sendLink', 'Send Reset Link')}
                marginTop={24}
                loading={loading}
                pressHandler={handleResetPassword}
                icon="send"
                iconPosition="right"
              />
            </View>
          </>
        ) : (
          <View style={styles.successContainer}>
            <Text style={[styles.emailSent, { color: colors.primaryText }]}>
              {email}
            </Text>
            
            <View style={styles.actionsContainer}>
              <CustomButton
                text={t('forgotPassword.backToLogin', 'Back to Login')}
                marginTop={24}
                pressHandler={() => navigation.navigate('Login')}
                icon="login"
                iconPosition="right"
              />
              
              <TouchableOpacity 
                style={styles.resendLink}
                onPress={() => {
                  setSuccess(false);
                  handleResetPassword();
                }}
              >
                <Text style={[styles.resendText, { color: colors.linkColor }]}>
                  {t('forgotPassword.resendEmail', 'Resend Email')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    paddingHorizontal: 16,
  },
  formContainer: {
    width: '100%',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginTop: 8,
  },
  successContainer: {
    width: '100%',
    alignItems: 'center',
  },
  emailSent: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    marginBottom: 40,
  },
  actionsContainer: {
    width: '100%',
  },
  resendLink: {
    alignSelf: 'center',
    marginTop: 24,
    padding: 8,
  },
  resendText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
});

export default ForgotPassword;
