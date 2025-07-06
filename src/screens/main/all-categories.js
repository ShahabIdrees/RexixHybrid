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
import {useNavigation} from '@react-navigation/native';
import {Search, ArrowLeft, ChevronRight} from 'lucide-react-native';

const {width} = Dimensions.get('window');
const numColumns = 2;
const cardWidth = (width - 48 - (numColumns - 1) * 12) / numColumns;

const AllCategoriesScreen = () => {
  const navigation = useNavigation();
  const colors = useAppColors();
  const [searchQuery, setSearchQuery] = useState('');

  // Extended mock data for all categories
  const allCategories = [
    {
      id: '1',
      name: 'Electronics',
      icon: 'https://i.pravatar.cc/100?img=1',
      color: '#FF6B6B',
      productCount: 1245,
    },
    {
      id: '2',
      name: 'Automotive',
      icon: 'https://i.pravatar.cc/100?img=2',
      color: '#4ECDC4',
      productCount: 890,
    },
    {
      id: '3',
      name: 'Home & Garden',
      icon: 'https://i.pravatar.cc/100?img=3',
      color: '#FFE66D',
      productCount: 756,
    },
    {
      id: '4',
      name: 'Fashion',
      icon: 'https://i.pravatar.cc/100?img=4',
      color: '#6B5B95',
      productCount: 2341,
    },
    {
      id: '5',
      name: 'Beauty',
      icon: 'https://i.pravatar.cc/100?img=5',
      color: '#FF8C94',
      productCount: 567,
    },
    {
      id: '6',
      name: 'Sports',
      icon: 'https://i.pravatar.cc/100?img=6',
      color: '#88D8B0',
      productCount: 432,
    },
    {
      id: '7',
      name: 'Books',
      icon: 'https://i.pravatar.cc/100?img=7',
      color: '#FF9F43',
      productCount: 1234,
    },
    {
      id: '8',
      name: 'Toys & Games',
      icon: 'https://i.pravatar.cc/100?img=8',
      color: '#A55EEA',
      productCount: 789,
    },
    {
      id: '9',
      name: 'Health & Fitness',
      icon: 'https://i.pravatar.cc/100?img=9',
      color: '#26DE81',
      productCount: 654,
    },
    {
      id: '10',
      name: 'Food & Beverages',
      icon: 'https://i.pravatar.cc/100?img=10',
      color: '#FD79A8',
      productCount: 987,
    },
    {
      id: '11',
      name: 'Pet Supplies',
      icon: 'https://i.pravatar.cc/100?img=11',
      color: '#FDCB6E',
      productCount: 345,
    },
    {
      id: '12',
      name: 'Office Supplies',
      icon: 'https://i.pravatar.cc/100?img=12',
      color: '#74B9FF',
      productCount: 567,
    },
  ];

  const filteredCategories = allCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const navigateToCategory = category => {
    navigation.navigate('CategoryProducts', {category});
  };

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      style={[styles.categoryCard, {backgroundColor: colors.secondary}]}
      onPress={() => navigateToCategory(item)}>
      <View
        style={[styles.categoryIconContainer, {backgroundColor: item.color}]}>
        <Image source={{uri: item.icon}} style={styles.categoryIcon} />
      </View>
      <Text style={[styles.categoryName, {color: colors.primaryText}]}>
        {item.name}
      </Text>
      <Text style={[styles.productCount, {color: colors.secondaryText}]}>
        {item.productCount} products
      </Text>
      <ChevronRight
        size={16}
        color={colors.secondaryText}
        style={styles.chevron}
      />
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
          All Categories
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={[styles.searchBar, {backgroundColor: colors.secondary}]}>
        <Search size={20} color={colors.secondaryText} />
        <TextInput
          style={[styles.searchInput, {color: colors.primaryText}]}
          placeholder="Search categories..."
          placeholderTextColor={colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories Grid */}
      <FlatList
        data={filteredCategories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.categoriesContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={[styles.resultsCount, {color: colors.secondaryText}]}>
            {filteredCategories.length} categories found
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
  placeholder: {
    width: 32,
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
  categoriesContainer: {
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
  categoryCard: {
    width: cardWidth,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    position: 'relative',
  },
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    marginBottom: 4,
  },
  productCount: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  chevron: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});

export default AllCategoriesScreen;
