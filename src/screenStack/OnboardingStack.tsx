import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Local
import RouteNames, {APP_FLOWS} from '../constants/routeName';
import Welcome from '../screens/OnboardingFlow/Welcome/Welcome';
import Login from '../screens/OnboardingFlow/Login';
import HomePageStack from './HomePageStack';

const Stack = createNativeStackNavigator();

function HomeNav(){
  return(
      <HomePageStack/>
  );
}

const OnboardingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen
        name={RouteNames.OnboardingFlow.Welcome}
        component={Welcome}
      />
      <Stack.Screen
        name={RouteNames.OnboardingFlow.Login}
        component={Login}
      />
      <Stack.Screen
        name='Home'
        component={HomeNav}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
