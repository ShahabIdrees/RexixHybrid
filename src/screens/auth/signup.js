import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
  Keyboard,
  Modal,
  FlatList,
} from 'react-native';
import {AppIcon} from '../../assets/svgs';
import {AuthInput, CustomButton} from '../../components';
import {useTheme} from '../../contexts/ThemeContext';
import {useTranslation} from 'react-i18next';
import {User, Mail, Calendar, Github, X} from 'lucide-react-native';

const {width, height} = Dimensions.get('window');

// Generate years for the date picker (from 100 years ago to current year)
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= currentYear - 100; i--) {
    years.push(i);
  }
  return years;
};

// Generate months for the date picker
const generateMonths = () => {
  return [
    {value: 0, label: 'January'},
    {value: 1, label: 'February'},
    {value: 2, label: 'March'},
    {value: 3, label: 'April'},
    {value: 4, label: 'May'},
    {value: 5, label: 'June'},
    {value: 6, label: 'July'},
    {value: 7, label: 'August'},
    {value: 8, label: 'September'},
    {value: 9, label: 'October'},
    {value: 10, label: 'November'},
    {value: 11, label: 'December'},
  ];
};

// Generate days for the date picker based on month and year
const generateDays = (month, year) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  return days;
};

const SignUp = ({navigation}) => {
  const {t} = useTranslation();
  const {colors, actualTheme} = useTheme();

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Date picker state
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear() - 18,
  );
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(1);
  const [years] = useState(generateYears());
  const [months] = useState(generateMonths());
  const [days, setDays] = useState(
    generateDays(0, new Date().getFullYear() - 18),
  );

  // Form validation
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Update days when month or year changes
  useEffect(() => {
    setDays(generateDays(selectedMonth, selectedYear));
    // If the selected day is greater than the number of days in the month, reset to the last day
    if (selectedDay > days.length) {
      setSelectedDay(days.length);
    }
  }, [selectedMonth, selectedYear]);

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

    // First name validation
    if (!firstName) {
      newErrors.firstName = t(
        'validation.firstNameRequired',
        'First name is required',
      );
    }

    // Last name validation
    if (!lastName) {
      newErrors.lastName = t(
        'validation.lastNameRequired',
        'Last name is required',
      );
    }

    // Email validation
    if (!email) {
      newErrors.email = t('validation.emailRequired', 'Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('validation.emailInvalid', 'Email is invalid');
    }

    // Date of birth validation
    if (!dateOfBirth) {
      newErrors.dateOfBirth = t(
        'validation.dobRequired',
        'Date of birth is required',
      );
    } else {
      const today = new Date();
      const age = today.getFullYear() - dateOfBirth.getFullYear();
      const m = today.getMonth() - dateOfBirth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
        age--;
      }

      if (age < 13) {
        newErrors.dateOfBirth = t(
          'validation.minimumAge',
          'You must be at least 13 years old',
        );
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = field => {
    setTouched({...touched, [field]: true});
  };

  const handleSignUpPress = async () => {
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      dateOfBirth: true,
    });

    if (validate()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('OTPVerification', {
          email,
          firstName,
          lastName,
          dateOfBirth,
        });
      }, 1500);
    }
  };

  const formatDate = date => {
    if (!date) return '';
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const showDatepicker = () => {
    Keyboard.dismiss();
    setShowDatePicker(true);
  };

  const handleConfirmDate = () => {
    const newDate = new Date(selectedYear, selectedMonth, selectedDay);
    setDateOfBirth(newDate);
    setShowDatePicker(false);

    // Clear date of birth error if it exists
    if (errors.dateOfBirth) {
      const newErrors = {...errors};
      delete newErrors.dateOfBirth;
      setErrors(newErrors);
    }
  };

  // Social signup icons
  const renderSocialIcons = () => {
    if (keyboardVisible && height < 700) return null;

    return (
      <>
        <View style={styles.dividerContainer}>
          <View style={[styles.divider, {backgroundColor: colors.divider}]} />
          <Text style={[styles.dividerText, {color: colors.secondaryText}]}>
            {t('signup.orSignUpWith')}
          </Text>
          <View style={[styles.divider, {backgroundColor: colors.divider}]} />
        </View>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity
            style={[styles.socialButton, {backgroundColor: colors.cardBG}]}
            onPress={() => console.log('Google signup')}>
            <Github
              size={24}
              color={actualTheme === 'dark' ? '#FFFFFF' : '#000000'}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  // Login link
  const renderLoginLink = () => {
    return (
      <View style={styles.loginContainer}>
        <Text style={[styles.loginText, {color: colors.secondaryText}]}>
          {t('signup.loginPrompt')}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.loginLink, {color: colors.brandAccentColor}]}>
            {t('signup.login')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render date picker modal
  const renderDatePickerModal = () => {
    return (
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}>
        <View
          style={[styles.modalOverlay, {backgroundColor: 'rgba(0,0,0,0.5)'}]}>
          <View
            style={[styles.modalContent, {backgroundColor: colors.primaryBG}]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, {color: colors.primaryText}]}>
                {t('signup.selectDOB', 'Select Date of Birth')}
              </Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <X size={24} color={colors.primaryText} />
              </TouchableOpacity>
            </View>

            <View style={styles.datePickerContainer}>
              {/* Month Picker */}
              <View style={styles.pickerColumn}>
                <Text
                  style={[styles.pickerLabel, {color: colors.secondaryText}]}>
                  Month
                </Text>
                <FlatList
                  data={months}
                  keyExtractor={item => item.value.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.pickerItem,
                        selectedMonth === item.value && [
                          styles.pickerItemSelected,
                          {backgroundColor: colors.brandAccentColor},
                        ],
                      ]}
                      onPress={() => setSelectedMonth(item.value)}>
                      <Text
                        style={[
                          styles.pickerItemText,
                          {color: colors.primaryText},
                          selectedMonth === item.value && {color: '#FFFFFF'},
                        ]}>
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                  showsVerticalScrollIndicator={false}
                  initialScrollIndex={selectedMonth}
                  getItemLayout={(data, index) => ({
                    length: 50,
                    offset: 50 * index,
                    index,
                  })}
                />
              </View>

              {/* Day Picker */}
              <View style={styles.pickerColumn}>
                <Text
                  style={[styles.pickerLabel, {color: colors.secondaryText}]}>
                  Day
                </Text>
                <FlatList
                  data={days}
                  keyExtractor={item => item.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.pickerItem,
                        selectedDay === item && [
                          styles.pickerItemSelected,
                          {backgroundColor: colors.brandAccentColor},
                        ],
                      ]}
                      onPress={() => setSelectedDay(item)}>
                      <Text
                        style={[
                          styles.pickerItemText,
                          {color: colors.primaryText},
                          selectedDay === item && {color: '#FFFFFF'},
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                  showsVerticalScrollIndicator={false}
                  initialScrollIndex={selectedDay - 1}
                  getItemLayout={(data, index) => ({
                    length: 50,
                    offset: 50 * index,
                    index,
                  })}
                />
              </View>

              {/* Year Picker */}
              <View style={styles.pickerColumn}>
                <Text
                  style={[styles.pickerLabel, {color: colors.secondaryText}]}>
                  Year
                </Text>
                <FlatList
                  data={years}
                  keyExtractor={item => item.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.pickerItem,
                        selectedYear === item && [
                          styles.pickerItemSelected,
                          {backgroundColor: colors.brandAccentColor},
                        ],
                      ]}
                      onPress={() => setSelectedYear(item)}>
                      <Text
                        style={[
                          styles.pickerItemText,
                          {color: colors.primaryText},
                          selectedYear === item && {color: '#FFFFFF'},
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                  showsVerticalScrollIndicator={false}
                  initialScrollIndex={years.findIndex(
                    year => year === selectedYear,
                  )}
                  getItemLayout={(data, index) => ({
                    length: 50,
                    offset: 50 * index,
                    index,
                  })}
                />
              </View>
            </View>

            <CustomButton
              text={t('common.confirm', 'Confirm')}
              pressHandler={handleConfirmDate}
              marginTop={16}
            />
          </View>
        </View>
      </Modal>
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
                  {t('signup.createAccount', 'Create Account')}
                </Text>
                <Text style={[styles.subtitle, {color: colors.secondaryText}]}>
                  {t('signup.joinCommunity', 'Join our community of reviewers')}
                </Text>
              </>
            )}
          </View>

          <View style={styles.formContainer}>
            <AuthInput
              placeholder={t('signup.firstName', 'First Name')}
              value={firstName}
              onChangeText={setFirstName}
              error={errors.firstName}
              touched={touched.firstName}
              onBlur={() => handleBlur('firstName')}
              returnKeyType="next"
              renderLeftIcon={() => (
                <User size={20} color={colors.secondaryText} />
              )}
            />

            <AuthInput
              placeholder={t('signup.lastName', 'Last Name')}
              value={lastName}
              onChangeText={setLastName}
              error={errors.lastName}
              touched={touched.lastName}
              onBlur={() => handleBlur('lastName')}
              returnKeyType="next"
              renderLeftIcon={() => (
                <User size={20} color={colors.secondaryText} />
              )}
            />

            <AuthInput
              placeholder={t('signup.emailPrompt')}
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

            <TouchableOpacity
              onPress={showDatepicker}
              style={[
                styles.datePickerButton,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor:
                    errors.dateOfBirth && touched.dateOfBirth
                      ? colors.error
                      : colors.borderColor,
                },
              ]}>
              <View style={styles.datePickerIcon}>
                <Calendar size={20} color={colors.secondaryText} />
              </View>
              <Text
                style={[
                  styles.datePickerText,
                  {
                    color: dateOfBirth
                      ? colors.inputTextColor
                      : colors.placeholderColor,
                  },
                ]}>
                {dateOfBirth
                  ? formatDate(dateOfBirth)
                  : t('signup.dateOfBirth', 'Date of Birth')}
              </Text>
            </TouchableOpacity>

            {errors.dateOfBirth && touched.dateOfBirth && (
              <Text style={[styles.errorText, {color: colors.error}]}>
                {errors.dateOfBirth}
              </Text>
            )}

            <CustomButton
              text={t('signup.continue', 'Continue')}
              marginTop={24}
              loading={loading}
              pressHandler={handleSignUpPress}
              renderIcon={() => <Mail size={20} color="#FFFFFF" />}
              iconPosition="right"
            />
          </View>

          {renderSocialIcons()}

          {!keyboardVisible || height >= 700 ? renderLoginLink() : null}
        </View>
      </ScrollView>

      {keyboardVisible && height < 700 && (
        <View
          style={[
            styles.floatingLoginContainer,
            {backgroundColor: colors.primaryBG},
          ]}>
          {renderLoginLink()}
        </View>
      )}

      {renderDatePickerModal()}
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
    marginBottom: 30,
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
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  datePickerButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 12,
  },
  datePickerIcon: {
    paddingHorizontal: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  errorText: {
    fontSize: 12,
    marginTop: -8,
    marginBottom: 12,
    marginLeft: 4,
    fontFamily: 'Roboto-Regular',
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
  loginContainer: {
    flexDirection: 'row',
    marginTop: 'auto',
    paddingVertical: 16,
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    marginLeft: 4,
  },
  floatingLoginContainer: {
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
  },
  datePickerContainer: {
    flexDirection: 'row',
    height: 250,
  },
  pickerColumn: {
    flex: 1,
    marginHorizontal: 4,
  },
  pickerLabel: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginBottom: 8,
    textAlign: 'center',
  },
  pickerItem: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 2,
  },
  pickerItemSelected: {
    borderRadius: 8,
  },
  pickerItemText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
});

export default SignUp;
