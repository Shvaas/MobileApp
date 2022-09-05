import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import * as ort from 'onnxruntime-react-native';
import RNFS from "react-native-fs"

// Local
import OnboardingStack from './screenStack/OnboardingStack';
import {APP_FLOWS} from './constants/routeName';
// import {onnx_model} from './models/modelLinks'
// import {mnist_model} from './models/modelLinks'
import MNIST, {MNISTInput, MNISTOutput, MNISTResult, } from './mnist-data-handler';


const App = () => {

  const onnxFunct = async () => {
    try {
      // @ts-ignore
      console.log("started loading model");
      console.log(RNFS.DocumentDirectoryPath);
      const modelPath = await MNIST.getLocalModelPath();
    } catch (e) {
      console.log(`failed to inference ONNX model: ${e}. `)
    }
  }

  React.useEffect(() => {
    SplashScreen.hide();
    onnxFunct();
  }, []);



  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: false,
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen
            name={APP_FLOWS.OnboardingFlow}
            component={OnboardingStack}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
