import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

// Local
import {themeColor, themeFontFamily, themefonts} from '../../constants/theme';
import SecondaryButton from '../../common/buttons/SecondaryButton';
import PrimaryButton from '../../common/buttons/PrimaryButton';

const WellDone = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Well done</Text>
        <Text style={styles.subHeading}>
          You just spent{' '}
          <Text style={styles.boldHighlightText}>30 seconds</Text> of zen
        </Text>
        <Text style={styles.helperText}>
          Your journey to a better tomorrow begins here
        </Text>
        <PrimaryButton
          title={'Start free trial now'}
          containerStyle={[styles.btnContStyle, styles.primaryBtnContStyle]}
          onPress={() => {}}
        />
        <SecondaryButton
          title={'Do it later'}
          containerStyle={[styles.btnContStyle, styles.secondaryBtnContStyle]}
          onPress={() => {}}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.loginBtnContainer}>
          <Text style={styles.bottomText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.semiBoldHighlightText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WellDone;

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
    marginBottom: 40,
    alignItems: 'center',
  },
  heading: {
    fontSize: themefonts.font26,
    textAlign: 'center',
    fontFamily: themeFontFamily.ralewaySemiBold,
  },
  subHeading: {
    marginTop: 8,
    fontSize: themefonts.font14,
    textAlign: 'center',
    fontFamily: themeFontFamily.raleway,
    lineHeight: 22,
  },
  boldHighlightText: {
    fontSize: themefonts.font14,
    fontFamily: themeFontFamily.ralewayBold,
    lineHeight: 22,
    color: themeColor.vividRed,
  },
  semiBoldHighlightText: {
    fontSize: themefonts.font14,
    fontFamily: themeFontFamily.ralewaySemiBold,
    lineHeight: 22,
    color: themeColor.vividRed,
  },
  helperText: {
    fontSize: themefonts.font12,
    fontFamily: themeFontFamily.raleway,
    textAlign: 'center',
    lineHeight: 14,
  },
  bottomText: {
    fontSize: themefonts.font14,
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: themeFontFamily.ralewaySemiBold,
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
  loginBtnContainer: {
    flexGrow: 1,
    flexDirection: 'row',
  },
});
