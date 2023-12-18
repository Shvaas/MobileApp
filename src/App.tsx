import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {Provider} from 'react-redux';
import {store} from './store';
import { useEffect, useState } from 'react';
import {Auth} from "aws-amplify";
import {BackHandler, Alert} from 'react-native';

// Local
import OnboardingStack from './screenStack/OnboardingStack';
import {APP_FLOWS} from './constants/routeName';
import HomePageStack from './screenStack/HomePageStack';
import { StripeProvider } from '@stripe/stripe-react-native';
import LoginStack from './screenStack/LoginStack';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ConfirmCodeScreen from './screens/ConfirmCodeScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';
import { ActivityIndicator } from 'react-native';

function HomeNav() {
  return <HomePageStack />;
}

let persistor = persistStore(store);

const App = () => {
  const [user,setUser] = useState(null);
  const [isLoading,setIsLoading] = useState(true);

  // const updateUser = async () => {
  //   // Get current authenticated user
  //   const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });

  //   if(userInfo) {
  //     setUser(userInfo);
  //   }
  // }

  

  React.useEffect(() => {

    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

  }, []);

  const Stack = createNativeStackNavigator();
  // India
  const STRIPE_KEY = 'pk_test_51NqUmhSIc3Jo74FNEOgu0FbZAsiJZ8aORZAs3X2ZVGGx7kncyFMA4R6Mw26lUJK94LtozCTEXNSkXWReJQTfAZCG00FejgHpMk'
  // USA
  //const STRIPE_KEY = 'pk_test_51NFknnLrbws9WSwO25PGiyKTzjZlfoDYvV9mBiwCHPL6PVUEknKfJeAcrVQ8LpCLoGfhg4797YTbPvKxfJWL58SB00gv2zdRnv'

  // if(!user){
  //   return(
  //     <Provider store={store}>
  //     <PersistGate loading={null} persistor={persistor}>
  //     <SafeAreaProvider>
  //     <StripeProvider publishableKey={STRIPE_KEY}>
  //       <NavigationContainer>
  //     <Stack.Navigator
  //     screenOptions={{
  //       gestureEnabled: false,
  //       headerShown: false,
  //     }}>
  //         <Stack.Screen
  //           name={"SignIn"}
  //           component={SignInScreen}
  //         />
  //         <Stack.Screen
  //           name={"SignUp"}
  //           component={SignUpScreen}
  //         />
  //         <Stack.Screen
  //           name={"ConfirmCode"}
  //           component={ConfirmCodeScreen}
  //         />
  //         <Stack.Screen
  //           name={"ForgotPassword"}
  //           component={ForgotPasswordScreen}
  //         />
  //         <Stack.Screen
  //           name={"NewPassword"}
  //           component={NewPasswordScreen}
  //         />
  //         </Stack.Navigator>
  //         </NavigationContainer>
  //       </StripeProvider>
  //     </SafeAreaProvider>
  //     </PersistGate>
  //   </Provider>
  //   )
  // }

  // if (isLoading){
  //   return(
  //   <ActivityIndicator style={{alignSelf:'center', marginTop:150}}/>
  //   )
  // }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              gestureEnabled: false,
              headerShown: false,
            }}>
            <Stack.Screen
            name={APP_FLOWS.OnboardingFlow}
            component={OnboardingStack}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </StripeProvider>
      </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;