import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Feed from '../screens/HomePageFlow/Feed/Feed';
import CreatePost from '../screens/HomePageFlow/Feed/CreatePost';


// Local
import RouteNames from '../constants/routeName';

const Stack = createNativeStackNavigator();

const FeedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen name={RouteNames.HomePageFlow.Feed} component={Feed} />
      <Stack.Screen
        name={RouteNames.HomePageFlow.CreatePost}
        component={CreatePost}
      />
    </Stack.Navigator>
  );
};

export default FeedStack;
