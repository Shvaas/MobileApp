/* eslint-disable prettier/prettier */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

// Local
import RouteNames from '../constants/routeName';
import FeedStack from './FeedStack';
import YogisStack from './YogisStack';
import AllCoursesStack from './AllCourseStack';
import MyCoursesStack from './MycourseStack';
import TeacherSessionStack from './TeacherSessionStack';

const Tab = createBottomTabNavigator();

function getTabStyle(route){
  const routeName = getFocusedRouteNameFromRoute(route);
  const allYogis = RouteNames.HomePageFlow.YogiProfile;
  const allCourseDetail = RouteNames.HomePageFlow.AllCourseDetail
  const myCourseDetail = RouteNames.HomePageFlow.MyCourseDetail


      switch (routeName) {
        case allYogis:
          return 'none';
        case allCourseDetail:
          return 'none';
        // case myCourseDetail:
        //   return 'none';
        default:
          return 'flex';
      }
}

const HomePageStack = () => {
  const userType = useSelector((state) => state.user.userType);
  console.log(userType);
  
  return (
    <Tab.Navigator
      initialRouteName= {RouteNames.HomePageFlow.Feed}
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        headerShown: false,
      }}>
      {/* <Tab.Screen
        name={RouteNames.HomePageFlow.Feed}
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: RouteNames.HomePageFlow.Feed,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />),
          tabBarStyle: {display: getTabStyle(route)},
        })}
      /> */}

      { userType =='Teacher' ? <Tab.Screen
        name={RouteNames.HomePageFlow.CalendarPage}
        component={TeacherSessionStack}
        options={({route}) => ({
          tabBarLabel: RouteNames.HomePageFlow.CalendarPage,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="yoga" size={size} color={color} />
          ),
          tabBarStyle: {display: getTabStyle(route)},
        })}
      /> :
      <Tab.Screen
        name={RouteNames.HomePageFlow.AllYogis}
        component={YogisStack}
        options={({route}) => ({
          tabBarLabel: RouteNames.HomePageFlow.AllYogis,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="yoga" size={size} color={color} />
          ),
          tabBarStyle: {display: getTabStyle(route)},
        })}
      />}
      <Tab.Screen
        name={RouteNames.HomePageFlow.AllCourses}
        component={AllCoursesStack}
        options={({route}) => ({
          tabBarLabel: RouteNames.HomePageFlow.AllCourses,
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="chalkboard-teacher" size={size} color={color} />
          ),
          tabBarStyle: {display: getTabStyle(route)},
        })}
      />
    </Tab.Navigator>
  );
};

export default HomePageStack;
