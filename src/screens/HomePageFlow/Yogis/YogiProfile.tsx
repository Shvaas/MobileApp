import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import BackgroundImage from '../../../common/BackgroundImage';
import {
  themeFontFamily,
  themefonts,
  themeColor,
} from '../../../constants/theme';
import {Button} from 'react-native-elements';

interface PropsType {
  navigation: any;
  route: any;
}

const Yogi: React.FC<PropsType> = ({route, navigation}) => {
  const {yogiProfile} = route.params;

  // console.log(yogiProfile);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <BackgroundImage>
          <Button
            title="Go Back"
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.buttonStyle}
          />
          <Text>{yogiProfile.name}</Text>
        </BackgroundImage>
      </View>
    </SafeAreaView>
  );
};

export default Yogi;

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
  buttonStyle: {
    width: 167,
  },
  btnContainerStyle: {
    alignSelf: 'center',
  },
});
