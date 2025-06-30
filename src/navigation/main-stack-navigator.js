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
  MessageSquare,
  Bell,
  User,
} from 'lucide-react-native';

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
        name="MessagesTab"
        component={Messages}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({color, size}) => (
            <MessageSquare size={size} color={color} />
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
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => <User size={size} color={color} />,
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

      {/* New Screens for Explore Navigation */}
      <Stack.Screen name="SearchResults" component={ExploreScreen} />
      <Stack.Screen name="AllCategories" component={ExploreScreen} />
      <Stack.Screen name="CategoryProducts" component={ExploreScreen} />
      <Stack.Screen name="AllProducts" component={ExploreScreen} />
      <Stack.Screen name="AllServices" component={ExploreScreen} />
      <Stack.Screen name="AllReviews" component={ExploreScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
