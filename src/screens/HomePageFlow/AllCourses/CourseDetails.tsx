import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import React from 'react';

import BackgroundImage from '../../../common/BackgroundImage';
import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';
import { Button } from 'react-native-elements';

interface PropsType {
    navigation: any,
    route: any;
}

const CourseDetail: React.FC<PropsType> = ({route, navigation}) => {
    const { courseDetail } = route.params;

    console.log(courseDetail);
    
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.topContainer}>
          <BackgroundImage>
          <Button title="Go Back" onPress={()=>{navigation.goBack()}} style={styles.buttonStyle}>
          </Button>
          <Text>{courseDetail.description}</Text>
          </BackgroundImage>
          </View>
        </SafeAreaView>
      );
    };
    
export default CourseDetail;
    
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