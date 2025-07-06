import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {useAppColors} from '../../utils/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Search, ArrowLeft, Star, Filter} from 'lucide-react-native';

const {width} = Dimensions.get('window');

const SearchResultsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const colors = useAppColors();
  const [searchQuery, setSearchQuery] = useState(route.params?.query || '');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock search data - in a real app, this would come from an API
  const mockSearchData = [
    {
      id: '1',
      name: 'Sony WH-1000XM4',
      image: 'https://via.placeholder.com/300x300?text=Sony+Headphones',
      rating: 4.8,
      reviews: 1245,
      category: 'Electronics',
      type: 'product',
      price: '$349.99',
    },
    {
      id: '2',
      name: 'iPhone 15 Pro Max',
      image: 'https://via.placeholder.com/300x300?text=iPhone',
      rating: 4.7,
      reviews: 980,
      category: 'Electronics',
      type: 'product',
      price: '$1199.99',
    },
    {
      id: '3',
      name: 'Car Detailing Pro',
      image: 'https://via.placeholder.com/300x300?text=Car+Detailing',
      rating: 4.6,
      reviews: 432,
      category: 'Automotive',
      type: 'service',
      price: '$89.99',
    },
    {
      id: '4',
      name: 'Samsung QLED TV',
      image: 'https://via.placeholder.com/300x300?text=Samsung+TV',
      rating: 4.5,
      reviews: 756,
      category: 'Electronics',
      type: 'product',
      price: '$1299.99',
    },
    {
      id: '5',
      name: 'Home Cleaning Services',
      image: 'https://via.placeholder.com/300x300?text=Home+Cleaning',
      rating: 4.4,
      reviews: 678,
      category: 'Home & Garden',
      type: 'service',
      price: '$75.00',
    },
    {
      id: '6',
      name: 'Tesla Model 3',
      image: 'https://via.placeholder.com/300x300?text=Tesla',
      rating: 4.9,
      reviews: 1890,
      category: 'Automotive',
      type: 'product',
      price: '$41,990',
    },
  ];

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [searchQuery]);

  const performSearch = query => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const filtered = mockSearchData.filter(
        item =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      );
      setSearchResults(filtered);
      setIsLoading(false);
    }, 500);
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
      isService: item.type === 'service',
    });
  };

  const renderSearchResult = ({item}) => (
    <TouchableOpacity
      style={[styles.resultCard, {backgroundColor: colors.secondary}]}
      onPress={() => navigateToProduct(item)}>
      <Image source={{uri: item.image}} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <View style={styles.resultHeader}>
          <Text
            style={[styles.resultName, {color: colors.primaryText}]}
            numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.typeBadge}>
            <Text style={[styles.typeText, {color: colors.brandAccentColor}]}>
              {item.type}
            </Text>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <Star
            size={14}
            color={colors.brandAccentColor}
            fill={colors.brandAccentColor}
          />
          <Text style={[styles.ratingText, {color: colors.secondaryText}]}>
            {item.rating} ({item.reviews} reviews)
          </Text>
        </View>

        <Text style={[styles.categoryText, {color: colors.secondaryText}]}>
          {item.category}
        </Text>

        <Text style={[styles.priceText, {color: colors.brandAccentColor}]}>
          {item.price}
        </Text>
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

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.primaryBG}]}>
      {/* Header with Search Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.primaryText} />
        </TouchableOpacity>

        <View
          style={[styles.searchContainer, {backgroundColor: colors.secondary}]}>
          <Search size={20} color={colors.secondaryText} />
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

        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.primaryText} />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, {color: colors.secondaryText}]}>
            Searching...
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.resultsContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          ListHeaderComponent={
            searchResults.length > 0 ? (
              <Text
                style={[styles.resultsCount, {color: colors.secondaryText}]}>
                {searchResults.length} results found
              </Text>
            ) : null
          }
        />
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
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  filterButton: {
    padding: 4,
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
  resultsContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  resultsCount: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginBottom: 16,
  },
  resultCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
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
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  resultName: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    marginRight: 8,
  },
  typeBadge: {
    backgroundColor: 'rgba(176, 8, 20, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    textTransform: 'capitalize',
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
