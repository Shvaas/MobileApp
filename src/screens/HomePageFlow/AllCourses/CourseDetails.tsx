import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
  } from 'react-native';
import React from 'react';

import BackgroundImage from '../../../common/BackgroundImage';
import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';
import { Button } from 'react-native-elements';
import { ImageBackground } from 'react-native';
import {backgroundImageLight, backButton} from '../../../images/imageLinks'
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface PropsType {
    navigation: any,
    route: any;
}

const CourseDetail: React.FC<PropsType> = ({route, navigation}) => {
    const { courseDetail } = route.params;

    console.log(courseDetail);
    
    return (
        <SafeAreaView style={styles.container}>
          <ImageBackground source={backgroundImageLight} style={styles.image}>
            <View style={styles.topContainer}>
              <GestureHandlerRootView>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                  <Image source={backButton} style={styles.backbutton}/>
                </TouchableOpacity>
              </GestureHandlerRootView> 
              <View style={styles.sessionInfoHeader}>
                <Image source={courseDetail.instructorPhoto} style={styles.imageStyle}></Image>
                <Text>{courseDetail.title}</Text>
                <Text>{courseDetail.title}</Text>
              </View>
              <Image source={backButton} style={[styles.backbutton,{'opacity':0}]}/>              
            </View>
          {/* <View style={styles.topContainer}>
          <BackgroundImage>
          <Button title="Go Back" onPress={()=>{navigation.goBack()}} style={styles.buttonStyle}>
          </Button>
          <Text>{courseDetail.description}</Text>
          </BackgroundImage>
          </View> */}
          </ImageBackground>
        </SafeAreaView>
      );
    };
    
export default CourseDetail;
    
const styles = StyleSheet.create({
    container: {
    flex: 1,
    // justifyContent: 'center',
    // backgroundColor: themeColor.background,
    },
    heading: {
    fontSize: themefonts.font32,
    textAlign: 'center',
    fontFamily: themeFontFamily.raleway,
    color: themeColor.white,
    },
    topContainer: {
      flexDirection: 'row',
      flex: 0.1,
      borderWidth:1,
      justifyContent:'space-between'
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
    image: {
      height: "100%",
      width:"100%",
      // resizeMode: 'cover',
    },
    backbutton: {
      margin: 10,
    },
    headingContainer: {
      flex: 1,
      justifyContent:'center',
      alignItems: 'center',
    },
    imageStyle: {
      borderColor: themeColor.vividRed,
      borderWidth: 2,
      borderRadius: 50,
      height: 70,
      width: 70,
      margin: 10,
      resizeMode: 'contain',
  },
  sessionInfoHeader: {
    flexDirection: 'column',
    alignItems: 'center'
  }
});