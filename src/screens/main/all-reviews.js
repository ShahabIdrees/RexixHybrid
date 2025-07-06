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
} from 'react-native';
import {useAppColors} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import {Search, ArrowLeft, Star, Filter} from 'lucide-react-native';

const AllReviewsScreen = () => {
  const navigation = useNavigation();
  const colors = useAppColors();
  const [searchQuery, setSearchQuery] = useState('');

  // Extended mock data for all reviews
  const allReviews = [
    {
      id: '1',
      userName: 'John D.',
      userAvatar: 'https://i.pravatar.cc/100?img=12',
      productName: 'Sony WH-1000XM4',
      rating: 5,
      content:
        'These headphones are amazing! The noise cancellation is top-notch and the sound quality is incredible. Battery life is excellent and the comfort level is outstanding.',
      likes: 42,
      comments: 8,
      date: '2 days ago',
    },
    {
      id: '2',
      userName: 'Sarah M.',
      userAvatar: 'https://i.pravatar.cc/100?img=23',
      productName: 'iPhone 15 Pro Max',
      rating: 4,
      content:
        'Great phone overall. The camera is fantastic and battery life is good. A bit pricey though, but you get what you pay for.',
      likes: 36,
      comments: 12,
      date: '1 week ago',
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
      date: '3 days ago',
    },
    {
      id: '4',
      userName: 'Emily R.',
      userAvatar: 'https://i.pravatar.cc/100?img=34',
      productName: 'Samsung QLED TV',
      rating: 4,
      content:
        'Excellent picture quality and smart features. The interface is intuitive and the remote is well-designed.',
      likes: 28,
      comments: 5,
      date: '5 days ago',
    },
    {
      id: '5',
      userName: 'David L.',
      userAvatar: 'https://i.pravatar.cc/100?img=56',
      productName: 'Car Detailing Pro',
      rating: 5,
      content:
        'Professional service with attention to detail. My car looks brand new! Highly recommend their services.',
      likes: 15,
      comments: 3,
      date: '1 day ago',
    },
    {
      id: '6',
      userName: 'Lisa K.',
      userAvatar: 'https://i.pravatar.cc/100?img=67',
      productName: 'Home Cleaning Services',
      rating: 4,
      content:
        'Very thorough cleaning service. The team was punctual and professional. Will definitely use again.',
      likes: 22,
      comments: 7,
      date: '4 days ago',
    },
    {
      id: '7',
      userName: 'Alex P.',
      userAvatar: 'https://i.pravatar.cc/100?img=78',
      productName: 'Tech Repair Experts',
      rating: 5,
      content:
        'Fixed my laptop quickly and efficiently. Great communication throughout the process.',
      likes: 19,
      comments: 4,
      date: '6 days ago',
    },
    {
      id: '8',
      userName: 'Rachel S.',
      userAvatar: 'https://i.pravatar.cc/100?img=89',
      productName: 'Personal Fitness Training',
      rating: 5,
      content:
        'Amazing trainer! Helped me achieve my fitness goals and kept me motivated throughout.',
      likes: 31,
      comments: 9,
      date: '2 weeks ago',
    },
    {
      id: '9',
      userName: 'Tom W.',
      userAvatar: 'https://i.pravatar.cc/100?img=90',
      productName: 'Nike Air Max 270',
      rating: 4,
      content:
        'Comfortable shoes with great cushioning. Perfect for daily wear and light workouts.',
      likes: 45,
      comments: 11,
      date: '1 week ago',
    },
    {
      id: '10',
      userName: 'Jessica H.',
      userAvatar: 'https://i.pravatar.cc/100?img=91',
      productName: 'MacBook Pro M2',
      rating: 5,
      content:
        'Incredible performance and battery life. The M2 chip is a game-changer for productivity.',
      likes: 67,
      comments: 15,
      date: '3 weeks ago',
    },
  ];

  const filteredReviews = allReviews.filter(
    review =>
      review.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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

  const renderReviewItem = ({item}) => (
    <TouchableOpacity
      style={[styles.reviewCard, {backgroundColor: colors.secondary}]}
      onPress={() => navigateToComments(item)}>
      <View style={styles.reviewHeader}>
        <TouchableOpacity
          style={styles.reviewUserContainer}
          onPress={() => navigateToProfile(item.id)}>
          <Image source={{uri: item.userAvatar}} style={styles.userAvatar} />
          <View style={styles.userInfo}>
            <Text style={[styles.userName, {color: colors.primaryText}]}>
              {item.userName}
            </Text>
            <Text style={[styles.reviewDate, {color: colors.secondaryText}]}>
              {item.date}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.reviewRating}>
          {[1, 2, 3, 4, 5].map(star => (
            <Star
              key={star}
              size={14}
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
        numberOfLines={3}>
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: colors.primaryText}]}>
          All Reviews
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
          placeholder="Search reviews..."
          placeholderTextColor={colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Reviews List */}
      <FlatList
        data={filteredReviews}
        renderItem={renderReviewItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.reviewsContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={[styles.resultsCount, {color: colors.secondaryText}]}>
            {filteredReviews.length} reviews found
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
  reviewsContainer: {
    paddingHorizontal: 16,
  },
  resultsCount: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginBottom: 16,
  },
  reviewCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
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

export default AllReviewsScreen;
