import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';

// Local
import {themeColor, themeFontFamily, themefonts} from '../../constants/theme';

const Focus = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>
        For the next 30 seconds, try to{'\n'}focus on the screen
      </Text>
    </SafeAreaView>
  );
};

export default Focus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: themeColor.white,
  },
  heading: {
    fontSize: themefonts.font16,
    textAlign: 'center',
    fontFamily: themeFontFamily.raleway,
    lineHeight: 27,
  },
});
