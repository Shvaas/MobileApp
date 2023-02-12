import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllCourses from '../screens/HomePageFlow/AllCourses/AllCourses';
import CourseDetail from '../screens/HomePageFlow/AllCourses/CourseDetails';

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
        component={CourseDetail} 
      />
    </Stack.Navigator>
  );
};

export default AllCoursesStack;
