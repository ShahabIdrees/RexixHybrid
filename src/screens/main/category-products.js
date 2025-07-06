import React, {useState} from 'react';
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
const numColumns = 2;
const cardWidth = (width - 48 - (numColumns - 1) * 12) / numColumns;

const CategoryProductsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const colors = useAppColors();
  const [searchQuery, setSearchQuery] = useState('');

  const category = route.params?.category;
  const categoryName = category?.name || 'Category';

  // Mock data for category products
  const categoryProducts = [
    {
      id: '1',
      name: 'Sony WH-1000XM4',
      image: 'https://via.placeholder.com/300x300?text=Sony+Headphones',
      rating: 4.8,
      reviews: 1245,
      category: 'Electronics',
      price: '$349.99',
    },
    {
      id: '2',
      name: 'iPhone 15 Pro Max',
      image: 'https://via.placeholder.com/300x300?text=iPhone',
      rating: 4.7,
      reviews: 980,
      category: 'Electronics',
      price: '$1199.99',
    },
    {
      id: '3',
      name: 'Samsung QLED TV',
      image: 'https://via.placeholder.com/300x300?text=Samsung+TV',
      rating: 4.5,
      reviews: 756,
      category: 'Electronics',
      price: '$1299.99',
    },
    {
      id: '4',
      name: 'MacBook Pro M2',
      image: 'https://via.placeholder.com/300x300?text=MacBook',
      rating: 4.8,
      reviews: 567,
      category: 'Electronics',
      price: '$1999.99',
    },
    {
      id: '5',
      name: 'Canon EOS R5',
      image: 'https://via.placeholder.com/300x300?text=Canon+Camera',
      rating: 4.9,
      reviews: 432,
      category: 'Electronics',
      price: '$3899.99',
    },
    {
      id: '6',
      name: 'LG OLED C1',
      image: 'https://via.placeholder.com/300x300?text=LG+TV',
      rating: 4.8,
      reviews: 678,
      category: 'Electronics',
      price: '$1499.99',
    },
    {
      id: '7',
      name: 'GoPro Hero 10',
      image: 'https://via.placeholder.com/300x300?text=GoPro',
      rating: 4.7,
      reviews: 654,
      category: 'Electronics',
      price: '$449.99',
    },
    {
      id: '8',
      name: 'AirPods Pro',
      image: 'https://via.placeholder.com/300x300?text=AirPods',
      rating: 4.6,
      reviews: 892,
      category: 'Electronics',
      price: '$249.99',
    },
  ];

  const filteredProducts = categoryProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const navigateToProduct = product => {
    navigation.navigate('Product', {productId: product.id});
  };

  const renderProductItem = ({item}) => (
    <TouchableOpacity
      style={[styles.productCard, {backgroundColor: colors.secondary}]}
      onPress={() => navigateToProduct(item)}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text
          style={[styles.productName, {color: colors.primaryText}]}
          numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Star
            size={12}
            color={colors.brandAccentColor}
            fill={colors.brandAccentColor}
          />
          <Text style={[styles.ratingText, {color: colors.secondaryText}]}>
            {item.rating} ({item.reviews})
          </Text>
        </View>
        <Text style={[styles.priceText, {color: colors.brandAccentColor}]}>
          {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.primaryBG}]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: colors.primaryText}]}>
          {categoryName}
        </Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.primaryText} />
        </TouchableOpacity>
      </View>

      {/* Category Info */}
      <View style={[styles.categoryInfo, {backgroundColor: colors.secondary}]}>
        <View
          style={[
            styles.categoryIconContainer,
            {backgroundColor: category?.color || colors.brandAccentColor},
          ]}>
          <Image source={{uri: category?.icon}} style={styles.categoryIcon} />
        </View>
        <View style={styles.categoryDetails}>
          <Text style={[styles.categoryName, {color: colors.primaryText}]}>
            {categoryName}
          </Text>
          <Text style={[styles.productCount, {color: colors.secondaryText}]}>
            {filteredProducts.length} products
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchBar, {backgroundColor: colors.secondary}]}>
        <Search size={20} color={colors.secondaryText} />
        <TextInput
          style={[styles.searchInput, {color: colors.primaryText}]}
          placeholder={`Search ${categoryName.toLowerCase()}...`}
          placeholderTextColor={colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.productsContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={[styles.resultsCount, {color: colors.secondaryText}]}>
            {filteredProducts.length} products found
          </Text>
        }
      />
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
  },
  filterButton: {
    padding: 4,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    marginBottom: 4,
  },
  productCount: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  productsContainer: {
    paddingHorizontal: 16,
  },
  resultsCount: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  productCard: {
    width: cardWidth,
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: cardWidth * 0.75,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginBottom: 4,
    lineHeight: 18,
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
  priceText: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
  },
});

export default CategoryProductsScreen;
