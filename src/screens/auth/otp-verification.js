import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {useTranslation} from 'react-i18next';
import {CustomButton} from '../../components';
import {ArrowLeft, CheckCircle2, Mail} from 'lucide-react-native';

const OTPVerification = ({route, navigation}) => {
  const {email, firstName, lastName, dateOfBirth} = route.params || {
    email: 'user@example.com',
    firstName: '',
    lastName: '',
    dateOfBirth: null,
  };
  const {t} = useTranslation();
  const {colors} = useTheme();

  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputRefs = useRef([]);

  // Start countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format timer as MM:SS
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error when user types
    if (error) setError('');

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace key
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (timer === 0) {
      // Reset timer
      setTimer(60);

      // Simulate OTP resend
      Alert.alert(
        t('otp.resendTitle', 'OTP Resent'),
        t(
          'otp.resendMessage',
          'A new verification code has been sent to your email.',
        ),
      );
    }
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    const otpString = otp.join('');

    if (otpString.length !== 4) {
      setError(
        t('otp.enterComplete', 'Please enter the complete verification code'),
      );
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);

      // Pass user data to the next screen
      navigation.navigate('SetPassword', {
        email,
        firstName,
        lastName,
        dateOfBirth,
      });
    }, 1500);
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
            <Mail size={40} color="#FFFFFF" />
          </View>
        </View>

        <Text style={[styles.title, {color: colors.primaryText}]}>
          {t('otp.verifyEmail', 'Verify Your Email')}
        </Text>

        <Text style={[styles.description, {color: colors.secondaryText}]}>
          {t('otp.codeSent', 'We have sent a verification code to')}
        </Text>

        <Text style={[styles.email, {color: colors.primaryText}]}>{email}</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor: error ? colors.error : colors.borderColor,
                  color: colors.primaryText,
                },
                digit ? styles.otpInputFilled : {},
              ]}
              value={digit}
              onChangeText={value => handleOtpChange(value, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {error ? (
          <Text style={[styles.errorText, {color: colors.error}]}>{error}</Text>
        ) : null}

        <View style={styles.timerContainer}>
          <Text style={[styles.timerText, {color: colors.secondaryText}]}>
            {timer > 0
              ? t('otp.resendIn', 'Resend code in {{time}}', {
                  time: formatTime(timer),
                })
              : t('otp.didntReceive', "Didn't receive the code?")}
          </Text>

          {timer === 0 && (
            <TouchableOpacity onPress={handleResendOtp}>
              <Text
                style={[styles.resendText, {color: colors.brandAccentColor}]}>
                {t('otp.resend', 'Resend')}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <CustomButton
          text={t('otp.verify', 'Verify')}
          marginTop={40}
          loading={loading}
          pressHandler={handleVerifyOtp}
          renderIcon={() => <CheckCircle2 size={20} color="#FFFFFF" />}
          iconPosition="right"
        />
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
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    marginBottom: 40,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 24,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1.5,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  otpInputFilled: {
    borderWidth: 2,
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginBottom: 16,
    textAlign: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  resendText: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    marginLeft: 4,
  },
});

export default OTPVerification;
