import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';

// Local
import {themeColor, themeFontFamily, themefonts} from '../../constants/theme';
import RouteNames from '../../constants/routeName';
import BackgroundImage from '../../common/BackgroundImage';

interface PropsType {
  navigation: any;
}

const Focus: React.FC<PropsType> = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate(RouteNames.OnboardingFlow.Breathing);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundImage>
        <Text style={styles.heading}>
          For the next 30 seconds, try to{'\n'}focus on the screen
        </Text>
      </BackgroundImage>
    </SafeAreaView>
  );
};

export default Focus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: themeColor.background,
  },
  heading: {
    fontSize: themefonts.font16,
    textAlign: 'center',
    fontFamily: themeFontFamily.raleway,
    lineHeight: 27,
  },
});
