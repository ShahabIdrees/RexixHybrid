import React, {useState, useRef, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
  Pressable,
  Animated,
  Modal,
  Dimensions,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {darkColors, lightColors} from '../utils/colors';
import RatingComponent from './rating-component';
import {useNavigation} from '@react-navigation/native';
import {hp, windowWidth} from '../utils/environment';
import Carousel from 'react-native-reanimated-carousel';
import {placeholderImages} from '../assets/images';
import {
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Calendar,
  ChevronDown,
  ChevronUp,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const ReviewPost = React.memo(
  ({title, content, images = [], rating = 4.5, postId = '1'}) => {
    const navigation = useNavigation();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [imagePreviewVisible, setImagePreviewVisible] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    // Reference for ScrollView zoom
    const scrollViewRefs = useRef({});

    const colorScheme = useColorScheme();
    const colors = useMemo(
      () => (colorScheme === 'dark' ? darkColors : lightColors),
      [colorScheme],
    );

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
      if (disliked) {
        setDisliked(false);
      }
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
      if (liked) {
        setLiked(false);
      }
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

    const openImagePreview = index => {
      setPreviewIndex(index);
      setImagePreviewVisible(true);
    };

    const closeImagePreview = () => {
      setImagePreviewVisible(false);
    };

    const renderImageGrid = () => {
      if (!images || images.length === 0) return null;

      // Get image source - handle both string URLs, require() objects, and objects with uri
      const getImageSource = img => {
        if (!img) return placeholderImages[0];
        // If it's already a require() object (number in React Native), return as is
        if (typeof img === 'number') return img;
        // If it's a string URL, return as uri
        if (typeof img === 'string') return {uri: img};
        // If it's an object with uri property
        if (img.uri) return {uri: img.uri};
        // Fallback to placeholder
        return placeholderImages[0];
      };

      // Handle different image counts
      if (images.length === 1) {
        return (
          <TouchableOpacity
            style={styles.singleImageContainer}
            onPress={() => openImagePreview(0)}
            activeOpacity={0.9}>
            <Image
              source={getImageSource(images[0])}
              style={styles.singleImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      }

      const displayImages = images.slice(0, 4);
      const remainingCount = images.length - 4;
      const hasMoreImages = remainingCount > 0;

      return (
        <View style={styles.imageGridContainer}>
          {/* Large image on left */}
          <TouchableOpacity
            style={styles.largeImageContainer}
            onPress={() => openImagePreview(0)}
            activeOpacity={0.9}>
            <Image
              source={getImageSource(displayImages[0])}
              style={styles.largeImage}
              resizeMode="cover"
            />
          </TouchableOpacity>

          {/* Three smaller images on right */}
          <View style={styles.rightImagesContainer}>
            {displayImages.slice(1, 4).map((img, index) => {
              const actualIndex = index + 1;
              const isLastVisible = actualIndex === 3;
              const showOverlay = isLastVisible && hasMoreImages;

              return (
                <TouchableOpacity
                  key={actualIndex}
                  style={[
                    styles.smallImageContainer,
                    index < 2 && styles.smallImageSpacing,
                  ]}
                  onPress={() => openImagePreview(actualIndex)}
                  activeOpacity={0.9}>
                  <Image
                    source={getImageSource(img)}
                    style={styles.smallImage}
                    resizeMode="cover"
                  />
                  {showOverlay && (
                    <View style={styles.imageOverlay}>
                      <Text style={styles.overlayText}>+{remainingCount}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    };

    const renderImagePreview = () => {
      if (!images || images.length === 0) return null;

      // Get image source - handle both string URLs, require() objects, and objects with uri
      const getImageSource = img => {
        if (!img) return placeholderImages[0];
        // If it's already a require() object (number in React Native), return as is
        if (typeof img === 'number') return img;
        // If it's a string URL, return as uri
        if (typeof img === 'string') return {uri: img};
        // If it's an object with uri property
        if (img.uri) return {uri: img.uri};
        // Fallback to placeholder
        return placeholderImages[0];
      };

      return (
        <Modal
          visible={imagePreviewVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeImagePreview}
          statusBarTranslucent>
          <StatusBar hidden />
          <SafeAreaView style={styles.previewContainer}>
            <View style={styles.previewHeader}>
              <TouchableOpacity
                style={styles.previewCloseButton}
                onPress={closeImagePreview}>
                <X size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.previewCounter}>
                {previewIndex + 1} / {images.length}
              </Text>
              <View style={styles.previewHeaderSpacer} />
            </View>

            <Carousel
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              data={images}
              defaultIndex={previewIndex}
              loop={false}
              scrollAnimationDuration={300}
              onSnapToItem={index => {
                setPreviewIndex(index);
                // Reset zoom when changing images by scrolling to top
                const prevRef = scrollViewRefs.current[previewIndex];
                if (prevRef && prevRef.scrollTo) {
                  prevRef.scrollTo({x: 0, y: 0, animated: false});
                }
              }}
              renderItem={({item, index}) => (
                <ScrollView
                  ref={ref => {
                    if (ref) scrollViewRefs.current[index] = ref;
                  }}
                  contentContainerStyle={styles.zoomContainer}
                  maximumZoomScale={3}
                  minimumZoomScale={1}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  bouncesZoom={true}
                  scrollEventThrottle={16}>
                  <Image
                    source={getImageSource(item)}
                    style={styles.previewImage}
                    resizeMode="contain"
                  />
                </ScrollView>
              )}
            />

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                {previewIndex > 0 && (
                  <TouchableOpacity
                    style={[styles.navArrow, styles.navArrowLeft]}
                    onPress={() => {
                      // This will be handled by Carousel's swipe
                    }}>
                    <ChevronLeft size={32} color="#FFFFFF" />
                  </TouchableOpacity>
                )}
                {previewIndex < images.length - 1 && (
                  <TouchableOpacity
                    style={[styles.navArrow, styles.navArrowRight]}
                    onPress={() => {
                      // This will be handled by Carousel's swipe
                    }}>
                    <ChevronRight size={32} color="#FFFFFF" />
                  </TouchableOpacity>
                )}
              </>
            )}
          </SafeAreaView>
        </Modal>
      );
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
            <RatingComponent rating={rating} />
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

        {images.length > 0 && renderImageGrid()}
        {renderImagePreview()}

        <View style={styles.engagementContainer}>
          <TouchableOpacity
            style={styles.engagementButton}
            onPress={navigateToCommentsPage}>
            <MessageCircle
              size={18}
              color={colors.secondaryText}
              strokeWidth={1.5}
            />
            <Text
              style={[styles.engagementText, {color: colors.secondaryText}]}>
              12
            </Text>
          </TouchableOpacity>

          <Animated.View style={{transform: [{scale: scaleAnim}]}}>
            <TouchableOpacity
              style={styles.engagementButton}
              onPress={handleLikePress}>
              <ThumbsUp
                size={18}
                color={liked ? colors.brandAccentColor : colors.secondaryText}
                fill={liked ? colors.brandAccentColor : 'transparent'}
                strokeWidth={1.5}
              />
              <Text
                style={[
                  styles.engagementText,
                  {
                    color: liked
                      ? colors.brandAccentColor
                      : colors.secondaryText,
                  },
                ]}>
                {liked ? '6' : '5'}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{transform: [{scale: scaleAnim}]}}>
            <TouchableOpacity
              style={styles.engagementButton}
              onPress={handleDislikePress}>
              <ThumbsDown
                size={18}
                color={disliked ? colors.error : colors.secondaryText}
                fill={disliked ? colors.error : 'transparent'}
                strokeWidth={1.5}
              />
              <Text
                style={[
                  styles.engagementText,
                  {color: disliked ? colors.error : colors.secondaryText},
                ]}>
                {disliked ? '3' : '2'}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity style={styles.engagementButton}>
            <Share2 size={18} color={colors.secondaryText} strokeWidth={1.5} />
            <Text
              style={[styles.engagementText, {color: colors.secondaryText}]}>
              8
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function for React.memo
    return (
      prevProps.title === nextProps.title &&
      prevProps.content === nextProps.content &&
      prevProps.rating === nextProps.rating &&
      prevProps.postId === nextProps.postId &&
      prevProps.images?.length === nextProps.images?.length
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 12,
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
  singleImageContainer: {
    marginVertical: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  singleImage: {
    width: '100%',
    height: windowWidth * 0.6,
    borderRadius: 12,
  },
  imageGridContainer: {
    flexDirection: 'row',
    marginVertical: 12,
    height: windowWidth * 0.6,
    borderRadius: 12,
    overflow: 'hidden',
    gap: 4,
  },
  largeImageContainer: {
    flex: 1,
  },
  largeImage: {
    width: '100%',
    height: '100%',
  },
  rightImagesContainer: {
    flex: 0.48,
    gap: 4,
  },
  smallImageContainer: {
    flex: 1,
    position: 'relative',
  },
  smallImageSpacing: {
    marginBottom: 4,
  },
  smallImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Roboto-Bold',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  previewHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  previewCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewCounter: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
  previewHeaderSpacer: {
    width: 40,
  },
  zoomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  previewImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  navArrow: {
    position: 'absolute',
    top: '50%',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  navArrowLeft: {
    left: 16,
  },
  navArrowRight: {
    right: 16,
  },
  engagementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 12,
  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  engagementText: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    marginLeft: 6,
  },
});

export default ReviewPost;
