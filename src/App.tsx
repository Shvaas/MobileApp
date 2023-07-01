import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {Provider} from 'react-redux';
import {store} from './store';

// Local
import OnboardingStack from './screenStack/OnboardingStack';
import {APP_FLOWS} from './constants/routeName';
import HomePageStack from './screenStack/HomePageStack';
import { StripeProvider } from '@stripe/stripe-react-native';

let persistor = persistStore(store);

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
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