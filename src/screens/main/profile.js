import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {darkColors, lightColors, useAppColors} from '../../utils/colors';
import {ReviewPost, StatsComponent} from '../../components';
import {generateDummyPosts} from '../../utils/helper-functions';
import {useCommonStyles} from '../../common-styling/theme-styling';
import {hp} from '../../utils/environment';
import {
  MapPin,
  Calendar,
  Link,
  Mail,
  Phone,
  Edit,
  Settings,
  Grid,
  List,
  Users,
  Bookmark,
  MessageSquare,
} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

const {width: screenWidth} = Dimensions.get('window');

const Profile = ({route}) => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState(generateDummyPosts(10));
  const [activeTab, setActiveTab] = useState('posts');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const commonStyles = useCommonStyles();
  const colors = useAppColors();
  const userId = route?.params?.userId;

  // Dummy data for followers and reviews
  const followers = [
    {id: '1', name: 'John Doe', image: 'https://i.pravatar.cc/150?img=1'},
    {id: '2', name: 'Jane Smith', image: 'https://i.pravatar.cc/150?img=2'},
    {id: '3', name: 'Alex Johnson', image: 'https://i.pravatar.cc/150?img=3'},
    {id: '4', name: 'Chris Lee', image: 'https://i.pravatar.cc/150?img=4'},
    {id: '5', name: 'Sarah Kim', image: 'https://i.pravatar.cc/150?img=5'},
    {id: '6', name: 'Michael Brown', image: 'https://i.pravatar.cc/150?img=6'},
    {id: '7', name: 'Emma Wilson', image: 'https://i.pravatar.cc/150?img=7'},
    {id: '8', name: 'David Garcia', image: 'https://i.pravatar.cc/150?img=8'},
  ];

  const dummyStats = [
    {id: '1', title: 'Posts', count: 42},
    {id: '2', title: 'Followers', count: 1.2 + 'K'},
    {id: '3', title: 'Following', count: 384},
    {id: '4', title: 'Reviews', count: 128},
  ];

  const renderPostItem = ({item}) => (
    <ReviewPost
      title={item.title}
      content={item.content}
      images={item.images}
    />
  );

  const renderGridItem = ({item}) => (
    <TouchableOpacity style={styles.gridItem} activeOpacity={0.8}>
      <Image
        source={{uri: item.images[0] || 'https://via.placeholder.com/300'}}
        style={styles.gridImage}
      />
      {item.images.length > 1 && (
        <View style={styles.multipleImagesIndicator}>
          <Grid size={12} color="#FFF" />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderFollowerItem = ({item}) => (
    <TouchableOpacity style={styles.followerCard}>
      <Image source={{uri: item.image}} style={styles.followerImage} />
      <Text style={[styles.followerName, {color: colors.primaryText}]}>
        {item.name}
      </Text>
      <TouchableOpacity
        style={[
          styles.followButton,
          {backgroundColor: colors.brandAccentColor},
        ]}>
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <>
            <View style={styles.viewToggle}>
              <TouchableOpacity
                style={[
                  styles.viewToggleButton,
                  viewMode === 'list' && {
                    backgroundColor: colors.brandAccentColor + '20',
                  },
                ]}
                onPress={() => setViewMode('list')}>
                <List
                  size={20}
                  color={
                    viewMode === 'list'
                      ? colors.brandAccentColor
                      : colors.secondaryText
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.viewToggleButton,
                  viewMode === 'grid' && {
                    backgroundColor: colors.brandAccentColor + '20',
                  },
                ]}
                onPress={() => setViewMode('grid')}>
                <Grid
                  size={20}
                  color={
                    viewMode === 'grid'
                      ? colors.brandAccentColor
                      : colors.secondaryText
                  }
                />
              </TouchableOpacity>
            </View>
            {viewMode === 'list' ? (
              <FlatList
                data={posts}
                renderItem={renderPostItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                nestedScrollEnabled={true}
              />
            ) : (
              <FlatList
                data={posts}
                renderItem={renderGridItem}
                keyExtractor={item => item.id}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                nestedScrollEnabled={true}
                columnWrapperStyle={styles.gridColumnWrapper}
              />
            )}
          </>
        );
      case 'followers':
        return (
          <FlatList
            data={followers}
            renderItem={renderFollowerItem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.followersColumnWrapper}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            nestedScrollEnabled={true}
          />
        );
      case 'saved':
        return (
          <View style={styles.emptyStateContainer}>
            <Bookmark size={48} color={colors.secondaryText} />
            <Text
              style={[styles.emptyStateText, {color: colors.secondaryText}]}>
              No saved items yet
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.primaryBG}]}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Cover Photo */}
        <View style={styles.coverPhotoContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
            }}
            style={styles.coverPhoto}
          />
          <TouchableOpacity
            style={[
              styles.editCoverButton,
              {backgroundColor: colors.secondary},
            ]}>
            <Edit size={16} color={colors.primaryText} />
          </TouchableOpacity>
        </View>

        {/* Profile Info Section */}
        <View
          style={[
            styles.profileInfoSection,
            {backgroundColor: colors.secondary},
          ]}>
          {/* Profile Photo */}
          <View style={styles.profilePhotoContainer}>
            <Image
              source={{uri: 'https://i.pravatar.cc/300?img=11'}}
              style={styles.profilePhoto}
            />
            <TouchableOpacity
              style={[
                styles.editProfileButton,
                {backgroundColor: colors.brandAccentColor},
              ]}>
              <Edit size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.nameContainer}>
            <Text style={[styles.profileName, {color: colors.primaryText}]}>
              Alexander Thompson
            </Text>
            <Text
              style={[styles.profileUsername, {color: colors.secondaryText}]}>
              @alexthompson
            </Text>
          </View>

          <View style={styles.bioContainer}>
            <Text style={[styles.bioText, {color: colors.primaryText}]}>
              Product reviewer & tech enthusiast. Sharing honest opinions about
              the latest gadgets and innovations.
            </Text>
          </View>

          <View style={styles.profileDetailsContainer}>
            <View style={styles.profileDetailItem}>
              <MapPin size={16} color={colors.secondaryText} />
              <Text
                style={[
                  styles.profileDetailText,
                  {color: colors.secondaryText},
                ]}>
                San Francisco, CA
              </Text>
            </View>
            <View style={styles.profileDetailItem}>
              <Calendar size={16} color={colors.secondaryText} />
              <Text
                style={[
                  styles.profileDetailText,
                  {color: colors.secondaryText},
                ]}>
                Joined March 2022
              </Text>
            </View>
            <View style={styles.profileDetailItem}>
              <Link size={16} color={colors.secondaryText} />
              <Text
                style={[styles.profileDetailText, {color: colors.linkColor}]}>
                techreviewer.com
              </Text>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[
                styles.primaryButton,
                {backgroundColor: colors.brandAccentColor},
              ]}>
              <Text style={styles.primaryButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.secondaryButton, {borderColor: colors.divider}]}>
              <Mail size={18} color={colors.primaryText} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.secondaryButton, {borderColor: colors.divider}]}>
              <Settings size={18} color={colors.primaryText} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Section */}
        <View
          style={[styles.statsSection, {backgroundColor: colors.secondary}]}>
          {dummyStats.map((stat, index) => (
            <View
              key={stat.id}
              style={[
                styles.statItem,
                index < dummyStats.length - 1 && {
                  borderRightWidth: 1,
                  borderRightColor: colors.divider,
                },
              ]}>
              <Text style={[styles.statCount, {color: colors.primaryText}]}>
                {stat.count}
              </Text>
              <Text style={[styles.statTitle, {color: colors.secondaryText}]}>
                {stat.title}
              </Text>
            </View>
          ))}
        </View>

        {/* Tabs Section */}
        <View
          style={[
            styles.tabsContainer,
            {
              backgroundColor: colors.secondary,
              borderBottomColor: colors.divider,
            },
          ]}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'posts' && styles.activeTabButton,
              activeTab === 'posts' && {
                borderBottomColor: colors.brandAccentColor,
              },
            ]}
            onPress={() => setActiveTab('posts')}>
            <Grid
              size={20}
              color={
                activeTab === 'posts'
                  ? colors.brandAccentColor
                  : colors.secondaryText
              }
            />
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === 'posts'
                      ? colors.brandAccentColor
                      : colors.secondaryText,
                },
              ]}>
              Posts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'followers' && styles.activeTabButton,
              activeTab === 'followers' && {
                borderBottomColor: colors.brandAccentColor,
              },
            ]}
            onPress={() => setActiveTab('followers')}>
            <Users
              size={20}
              color={
                activeTab === 'followers'
                  ? colors.brandAccentColor
                  : colors.secondaryText
              }
            />
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === 'followers'
                      ? colors.brandAccentColor
                      : colors.secondaryText,
                },
              ]}>
              Followers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'saved' && styles.activeTabButton,
              activeTab === 'saved' && {
                borderBottomColor: colors.brandAccentColor,
              },
            ]}
            onPress={() => setActiveTab('saved')}>
            <Bookmark
              size={20}
              color={
                activeTab === 'saved'
                  ? colors.brandAccentColor
                  : colors.secondaryText
              }
            />
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === 'saved'
                      ? colors.brandAccentColor
                      : colors.secondaryText,
                },
              ]}>
              Saved
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={[styles.tabContent, {backgroundColor: colors.primaryBG}]}>
          {renderTabContent()}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  coverPhotoContainer: {
    position: 'relative',
    height: 180,
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
  },
  editCoverButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  profileInfoSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    marginTop: -40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  profilePhotoContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: 16,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  editProfileButton: {
    position: 'absolute',
    right: 0,
    bottom: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  nameContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Roboto-Bold',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  bioContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  bioText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    lineHeight: 20,
    textAlign: 'center',
  },
  profileDetailsContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profileDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileDetailText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginHorizontal: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
  secondaryButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginHorizontal: 8,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  statCount: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomWidth: 2,
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  tabContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 400,
  },
  viewToggle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  viewToggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  gridColumnWrapper: {
    justifyContent: 'space-between',
  },
  gridItem: {
    width: (screenWidth - 40) / 3,
    height: (screenWidth - 40) / 3,
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  multipleImagesIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 4,
    padding: 4,
  },
  followersColumnWrapper: {
    justifyContent: 'space-between',
  },
  followerCard: {
    width: (screenWidth - 40) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  followerImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 12,
  },
  followerName: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginBottom: 8,
    textAlign: 'center',
  },
  followButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    marginTop: 16,
  },
});

export default Profile;
