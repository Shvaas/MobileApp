import {SafeAreaView, StyleSheet, Text, View,} from 'react-native';
import React from 'react';

// Local
import {themeColor, themeFontFamily, themefonts} from '../../constants/theme';
import RouteNames from '../../constants/routeName';
import BackgroundImage from '../../common/BackgroundImage';

import SecondaryButton from '../../common/buttons/SecondaryButton';
import PrimaryButton from '../../common/buttons/PrimaryButton';
interface PropsType {
  navigation: any;
}

const Focus: React.FC<PropsType> = ({navigation}) => {
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate(RouteNames.OnboardingFlow.Breathing);
  //   }, 2000);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
      <Text style={styles.heading}>Take Your Lung Test</Text>
      <BackgroundImage>
        <Text style={styles.subHeading}>
        Take a deep breath and hold it for{'\n'} 
        as long as possible and then{'\n'} exhale
        </Text>
      </BackgroundImage>
      <PrimaryButton
          title={'Start now'}
          containerStyle={[styles.btnContStyle, styles.primaryBtnContStyle]}
          onPress={() => {navigation.navigate(RouteNames.OnboardingFlow.Breathing);}}
        />
        <SecondaryButton
          title={'Do it later'}
          containerStyle={[styles.btnContStyle, styles.secondaryBtnContStyle]}
          onPress={() => {navigation.navigate(RouteNames.OnboardingFlow.WellDone);}}
        />
      </View>
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
  topContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: themefonts.font26,
    textAlign: 'center',
    fontFamily: themeFontFamily.ralewaySemiBold,
  },
  subHeading: {
    fontSize: themefonts.font16,
    textAlign: 'center',
    fontFamily: themeFontFamily.raleway,
    lineHeight: 27,
  },
  btnContStyle: {
    alignSelf: 'center',
    width: 234,
  },
  primaryBtnContStyle: {
    marginTop: 30,
  },
  secondaryBtnContStyle: {
    marginVertical: 15,
  },
});
