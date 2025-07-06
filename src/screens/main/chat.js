import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import {useAppColors} from '../../utils/colors';
import {useCommonStyles} from '../../common-styling/theme-styling';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ArrowLeft,
  Send,
  MoreVertical,
  User,
  Trash2,
  VolumeX,
  Flag,
  Copy,
} from 'lucide-react-native';

const Chat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const commonStyles = useCommonStyles();
  const colors = useAppColors();
  const [messageText, setMessageText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hi! I really enjoyed your review on the Sony headphones.',
      isFromMe: false,
      timestamp: '10:30 AM',
      userName: route.params?.conversation?.userName || 'User',
      userAvatar: route.params?.conversation?.userAvatar,
    },
    {
      id: '2',
      text: "Thanks! I'm glad you found it helpful. What specifically did you like about it?",
      isFromMe: true,
      timestamp: '10:32 AM',
    },
    {
      id: '3',
      text: "The sound quality comparison was really detailed. I'm thinking of buying them now.",
      isFromMe: false,
      timestamp: '10:35 AM',
      userName: route.params?.conversation?.userName || 'User',
      userAvatar: route.params?.conversation?.userAvatar,
    },
    {
      id: '4',
      text: "That's great! They're definitely worth the investment. The noise cancellation is amazing too.",
      isFromMe: true,
      timestamp: '10:37 AM',
    },
    {
      id: '5',
      text: "Do you think they're good for gaming as well?",
      isFromMe: false,
      timestamp: '10:40 AM',
      userName: route.params?.conversation?.userName || 'User',
      userAvatar: route.params?.conversation?.userAvatar,
    },
  ]);

  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: messageText.trim(),
        isFromMe: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, newMessage]);
      setMessageText('');

      // Auto-scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true});
      }, 100);
    }
  };

  const handleProfileClick = () => {
    navigation.navigate('Profile', {userId: route.params?.conversation?.id});
  };

  const handleMenuOption = option => {
    setShowMenu(false);

    switch (option) {
      case 'viewProfile':
        handleProfileClick();
        break;
      case 'mute':
        Alert.alert('Muted', `Muted ${route.params?.conversation?.userName}`);
        break;
      case 'copy':
        Alert.alert('Copied', 'Conversation link copied to clipboard');
        break;
      case 'report':
        Alert.alert(
          'Reported',
          `Reported ${route.params?.conversation?.userName}`,
        );
        break;
      case 'delete':
        Alert.alert(
          'Delete Conversation',
          `Are you sure you want to delete this conversation?`,
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                Alert.alert('Deleted', 'Conversation deleted.');
                navigation.goBack();
              },
            },
          ],
        );
        break;
    }
  };

  const renderMessage = ({item}) => (
    <View
      style={[
        styles.messageContainer,
        item.isFromMe
          ? styles.myMessageContainer
          : styles.theirMessageContainer,
      ]}>
      {!item.isFromMe && (
        <Image source={{uri: item.userAvatar}} style={styles.messageAvatar} />
      )}

      <View
        style={[
          styles.messageBubble,
          {
            backgroundColor: item.isFromMe
              ? colors.brandAccentColor
              : colors.secondary,
          },
        ]}>
        <Text
          style={[
            styles.messageText,
            {color: item.isFromMe ? '#FFFFFF' : colors.primaryText},
          ]}>
          {item.text}
        </Text>
        <Text
          style={[
            styles.messageTime,
            {
              color: item.isFromMe
                ? 'rgba(255,255,255,0.7)'
                : colors.secondaryText,
            },
          ]}>
          {item.timestamp}
        </Text>
      </View>
    </View>
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
      {/* Header */}
      <View style={[styles.header, {backgroundColor: colors.primaryBG}]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.primaryText} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerInfo}
          onPress={handleProfileClick}>
          <Image
            source={{uri: route.params?.conversation?.userAvatar}}
            style={styles.headerAvatar}
          />
          <View style={styles.headerText}>
            <Text style={[styles.headerName, {color: colors.primaryText}]}>
              {route.params?.conversation?.userName}
            </Text>
            <Text style={[styles.headerStatus, {color: colors.secondaryText}]}>
              {route.params?.conversation?.isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => setShowMenu(true)}>
          <MoreVertical size={24} color={colors.primaryText} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={styles.messagesContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({animated: true})
          }
        />
      </KeyboardAvoidingView>

      {/* Message Input */}
      <View
        style={[styles.inputContainer, {backgroundColor: colors.secondary}]}>
        <TextInput
          style={[styles.messageInput, {color: colors.primaryText}]}
          placeholder="Type a message..."
          placeholderTextColor={colors.secondaryText}
          value={messageText}
          onChangeText={setMessageText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            {
              backgroundColor: messageText.trim()
                ? colors.brandAccentColor
                : colors.secondaryText,
            },
          ]}
          onPress={sendMessage}
          disabled={!messageText.trim()}>
          <Send size={20} color="#FFFFFF" />
        </TouchableOpacity>
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
              <Copy size={20} color={colors.primaryText} />,
              'Copy Link',
              () => handleMenuOption('copy'),
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
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
  headerStatus: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
  },
  moreButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  theirMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  messageText: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    lineHeight: 20,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 11,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  messageInput: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
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

export default Chat;
