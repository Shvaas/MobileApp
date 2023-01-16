import {
    Image,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React from 'react';
  import IonIcons from 'react-native-vector-icons/Ionicons';

  // local
  import {themeFontFamily, themefonts, themeColor} from '../constants/theme';
  
  interface PropsType {
    course : object
  }
  
  const ActiveCourseCardView: React.FC<PropsType> = ({course}) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainerStyle}>
              <Text style={styles.textStyleBold}>{course.title}</Text>
              <Text style={styles.textStyle}>{course.description}</Text>
              <Text style={styles.textStyle}>Level: {course.level}</Text>
              <Text style={styles.textStyle}>{course.nextSession}</Text>
            </View>
            <View>
              <View>
                <Image source={course.instructor} style={styles.imageStyle}></Image>
                <Text style={styles.ratingStyle}>{course.instructorRating}</Text>
              </View>
              <View style={{ bottom: 10,right:10, position:"absolute"}}>
                <IonIcons name="notifications" size={40}/>
                <Text style={styles.notificationStyle}>{course.notification}</Text>
              </View>
            </View>
        </View>
      );
  };

  export default ActiveCourseCardView;

  const styles = StyleSheet.create({
    container: {
    //   justifyContent: 'flex-end',
    //   padding: 0,
    //   position: 'absolute',
    //   top: 0,
    //   left: 0,
    //   bottom: 0,
    //   right: 0,
      margin: "2.5%",
      height: 150,
      width: "95%",
      shadowColor:"black",
      shadowOpacity: 0.25,
      shadowRadius:4,
      shadowOffset: {
      width: -4,
      height: 4,
      },
      backgroundColor: 'white',
      opacity: 0.78,
      borderRadius:10,
      flexDirection:"row",
    },
    internalContainer: {
        flexDirection: 'row',
    },
    imageStyle: {
        borderRadius: 50,
        height: 70,
        width: 70,
        margin: 10
    },
    textStyle: {
      fontFamily: themeFontFamily.raleway,
      // flex: 1,
      // flexWrap: 'wrap',
      lineHeight: 15,
      fontSize: themefonts.font14,
      margin: 1,
    },
    ratingStyle: {
      fontFamily: themeFontFamily.ralewayExtraBold,
      bottom:10,
      right:10,
      fontSize: themefonts.font18,
      color: themeColor.vividRed,
      shadowOffset: {
        width: -4,
        height: 4,
        },
      position:'absolute'
    },
    notificationStyle: {
      fontFamily: themeFontFamily.ralewayExtraBold,
      top:0,
      right:0,
      fontSize: themefonts.font22,
      color: themeColor.vividRed,
      position:'absolute'
    },
    textStyleBold: {
      fontFamily: themeFontFamily.ralewayBold,
      // flex: 1,
      // flexWrap: 'wrap',
      lineHeight: 15,
      fontSize: themefonts.font14,
      margin: 1
    },
    textDescription: {
      fontFamily: themeFontFamily.raleway,
      // flexWrap: 'wrap',
      textAlign: 'center',
      lineHeight: 15,
      fontSize: themefonts.font14,
    },
    textContainerStyle: {
      flex: 1,
      flexWrap: 'wrap',
      left: 20,
      top: 10
    }
  });