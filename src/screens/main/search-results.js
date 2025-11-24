import React, {useState, useEffect, useCallback} from 'react';
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
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Search,
  ArrowLeft,
  Star,
  ChevronRight,
  User,
  Building2,
  Package,
  Briefcase,
  MessageSquare,
} from 'lucide-react-native';

const SearchResultsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const colors = useAppColors();
  const [searchQuery, setSearchQuery] = useState(route.params?.query || '');
  const [activeFilter, setActiveFilter] = useState(
    route.params?.filter || 'All',
  );
  const [searchResults, setSearchResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const filters = [
    {id: 'all', name: 'All', icon: null},
    {id: 'reviews', name: 'Reviews', icon: MessageSquare},
    {id: 'products', name: 'Products', icon: Package},
    {id: 'users', name: 'People', icon: User},
    {id: 'services', name: 'Services', icon: Briefcase},
    {id: 'brands', name: 'Brands', icon: Building2},
  ];

  // Mock search data - in a real app, this would come from an API
  const mockSearchData = {
    products: [
      {
        id: '1',
        name: 'Sony WH-1000XM4',
        image: 'https://via.placeholder.com/300x300?text=Sony+Headphones',
        rating: 4.8,
        reviews: 1245,
        category: 'Electronics',
        price: '$349.99',
        brand: 'Sony',
      },
      {
        id: '2',
        name: 'iPhone 15 Pro Max',
        image: 'https://via.placeholder.com/300x300?text=iPhone',
        rating: 4.7,
        reviews: 980,
        category: 'Electronics',
        price: '$1199.99',
        brand: 'Apple',
      },
      {
        id: '3',
        name: 'Samsung QLED TV',
        image: 'https://via.placeholder.com/300x300?text=Samsung+TV',
        rating: 4.5,
        reviews: 756,
        category: 'Electronics',
        price: '$1299.99',
        brand: 'Samsung',
      },
      {
        id: '4',
        name: 'Tesla Model 3',
        image: 'https://via.placeholder.com/300x300?text=Tesla',
        rating: 4.9,
        reviews: 1890,
        category: 'Automotive',
        price: '$41,990',
        brand: 'Tesla',
      },
    ],
    services: [
      {
        id: '1',
        name: 'Car Detailing Pro',
        image: 'https://via.placeholder.com/300x300?text=Car+Detailing',
        rating: 4.6,
        reviews: 432,
        category: 'Automotive',
        price: 'From $89',
        provider: 'AutoCare Services',
      },
      {
        id: '2',
        name: 'Home Cleaning Services',
        image: 'https://via.placeholder.com/300x300?text=Home+Cleaning',
        rating: 4.4,
        reviews: 678,
        category: 'Home & Garden',
        price: 'From $75',
        provider: 'CleanPro',
      },
      {
        id: '3',
        name: 'Tech Repair Experts',
        image: 'https://via.placeholder.com/300x300?text=Tech+Repair',
        rating: 4.7,
        reviews: 521,
        category: 'Electronics',
        price: 'From $45',
        provider: 'TechFix',
      },
    ],
    reviews: [
      {
        id: '1',
        userName: 'John D.',
        userAvatar: 'https://i.pravatar.cc/100?img=12',
        productName: 'Sony WH-1000XM4',
        rating: 5,
        content:
          'These headphones are amazing! The noise cancellation is top-notch.',
        likes: 42,
        comments: 8,
        timeAgo: '2 hours ago',
      },
      {
        id: '2',
        userName: 'Sarah M.',
        userAvatar: 'https://i.pravatar.cc/100?img=23',
        productName: 'iPhone 15 Pro Max',
        rating: 4,
        content:
          'Great phone overall. Camera is fantastic, battery life is good.',
        likes: 36,
        comments: 12,
        timeAgo: '5 hours ago',
      },
      {
        id: '3',
        userName: 'Michael B.',
        userAvatar: 'https://i.pravatar.cc/100?img=45',
        productName: 'Tesla Model 3',
        rating: 5,
        content: "Best car I've ever owned! Acceleration is mind-blowing.",
        likes: 87,
        comments: 23,
        timeAgo: '1 day ago',
      },
    ],
    people: [
      {
        id: '1',
        name: 'John Smith',
        avatar: 'https://i.pravatar.cc/100?img=1',
        bio: 'Tech enthusiast and product reviewer',
        followers: 12500,
        reviews: 234,
        verified: true,
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/100?img=2',
        bio: 'Home improvement and lifestyle expert',
        followers: 8900,
        reviews: 156,
        verified: false,
      },
      {
        id: '3',
        name: 'Mike Chen',
        avatar: 'https://i.pravatar.cc/100?img=3',
        bio: 'Automotive specialist and car reviewer',
        followers: 15600,
        reviews: 289,
        verified: true,
      },
    ],
    brands: [
      {
        id: '1',
        name: 'Sony',
        logo: 'https://via.placeholder.com/100x100?text=Sony',
        description: 'Japanese multinational technology corporation',
        products: 145,
        rating: 4.6,
        followers: 125000,
      },
      {
        id: '2',
        name: 'Apple',
        logo: 'https://via.placeholder.com/100x100?text=Apple',
        description: 'American multinational technology company',
        products: 89,
        rating: 4.8,
        followers: 890000,
      },
      {
        id: '3',
        name: 'Tesla',
        logo: 'https://via.placeholder.com/100x100?text=Tesla',
        description: 'Electric vehicle and clean energy company',
        products: 23,
        rating: 4.9,
        followers: 456000,
      },
    ],
  };

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [searchQuery, activeFilter, performSearch]);

  const performSearch = useCallback(
    query => {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const results = {};
        const searchTerm = query.toLowerCase();

        // Filter each category
        Object.keys(mockSearchData).forEach(category => {
          const filtered = mockSearchData[category].filter(item => {
            if (category === 'reviews') {
              return (
                item.productName.toLowerCase().includes(searchTerm) ||
                item.content.toLowerCase().includes(searchTerm) ||
                item.userName.toLowerCase().includes(searchTerm)
              );
            } else if (category === 'people') {
              return (
                item.name.toLowerCase().includes(searchTerm) ||
                item.bio.toLowerCase().includes(searchTerm)
              );
            } else if (category === 'brands') {
              return (
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm)
              );
            } else {
              return (
                item.name.toLowerCase().includes(searchTerm) ||
                (item.category &&
                  item.category.toLowerCase().includes(searchTerm)) ||
                (item.brand && item.brand.toLowerCase().includes(searchTerm))
              );
            }
          });
          if (filtered.length > 0) {
            results[category] = filtered;
          }
        });

        setSearchResults(results);
        setIsLoading(false);
      }, 300);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleFilterChange = filterName => {
    setActiveFilter(filterName);
  };

  const navigateToViewAll = category => {
    const filterName = category.charAt(0).toUpperCase() + category.slice(1);
    setActiveFilter(filterName);
  };

  const handleSearch = text => {
    setSearchQuery(text);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim());
    }
  };

  const navigateToProduct = item => {
    navigation.navigate('Product', {
      productId: item.id,
      isService: false,
    });
  };

  const navigateToService = item => {
    navigation.navigate('Product', {
      productId: item.id,
      isService: true,
    });
  };

  const navigateToProfile = item => {
    navigation.navigate('Profile', {
      userId: item.id,
    });
  };

  const navigateToBrand = item => {
    navigation.navigate('Brand', {
      brandId: item.id,
    });
  };

  const navigateToComments = item => {
    navigation.navigate('Comments', {
      postId: item.id,
      title: item.productName,
      content: item.content,
    });
  };

  // Render functions for different content types
  const renderProductItem = ({item}) => (
    <TouchableOpacity
      style={[styles.resultCard, {backgroundColor: colors.secondary}]}
      onPress={() => navigateToProduct(item)}>
      <Image source={{uri: item.image}} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Text
          style={[styles.resultName, {color: colors.primaryText}]}
          numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Star size={14} color={colors.starColor} fill={colors.starColor} />
          <Text style={[styles.ratingText, {color: colors.secondaryText}]}>
            {item.rating} ({item.reviews} reviews)
          </Text>
        </View>
        <Text style={[styles.categoryText, {color: colors.secondaryText}]}>
          {item.category} • {item.brand}
        </Text>
        <Text style={[styles.priceText, {color: colors.brandAccentColor}]}>
          {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderServiceItem = ({item}) => (
    <TouchableOpacity
      style={[styles.resultCard, {backgroundColor: colors.secondary}]}
      onPress={() => navigateToService(item)}>
      <Image source={{uri: item.image}} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Text
          style={[styles.resultName, {color: colors.primaryText}]}
          numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Star size={14} color={colors.starColor} fill={colors.starColor} />
          <Text style={[styles.ratingText, {color: colors.secondaryText}]}>
            {item.rating} ({item.reviews} reviews)
          </Text>
        </View>
        <Text style={[styles.categoryText, {color: colors.secondaryText}]}>
          {item.category} • {item.provider}
        </Text>
        <Text style={[styles.priceText, {color: colors.brandAccentColor}]}>
          {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderReviewItem = ({item}) => (
    <TouchableOpacity
      style={[styles.reviewCard, {backgroundColor: colors.secondary}]}
      onPress={() => navigateToComments(item)}>
      <View style={styles.reviewHeader}>
        <TouchableOpacity
          style={styles.reviewUserContainer}
          onPress={() => navigateToProfile({id: item.id, name: item.userName})}>
          <Image source={{uri: item.userAvatar}} style={styles.userAvatar} />
          <View style={styles.userInfo}>
            <Text style={[styles.userName, {color: colors.primaryText}]}>
              {item.userName}
            </Text>
            <Text style={[styles.timeAgo, {color: colors.secondaryText}]}>
              {item.timeAgo}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.reviewRating}>
          {[1, 2, 3, 4, 5].map(star => (
            <Star
              key={star}
              size={12}
              color={colors.starColor}
              fill={star <= item.rating ? colors.starColor : 'transparent'}
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
          {item.likes} likes • {item.comments} comments
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderPersonItem = ({item}) => (
    <TouchableOpacity
      style={[styles.personCard, {backgroundColor: colors.secondary}]}
      onPress={() => navigateToProfile(item)}>
      <Image source={{uri: item.avatar}} style={styles.personAvatar} />
      <View style={styles.personInfo}>
        <View style={styles.personHeader}>
          <Text style={[styles.personName, {color: colors.primaryText}]}>
            {item.name}
          </Text>
          {item.verified && (
            <Text
              style={[styles.verifiedBadge, {color: colors.brandAccentColor}]}>
              ✓
            </Text>
          )}
        </View>
        <Text
          style={[styles.personBio, {color: colors.secondaryText}]}
          numberOfLines={2}>
          {item.bio}
        </Text>
        <View style={styles.personStats}>
          <Text style={[styles.personStat, {color: colors.secondaryText}]}>
            {item.followers.toLocaleString()} followers
          </Text>
          <Text style={[styles.personStat, {color: colors.secondaryText}]}>
            {item.reviews} reviews
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderBrandItem = ({item}) => (
    <TouchableOpacity
      style={[styles.brandCard, {backgroundColor: colors.secondary}]}
      onPress={() => navigateToBrand(item)}>
      <Image source={{uri: item.logo}} style={styles.brandLogo} />
      <View style={styles.brandInfo}>
        <Text style={[styles.brandName, {color: colors.primaryText}]}>
          {item.name}
        </Text>
        <Text
          style={[styles.brandDescription, {color: colors.secondaryText}]}
          numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.brandStats}>
          <View style={styles.ratingContainer}>
            <Star size={14} color={colors.starColor} fill={colors.starColor} />
            <Text style={[styles.ratingText, {color: colors.secondaryText}]}>
              {item.rating}
            </Text>
          </View>
          <Text style={[styles.brandStat, {color: colors.secondaryText}]}>
            {item.products} products
          </Text>
          <Text style={[styles.brandStat, {color: colors.secondaryText}]}>
            {item.followers.toLocaleString()} followers
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Search size={48} color={colors.secondaryText} />
      <Text style={[styles.emptyStateTitle, {color: colors.primaryText}]}>
        No results found
      </Text>
      <Text style={[styles.emptyStateSubtitle, {color: colors.secondaryText}]}>
        Try searching with different keywords
      </Text>
    </View>
  );

  const renderSectionHeader = (title, category, count) => (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, {color: colors.primaryText}]}>
        {title} ({count})
      </Text>
      <TouchableOpacity
        style={styles.viewAllButton}
        onPress={() => navigateToViewAll(category)}>
        <Text style={[styles.viewAllText, {color: colors.brandAccentColor}]}>
          View All
        </Text>
        <ChevronRight size={16} color={colors.brandAccentColor} />
      </TouchableOpacity>
    </View>
  );

  const renderFilteredResults = () => {
    const filterKey = activeFilter.toLowerCase();
    const data = searchResults[filterKey] || [];

    if (data.length === 0) {
      return renderEmptyState();
    }

    const renderItem = item => {
      switch (filterKey) {
        case 'products':
          return renderProductItem({item});
        case 'services':
          return renderServiceItem({item});
        case 'reviews':
          return renderReviewItem({item});
        case 'people':
          return renderPersonItem({item});
        case 'brands':
          return renderBrandItem({item});
        default:
          return null;
      }
    };

    return (
      <FlatList
        data={data}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.resultsContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={[styles.resultsCount, {color: colors.secondaryText}]}>
            {data.length} {activeFilter.toLowerCase()} found
          </Text>
        }
      />
    );
  };

  const renderAllSections = () => {
    const hasResults = Object.keys(searchResults).length > 0;

    if (!hasResults) {
      return renderEmptyState();
    }

    return (
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.resultsContainer}>
        {/* Products Section */}
        {searchResults.products && searchResults.products.length > 0 && (
          <View style={styles.section}>
            {renderSectionHeader(
              'Products',
              'products',
              searchResults.products.length,
            )}
            {searchResults.products.slice(0, 2).map(item => (
              <View key={item.id}>{renderProductItem({item})}</View>
            ))}
          </View>
        )}

        {/* Services Section */}
        {searchResults.services && searchResults.services.length > 0 && (
          <View style={styles.section}>
            {renderSectionHeader(
              'Services',
              'services',
              searchResults.services.length,
            )}
            {searchResults.services.slice(0, 2).map(item => (
              <View key={item.id}>{renderServiceItem({item})}</View>
            ))}
          </View>
        )}

        {/* Reviews Section */}
        {searchResults.reviews && searchResults.reviews.length > 0 && (
          <View style={styles.section}>
            {renderSectionHeader(
              'Reviews',
              'reviews',
              searchResults.reviews.length,
            )}
            {searchResults.reviews.slice(0, 2).map(item => (
              <View key={item.id}>{renderReviewItem({item})}</View>
            ))}
          </View>
        )}

        {/* People Section */}
        {searchResults.people && searchResults.people.length > 0 && (
          <View style={styles.section}>
            {renderSectionHeader(
              'People',
              'people',
              searchResults.people.length,
            )}
            {searchResults.people.slice(0, 2).map(item => (
              <View key={item.id}>{renderPersonItem({item})}</View>
            ))}
          </View>
        )}

        {/* Brands Section */}
        {searchResults.brands && searchResults.brands.length > 0 && (
          <View style={styles.section}>
            {renderSectionHeader(
              'Brands',
              'brands',
              searchResults.brands.length,
            )}
            {searchResults.brands.slice(0, 2).map(item => (
              <View key={item.id}>{renderBrandItem({item})}</View>
            ))}
          </View>
        )}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.primaryBG}]}>
      {/* Header with Search Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.primaryText} strokeWidth={2} />
        </TouchableOpacity>

        <View
          style={[styles.searchContainer, {backgroundColor: colors.secondary}]}>
          <Search size={20} color={colors.secondaryText} strokeWidth={2} />
          <TextInput
            style={[styles.searchInput, {color: colors.primaryText}]}
            placeholder="Search products, services, brands..."
            placeholderTextColor={colors.secondaryText}
            value={searchQuery}
            onChangeText={handleSearch}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
            autoFocus={true}
          />
        </View>
      </View>

      {/* Search Filters */}
      <View
        style={[styles.filtersContainer, {borderBottomColor: colors.divider}]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollContainer}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                {
                  backgroundColor:
                    activeFilter === filter.name
                      ? colors.brandAccentColor
                      : colors.secondary,
                  borderColor:
                    activeFilter === filter.name
                      ? colors.brandAccentColor
                      : colors.divider,
                },
              ]}
              onPress={() => handleFilterChange(filter.name)}>
              <Text
                style={[
                  styles.filterText,
                  {
                    color:
                      activeFilter === filter.name
                        ? '#FFFFFF'
                        : colors.primaryText,
                  },
                ]}>
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Search Results */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, {color: colors.secondaryText}]}>
            Searching...
          </Text>
        </View>
      ) : activeFilter === 'All' ? (
        renderAllSections()
      ) : (
        renderFilteredResults()
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 16,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  filtersContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    marginHorizontal: 16,
    marginTop: 4,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  scrollContainer: {
    flex: 1,
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  resultsCount: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
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
  // Product & Service Cards
  resultCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  resultName: {
    fontSize: 16,
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
  categoryText: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
  },
  // Review Cards
  reviewCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    flex: 1,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  timeAgo: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    marginTop: 2,
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
  },
  // Person Cards
  personCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  personAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  personInfo: {
    flex: 1,
  },
  personHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  personName: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    marginRight: 8,
  },
  verifiedBadge: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  personBio: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    lineHeight: 20,
    marginBottom: 8,
  },
  personStats: {
    flexDirection: 'row',
  },
  personStat: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    marginRight: 16,
  },
  // Brand Cards
  brandCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  brandLogo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  brandInfo: {
    flex: 1,
  },
  brandName: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    marginBottom: 8,
  },
  brandDescription: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    lineHeight: 20,
    marginBottom: 8,
  },
  brandStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandStat: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    marginLeft: 16,
  },
  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
});

export default SearchResultsScreen;
