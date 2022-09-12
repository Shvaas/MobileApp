import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

// local
import {
  themeColor,
  themeFontFamily,
  themefonts,
} from '../../../constants/theme';
import BottomConent from './components/BottomConent';
import RouteNames from '../../../constants/routeName';
import BackgroundImage from '../../../common/BackgroundImage';

interface PropsType {
  navigation: any;
}

const Welcome: React.FC<PropsType> = ({navigation}) => {
  const translateTopContainer = React.useRef(
    new Animated.Value(Dimensions.get('screen').height / 4 - 20),
  ).current;

  React.useEffect(() => {
    Animated.timing(translateTopContainer, {
      duration: 1500,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [translateTopContainer]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Animated.View
          style={{transform: [{translateY: translateTopContainer}]}}>
          <BackgroundImage>
            <Text style={styles.heading}>Welcome</Text>
          </BackgroundImage>
        </Animated.View>
      </View>
      <View style={styles.bottomContainer}>
        <BottomConent
          onButtonPress={() => {
            navigation.navigate(RouteNames.OnboardingFlow.Focus);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: themeColor.background,
  },
  heading: {
    fontSize: themefonts.font32,
    textAlign: 'center',
    fontFamily: themeFontFamily.raleway,
    color: themeColor.white,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
  },
});
