import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Local
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmCodeScreen from '../screens/ConfirmCodeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      <Stack.Screen
        name={"SignIn"}
        component={SignInScreen}
      />
      <Stack.Screen
        name={"SignUp"}
        component={SignUpScreen}
      />
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
    </Stack.Navigator>
  );
};

export default LoginStack;
