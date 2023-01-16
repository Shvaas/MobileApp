import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import React from 'react';

import BackgroundImage from '../../common/BackgroundImage';
import SecondaryButton from '../../common/buttons/SecondaryButton';
import {themeFontFamily, themefonts,themeColor} from '../../constants/theme';
import RouteNames from '../../constants/routeName';

interface PropsType {
    navigation: any;
}

const Home: React.FC<PropsType> = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.topContainer}>
          <BackgroundImage>
          <SecondaryButton
            title={'Yogis'}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.btnContainerStyle}
            onPress={navigation.navigate(RouteNames.HomePageFlow.Yogis)}
          />
          <SecondaryButton
            title={'My Courses'}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.btnContainerStyle}
            onPress={navigation.navigate(RouteNames.HomePageFlow.Yogis)}
          />
          <SecondaryButton
            title={'All Courses'}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.btnContainerStyle}
            onPress={navigation.navigate(RouteNames.HomePageFlow.Yogis)}
          />
          <SecondaryButton
            title={'Feed'}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.btnContainerStyle}
            onPress={navigation.navigate(RouteNames.HomePageFlow.Yogis)}
          />
          </BackgroundImage>
          </View>
        </SafeAreaView>
      );
    };
    
    export default Home;
    
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