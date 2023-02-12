import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyCourses from '../screens/HomePageFlow/MyCourses/MyCourses';
import CourseDetail from '../screens/HomePageFlow/MyCourses/MyCourseDetail';

// Local
import RouteNames from '../constants/routeName';

const Stack = createNativeStackNavigator();

const MyCoursesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen
        name={RouteNames.HomePageFlow.MyCourse}
        component={MyCourses}
      />
      <Stack.Screen
        name={RouteNames.HomePageFlow.MyCourseDetail}
        component={CourseDetail} 
      />
    </Stack.Navigator>
  );
};

export default MyCoursesStack;
