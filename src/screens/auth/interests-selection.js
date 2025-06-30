import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {useTranslation} from 'react-i18next';
import {CustomButton} from '../../components';
import {ArrowLeft, Check, ChevronRight} from 'lucide-react-native';

const {width} = Dimensions.get('window');

// Sample interest topics
const TOPICS = [
  'Automotive',
  'Technology',
  'Food',
  'Travel',
  'Fashion',
  'Beauty',
  'Health',
  'Fitness',
  'Home',
  'Garden',
  'Books',
  'Movies',
  'Music',
  'Art',
  'Photography',
  'Sports',
  'Gaming',
  'Pets',
  'DIY',
  'Parenting',
  'Education',
  'Finance',
  'Business',
];

const InterestsSelection = ({route, navigation}) => {
  // Safely extract params with defaults
  const params = route.params || {};
  const {
    email = 'user@example.com',
    firstName = '',
    lastName = '',
    dateOfBirth = null,
    password = '',
  } = params;

  const {t} = useTranslation();
  const {colors} = useTheme();

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  // Create animation values for each topic
  const [animationValues] = useState(() =>
    TOPICS.map(() => new Animated.Value(0)),
  );

  // Animate topics appearance
  useEffect(() => {
    const animations = TOPICS.map((_, index) => {
      return Animated.timing(animationValues[index], {
        toValue: 1,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      });
    });

    Animated.stagger(50, animations).start();
  }, [animationValues]);

  const toggleTopic = topic => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleContinue = () => {
    if (selectedTopics.length < 3) {
      Alert.alert(
        t('interests.notEnough', 'Not Enough Interests'),
        t(
          'interests.selectAtLeast',
          'Please select at least 3 interests to continue.',
        ),
      );
      return;
    }

    setLoading(true);

    // Simulate API call for registration
    setTimeout(() => {
      setLoading(false);

      // Registration successful, navigate to home
      Alert.alert(
        t('signup.success', 'Registration Successful'),
        t(
          'signup.welcomeMessage',
          'Welcome to Rexix! Your account has been created successfully.',
        ),
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              }),
          },
        ],
      );
    }, 2000);
  };

  const handleSkip = () => {
    setLoading(true);

    // Simulate API call for registration without interests
    setTimeout(() => {
      setLoading(false);

      // Registration successful, navigate to home
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }, 1500);
  };

  const renderTopic = (topic, index) => {
    const isSelected = selectedTopics.includes(topic);

    return (
      <Animated.View
        key={topic}
        style={[
          {
            opacity: animationValues[index],
            transform: [
              {
                scale: animationValues[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity
          style={[
            styles.topicBubble,
            {
              backgroundColor: isSelected
                ? colors.brandAccentColor
                : colors.inputBackground,
              borderColor: isSelected
                ? colors.brandAccentColor
                : colors.borderColor,
            },
          ]}
          onPress={() => toggleTopic(topic)}>
          <Text
            style={[
              styles.topicText,
              {color: isSelected ? '#FFFFFF' : colors.secondaryText},
            ]}>
            {topic}
          </Text>
          {isSelected && (
            <View style={styles.checkContainer}>
              <Check size={12} color="#FFFFFF" />
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.primaryBG}]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <ArrowLeft size={24} color={colors.primaryText} />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={[styles.title, {color: colors.primaryText}]}>
          {t('interests.title', 'Select Your Interests')}
        </Text>

        <Text style={[styles.subtitle, {color: colors.secondaryText}]}>
          {t(
            'interests.subtitle',
            'Pick at least 3 topics you want to see reviews about',
          )}
        </Text>

        <View style={styles.selectionInfo}>
          <Text
            style={[styles.selectionCount, {color: colors.brandAccentColor}]}>
            {selectedTopics.length} {t('interests.selected', 'selected')}
          </Text>
          <Text style={[styles.minimumCount, {color: colors.secondaryText}]}>
            ({t('interests.minimum', 'minimum 3')})
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.topicsContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topicsGrid}>
          {TOPICS.map((topic, index) => renderTopic(topic, index))}
        </View>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <CustomButton
          text={t('interests.continue', 'Continue')}
          loading={loading}
          pressHandler={handleContinue}
          disabled={selectedTopics.length < 3}
          renderIcon={() => <ChevronRight size={20} color="#FFFFFF" />}
          iconPosition="right"
        />

        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
          disabled={loading}>
          <Text style={[styles.skipText, {color: colors.linkColor}]}>
            {t('interests.skip', 'Skip')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Roboto-Bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    marginBottom: 16,
  },
  selectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectionCount: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
  minimumCount: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginLeft: 4,
  },
  topicsContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  topicBubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 6,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  checkContainer: {
    marginLeft: 6,
  },
  buttonsContainer: {
    marginTop: 16,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
});

export default InterestsSelection;
