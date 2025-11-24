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
import {View, Platform, TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const BottomTabNavigator = () => {
  const {colors, actualTheme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: true,
        tabBarStyle: {
          backgroundColor: colors.secondaryBG,
          borderTopWidth: 1,
          borderTopColor: colors.secondaryBG,
          paddingTop: 8,
          borderTopEndRadius: 8,
          borderTopStartRadius: 8,
          elevation: 8,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          height: Platform.OS === 'ios' ? 88 : 72,
          elevation: 8,
          shadowColor: colors.shadowColor,
          shadowOffset: {width: 0, height: -2},
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: colors.brandAccentColor,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'Roboto-Medium',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => (
            <HomeIcon
              size={focused ? 24 : 22}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({color, size, focused}) => (
            <SearchIcon
              size={focused ? 24 : 22}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddPostTab"
        component={AddPost}
        options={{
          tabBarLabel: '',
          tabBarButton: props => (
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
              onPress={props.onPress}
              activeOpacity={0.8}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: colors.brandAccentColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: -12,
                  shadowColor: colors.brandAccentColor,
                  shadowOffset: {width: 0, height: 4},
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                  borderWidth: 4,
                  borderColor: colors.primaryBG,
                }}>
                <Plus size={26} color="#FFFFFF" strokeWidth={3} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={Notifications}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({color, size, focused}) => (
            <Bell
              size={focused ? 24 : 22}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size, focused}) => (
            <SettingsIcon
              size={focused ? 24 : 22}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
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
        animation: 'default',
        animationDuration: 200,
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
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="Brand"
        component={Brand}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="NewMessage"
        component={NewMessage}
        options={{animation: 'slide_from_bottom'}}
      />

      {/* Search Results Screen */}
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        options={{animation: 'slide_from_right'}}
      />

      {/* Category and List Screens */}
      <Stack.Screen
        name="AllCategories"
        component={AllCategories}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="CategoryProducts"
        component={CategoryProducts}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="AllProducts"
        component={AllProducts}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="AllServices"
        component={AllServices}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="AllReviews"
        component={AllReviews}
        options={{animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
