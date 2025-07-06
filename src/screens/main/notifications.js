import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {useAppColors} from '../../utils/colors';
import {useCommonStyles} from '../../common-styling/theme-styling';
import {useNavigation} from '@react-navigation/native';
import {MessageSquare, Bell, User} from 'lucide-react-native';

const Notifications = () => {
  const navigation = useNavigation();
  const commonStyles = useCommonStyles();
  const colors = useAppColors();

  // Mock notifications data
  const notifications = [
    {
      id: '1',
      type: 'like',
      message: 'John D. liked your review on Sony WH-1000XM4',
      time: '2 minutes ago',
      isRead: false,
    },
    {
      id: '2',
      type: 'comment',
      message: 'Sarah M. commented on your review',
      time: '5 minutes ago',
      isRead: false,
    },
    {
      id: '3',
      type: 'follow',
      message: 'Mike R. started following you',
      time: '1 hour ago',
      isRead: true,
    },
    {
      id: '4',
      type: 'product',
      message: 'New review for iPhone 15 Pro Max is trending',
      time: '2 hours ago',
      isRead: true,
    },
    {
      id: '5',
      type: 'service',
      message: 'Car Detailing Pro has a new offer',
      time: '3 hours ago',
      isRead: true,
    },
  ];

  const renderNotification = ({item}) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        {
          backgroundColor: item.isRead ? colors.primaryBG : colors.secondary,
          borderLeftColor: item.isRead
            ? 'transparent'
            : colors.brandAccentColor,
        },
      ]}>
      <View style={styles.notificationContent}>
        <Text
          style={[
            styles.notificationText,
            {
              color: colors.primaryText,
              fontWeight: item.isRead ? 'normal' : '600',
            },
          ]}>
          {item.message}
        </Text>
        <Text style={[styles.notificationTime, {color: colors.secondaryText}]}>
          {item.time}
        </Text>
      </View>
      {!item.isRead && (
        <View
          style={[styles.unreadDot, {backgroundColor: colors.brandAccentColor}]}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.primaryBG}]}>
      {/* Header */}
      <View style={[styles.header, {backgroundColor: colors.primaryBG}]}>
        <Text style={[styles.headerText, {color: colors.brandAccentColor}]}>
          Rexix
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => {
              navigation.navigate('Messages');
            }}>
            <MessageSquare size={24} color={colors.brandAccentColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <User size={24} color={colors.brandAccentColor} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Notifications List */}
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {color: colors.primaryText}]}>
            Notifications
          </Text>
          <TouchableOpacity>
            <Text style={[styles.markAllRead, {color: colors.linkColor}]}>
              Mark all read
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.notificationsList}
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
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
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
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  markAllRead: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  notificationsList: {
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 12,
  },
});

export default Notifications;
