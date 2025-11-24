// Explore.js (formerly Search.js)
import React, {useState, useCallback, useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {useAppColors} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import {
  Search,
  ChevronRight,
  Star,
} from 'lucide-react-native';

const ExploreScreen = () => {
  const navigation = useNavigation();
  const colors = useAppColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    {id: 'search_1', query: 'Sony WH-1000XM4'},
    {id: 'search_2', query: 'iPhone 15 Pro'},
    {id: 'search_3', query: 'Tesla Model 3'},
    {id: 'search_4', query: 'Samsung QLED TV'},
    {id: 'search_5', query: 'Car detailing'},
  ]);

  // Mock data for categories
  const categories = [
    {
      id: '1',
      name: 'Electronics',
      icon: 'https://i.pravatar.cc/100?img=1',
      color: '#FF6B6B',
    },
    {
      id: '2',
      name: 'Automotive',
      icon: 'https://i.pravatar.cc/100?img=2',
      color: '#4ECDC4',
    },
    {
      id: '3',
      name: 'Home & Garden',
      icon: 'https://i.pravatar.cc/100?img=3',
      color: '#FFE66D',
    },
    {
      id: '4',
      name: 'Fashion',
      icon: 'https://i.pravatar.cc/100?img=4',
      color: '#6B5B95',
    },
    {
      id: '5',
      name: 'Beauty',
      icon: 'https://i.pravatar.cc/100?img=5',
      color: '#FF8C94',
    },
    {
      id: '6',
      name: 'Sports',
      icon: 'https://i.pravatar.cc/100?img=6',
      color: '#88D8B0',
    },
  ];

  // Mock data for top products
  const topProducts = [
    {
      id: '1',
      name: 'Sony WH-1000XM4',
      image: 'https://via.placeholder.com/300x300?text=Sony+Headphones',
      rating: 4.8,
      reviews: 1245,
      category: 'Electronics',
    },
    {
      id: '2',
      name: 'iPhone 15 Pro Max',
      image: 'https://via.placeholder.com/300x300?text=iPhone',
      rating: 4.7,
      reviews: 980,
      category: 'Electronics',
    },
    {
      id: '3',
      name: 'Samsung QLED TV',
      image: 'https://via.placeholder.com/300x300?text=Samsung+TV',
      rating: 4.5,
      reviews: 756,
      category: 'Electronics',
    },
    {
      id: '4',
      name: 'Tesla Model 3',
      image: 'https://via.placeholder.com/300x300?text=Tesla',
      rating: 4.9,
      reviews: 1890,
      category: 'Automotive',
    },
  ];

  // Mock data for services
  const topServices = [
    {
      id: '1',
      name: 'Car Detailing Pro',
      image: 'https://via.placeholder.com/300x300?text=Car+Detailing',
      rating: 4.6,
      reviews: 432,
      category: 'Automotive',
    },
    {
      id: '2',
      name: 'Home Cleaning Services',
      image: 'https://via.placeholder.com/300x300?text=Home+Cleaning',
      rating: 4.4,
      reviews: 678,
      category: 'Home & Garden',
    },
    {
      id: '3',
      name: 'Tech Repair Experts',
      image: 'https://via.placeholder.com/300x300?text=Tech+Repair',
      rating: 4.7,
      reviews: 521,
      category: 'Electronics',
    },
    {
      id: '4',
      name: 'Personal Fitness Training',
      image: 'https://via.placeholder.com/300x300?text=Fitness',
      rating: 4.8,
      reviews: 345,
      category: 'Sports',
    },
  ];

  // Mock data for top reviews
  const topReviews = [
    {
      id: '1',
      userName: 'John D.',
      userAvatar: 'https://i.pravatar.cc/100?img=12',
      productName: 'Sony WH-1000XM4',
      rating: 5,
      content:
        'These headphones are amazing! The noise cancellation is top-notch and the sound quality is incredible.',
      likes: 42,
      comments: 8,
    },
    {
      id: '2',
      userName: 'Sarah M.',
      userAvatar: 'https://i.pravatar.cc/100?img=23',
      productName: 'iPhone 15 Pro Max',
      rating: 4,
      content:
        'Great phone overall. The camera is fantastic and battery life is good. A bit pricey though.',
      likes: 36,
      comments: 12,
    },
    {
      id: '3',
      userName: 'Michael B.',
      userAvatar: 'https://i.pravatar.cc/100?img=45',
      productName: 'Tesla Model 3',
      rating: 5,
      content:
        "Best car I've ever owned! The acceleration is mind-blowing and the autopilot features make driving so much easier.",
      likes: 87,
      comments: 23,
    },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('SearchResults', {
        query: searchQuery.trim(),
        filter: activeFilter,
      });
    }
  };

  const handleSearchSubmit = () => {
    handleSearch();
    setIsSearchActive(false);
  };

  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  const handleSearchBlur = () => {
    if (!searchQuery.trim()) {
      setIsSearchActive(false);
    }
  };

  const handleRecentSearchPress = useCallback(
    query => {
      setSearchQuery(query);
      navigation.navigate('SearchResults', {
        query: query,
        filter: activeFilter,
      });
    },
    [activeFilter, navigation],
  );

  const clearRecentSearch = useCallback(id => {
    setRecentSearches(prev => prev.filter(item => item.id !== id));
  }, []);


  const navigateToCategory = useCallback(
    category => {
      navigation.navigate('CategoryProducts', {category});
    },
    [navigation],
  );

  const navigateToAllCategories = useCallback(() => {
    navigation.navigate('AllCategories');
  }, [navigation]);

  const navigateToProduct = useCallback(
    product => {
      navigation.navigate('Product', {productId: product.id});
    },
    [navigation],
  );

  const navigateToComments = useCallback(
    review => {
      navigation.navigate('Comments', {
        postId: review.id,
        title: review.productName,
        content: review.content,
      });
    },
    [navigation],
  );

  const navigateToProfile = useCallback(
    userId => {
      navigation.navigate('Profile', {userId});
    },
    [navigation],
  );

  const renderCategoryItem = useCallback(({item}) => (
    <TouchableOpacity
      style={[styles.categoryItem, {backgroundColor: item.color + '20'}]}
      onPress={() => navigateToCategory(item)}>
      <View
        style={[styles.categoryIconContainer, {backgroundColor: item.color}]}>
        <Image source={{uri: item.icon}} style={styles.categoryIcon} />
      </View>
      <Text style={[styles.categoryName, {color: colors.primaryText}]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  ), [colors, navigateToCategory]);

  const renderProductItem = useCallback(({item}) => (
    <TouchableOpacity
      style={[styles.productCard, {backgroundColor: colors.secondary}]}
      onPress={() => navigateToProduct(item)}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text
          style={[styles.productName, {color: colors.primaryText}]}
          numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Star
            size={14}
            color={colors.brandAccentColor}
            fill={colors.brandAccentColor}
          />
          <Text style={[styles.ratingText, {color: colors.secondaryText}]}>
            {item.rating} ({item.reviews})
          </Text>
        </View>
        <Text style={[styles.categoryLabel, {color: colors.secondaryText}]}>
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  ), [colors, navigateToProduct]);

  const renderReviewItem = useCallback(({item}) => (
    <TouchableOpacity
      style={[styles.reviewCard, {backgroundColor: colors.secondary}]}
      onPress={() => navigateToComments(item)}>
      <View style={styles.reviewHeader}>
        <TouchableOpacity
          style={styles.reviewUserContainer}
          onPress={() => navigateToProfile(item.id)}>
          <Image source={{uri: item.userAvatar}} style={styles.userAvatar} />
          <Text style={[styles.userName, {color: colors.primaryText}]}>
            {item.userName}
          </Text>
        </TouchableOpacity>
        <View style={styles.reviewRating}>
          {[1, 2, 3, 4, 5].map(star => (
            <Star
              key={star}
              size={12}
              color={colors.brandAccentColor}
              fill={
                star <= item.rating ? colors.brandAccentColor : 'transparent'
              }
            />
          ))}
        </View>
      </View>
      <Text style={[styles.productTitle, {color: colors.brandAccentColor}]}>
        {item.productName}
      </Text>
      <Text
        style={[styles.reviewContent, {color: colors.primaryText}]}
        numberOfLines={2}>
        {item.content}
      </Text>
      <View style={styles.reviewStats}>
        <Text style={[styles.reviewStat, {color: colors.secondaryText}]}>
          {item.likes} likes
        </Text>
        <Text style={[styles.reviewStat, {color: colors.secondaryText}]}>
          {item.comments} comments
        </Text>
      </View>
    </TouchableOpacity>
  ), [colors, navigateToComments, navigateToProfile]);

  const recentSearchesComponent = useMemo(
    () => (
      <View style={styles.recentSearchesContainer}>
        <Text style={[styles.recentSearchesTitle, {color: colors.primaryText}]}>
          Recent Searches
        </Text>
        {recentSearches.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.recentSearchItem,
              {borderBottomColor: colors.divider},
            ]}
            onPress={() => handleRecentSearchPress(item.query)}>
            <Search size={16} color={colors.secondaryText} strokeWidth={2} />
            <Text
              style={[styles.recentSearchText, {color: colors.primaryText}]}>
              {item.query}
            </Text>
            <TouchableOpacity
              style={styles.clearSearchButton}
              onPress={() => clearRecentSearch(item.id)}>
              <Text
                style={[styles.clearSearchText, {color: colors.secondaryText}]}>
                ×
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    ),
    [recentSearches, colors, handleRecentSearchPress, clearRecentSearch],
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.primaryBG}]}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, {backgroundColor: colors.secondary}]}>
          <Search size={20} color={colors.secondaryText} strokeWidth={2} />
          <TextInput
            style={[styles.searchInput, {color: colors.primaryText}]}
            placeholder="Search products, services, brands..."
            placeholderTextColor={colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchSubmit}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={handleSearch}
              style={styles.searchButton}>
              <Text
                style={[
                  styles.searchButtonText,
                  {color: colors.brandAccentColor},
                ]}>
                Search
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Show recent searches or content */}
      {isSearchActive && searchQuery.length === 0 ? (
        recentSearchesComponent
      ) : isSearchActive && searchQuery.length > 0 ? (
        <View style={styles.searchResultsContainer}>
          <Text style={[styles.searchingText, {color: colors.secondaryText}]}>
            Press search to see results for "{searchQuery}"
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          {/* Categories Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, {color: colors.primaryText}]}>
                Top Categories
              </Text>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={navigateToAllCategories}>
                <Text style={[styles.viewAllText, {color: colors.linkColor}]}>
                  View All
                </Text>
                <ChevronRight size={16} color={colors.linkColor} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={categories.slice(0, 6)}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
              initialNumToRender={4}
              maxToRenderPerBatch={4}
              windowSize={3}
            />
          </View>

          {/* Top Products Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, {color: colors.primaryText}]}>
                Top Products
              </Text>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => navigation.navigate('AllProducts')}>
                <Text style={[styles.viewAllText, {color: colors.linkColor}]}>
                  View All
                </Text>
                <ChevronRight size={16} color={colors.linkColor} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={topProducts}
              renderItem={renderProductItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsContainer}
              initialNumToRender={3}
              maxToRenderPerBatch={3}
              windowSize={3}
              removeClippedSubviews={true}
            />
          </View>

          {/* Top Services Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, {color: colors.primaryText}]}>
                Top Services
              </Text>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => navigation.navigate('AllServices')}>
                <Text style={[styles.viewAllText, {color: colors.linkColor}]}>
                  View All
                </Text>
                <ChevronRight size={16} color={colors.linkColor} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={topServices}
              renderItem={renderProductItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsContainer}
              initialNumToRender={3}
              maxToRenderPerBatch={3}
              windowSize={3}
              removeClippedSubviews={true}
            />
          </View>

          {/* Top Reviews Section */}
          <View style={[styles.sectionContainer, {marginBottom: 20}]}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, {color: colors.primaryText}]}>
                Top Reviews
              </Text>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => navigation.navigate('AllReviews')}>
                <Text style={[styles.viewAllText, {color: colors.linkColor}]}>
                  View All
                </Text>
                <ChevronRight size={16} color={colors.linkColor} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={topReviews}
              renderItem={renderReviewItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerButton: {
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 16,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  searchButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: 'rgba(176, 8, 20, 0.1)',
    marginLeft: 8,
  },
  searchButtonText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  scrollContainer: {
    flex: 1,
  },
  recentSearchesContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  recentSearchesTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    marginBottom: 12,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  recentSearchText: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    marginLeft: 12,
    flex: 1,
  },
  clearSearchButton: {
    padding: 4,
  },
  clearSearchText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  searchingText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginRight: 4,
  },
  categoriesContainer: {
    paddingRight: 16,
  },
  categoryItem: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  categoryName: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
  productsContainer: {
    paddingRight: 16,
  },
  productCard: {
    width: 160,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 120,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    marginLeft: 4,
  },
  categoryLabel: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
  },
  reviewCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  productTitle: {
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    marginBottom: 8,
  },
  reviewContent: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewStats: {
    flexDirection: 'row',
  },
  reviewStat: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    marginRight: 16,
  },
  filtersContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginHorizontal: 16,
  },
  filtersScrollContainer: {
    paddingHorizontal: 4,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 4,
    minWidth: 70,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
});

export default ExploreScreen;
