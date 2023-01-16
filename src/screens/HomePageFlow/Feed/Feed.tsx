import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import React from 'react';

import BackgroundImage from '../../../common/BackgroundImage';
import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';

interface PropsType {
    navigation: any;
}

const Feed: React.FC<PropsType> = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.topContainer}>
          <BackgroundImage>
          <Text>Feed</Text>
          </BackgroundImage>
          </View>
        </SafeAreaView>
      );
    };
    
export default Feed;
    
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