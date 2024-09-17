import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
  Pressable,
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

const ReviewPost = React.memo(({title, content, images}) => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;
  const commonStyles =
    colorScheme === 'dark' ? darkThemeStyles : lightThemeStyles;

  const handleLikePress = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislikePress = () => {
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

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colorScheme === 'dark'
              ? darkColors.secondary
              : lightColors.secondary,
        },
      ]}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[
              styles.profileImageWrapper,
              {borderColor: colors.primaryText, borderWidth: 0.5},
            ]}
            onPress={navigateToProfilePage}>
            <Image />
          </TouchableOpacity>
          <View style={{marginHorizontal: 8}}>
            <Pressable onPress={navigateToProfilePage}>
              <Text
                style={
                  colorScheme === 'dark'
                    ? darkThemeStyles.label
                    : lightThemeStyles.label
                }>
                Name
              </Text>
            </Pressable>

            <Text
              style={{
                fontSize: 12,
                color:
                  colorScheme === 'dark'
                    ? darkColors.primaryText
                    : lightColors.primaryText,
              }}>
              2 hours ago
            </Text>
          </View>
        </View>
        <View>
          {/* Rating Component */}
          <RatingComponent rating={4} />
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={navigateToProductPage}>
          <Text style={[commonStyles.label, {color: colors.primaryText}]}>
            {'Product Name'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToBrandPage}>
          <Text style={[commonStyles.label, {color: colors.primaryText}]}>
            {'Brand Name'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={[
          commonStyles.title,
          {color: colors.primaryText},
          {numberOfLines: 1},
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.content,
          {
            color:
              colorScheme === 'dark'
                ? darkColors.primaryText
                : lightColors.primaryText,
          },
        ]}
        numberOfLines={showMore ? 0 : 3}
        ellipsizeMode={showMore ? 'tail' : 'clip'}>
        {content}
      </Text>
      {!showMore && content.length > 100 && (
        <TouchableOpacity onPress={() => setShowMore(!showMore)}>
          <Text style={[commonStyles.label, {color: colors.primaryText}]}>
            {showMore ? 'Show Less' : 'Show More'}
          </Text>
        </TouchableOpacity>
      )}

      {images.length > 0 && (
        <View>
          <Carousel
            width={windowWidth}
            height={windowWidth}
            data={images}
            style={{alignSelf: 'center'}}
            loop={false}
            scrollAnimationDuration={50}
            autoPlay={false}
            onSnapToItem={index => setCurrentIndex(index)}
            renderItem={({item}) => (
              <Image source={{uri: item}} style={styles.singleImage} />
            )}
          />
          {images.length > 1 && (
            <View style={{alignItems: 'center', marginBottom: 4}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {images.map((_, index) => {
                  return (
                    <View
                      key={index}
                      style={[
                        index === currentIndex
                          ? styles.dotHighlightedStyle
                          : styles.dotStyle,
                        {
                          backgroundColor:
                            index === currentIndex
                              ? colors.brandAccentColor
                              : 'gray',
                        },
                      ]}
                    />
                  );
                })}
              </View>
            </View>
          )}
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderBottomColor: colors.borderColor,
          borderBottomWidth: 0.3,
          paddingBottom: 8,
          marginBottom: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}>
          <View style={{flexDirection: 'row'}}>
            <LikeRound />
            <Text style={[{marginHorizontal: 4}, {color: colors.primaryText}]}>
              {5}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 8}}>
            <DislikeRound />
            <Text style={[{marginLeft: 4}, {color: colors.primaryText}]}>
              {4}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-around',
          }}>
          <Text style={[commonStyles.label, {color: colors.primaryText}]}>
            {12} Comments
          </Text>
          <Text style={[commonStyles.label, {color: colors.primaryText}]}>
            {159} Shares
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity onPress={handleLikePress}>
          {liked ? (
            <LikeFilled />
          ) : colorScheme === 'dark' ? (
            <LikeDark />
          ) : (
            <Like />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDislikePress}>
          {disliked ? (
            <DislikeFilled />
          ) : colorScheme === 'dark' ? (
            <DislikeDark />
          ) : (
            <Dislike />
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          {colorScheme === 'dark' ? <CommentDark /> : <Comment />}
        </TouchableOpacity>
        <TouchableOpacity>
          {colorScheme === 'dark' ? <ShareDark /> : <Share />}
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 14,
    elevation: 1,
    marginVertical: 4,
    borderRadius: 10,
    borderColor: '#e1e1e1',
  },
  title: {
    fontSize: hp(16),
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  content: {
    fontSize: 14,
    marginBottom: 10,
    color: 'black',
  },
  singleImage: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    // borderRadius: 4,
    // marginRight: 24,
    marginTop: 10,
    marginBottom: 10,
  },
  dotStyle: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
    backgroundColor: 'gray',
  },
  dotHighlightedStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },
  profileImageWrapper: {
    height: 28,
    width: 28,
    borderRadius: 14,
    borderWidth: 0.1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.15,
    borderBottomColor: 'gray',
    paddingBottom: 8,
    marginBottom: 4,
  },
});

export default ReviewPost;
