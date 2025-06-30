// Explore.js (formerly Search.js)
import React, {useState} from 'react';
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
  Dimensions,
} from 'react-native';
import {useAppColors} from '../../utils/colors';
import {useCommonStyles} from '../../common-styling/theme-styling';
import {useNavigation} from '@react-navigation/native';
import {Search, ChevronRight, Star} from 'lucide-react-native';

const {width} = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const ExploreScreen = () => {
  const navigation = useNavigation();
  const commonStyles = useCommonStyles();
  const colors = useAppColors();

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
    // Navigate to search results screen
    navigation.navigate('SearchResults');
  };

  const navigateToCategory = category => {
    navigation.navigate('CategoryProducts', {category});
  };

  const navigateToAllCategories = () => {
    navigation.navigate('AllCategories');
  };

  const navigateToProduct = product => {
    navigation.navigate('Product', {productId: product.id});
  };

  const navigateToService = service => {
    navigation.navigate('Product', {productId: service.id, isService: true});
  };

  const navigateToComments = review => {
    navigation.navigate('Comments', {
      postId: review.id,
      title: review.productName,
      content: review.content,
    });
  };

  const navigateToProfile = userId => {
    navigation.navigate('Profile', {userId});
  };

  const renderCategoryItem = ({item}) => (
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
  );

  const renderProductItem = ({item}) => (
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
  );

  const renderReviewItem = ({item}) => (
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
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.primaryBG}]}>
      {/* Search Bar */}
      <TouchableOpacity
        style={[styles.searchBar, {backgroundColor: colors.secondary}]}
        onPress={handleSearch}>
        <Search size={20} color={colors.secondaryText} />
        <Text style={[styles.searchPlaceholder, {color: colors.secondaryText}]}>
          Search products, services, brands...
        </Text>
      </TouchableOpacity>

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

          {topReviews.map(review => renderReviewItem({item: review}))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  scrollContainer: {
    flex: 1,
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
});

export default ExploreScreen;
