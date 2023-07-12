import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CalendarPage from '../screens/HomePageFlow/Yogis/CalendarPage';
import Profile from '../screens/HomePageFlow/UserProfile/Profile';
// Local
import RouteNames from '../constants/routeName';

const Stack = createNativeStackNavigator();

const TeacherSessionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen
        name={RouteNames.HomePageFlow.CalendarPage}
        component={CalendarPage}
      />
      <Stack.Screen name={RouteNames.HomePageFlow.UserProfile} component={Profile}/>
    </Stack.Navigator>
  );
};

export default TeacherSessionStack;
