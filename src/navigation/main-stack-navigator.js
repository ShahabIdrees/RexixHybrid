import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Home,
  Messages,
  Notifications,
  Profile,
  Search as ExploreScreen,
  Settings,
  AddPost,
  Product,
  Brand,
  Comments,
  SearchResults,
  AllCategories,
  AllProducts,
  AllServices,
  AllReviews,
  CategoryProducts,
  Chat,
  NewMessage,
} from '../screens/main';
import {
  Login,
  Signup,
  OTPVerification,
  SetPassword,
  InterestsSelection,
  ForgotPassword,
} from '../screens/auth';
import {useTheme} from '../contexts/ThemeContext';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Plus,
  Bell,
  Settings as SettingsIcon,
} from 'lucide-react-native';
import {View} from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const BottomTabNavigator = () => {
  const {colors, actualTheme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primaryBG,
          borderTopColor: colors.borderColor,
          paddingTop: 10,
          height: 60,
        },
        tabBarActiveTintColor: colors.brandAccentColor,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Roboto-Medium',
          paddingBottom: 5,
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => <HomeIcon size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({color, size}) => (
            <SearchIcon size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddPostTab"
        component={AddPost}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                width: size + 16,
                height: size + 16,
                borderRadius: (size + 16) / 2,
                backgroundColor: color,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8,
              }}>
              <Plus size={size + 4} color="#FFFFFF" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={Notifications}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({color, size}) => <Bell size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <SettingsIcon size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main Stack Navigator
const MainStackNavigator = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.primaryBG},
      }}>
      {/* Auth Screens */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen name="SetPassword" component={SetPassword} />
      <Stack.Screen name="InterestsSelection" component={InterestsSelection} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      {/* Main App Screens */}
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="AddPost" component={AddPost} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Brand" component={Brand} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="NewMessage" component={NewMessage} />

      {/* Search Results Screen */}
      <Stack.Screen name="SearchResults" component={SearchResults} />

      {/* Category and List Screens */}
      <Stack.Screen name="AllCategories" component={AllCategories} />
      <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
      <Stack.Screen name="AllProducts" component={AllProducts} />
      <Stack.Screen name="AllServices" component={AllServices} />
      <Stack.Screen name="AllReviews" component={AllReviews} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
