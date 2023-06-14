import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Provider} from 'react-redux';
import {store} from './store';

// Local
import OnboardingStack from './screenStack/OnboardingStack';
import {APP_FLOWS} from './constants/routeName';
import HomePageStack from './screenStack/HomePageStack';
import { StripeProvider } from '@stripe/stripe-react-native';


const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  const Stack = createNativeStackNavigator();

  const STRIPE_KEY = 'pk_test_51NFknnLrbws9WSwO25PGiyKTzjZlfoDYvV9mBiwCHPL6PVUEknKfJeAcrVQ8LpCLoGfhg4797YTbPvKxfJWL58SB00gv2zdRnv'

  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;