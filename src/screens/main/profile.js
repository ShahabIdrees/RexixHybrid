import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  useColorScheme,
} from 'react-native';
import {darkColors, lightColors, useAppColors} from '../../utils/colors';
import {ReviewPost, StatsComponent} from '../../components';
import {generateDummyPosts} from '../../utils/helper-functions';
import {useCommonStyles} from '../../common-styling/theme-styling';
import {hp} from '../../utils/environment';

const Profile = () => {
  const [posts, setPosts] = useState(generateDummyPosts(10));
  const commonStyles = useCommonStyles();
  const colors = useAppColors();
  // Dummy data for followers and reviews
  const followers = [
    {id: '1', name: 'John Doe', image: 'https://via.placeholder.com/100'},
    {id: '2', name: 'Jane Smith', image: 'https://via.placeholder.com/100'},
    {id: '3', name: 'Alex Johnson', image: 'https://via.placeholder.com/100'},
    {id: '4', name: 'Chris Lee', image: 'https://via.placeholder.com/100'},
    {id: '5', name: 'Sarah Kim', image: 'https://via.placeholder.com/100'},
    {id: '6', name: 'Michael Brown', image: 'https://via.placeholder.com/100'},
  ];
  const dummyStats = [
    {id: '1', title: 'Followers', count: 69},
    {id: '2', title: 'Following', count: 69},
    {id: '3', title: 'Posts', count: 6},
  ];

  const reviews = [
    {id: '1', content: 'Great experience!'},
    {id: '2', content: 'Very friendly service.'},
    {id: '3', content: 'Loved the ambiance.'},
  ];

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.primaryBG}]}
      contentContainerStyle={{alignItems: 'center'}}>
      {/* Cover Photo */}
      <Image
        source={{uri: 'https://via.placeholder.com/600x200'}}
        style={styles.coverPhoto}
      />

      {/* Profile Photo */}
      <Image
        source={{uri: 'https://via.placeholder.com/100'}}
        style={styles.profilePhoto}
      />
      <Text
        style={[
          commonStyles.heading,
          {marginTop: hp(90), marginHorizontal: 16, alignSelf: 'center'},
        ]}>
        Full NAME
      </Text>
      <StatsComponent stats={dummyStats} />

      {/* Followers Section */}
      <View style={[styles.sectionContainer, {paddingHorizontal: 8}]}>
        <Text style={[styles.sectionTitle, commonStyles.title]}>Followers</Text>
        <View style={styles.followerGrid}>
          {followers.map(follower => (
            <View key={follower.id} style={styles.followerItem}>
              <Image
                source={{uri: follower.image}}
                style={styles.followerImage}
              />
              <Text style={styles.followerName}>{follower.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Reviews Section */}
      <View style={[styles.sectionContainer, {paddingHorizontal: 8}]}>
        <Text style={[styles.sectionTitle, commonStyles.title]}>Reviews</Text>
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ReviewPost
              title={item.title}
              content={item.content}
              images={item.images}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverPhoto: {
    width: '100%',
    height: 200,
  },
  profilePhoto: {
    width: hp(160),
    height: hp(160),
    borderRadius: hp(80),
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    position: 'absolute',
    top: 120,
    // left: 20,
  },
  sectionContainer: {
    marginTop: 12, // to position it below the profile photo
    // paddingHorizontal: 16,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  followerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  followerItem: {
    width: '32%',
    alignItems: 'center',
    marginBottom: 12,
  },
  followerImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 4,
  },
  followerName: {
    marginTop: 5,
    textAlign: 'center',
    color: 'black',
  },
  reviewItem: {
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 16,
  },
});

export default Profile;
