import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MySessions from '../screens/HomePageFlow/AllCourses/MySessions';
import SessionFeedback from '../screens/HomePageFlow/AllCourses/SessionFeedback';
import Sessions from '../screens/HomePageFlow/TeacherSessions/Sessions';
import CreateSessions from '../screens/HomePageFlow/TeacherSessions/CreateSessions';

// Local
import RouteNames from '../constants/routeName';

const Stack = createNativeStackNavigator();

const AllCoursesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen
        name={RouteNames.HomePageFlow.AllCourses}
        component={MySessions}
      />
      <Stack.Screen
        name={RouteNames.HomePageFlow.TeacherSessions}
        component={Sessions}
      />
      <Stack.Screen
        name={RouteNames.HomePageFlow.CreateSessions}
        component={CreateSessions}
      />
    </Stack.Navigator>
  );
};

export default AllCoursesStack;
