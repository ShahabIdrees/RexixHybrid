import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import {useAppColors} from '../../utils/colors';
import {
  User,
  Bell,
  Shield,
  Palette,
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Smartphone,
  Globe,
  Lock,
  Eye,
  Volume2,
  Wifi,
  Battery,
} from 'lucide-react-native';

const Settings = () => {
  const colors = useAppColors();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          // Handle logout logic here
          console.log('User logged out');
        },
      },
    ]);
  };

  const renderSettingItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    showSwitch,
    switchValue,
    onSwitchChange,
    showChevron = true,
    destructive = false,
  }) => (
    <TouchableOpacity
      style={[
        styles.settingItem,
        {backgroundColor: colors.secondary},
        destructive && {borderLeftColor: '#ff4444'},
      ]}
      onPress={onPress}
      disabled={showSwitch}>
      <View style={styles.settingItemLeft}>
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: colors.brandAccentColor + '20'},
            destructive && {backgroundColor: '#ff444420'},
          ]}>
          <Icon
            size={20}
            color={destructive ? '#ff4444' : colors.brandAccentColor}
          />
        </View>
        <View style={styles.settingTextContainer}>
          <Text
            style={[
              styles.settingTitle,
              {color: colors.primaryText},
              destructive && {color: '#ff4444'},
            ]}>
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[styles.settingSubtitle, {color: colors.secondaryText}]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.settingItemRight}>
        {showSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{
              false: colors.divider,
              true: colors.brandAccentColor + '40',
            }}
            thumbColor={
              switchValue ? colors.brandAccentColor : colors.secondaryText
            }
          />
        ) : (
          showChevron && <ChevronRight size={20} color={colors.secondaryText} />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSection = ({title, children}) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, {color: colors.secondaryText}]}>
        {title}
      </Text>
      <View
        style={[styles.sectionContent, {backgroundColor: colors.secondary}]}>
        {children}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.primaryBG}]}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, {backgroundColor: colors.secondary}]}>
          <Text style={[styles.headerTitle, {color: colors.primaryText}]}>
            Settings
          </Text>
          <Text style={[styles.headerSubtitle, {color: colors.secondaryText}]}>
            Manage your app preferences
          </Text>
        </View>

        {/* Account Settings */}
        {renderSection({
          title: 'Account',
          children: (
            <>
              {renderSettingItem({
                icon: User,
                title: 'Profile',
                subtitle: 'Edit your profile information',
                onPress: () => console.log('Profile pressed'),
              })}
              {renderSettingItem({
                icon: Lock,
                title: 'Privacy',
                subtitle: 'Manage your privacy settings',
                onPress: () => console.log('Privacy pressed'),
              })}
              {renderSettingItem({
                icon: Shield,
                title: 'Security',
                subtitle: 'Two-factor authentication, passwords',
                onPress: () => console.log('Security pressed'),
              })}
            </>
          ),
        })}

        {/* Notifications */}
        {renderSection({
          title: 'Notifications',
          children: (
            <>
              {renderSettingItem({
                icon: Bell,
                title: 'Push Notifications',
                subtitle: 'Receive notifications about new content',
                showSwitch: true,
                switchValue: notifications,
                onSwitchChange: setNotifications,
                showChevron: false,
              })}
              {renderSettingItem({
                icon: Volume2,
                title: 'Sound & Vibration',
                subtitle: 'Play sounds for notifications',
                showSwitch: true,
                switchValue: soundEnabled,
                onSwitchChange: setSoundEnabled,
                showChevron: false,
              })}
            </>
          ),
        })}

        {/* Appearance */}
        {renderSection({
          title: 'Appearance',
          children: (
            <>
              {renderSettingItem({
                icon: darkMode ? Moon : Sun,
                title: 'Dark Mode',
                subtitle: 'Switch between light and dark themes',
                showSwitch: true,
                switchValue: darkMode,
                onSwitchChange: setDarkMode,
                showChevron: false,
              })}
              {renderSettingItem({
                icon: Palette,
                title: 'Theme',
                subtitle: 'Choose your preferred color scheme',
                onPress: () => console.log('Theme pressed'),
              })}
            </>
          ),
        })}

        {/* Content */}
        {renderSection({
          title: 'Content',
          children: (
            <>
              {renderSettingItem({
                icon: Eye,
                title: 'Auto-play Videos',
                subtitle: 'Automatically play videos in feed',
                showSwitch: true,
                switchValue: autoPlay,
                onSwitchChange: setAutoPlay,
                showChevron: false,
              })}
              {renderSettingItem({
                icon: Wifi,
                title: 'Data Usage',
                subtitle: 'Manage your data consumption',
                onPress: () => console.log('Data Usage pressed'),
              })}
            </>
          ),
        })}

        {/* Support */}
        {renderSection({
          title: 'Support',
          children: (
            <>
              {renderSettingItem({
                icon: HelpCircle,
                title: 'Help & Support',
                subtitle: 'Get help and contact support',
                onPress: () => console.log('Help pressed'),
              })}
              {renderSettingItem({
                icon: Globe,
                title: 'About',
                subtitle: 'App version and information',
                onPress: () => console.log('About pressed'),
              })}
            </>
          ),
        })}

        {/* Logout */}
        {renderSection({
          title: 'Account',
          children: (
            <>
              {renderSettingItem({
                icon: LogOut,
                title: 'Logout',
                subtitle: 'Sign out of your account',
                onPress: handleLogout,
                destructive: true,
              })}
            </>
          ),
        })}

        <View style={styles.bottomSpacing} />
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    paddingHorizontal: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    borderRadius: 12,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  settingItemRight: {
    alignItems: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default Settings;
