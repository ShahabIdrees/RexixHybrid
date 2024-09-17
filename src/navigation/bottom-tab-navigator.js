import React from 'react';
import {Animated, useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Home,
  Messages,
  Notifications,
  Profile,
  Search,
  Settings,
} from '../screens/main';
import {
  HomeIcon,
  HomeIconSelectedBright,
  HomeIconSelectedDark,
  SettingsIcon,
  SettingsIconSelectedBright,
  SettingsIconSelectedDark,
  ProfileIcon,
  ProfileIconSelectedBright,
  ProfileIconSelectedDark,
  NotificationsIcon,
  NotificationsIconSelectedBright,
  NotificationsIconSelectedDark,
  MessagesIcon,
  MessagesIconSelectedBright,
  MessagesIconSelectedDark,
  AddIcon,
  AddIconSelectedBright,
  AddIconSelectedDark,
  SearchIcon,
  SearchIconSelectedBright,
  SearchIconSelectedDark,
  HomeDark,
  NotificationDark,
  MessagesDark,
  SearchDark,
  Adddark,
} from '../assets/icons';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const forSlide = ({current, next, layouts}) => {
    const progress = next
      ? Animated.add(
          current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
          next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        )
      : current.progress;

    return {
      cardStyle: {
        transform: [
          {
            translateX: progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [layouts.screen.width, 0, -layouts.screen.width],
            }),
          },
        ],
      },
    };
  };

  const getTabBarIcon = (route, focused) => {
    const isDarkMode = colorScheme === 'dark';

    switch (route.name) {
      case 'Home':
        return focused ? (
          isDarkMode ? (
            <HomeIconSelectedDark />
          ) : (
            <HomeIconSelectedBright />
          )
        ) : isDarkMode ? (
          <HomeDark />
        ) : (
          <HomeIcon />
        );
      case 'Settings':
        return focused ? (
          isDarkMode ? (
            <SettingsIconSelectedDark />
          ) : (
            <SettingsIconSelectedBright />
          )
        ) : (
          <SettingsIcon />
        );
      case 'Profile':
        return focused ? (
          isDarkMode ? (
            <ProfileIconSelectedDark />
          ) : (
            <ProfileIconSelectedBright />
          )
        ) : (
          <ProfileIcon />
        );
      case 'Notifications':
        return focused ? (
          isDarkMode ? (
            <NotificationsIconSelectedDark />
          ) : (
            <NotificationsIconSelectedBright />
          )
        ) : isDarkMode ? (
          <NotificationDark />
        ) : (
          <NotificationsIcon />
        );
      case 'Messages':
        return focused ? (
          isDarkMode ? (
            <MessagesIconSelectedDark />
          ) : (
            <MessagesIconSelectedBright />
          )
        ) : isDarkMode ? (
          <MessagesDark />
        ) : (
          <MessagesIcon />
        );
      case 'Add':
        return focused ? (
          isDarkMode ? (
            <AddIconSelectedDark />
          ) : (
            <AddIconSelectedBright />
          )
        ) : isDarkMode ? (
          <Adddark />
        ) : (
          <AddIcon />
        );
      case 'Search':
        return focused ? (
          isDarkMode ? (
            <SearchIconSelectedDark />
          ) : (
            <SearchIconSelectedBright />
          )
        ) : isDarkMode ? (
          <SearchDark />
        ) : (
          <SearchIcon />
        );
      default:
        return null;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: 'transparent', // Removing highlight color
        tabBarInactiveTintColor: 'transparent', // Removing highlight color
        headerShown: false,
        cardStyleInterpolator: forSlide,
        tabBarIcon: ({focused}) => getTabBarIcon(route, focused),
        tabBarLabel: () => null, // Removing labels
        tabBarStyle: {
          paddingBottom: 0,
          height: 60,
          backgroundColor: colorScheme === 'dark' ? '#18191A' : '#fff', // Background color based on color scheme
          borderTopWidth: 0,
          borderTopEndRadius: 6,
          borderTopStartRadius: 6,
          elevation: 5,
        },
        tabBarItemStyle: {
          marginBottom: 0,
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Settings" component={Settings} /> */}
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Add" component={Profile} />
      {/* <Tab.Screen name="Profile" component={Profile} /> */}
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
