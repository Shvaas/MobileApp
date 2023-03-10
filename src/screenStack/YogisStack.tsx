import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Yogis from '../screens/HomePageFlow/Yogis/Yogis';

// Local
import RouteNames from '../constants/routeName';

const Stack = createNativeStackNavigator();

const YogisStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen name={RouteNames.HomePageFlow.AllYogis} component={Yogis} />
    </Stack.Navigator>
  );
};

export default YogisStack;
