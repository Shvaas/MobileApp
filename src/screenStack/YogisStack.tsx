import React from 'react';
import {
  Text,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Yogis from '../screens/HomePageFlow/Yogis/Yogis';

// Local
import RouteNames from '../constants/routeName';
import CalendarPage from '../screens/HomePageFlow/Yogis/CalendarPage';
import Yogi from '../screens/HomePageFlow/Yogis/YogiProfile';
import Profile from '../screens/HomePageFlow/UserProfile/Profile';
import UserDetails from '../screens/HomePageFlow/UserProfile/UserDetails';
import Help from '../screens/HomePageFlow/UserProfile/Help';

const Stack = createNativeStackNavigator();

const YogisStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen
      name={RouteNames.HomePageFlow.AllYogis}
      component={Yogis} />
      <Stack.Screen name={RouteNames.HomePageFlow.UserProfile} component={Profile}/>
      <Stack.Screen name={RouteNames.HomePageFlow.UserDetails} component={UserDetails}/>
      <Stack.Screen name={RouteNames.HomePageFlow.Help} component={Help}/>
      <Stack.Screen
          name={RouteNames.HomePageFlow.CalendarPage}
          component={CalendarPage}
        />
    </Stack.Navigator>
  );
};

export default YogisStack;
