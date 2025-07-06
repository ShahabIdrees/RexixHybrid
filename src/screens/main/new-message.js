import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import {useAppColors} from '../../utils/colors';
import {useCommonStyles} from '../../common-styling/theme-styling';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft, Search, UserPlus} from 'lucide-react-native';

const NewMessage = () => {
  const navigation = useNavigation();
  const commonStyles = useCommonStyles();
  const colors = useAppColors();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock users data
  const users = [
    {
      id: '1',
      userName: 'John Doe',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      isOnline: true,
      mutualFriends: 5,
    },
    {
      id: '2',
      userName: 'Sarah Wilson',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      isOnline: false,
      mutualFriends: 12,
    },
    {
      id: '3',
      userName: 'Mike Johnson',
      userAvatar: 'https://i.pravatar.cc/150?img=3',
      isOnline: true,
      mutualFriends: 3,
    },
    {
      id: '4',
      userName: 'Emma Davis',
      userAvatar: 'https://i.pravatar.cc/150?img=4',
      isOnline: false,
      mutualFriends: 8,
    },
    {
      id: '5',
      userName: 'Alex Brown',
      userAvatar: 'https://i.pravatar.cc/150?img=5',
      isOnline: true,
      mutualFriends: 15,
    },
    {
      id: '6',
      userName: 'Lisa Chen',
      userAvatar: 'https://i.pravatar.cc/150?img=6',
      isOnline: false,
      mutualFriends: 7,
    },
    {
      id: '7',
      userName: 'David Garcia',
      userAvatar: 'https://i.pravatar.cc/150?img=7',
      isOnline: true,
      mutualFriends: 9,
    },
    {
      id: '8',
      userName: 'Maria Rodriguez',
      userAvatar: 'https://i.pravatar.cc/150?img=8',
      isOnline: false,
      mutualFriends: 4,
    },
  ];

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleUserSelect = user => {
    // Create a new conversation and navigate to chat
    const newConversation = {
      id: `new_${Date.now()}`,
      userName: user.userName,
      userAvatar: user.userAvatar,
      lastMessage: '',
      lastMessageTime: 'Now',
      unreadCount: 0,
      isOnline: user.isOnline,
    };

    navigation.navigate('Chat', {conversation: newConversation});
  };

  const renderUser = ({item}) => (
    <TouchableOpacity
      style={[styles.userItem, {backgroundColor: colors.secondary}]}
      onPress={() => handleUserSelect(item)}>
      <View style={styles.userContent}>
        <View style={styles.avatarContainer}>
          <Image source={{uri: item.userAvatar}} style={styles.avatar} />
          {item.isOnline && (
            <View
              style={[
                styles.onlineIndicator,
                {backgroundColor: colors.brandAccentColor},
              ]}
            />
          )}
        </View>

        <View style={styles.userInfo}>
          <Text style={[styles.userName, {color: colors.primaryText}]}>
            {item.userName}
          </Text>
          <Text style={[styles.mutualFriends, {color: colors.secondaryText}]}>
            {item.mutualFriends} mutual friends
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.startChatButton,
            {backgroundColor: colors.brandAccentColor},
          ]}>
          <UserPlus size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.primaryBG}]}>
      {/* Header */}
      <View style={[styles.header, {backgroundColor: colors.primaryBG}]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: colors.primaryText}]}>
          New Message
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Bar */}
      <View style={[styles.searchBar, {backgroundColor: colors.secondary}]}>
        <Search size={20} color={colors.secondaryText} />
        <TextInput
          style={[styles.searchInput, {color: colors.primaryText}]}
          placeholder="Search users..."
          placeholderTextColor={colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Users List */}
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {color: colors.primaryText}]}>
            Suggested Users ({filteredUsers.length})
          </Text>
        </View>

        <FlatList
          data={filteredUsers}
          renderItem={renderUser}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.usersList}
        />
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
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
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  usersList: {
    paddingBottom: 20,
  },
  userItem: {
    borderRadius: 12,
    marginBottom: 8,
    padding: 16,
  },
  userContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    marginBottom: 2,
  },
  mutualFriends: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
  },
  startChatButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NewMessage;
