import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {
  MessageCircle,
  Heart,
  UserPlus,
  Star,
  Package,
  AtSign,
  Mail,
  UserCircle2,
} from 'lucide-react-native';

const Notifications = () => {
  const navigation = useNavigation();
  const {colors, actualTheme} = useTheme();
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'like',
      userName: 'John D.',
      userAvatar: 'https://i.pravatar.cc/100?img=12',
      message: 'liked your review on Sony WH-1000XM4',
      time: '2m ago',
      isRead: false,
      targetType: 'post',
      targetId: 'post_1',
      preview: '“Noise cancellation is top-notch, especially in busy offices.”',
    },
    {
      id: '2',
      type: 'comment',
      userName: 'Sarah M.',
      userAvatar: 'https://i.pravatar.cc/100?img=23',
      message: 'commented on your review',
      time: '5m ago',
      isRead: false,
      targetType: 'comments',
      targetId: 'post_2',
      preview: '“I had a similar experience with the battery life…”',
    },
    {
      id: '3',
      type: 'reply',
      userName: 'Alex K.',
      userAvatar: 'https://i.pravatar.cc/100?img=34',
      message: 'replied to your comment',
      time: '15m ago',
      isRead: false,
      targetType: 'comments',
      targetId: 'post_3',
      preview: '“Totally agree on the camera sharpness!”',
    },
    {
      id: '4',
      type: 'follow',
      userName: 'Mike R.',
      userAvatar: 'https://i.pravatar.cc/100?img=45',
      message: 'started following you',
      time: '1h ago',
      isRead: true,
      targetType: 'profile',
      targetId: 'user_4',
    },
    {
      id: '5',
      type: 'mention',
      userName: 'Emma W.',
      userAvatar: 'https://i.pravatar.cc/100?img=56',
      message: 'mentioned you in a comment',
      time: '2h ago',
      isRead: true,
      targetType: 'comments',
      targetId: 'post_5',
      preview: '“@you what did you think about the latest update?”',
    },
    {
      id: '6',
      type: 'product',
      userName: 'Rexix',
      userAvatar: null,
      message: 'New review for iPhone 15 Pro Max is trending',
      time: '3h ago',
      isRead: true,
      targetType: 'post',
      targetId: 'post_iphone15_review_trending',
      preview: '“Battery life is stellar, and the camera is a beast.”',
    },
    {
      id: '7',
      type: 'brand',
      userName: 'Rexix',
      userAvatar: null,
      message: 'Sony has a new product available',
      time: '5h ago',
      isRead: true,
      targetType: 'product',
      targetId: 'product_sony_new',
      preview: 'Check specs, price, and early hands-on impressions.',
    },
  ]);

  const getNotificationIcon = type => {
    const iconProps = {
      size: 20,
      color: colors.brandAccentColor,
      strokeWidth: 2,
    };

    switch (type) {
      case 'like':
        return <Heart {...iconProps} fill={colors.brandAccentColor} />;
      case 'comment':
      case 'reply':
        return <MessageCircle {...iconProps} />;
      case 'follow':
        return <UserPlus {...iconProps} />;
      case 'mention':
        return <AtSign {...iconProps} />;
      case 'product':
      case 'brand':
        return <Package {...iconProps} />;
      default:
        return <Star {...iconProps} />;
    }
  };

  const handleNotificationPress = useCallback(
    notification => {
      // Mark as read
      setNotifications(prev =>
        prev.map(n => (n.id === notification.id ? {...n, isRead: true} : n)),
      );

      // Navigate based on type
      switch (notification.targetType) {
        case 'post':
          navigation.navigate('Comments', {
            postId: notification.targetId,
            title: 'Review',
            content: 'Post content',
          });
          break;
        case 'comments':
          navigation.navigate('Comments', {
            postId: notification.targetId,
            title: 'Comments',
            content: 'Comment thread',
          });
          break;
        case 'profile':
          navigation.navigate('Profile', {userId: notification.targetId});
          break;
        case 'product':
          navigation.navigate('Product', {productId: notification.targetId});
          break;
        case 'brand':
          navigation.navigate('Brand', {brandId: notification.targetId});
          break;
        default:
          break;
      }
    },
    [navigation],
  );

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({...n, isRead: true})));
  }, []);

  const renderNotification = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={[
          styles.notificationItem,
          {
            backgroundColor: item.isRead ? colors.primaryBG : colors.secondary,
          },
        ]}
        onPress={() => handleNotificationPress(item)}
        activeOpacity={0.7}>
        {/* Avatar or Icon */}
        <View
          style={[styles.avatarContainer, {backgroundColor: colors.secondary}]}>
          {item.userAvatar ? (
            <Image
              source={{uri: item.userAvatar}}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.iconContainer}>
              {getNotificationIcon(item.type)}
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.notificationContent}>
          <Text style={[styles.notificationText, {color: colors.primaryText}]}>
            <Text style={styles.userName}>{item.userName}</Text> {item.message}
          </Text>
          {item.preview ? (
            <Text
              style={[
                styles.notificationPreview,
                {color: colors.secondaryText},
              ]}
              numberOfLines={1}>
              {item.preview}
            </Text>
          ) : null}
          <Text
            style={[styles.notificationTime, {color: colors.secondaryText}]}>
            {item.time}
          </Text>
        </View>

        {/* Unread indicator */}
        {!item.isRead && (
          <View
            style={[
              styles.unreadDot,
              {backgroundColor: colors.brandAccentColor},
            ]}
          />
        )}
      </TouchableOpacity>
    ),
    [colors, handleNotificationPress, getNotificationIcon],
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.primaryBG}]}>
      {/* Notifications List */}
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={[styles.sectionTitle, {color: colors.primaryText}]}>
              Notifications
            </Text>
            {unreadCount > 0 && (
              <Text style={[styles.unreadCount, {color: colors.secondaryText}]}>
                {unreadCount} unread
              </Text>
            )}
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllAsRead}>
              <Text style={[styles.markAllRead, {color: colors.linkColor}]}>
                Mark all read
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.notificationsList}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Roboto-Bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerButton: {
    padding: 4,
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
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    marginBottom: 2,
  },
  unreadCount: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
  },
  markAllRead: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  notificationsList: {
    paddingBottom: 100,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 4,
    borderRadius: 12,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationPreview: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    opacity: 0.8,
    marginBottom: 2,
  },
  userName: {
    fontFamily: 'Roboto-Medium',
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 12,
  },
});

export default Notifications;
