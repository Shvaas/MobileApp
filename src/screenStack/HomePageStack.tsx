import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// Local
import RouteNames from '../constants/routeName';
import Yogis from '../screens/HomePageFlow/Yogis/Yogis'
import Feed from '../screens/HomePageFlow/Feed/Feed'
import MyCourses from '../screens/HomePageFlow/MyCourses/MyCourses';
import AllCourses from '../screens/HomePageFlow/AllCourses/AllCourses';
import YogisStack from './YogisStack';
import AllCoursesStack from './AllCourseStack';
import MyCoursesStack from './MycourseStack';
import Yogi from '../screens/HomePageFlow/Yogis/YogiProfile';

const Tab = createBottomTabNavigator();

function getTabStyle(route){
      const routeName = getFocusedRouteNameFromRoute(route);
      const allYogis = RouteNames.HomePageFlow.YogiProfile
      const allCourseDetail = RouteNames.HomePageFlow.AllCourseDetail
      const myCourseDetail = RouteNames.HomePageFlow.MyCourseDetail

      switch (routeName) {
        case allYogis:
          return 'none';
        case allCourseDetail:
          return 'none';
        case myCourseDetail:
          return 'none';
        default:
          return 'flex';
      }
}

const HomePageStack = () => {
    
  return (
    <Tab.Navigator
      initialRouteName= {RouteNames.HomePageFlow.Feed}
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
      >
      <Tab.Screen
        name={RouteNames.HomePageFlow.Feed}
        component={Feed}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name={RouteNames.HomePageFlow.AllYogis}
        component={YogisStack}
        options={({route}) => ({
          tabBarLabel: RouteNames.HomePageFlow.AllYogis,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="yoga" size={size} color={color} />
          ),
          tabBarStyle: { display: getTabStyle(route) },
        })}
      />

      <Tab.Screen
        name={RouteNames.HomePageFlow.MyCourse}
        component={MyCoursesStack}
        options={({route}) => ({
          tabBarLabel: RouteNames.HomePageFlow.MyCourse,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="meditation" color={color} size={size} />
          ),
          tabBarStyle: { display: getTabStyle(route) },
        })}
      />
      <Tab.Screen
        name={RouteNames.HomePageFlow.AllCourses}
        component={AllCoursesStack}
        options={({route}) => ({
          tabBarLabel: RouteNames.HomePageFlow.AllCourses,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="chalkboard-teacher" size={size} color={color} />
          ),
          tabBarStyle: { display: getTabStyle(route) },
        })}
      />
    </Tab.Navigator>
  );
};



export default HomePageStack;
