import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Yogis from '../screens/HomePageFlow/Yogis/Yogis';
import Yogi from '../screens/HomePageFlow/Yogis/Yogi';

// Local


const Stack = createNativeStackNavigator();

const YogisStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen
        name={"Yogis"}
        component={Yogis}
      />
      <Stack.Screen
        name={"YogiProfile"}
        component={Yogi}
      />
    </Stack.Navigator>
  );
};

export default YogisStack;
