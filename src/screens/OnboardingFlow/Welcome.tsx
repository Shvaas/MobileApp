import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {themefonts} from '../../constants/theme';

const Welcome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Welcome</Text>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: themefonts.font32,
    textAlign: 'center',
    // fontFamily: themeObject.fontRaleway, TODO: add font family
  },
  headingContainer: {},
});
