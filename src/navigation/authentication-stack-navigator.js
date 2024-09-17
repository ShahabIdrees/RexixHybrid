import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../screens/auth';

const Stack = createNativeStackNavigator();

export function AuthenticationStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen name="login" component={Login} />
      {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
      {/* <Stack.Screen name="Profile" component={Profile} /> */}
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}
