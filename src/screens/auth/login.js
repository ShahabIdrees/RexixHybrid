import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {AppIcon, GasFilling} from '../../assets/svgs';
import {AuthInput, CustomButton} from '../../components';
import {darkColors, lightColors} from '../../utils/colors';
import i18next from 'i18next';
import {
  darkThemeStyles,
  lightThemeStyles,
} from '../../common-styling/theme-styling';
import {useTranslation} from 'react-i18next';

const Login = ({navigation}) => {
  const handleLoginPress = () => {
    navigation.navigate('Home');
  };
  const theme = useColorScheme();
  const colors = theme === 'dark' ? darkColors : lightColors;
  const commonStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;
  const {t} = useTranslation();
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={[styles.container, {backgroundColor: colors.primaryBG}]}>
      <AppIcon />
      {/* <GasFilling /> */}

      <Text style={[commonStyles.label, styles.label]}>{t('login.email')}</Text>
      <AuthInput />
      <Text style={[commonStyles.label, , styles.label, {marginTop: 10}]}>
        {t('login.password')}
      </Text>
      <AuthInput />
      <CustomButton
        text={t('login.login')}
        marginTop={24}
        pressHandler={handleLoginPress}
      />
      <View style={{flexDirection: 'row', marginTop: 24}}>
        <Text style={commonStyles.text}>{t('login.signUpPrompt')} </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={[commonStyles.text, {color: colors.brandAccentColor}]}>
            {t('login.signUp')}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={[commonStyles.text, {marginTop: 24}]}>
        {t('login.orLoginWith')}
      </Text>
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={styles.imageButton}>
          {/* <Image /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageButton}>
          {/* <Image /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageButton}>
          {/* <Image /> */}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    alignItems: 'center',
    // backgroundColor: darkColors.primaryBG,
    // backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  label: {
    // color: darkColors.primaryText,
    alignSelf: 'flex-start',
    // marginVertical: 6,
    // width: '100%',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    // height
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
});

export default Login;
