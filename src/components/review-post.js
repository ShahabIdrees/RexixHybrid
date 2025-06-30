import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
  Pressable,
  Animated,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Pagination from 'react-native-reanimated-carousel';
import {
  darkThemeStyles,
  lightThemeStyles,
} from '../common-styling/theme-styling';
import {darkColors, lightColors} from '../utils/colors';
import {
  Comment,
  CommentDark,
  Dislike,
  DislikeDark,
  DislikeFilled,
  DislikeRound,
  Like,
  LikeDark,
  LikeFilled,
  LikeRound,
  Share,
  ShareDark,
} from '../assets/icons';
import RatingComponent from './rating-component';
import {useNavigation} from '@react-navigation/native';
import {hp, windowWidth} from '../utils/environment';
import {
  Star,
  StarFilled,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Calendar,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';

const ReviewPost = React.memo(({title, content, images, postId = '1'}) => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scaleAnim] = useState(new Animated.Value(1));

  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;
  const commonStyles =
    colorScheme === 'dark' ? darkThemeStyles : lightThemeStyles;

  const handleLikePress = () => {
    // Animate button press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislikePress = () => {
    // Animate button press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const navigateToProductPage = () => {
    navigation.navigate('Product');
  };

  const navigateToBrandPage = () => {
    navigation.navigate('Brand');
  };

  const navigateToProfilePage = () => {
    navigation.navigate('Profile');
  };

  const navigateToCommentsPage = () => {
    navigation.navigate('Comments', {postId, title, content});
  };

  // Default avatar placeholder
  const avatarPlaceholder = 'https://i.pravatar.cc/100';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colorScheme === 'dark'
              ? darkColors.secondary
              : lightColors.secondary,
          shadowColor: colorScheme === 'dark' ? '#000' : '#888',
        },
      ]}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.profileImageWrapper}
            onPress={navigateToProfilePage}>
            <Image
              source={{uri: avatarPlaceholder}}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          <View style={styles.userInfoContainer}>
            <Pressable onPress={navigateToProfilePage}>
              <Text style={[styles.username, {color: colors.primaryText}]}>
                John Reviewer
              </Text>
            </Pressable>

            <View style={styles.timeContainer}>
              <Calendar size={12} color={colors.secondaryText} />
              <Text style={[styles.timeText, {color: colors.secondaryText}]}>
                2 hours ago
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <RatingComponent rating={4} />
        </View>
      </View>

      <View style={styles.productBrandContainer}>
        <TouchableOpacity
          style={styles.tagContainer}
          onPress={navigateToProductPage}>
          <Text style={[styles.tagText, {color: colors.brandAccentColor}]}>
            Sony WH-1000XM4
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tagContainer}
          onPress={navigateToBrandPage}>
          <Text style={[styles.tagText, {color: colors.brandSecondaryColor}]}>
            Sony
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.title, {color: colors.primaryText}]}>{title}</Text>

      <Text
        style={[styles.content, {color: colors.primaryText}]}
        numberOfLines={showMore ? undefined : 3}
        ellipsizeMode="tail">
        {content}
      </Text>

      {content.length > 100 && (
        <TouchableOpacity
          style={styles.showMoreButton}
          onPress={() => setShowMore(!showMore)}>
          <Text style={[styles.showMoreText, {color: colors.linkColor}]}>
            {showMore ? 'Show Less' : 'Show More'}
          </Text>
          {showMore ? (
            <ChevronUp size={16} color={colors.linkColor} />
          ) : (
            <ChevronDown size={16} color={colors.linkColor} />
          )}
        </TouchableOpacity>
      )}

      {images.length > 0 && (
        <View style={styles.carouselContainer}>
          <Carousel
            width={windowWidth - 48}
            height={windowWidth * 0.6}
            data={images}
            style={styles.carousel}
            loop={false}
            scrollAnimationDuration={300}
            autoPlay={false}
            onSnapToItem={index => setCurrentIndex(index)}
            renderItem={({item}) => (
              <Image source={{uri: item}} style={styles.carouselImage} />
            )}
          />

          {images.length > 1 && (
            <View style={styles.paginationContainer}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    {
                      width: index === currentIndex ? 18 : 8,
                      backgroundColor:
                        index === currentIndex
                          ? colors.brandAccentColor
                          : colors.divider,
                    },
                  ]}
                />
              ))}
            </View>
          )}
        </View>
      )}

      <View style={[styles.statsContainer, {borderColor: colors.divider}]}>
        <View style={styles.statGroup}>
          <View style={styles.statItem}>
            <ThumbsUp size={14} color={colors.primaryText} />
            <Text style={[styles.statText, {color: colors.primaryText}]}>
              5
            </Text>
          </View>

          <View style={styles.statItem}>
            <ThumbsDown size={14} color={colors.primaryText} />
            <Text style={[styles.statText, {color: colors.primaryText}]}>
              2
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={navigateToCommentsPage}>
          <Text style={[styles.statText, {color: colors.secondaryText}]}>
            12 Comments
          </Text>
        </TouchableOpacity>

        <Text style={[styles.statText, {color: colors.secondaryText}]}>
          8 Shares
        </Text>
      </View>

      <View style={styles.actionContainer}>
        <Animated.View style={{transform: [{scale: scaleAnim}]}}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              liked && {backgroundColor: 'rgba(59, 130, 246, 0.1)'},
            ]}
            onPress={handleLikePress}>
            <ThumbsUp
              size={18}
              color={liked ? colors.brandAccentColor : colors.secondaryText}
              fill={liked ? colors.brandAccentColor : 'transparent'}
            />
            <Text
              style={[
                styles.actionText,
                {color: liked ? colors.brandAccentColor : colors.secondaryText},
              ]}>
              Like
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{transform: [{scale: scaleAnim}]}}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              disliked && {backgroundColor: 'rgba(239, 68, 68, 0.1)'},
            ]}
            onPress={handleDislikePress}>
            <ThumbsDown
              size={18}
              color={disliked ? colors.error : colors.secondaryText}
              fill={disliked ? colors.error : 'transparent'}
            />
            <Text
              style={[
                styles.actionText,
                {color: disliked ? colors.error : colors.secondaryText},
              ]}>
              Dislike
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={navigateToCommentsPage}>
          <MessageCircle size={18} color={colors.secondaryText} />
          <Text style={[styles.actionText, {color: colors.secondaryText}]}>
            Comment
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={18} color={colors.secondaryText} />
          <Text style={[styles.actionText, {color: colors.secondaryText}]}>
            Share
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 8,
    borderRadius: 16,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageWrapper: {
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    height: '100%',
    width: '100%',
  },
  userInfoContainer: {
    marginLeft: 12,
  },
  username: {
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    marginBottom: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    marginLeft: 4,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  productBrandContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tagContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    lineHeight: 22,
    marginBottom: 8,
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
  showMoreText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginRight: 4,
  },
  carouselContainer: {
    marginVertical: 12,
    alignItems: 'center',
  },
  carousel: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 12,
  },
  statGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    marginLeft: 6,
    marginRight: 12,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginLeft: 6,
  },
});

export default ReviewPost;
