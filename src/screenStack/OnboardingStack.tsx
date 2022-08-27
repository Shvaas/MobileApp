import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

// Local
import RouteNames from '../constants/routeName';
import Welcome from '../screens/OnboardingFlow/Welcome/Welcome';
import Focus from '../screens/OnboardingFlow/Focus';
import Breathing from '../screens/OnboardingFlow/Breathing';
import WellDone from '../screens/OnboardingFlow/WellDone';

const Stack = createStackNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name={RouteNames.OnboardingFlow.Welcome}
        component={Welcome}
      />
      <Stack.Screen name={RouteNames.OnboardingFlow.Focus} component={Focus} />
      <Stack.Screen
        name={RouteNames.OnboardingFlow.Breathing}
        component={Breathing}
      />
      <Stack.Screen
        name={RouteNames.OnboardingFlow.WellDone}
        component={WellDone}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
