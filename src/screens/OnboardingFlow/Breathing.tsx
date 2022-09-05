import {Animated, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

// Local
import {themeColor, themeFontFamily, themefonts} from '../../constants/theme';
import RouteNames from '../../constants/routeName';

interface PropsType {
  navigation: any;
}

const Breathing: React.FC<PropsType> = ({navigation}) => {
  const breatheInText = React.useRef(new Animated.Value(1)).current;
  const breatheOutText = React.useRef(new Animated.Value(0)).current;
  const loopAnimationRef = React.useRef<any>();

  React.useEffect(() => {
    loopAnimationRef.current = Animated.loop(
      Animated.sequence([
        // hide breathe in
        Animated.timing(breatheInText, {
          toValue: 0,
          delay: 3000,
          duration: 1000,
          useNativeDriver: true,
        }),
        // show breathe out
        Animated.timing(breatheOutText, {
          toValue: 1,
          useNativeDriver: true,
        }),
        // hide breathe out
        Animated.timing(breatheOutText, {
          toValue: 0,
          delay: 3000,
          duration: 1000,
          useNativeDriver: true,
        }),
        // show breathe in
        Animated.timing(breatheInText, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    );
    loopAnimationRef.current.start();
    setTimeout(() => {
      // reset animation after 30 sec
      loopAnimationRef.current.reset();
      navigation.navigate(RouteNames.OnboardingFlow.WellDone);
    }, 30000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        {/* TODO: remove after adding animation */}
        <Text style={{textAlign: 'center'}}>Add Animation here</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Animated.Text style={[styles.bottomText, {opacity: breatheInText}]}>
          Breathe in
        </Animated.Text>
        <Animated.Text style={[styles.bottomText, {opacity: breatheOutText}]}>
          Breathe out
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
};

export default Breathing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.white,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomContainer: {
    flexShrink: 1,
    marginBottom: 50,
    alignItems: 'center',
  },
  bottomText: {
    fontSize: themefonts.font18,
    textAlign: 'center',
    fontFamily: themeFontFamily.ralewayMedium,
    position: 'absolute',
  },
});
