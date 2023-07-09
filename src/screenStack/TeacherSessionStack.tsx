import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CalendarPage from '../screens/HomePageFlow/Yogis/CalendarPage';

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
    </Stack.Navigator>
  );
};

export default TeacherSessionStack;
