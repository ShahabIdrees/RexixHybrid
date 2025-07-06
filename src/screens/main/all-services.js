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
import {Search, ArrowLeft, Star, Filter} from 'lucide-react-native';

const {width} = Dimensions.get('window');
const numColumns = 2;
const cardWidth = (width - 48 - (numColumns - 1) * 12) / numColumns;

const AllServicesScreen = () => {
  const navigation = useNavigation();
  const colors = useAppColors();
  const [searchQuery, setSearchQuery] = useState('');

  // Extended mock data for all services
  const allServices = [
    {
      id: '1',
      name: 'Car Detailing Pro',
      image: 'https://via.placeholder.com/300x300?text=Car+Detailing',
      rating: 4.6,
      reviews: 432,
      category: 'Automotive',
      price: '$89.99',
      duration: '2-3 hours',
    },
    {
      id: '2',
      name: 'Home Cleaning Services',
      image: 'https://via.placeholder.com/300x300?text=Home+Cleaning',
      rating: 4.4,
      reviews: 678,
      category: 'Home & Garden',
      price: '$75.00',
      duration: '3-4 hours',
    },
    {
      id: '3',
      name: 'Tech Repair Experts',
      image: 'https://via.placeholder.com/300x300?text=Tech+Repair',
      rating: 4.7,
      reviews: 521,
      category: 'Electronics',
      price: '$45.00',
      duration: '1-2 hours',
    },
    {
      id: '4',
      name: 'Personal Fitness Training',
      image: 'https://via.placeholder.com/300x300?text=Fitness',
      rating: 4.8,
      reviews: 345,
      category: 'Sports',
      price: '$60.00',
      duration: '1 hour',
    },
    {
      id: '5',
      name: 'Plumbing Solutions',
      image: 'https://via.placeholder.com/300x300?text=Plumbing',
      rating: 4.5,
      reviews: 234,
      category: 'Home & Garden',
      price: '$120.00',
      duration: '2-4 hours',
    },
    {
      id: '6',
      name: 'Electrical Services',
      image: 'https://via.placeholder.com/300x300?text=Electrical',
      rating: 4.6,
      reviews: 189,
      category: 'Home & Garden',
      price: '$95.00',
      duration: '1-3 hours',
    },
    {
      id: '7',
      name: 'Hair Styling & Salon',
      image: 'https://via.placeholder.com/300x300?text=Hair+Salon',
      rating: 4.7,
      reviews: 567,
      category: 'Beauty',
      price: '$45.00',
      duration: '1-2 hours',
    },
    {
      id: '8',
      name: 'Pet Grooming Services',
      image: 'https://via.placeholder.com/300x300?text=Pet+Grooming',
      rating: 4.4,
      reviews: 298,
      category: 'Pet Care',
      price: '$35.00',
      duration: '1-1.5 hours',
    },
    {
      id: '9',
      name: 'Landscaping & Garden',
      image: 'https://via.placeholder.com/300x300?text=Landscaping',
      rating: 4.5,
      reviews: 156,
      category: 'Home & Garden',
      price: '$150.00',
      duration: '4-6 hours',
    },
    {
      id: '10',
      name: 'Photography Services',
      image: 'https://via.placeholder.com/300x300?text=Photography',
      rating: 4.8,
      reviews: 234,
      category: 'Creative',
      price: '$200.00',
      duration: '2-4 hours',
    },
    {
      id: '11',
      name: 'Tutoring & Education',
      image: 'https://via.placeholder.com/300x300?text=Tutoring',
      rating: 4.6,
      reviews: 189,
      category: 'Education',
      price: '$40.00',
      duration: '1 hour',
    },
    {
      id: '12',
      name: 'Moving & Relocation',
      image: 'https://via.placeholder.com/300x300?text=Moving',
      rating: 4.4,
      reviews: 123,
      category: 'Home & Garden',
      price: '$300.00',
      duration: '4-8 hours',
    },
  ];

  const filteredServices = allServices.filter(
    service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const navigateToService = service => {
    navigation.navigate('Product', {productId: service.id, isService: true});
  };

  const renderServiceItem = ({item}) => (
    <TouchableOpacity
      style={[styles.serviceCard, {backgroundColor: colors.secondary}]}
      onPress={() => navigateToService(item)}>
      <Image source={{uri: item.image}} style={styles.serviceImage} />
      <View style={styles.serviceInfo}>
        <Text
          style={[styles.serviceName, {color: colors.primaryText}]}
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
        <Text style={[styles.categoryText, {color: colors.secondaryText}]}>
          {item.category}
        </Text>
        <Text style={[styles.durationText, {color: colors.secondaryText}]}>
          {item.duration}
        </Text>
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
          All Services
        </Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.primaryText} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchBar, {backgroundColor: colors.secondary}]}>
        <Search size={20} color={colors.secondaryText} />
        <TextInput
          style={[styles.searchInput, {color: colors.primaryText}]}
          placeholder="Search services..."
          placeholderTextColor={colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Services Grid */}
      <FlatList
        data={filteredServices}
        renderItem={renderServiceItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.servicesContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={[styles.resultsCount, {color: colors.secondaryText}]}>
            {filteredServices.length} services found
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
  servicesContainer: {
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
  serviceCard: {
    width: cardWidth,
    borderRadius: 12,
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: cardWidth * 0.75,
  },
  serviceInfo: {
    padding: 12,
  },
  serviceName: {
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
  categoryText: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    marginBottom: 2,
  },
  durationText: {
    fontSize: 11,
    fontFamily: 'Roboto-Regular',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
  },
});

export default AllServicesScreen;
