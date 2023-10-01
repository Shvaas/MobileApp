import React, { useEffect, useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Local
import RouteNames from '../constants/routeName';
import Welcome from '../screens/OnboardingFlow/Welcome/Welcome';
import Login from '../screens/OnboardingFlow/Login';
import HomePageStack from './HomePageStack';
import Yogi from '../screens/HomePageFlow/Yogis/YogiProfile';
import CalendarPage from '../screens/HomePageFlow/Yogis/CalendarPage';
import CreateSessions from '../screens/HomePageFlow/TeacherSessions/CreateSessions';
import FreeTrail from '../screens/OnboardingFlow/FreeTriall';
import ProfileQuestion from '../screens/OnboardingFlow/ProfileQuestions/ProfileQuestions';
import Sessions from '../screens/HomePageFlow/TeacherSessions/Sessions';
import SessionFeedback from '../screens/HomePageFlow/AllCourses/SessionFeedback';
import Profile from '../screens/HomePageFlow/UserProfile/Profile';
import WaitingSpinner from '../screens/OnboardingFlow/WaitingSpinner';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginStack from './LoginStack';
import Auth from '@aws-amplify/auth';
import { ActivityIndicator, ImageBackground } from 'react-native';
import { backgroundImageMedium } from '../images/imageLinks';
import WaitingSpinner2 from '../screens/WaitingSpinner2';
import ConfirmCodeScreen from '../screens/ConfirmCodeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import WaitingSpinner3 from '../screens/WaitingSpinner3';
import Help from '../screens/HomePageFlow/UserProfile/Help';
import UserDetails from '../screens/HomePageFlow/UserProfile/UserDetails';

const Stack = createNativeStackNavigator();

function HomeNav() {
  return <HomePageStack />;
}

function UserLogin() {
  return <LoginStack />;
}

const OnboardingStack = () => {
  
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      {/* <Stack.Screen 
      name={'spinner'} 
      component={WaitingSpinner2}/> */}
      <Stack.Screen 
      name={'spinner'} 
      component={WaitingSpinner3}/>
      <Stack.Screen
      name={'SignIn'}
      component={SignInScreen}/>
      <Stack.Screen
      name={'SignUp'}
      component={SignUpScreen}/>
       <Stack.Screen
        name={"ConfirmCode"}
        component={ConfirmCodeScreen}
      />
      <Stack.Screen
        name={"ForgotPassword"}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={"NewPassword"}
        component={NewPasswordScreen}
      />
      <Stack.Screen
        name={RouteNames.OnboardingFlow.Welcome}
        component={Welcome}
      />
      <Stack.Screen
      name={RouteNames.OnboardingFlow.Login}
      component={Login} />
      <Stack.Screen
      name={RouteNames.OnboardingFlow.ProfileQuestions}
      component={ProfileQuestion} />
      <Stack.Screen
      name="Home"
      component={HomeNav} />
      <Stack.Screen
        name={RouteNames.HomePageFlow.YogiProfile}
        component={Yogi}
      />
      <Stack.Screen
        name={RouteNames.HomePageFlow.CreateSessions}
        component={CreateSessions}
      />
      <Stack.Screen
        name={RouteNames.HomePageFlow.CalendarPage}
        component={CalendarPage}/>

      <Stack.Screen
        name={RouteNames.OnboardingFlow.FreeTrial}
        component={FreeTrail}
      />
      <Stack.Screen
        name={RouteNames.HomePageFlow.TeacherSessions}
        component={Sessions}
      />
      <Stack.Screen
        name={RouteNames.HomePageFlow.AllCourseDetail}
        component={SessionFeedback}
      />
      <Stack.Screen name={RouteNames.HomePageFlow.Help} component={Help}/>
      <Stack.Screen name={RouteNames.HomePageFlow.UserDetails} component={UserDetails}/>
      {/* <Stack.Screen 
      name={RouteNames.HomePageFlow.Help} 
      component={Help}/> */}

    </Stack.Navigator>
  );
};

export default OnboardingStack;
// export default withAuthenticator( OnboardingStack, { usernameAttributes: 'email', signUpConfig, includeGreetings: true }, [], null, MyTheme);