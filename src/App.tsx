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

// Local
import OnboardingStack from './screenStack/OnboardingStack';
import {APP_FLOWS} from './constants/routeName';
import HomePageStack from './screenStack/HomePageStack';
import { StripeProvider } from '@stripe/stripe-react-native';

function HomeNav() {
  return <HomePageStack />;
}

let persistor = persistStore(store);

const App = () => {
  const [user,setUser] = useState(null);

  React.useEffect(() => {
    console.log("user", user?.attributes?.email);
    
    SplashScreen.hide();
    const updateUser = async () => {
      // Get current authenticated user
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });

      // if(userInfo) {
      //   setUser(userInfo);
      // }
    }
    updateUser();
  }, []);

  const Stack = createNativeStackNavigator();

  const STRIPE_KEY = 'pk_test_51NFknnLrbws9WSwO25PGiyKTzjZlfoDYvV9mBiwCHPL6PVUEknKfJeAcrVQ8LpCLoGfhg4797YTbPvKxfJWL58SB00gv2zdRnv'

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
              {
                user?
             <Stack.Screen
                name="Home"
                component={HomePageStack}
            /> :
            <Stack.Screen
            name={APP_FLOWS.OnboardingFlow}
            component={OnboardingStack}
          />
          }
          </Stack.Navigator>
        </NavigationContainer>
        </StripeProvider>
      </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;