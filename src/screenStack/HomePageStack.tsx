import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


// Local
import RouteNames from '../constants/routeName';
import Yogis from '../screens/HomePageFlow/Yogis/Yogis'
import Feed from '../screens/HomePageFlow/Feed/Feed'
import MyCourses from '../screens/HomePageFlow/MyCourses/MyCourses';
import AllCourses from '../screens/HomePageFlow/AllCourses/AllCourses';
import YogisStack from './YogisStack';

const Tab = createBottomTabNavigator();

function YogiNav(){
  return(
      <YogisStack/>
  );
}


const HomePageStack = () => {
    return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="YogiNav"
        component={YogiNav}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="yoga" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyCourses"
        component={MyCourses}
        options={{
          tabBarLabel: 'MyCourses',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="meditation" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AllCourses"
        component={AllCourses}
        options={{
          tabBarLabel: 'AllCourses',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="chalkboard-teacher" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomePageStack;
