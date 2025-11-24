import React, {useState, useRef, useCallback, useMemo} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useCommonStyles} from '../../common-styling/theme-styling';
import {ReviewPost, StatsComponent} from '../../components';
import {useAppColors} from '../../utils/colors';
import {generateDummyPosts} from '../../utils/helper-functions';
import {Search, ChevronLeft, Star} from 'lucide-react-native';
import {productImages} from '../../assets/images';

// Get the window dimensions
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const Product = ({navigation}) => {
  const [posts, setPosts] = useState(generateDummyPosts(8));
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRatingFilter, setSelectedRatingFilter] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef(null);
  const scrollViewRef = useRef(null);

  // Track carousel scroll state to prevent parent ScrollView interference
  const carouselScrollState = useRef({
    isScrolling: false,
    startX: 0,
    startY: 0,
  });

  const commonStyles = useCommonStyles();
  const colors = useAppColors();
  const loadMorePosts = () => {
    const newPosts = generateDummyPosts(10);
    setPosts([...posts, ...newPosts]);
  };
  const dummyStats = [
    {id: '1', title: 'Customers', count: 69},
    {id: '2', title: 'Reviews', count: 69},
    {id: '3', title: 'Rating', count: 4.5},
  ];

  // Use product images from assets
  const images = productImages;

  // Filter posts by rating and search query - memoized for performance
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesRating = selectedRatingFilter
        ? Math.floor(post.rating) === selectedRatingFilter
        : true;
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRating && matchesSearch;
    });
  }, [posts, selectedRatingFilter, searchQuery]);

  const getImageSource = useCallback(img => {
    if (!img) return productImages[0];
    if (typeof img === 'number') return img;
    if (typeof img === 'string') return {uri: img};
    if (img.uri) return {uri: img.uri};
    return productImages[0];
  }, []);

  // Memoized carousel item renderer for performance
  const renderCarouselItem = useCallback(
    ({item}) => {
      const imageSource = getImageSource(item);
      return (
        <View style={styles.carouselImageContainer}>
          <Image
            source={imageSource}
            style={styles.carouselImage}
            resizeMode="cover"
          />
        </View>
      );
    },
    [getImageSource],
  );

  const handleCarouselScroll = useCallback(
    event => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / windowWidth);
      // Clamp index to valid range
      const clampedIndex = Math.max(0, Math.min(index, images.length - 1));
      setCarouselIndex(clampedIndex);
    },
    [images.length],
  );

  // Handle scroll begin/end to manage gesture conflicts
  const handleScrollBeginDrag = useCallback(() => {
    carouselScrollState.current.isScrolling = true;
    if (scrollViewRef.current) {
      scrollViewRef.current.setNativeProps({scrollEnabled: false});
    }
  }, []);

  const handleScrollEndDrag = useCallback(() => {
    // Delay to allow momentum scroll to complete
    setTimeout(() => {
      carouselScrollState.current.isScrolling = false;
      if (scrollViewRef.current) {
        scrollViewRef.current.setNativeProps({scrollEnabled: true});
      }
    }, 100);
  }, []);

  const handleMomentumScrollEnd = useCallback(() => {
    carouselScrollState.current.isScrolling = false;
    if (scrollViewRef.current) {
      scrollViewRef.current.setNativeProps({scrollEnabled: true});
    }
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPosts(generateDummyPosts(10)); // Refresh the list with new data
      setRefreshing(false);
    }, 2000);
  };

  const renderItem = ({item}) => (
    <ReviewPost
      title={item.title}
      content={item.content}
      images={item.images}
    />
  );
  const ListHeaderComponent = () => {
    return (
      <View style={styles.reviewsHeader}>
        <Text
          style={[commonStyles.subHeading, {marginTop: 8, marginBottom: 12}]}>
          Reviews
        </Text>
        {/* Search Bar for Reviews */}
        <View style={[styles.searchBar, {backgroundColor: colors.secondary}]}>
          <Search size={20} color={colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, {color: colors.primaryText}]}
            placeholder="Search something about this product..."
            placeholderTextColor={colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        {/* Star Rating Filters */}
        <View style={styles.ratingFiltersContainer}>
          <Text
            style={[
              commonStyles.smallLabel,
              {color: colors.secondaryText, marginBottom: 8},
            ]}>
            Filter by Rating:
          </Text>
          <View style={styles.ratingFilters}>
            {[5, 4, 3, 2, 1].map(rating => (
              <TouchableOpacity
                key={rating}
                style={[
                  styles.ratingFilterButton,
                  {
                    backgroundColor:
                      selectedRatingFilter === rating
                        ? colors.brandAccentColor
                        : colors.secondary,
                    borderColor:
                      selectedRatingFilter === rating
                        ? colors.brandAccentColor
                        : colors.divider,
                  },
                ]}
                onPress={() =>
                  setSelectedRatingFilter(
                    selectedRatingFilter === rating ? null : rating,
                  )
                }>
                <Star
                  size={16}
                  color={
                    selectedRatingFilter === rating
                      ? '#FFFFFF'
                      : colors.starColor
                  }
                  fill={
                    selectedRatingFilter === rating
                      ? '#FFFFFF'
                      : colors.starColor
                  }
                />
                <View style={{width: 4}} />
                <Text
                  style={[
                    styles.ratingFilterText,
                    {
                      color:
                        selectedRatingFilter === rating
                          ? '#FFFFFF'
                          : colors.primaryText,
                    },
                  ]}>
                  {rating}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={[styles.container, {backgroundColor: colors.primaryBG}]}
      contentContainerStyle={{alignItems: 'center'}}
      scrollEventThrottle={16}>
      <View style={{width: '100%', paddingHorizontal: 16, paddingTop: 12}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 4,
          }}>
          <ChevronLeft size={24} color={colors.primaryText} />
        </TouchableOpacity>
      </View>
      <View
        style={{flexDirection: 'column', alignSelf: 'flex-start', padding: 16}}>
        <Text style={[commonStyles.heading, {}]}>iPhone 15 Pro Max</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Brand');
          }}>
          <Text style={[commonStyles.label, {color: colors.brandAccentColor}]}>
            by {'Apple'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 16}}>
        <StatsComponent stats={dummyStats} />
      </View>
      {images.length > 0 && (
        <View style={styles.carouselWrapper}>
          <FlatList
            ref={carouselRef}
            data={images}
            renderItem={renderCarouselItem}
            keyExtractor={(item, index) => `image-${index}`}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            snapToInterval={windowWidth}
            snapToAlignment="start"
            disableIntervalMomentum={true}
            onScroll={handleCarouselScroll}
            onScrollBeginDrag={handleScrollBeginDrag}
            onScrollEndDrag={event => {
              handleScrollEndDrag();
              // Snap to nearest page after drag ends
              const offsetX = event.nativeEvent.contentOffset.x;
              const index = Math.round(offsetX / windowWidth);
              const clampedIndex = Math.max(
                0,
                Math.min(index, images.length - 1),
              );
              if (carouselRef.current) {
                carouselRef.current.scrollToIndex({
                  index: clampedIndex,
                  animated: true,
                });
              }
            }}
            onMomentumScrollEnd={event => {
              handleMomentumScrollEnd();
              // Ensure we're on the correct page
              const offsetX = event.nativeEvent.contentOffset.x;
              const index = Math.round(offsetX / windowWidth);
              const clampedIndex = Math.max(
                0,
                Math.min(index, images.length - 1),
              );
              if (carouselIndex !== clampedIndex) {
                setCarouselIndex(clampedIndex);
              }
            }}
            scrollEventThrottle={16}
            getItemLayout={(data, index) => ({
              length: windowWidth,
              offset: windowWidth * index,
              index,
            })}
            initialNumToRender={2}
            maxToRenderPerBatch={2}
            windowSize={3}
            removeClippedSubviews={true}
            onScrollToIndexFailed={info => {
              // Handle scroll to index failure gracefully
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                if (carouselRef.current) {
                  carouselRef.current.scrollToIndex({
                    index: info.index,
                    animated: false,
                  });
                }
              });
            }}
          />
          {images.length > 1 && (
            <View style={styles.dotsContainer}>
              {images.map((_, index) => (
                <View
                  key={`dot-${index}`}
                  style={[
                    styles.dot,
                    {
                      width: carouselIndex === index ? 24 : 8,
                      backgroundColor:
                        carouselIndex === index
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
      <View style={{width: '100%', paddingHorizontal: 8}}>
        <View style={[styles.specsTitleContainer]}>
          <Text style={commonStyles.title}>Specifications </Text>
          {/* <Text style={[commonStyles.label, {textDecorationLine: 'underline'}]}>
            View all specs
          </Text> */}
        </View>
        <Text style={commonStyles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          purus nec nulla tincidunt. Nulla facilisi. Donec euismod, nisl vitae
          posuere ultricies, purus nunc ultricies nunc, nec ultricies elit
          libero non eros.
        </Text>
      </View>
      <View style={styles.reviewsContainer}>
        <FlatList
          data={filteredPosts}
          renderItem={renderItem}
          key={item => item.id}
          ListHeaderComponent={ListHeaderComponent}
          keyExtractor={item => item.id}
          scrollEventThrottle={8}
          initialNumToRender={5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[commonStyles.text, {color: colors.secondaryText}]}>
                No reviews found matching your criteria
              </Text>
            </View>
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Change as per your theme
    // padding: 16,
    width: windowWidth,
    // alignItems: 'center', // Center the content horizontally
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  carouselWrapper: {
    marginVertical: 16,
    width: windowWidth,
    height: windowWidth,
  },
  carouselImageContainer: {
    width: windowWidth,
    height: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: windowWidth,
    height: windowWidth,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  reviewsContainer: {
    width: '100%',
  },
  reviewsHeader: {
    paddingHorizontal: 16,
  },
  ratingFiltersContainer: {
    marginTop: 12,
    marginBottom: 16,
  },
  ratingFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ratingFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  ratingFilterText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  specsTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  list: {
    paddingBottom: 20,
  },
});

export default Product;
