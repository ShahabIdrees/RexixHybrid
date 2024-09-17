import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {AppIcon, GasFilling} from '../../assets/svgs';
import {AuthInput, CustomButton} from '../../components';
import {darkColors, lightColors} from '../../utils/colors';
import {
  darkThemeStyles,
  lightThemeStyles,
} from '../../common-styling/theme-styling';
import {useTranslation} from 'react-i18next';

const SignUp = ({navigation}) => {
  const {t} = useTranslation();
  const theme = useColorScheme();
  const colors = theme === 'dark' ? darkColors : lightColors;
  const commonStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;
  const handleSignUpPress = () => {
    navigation.navigate('Home');
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={200}
        style={[styles.container, {backgroundColor: colors.primaryBG}]}>
        <AppIcon />
        {/* <GasFilling /> */}

        <Text style={[commonStyles.label, styles.label]}>
          {t('signup.userName')}
        </Text>
        <AuthInput placeholder={t('signup.userNamePrompt')} />
        <Text style={[commonStyles.label, styles.label]}>
          {t('signup.email')}
        </Text>
        <AuthInput placeholder={t('signup.emailPrompt')} />
        <Text style={[commonStyles.label, styles.label]}>
          {t('signup.password')}
        </Text>
        <AuthInput
          placeholder={t('signup.passwordPrompt')}
          secureTextEntry={true}
        />
        <Text style={[commonStyles.label, styles.label]}>
          {t('signup.confirmPassword')}
        </Text>
        <AuthInput
          placeholder={t('signup.confirmPasswordPrompt')}
          secureTextEntry={true}
        />
        <CustomButton
          text={t('signup.signup')}
          marginTop={24}
          pressHandler={handleSignUpPress}
        />
        <View style={{flexDirection: 'row', marginTop: 24}}>
          <Text style={commonStyles.text}>{t('signup.loginPrompt')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[commonStyles.text, {color: colors.brandAccentColor}]}>
              {t('signup.login')}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={[commonStyles.text, {marginTop: 24}]}>
          {t('signup.orSignUpWith')}
        </Text>
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.imageButton}>
            <Image />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton}>
            <Image />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton}>
            <Image />
          </TouchableOpacity>
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
    marginBottom: 24,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
  },
  imageButton: {
    borderWidth: 0.1,
    elevation: 1,
    width: 80,
    height: 80,
    marginHorizontal: 8,
    borderRadius: 40,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
});

export default SignUp;
