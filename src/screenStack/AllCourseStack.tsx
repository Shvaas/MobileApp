import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllCourses from '../screens/HomePageFlow/AllCourses/AllCourses';
import SessionFeedback from '../screens/HomePageFlow/AllCourses/SessionFeedback';
import Sessions from '../screens/HomePageFlow/TeacherSessions/Sessions';

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
        component={AllCourses}
      />
      <Stack.Screen
        name={RouteNames.HomePageFlow.AllCourseDetail}
        component={SessionFeedback}
      />
      <Stack.Screen
        name={RouteNames.HomePageFlow.TeacherSessions}
        component={Sessions}
      />
    </Stack.Navigator>
  );
};

export default AllCoursesStack;
