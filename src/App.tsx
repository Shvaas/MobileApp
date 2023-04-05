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

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;