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
  Modal,
  Alert,
} from 'react-native';
import {useAppColors} from '../../utils/colors';
import {useCommonStyles} from '../../common-styling/theme-styling';
import {useNavigation} from '@react-navigation/native';
import {
  MessageSquare,
  Search,
  MoreVertical,
  Send,
  User,
  Trash2,
  VolumeX,
  Flag,
} from 'lucide-react-native';

const Messages = () => {
  const navigation = useNavigation();
  const commonStyles = useCommonStyles();
  const colors = useAppColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  // Mock conversations data
  const conversations = [
    {
      id: '1',
      userName: 'John Doe',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      lastMessage: 'Thanks for the review! Really helpful.',
      lastMessageTime: '2 min ago',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: '2',
      userName: 'Sarah Wilson',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      lastMessage: 'Can you recommend a good laptop?',
      lastMessageTime: '1 hour ago',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: '3',
      userName: 'Mike Johnson',
      userAvatar: 'https://i.pravatar.cc/150?img=3',
      lastMessage: 'Your review was spot on!',
      lastMessageTime: '3 hours ago',
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: '4',
      userName: 'Emma Davis',
      userAvatar: 'https://i.pravatar.cc/150?img=4',
      lastMessage: 'When will you review the new iPhone?',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: '5',
      userName: 'Alex Brown',
      userAvatar: 'https://i.pravatar.cc/150?img=5',
      lastMessage: 'Great content as always!',
      lastMessageTime: '2 days ago',
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: '6',
      userName: 'Lisa Chen',
      userAvatar: 'https://i.pravatar.cc/150?img=6',
      lastMessage: 'Do you have experience with Android phones?',
      lastMessageTime: '3 days ago',
      unreadCount: 0,
      isOnline: false,
    },
  ];

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    conversation =>
      conversation.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  const handleNewMessage = () => {
    navigation.navigate('NewMessage');
  };

  const handleConversationPress = conversation => {
    navigation.navigate('Chat', {conversation: conversation});
  };

  const handleAvatarPress = (conversation, event) => {
    event.stopPropagation();
    navigation.navigate('Profile', {userId: conversation.id});
  };

  const handleMenuPress = conversation => {
    setSelectedConversation(conversation);
    setShowMenu(true);
  };

  const handleMenuOption = option => {
    setShowMenu(false);

    switch (option) {
      case 'viewProfile':
        navigation.navigate('Profile', {userId: selectedConversation.id});
        break;
      case 'mute':
        Alert.alert('Muted', `Muted ${selectedConversation.userName}`);
        break;
      case 'block':
        Alert.alert('Blocked', `Blocked ${selectedConversation.userName}`);
        break;
      case 'report':
        Alert.alert('Reported', `Reported ${selectedConversation.userName}`);
        break;
      case 'delete':
        Alert.alert(
          'Delete Conversation',
          `Are you sure you want to delete the conversation with ${selectedConversation.userName}?`,
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                Alert.alert(
                  'Deleted',
                  `Conversation with ${selectedConversation.userName} deleted.`,
                );
              },
            },
          ],
        );
        break;
    }
  };

  const renderConversation = ({item}) => (
    <TouchableOpacity
      style={[styles.conversationItem, {backgroundColor: colors.secondary}]}
      onPress={() => handleConversationPress(item)}>
      <View style={styles.conversationContent}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={event => handleAvatarPress(item, event)}>
          <Image source={{uri: item.userAvatar}} style={styles.avatar} />
          {item.isOnline && (
            <View
              style={[
                styles.onlineIndicator,
                {backgroundColor: colors.brandAccentColor},
              ]}
            />
          )}
        </TouchableOpacity>

        <View style={styles.messageInfo}>
          <View style={styles.messageHeader}>
            <Text style={[styles.userName, {color: colors.primaryText}]}>
              {item.userName}
            </Text>
            <View style={styles.messageHeaderActions}>
              <Text style={[styles.messageTime, {color: colors.secondaryText}]}>
                {item.lastMessageTime}
              </Text>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => handleMenuPress(item)}>
                <MoreVertical size={16} color={colors.secondaryText} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.messagePreview}>
            <Text
              style={[
                styles.lastMessage,
                {
                  color:
                    item.unreadCount > 0
                      ? colors.primaryText
                      : colors.secondaryText,
                  fontWeight: item.unreadCount > 0 ? '600' : 'normal',
                },
              ]}
              numberOfLines={1}>
              {item.lastMessage}
            </Text>

            {item.unreadCount > 0 && (
              <View
                style={[
                  styles.unreadBadge,
                  {backgroundColor: colors.brandAccentColor},
                ]}>
                <Text style={styles.unreadCount}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMenuOption = (icon, title, onPress, isDestructive = false) => (
    <TouchableOpacity
      style={[styles.menuOption, isDestructive && styles.menuOptionDestructive]}
      onPress={onPress}>
      {icon}
      <Text
        style={[
          styles.menuOptionText,
          {color: isDestructive ? '#FF3B30' : colors.primaryText},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.primaryBG}]}>
      {/* Search Bar */}
      <View style={[styles.searchBar, {backgroundColor: colors.secondary}]}>
        <Search size={20} color={colors.secondaryText} />
        <TextInput
          style={[styles.searchInput, {color: colors.primaryText}]}
          placeholder="Search conversations..."
          placeholderTextColor={colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Conversations List */}
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {color: colors.primaryText}]}>
            Messages ({filteredConversations.length})
          </Text>
          <TouchableOpacity onPress={handleNewMessage}>
            <Text style={[styles.newMessage, {color: colors.linkColor}]}>
              New Message
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredConversations}
          renderItem={renderConversation}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.conversationsList}
        />
      </View>

      {/* Menu Modal */}
      <Modal
        visible={showMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}>
          <View
            style={[styles.menuContainer, {backgroundColor: colors.secondary}]}>
            {renderMenuOption(
              <User size={20} color={colors.primaryText} />,
              'View Profile',
              () => handleMenuOption('viewProfile'),
            )}
            {renderMenuOption(
              <VolumeX size={20} color={colors.primaryText} />,
              'Mute Notifications',
              () => handleMenuOption('mute'),
            )}
            {renderMenuOption(
              <Flag size={20} color={colors.primaryText} />,
              'Report User',
              () => handleMenuOption('report'),
            )}
            {renderMenuOption(
              <Trash2 size={20} color="#FF3B30" />,
              'Delete Conversation',
              () => handleMenuOption('delete'),
              true,
            )}
          </View>
        </TouchableOpacity>
      </Modal>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  newMessage: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  conversationsList: {
    paddingBottom: 20,
  },
  conversationItem: {
    borderRadius: 12,
    marginBottom: 8,
    padding: 16,
  },
  conversationContent: {
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
  messageInfo: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuButton: {
    padding: 4,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
  },
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginRight: 8,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    borderRadius: 12,
    padding: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  menuOptionDestructive: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    marginTop: 4,
  },
  menuOptionText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
});

export default Messages;
