import {
    Image,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React from 'react';

  // local
  import {themeFontFamily, themefonts, themeColor} from '../constants/theme';
import { Button } from 'react-native-elements/dist/buttons/Button';
import SecondaryButton from '../common/buttons/SecondaryButton'
  
  interface PropsType {
    course : object
  }
  
  const UpcomingCourseCardView: React.FC<PropsType> = ({course}) => {
    return (
        <View style={styles.container}>
            {/* <View style={styles.textContainerStyle}>
              <Text style={styles.textStyleBold}>{course.title}</Text>
              <Text style={styles.textStyle}>{course.description}</Text>
              <Text style={styles.textStyle}>Level: {course.level}</Text>
              <Text style={styles.textStyle}>Max Capacity: {course.maxCap}</Text>
              <Text style={styles.textStyle}>{course.numOfSessions} sessions</Text>
            </View>
            <View>
              <View>
                <Image source={course.instructor} style={styles.imageStyle}></Image>
                <Text style={styles.ratingStyle}>{course.instructorRating}</Text>
              </View>
              <View>
                <Text style={styles.textStyle}>{course.numOfStudentsEnrolled}{"/"}{course.maxCap}</Text>
                <Text style={styles.textStyle}>{course.cost}</Text>
              </View>
            </View> */}
            <View style={styles.internalContainer}>
              <View style={{flexDirection:'row',width:'100%',justifyContent:'space-evenly'}}> 
                <Image source={course.instructor} style={styles.imageStyle}></Image>
                <View style={{flexDirection:'column',alignSelf:'center'}}>
                  <Text style={styles.textStyleName}>{"Yoga with "}{course.name}</Text>
                  <Text style={styles.textStyleName}>{course.description}</Text>
                  <Text style={styles.textStyleTime}>{course.date}{", "}{course.time}</Text>
                </View>
              </View>
                {/* <Text style={styles.textStyleTime}>{course.date}{", "}{course.time}</Text> */}
            </View>
            <View style={styles.internalContainer2}>
            <SecondaryButton
            title={'Start'}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.btnContainerStyle}
            onPress={()=>{}}
          />
           <SecondaryButton
            title={'Cancel'}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.btnContainerStyle}
            onPress={()=>{}}
          />
            {/* <Button title="Start" style={{backgroundColor:themeColor.googleRed,height:35,width:80}} onPress={()=>{}}>
          </Button>
          <Button title="Cancel" style={{backgroundColor:themeColor.googleRed,height:35,width:80}} onPress={()=>{}}>
          </Button> */}
            </View>
        </View>
      );
  };

  export default UpcomingCourseCardView;

  const styles = StyleSheet.create({
    container: {
      margin: "2.5%",
      height: 170,
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
      flexDirection:"column",
      justifyContent:'space-around'
      
    },
    internalContainer: {
      width:'100%',
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    internalContainer2: {
      width:'100%',
        flexDirection: 'row',
        justifyContent:'space-around',
        alignSelf:'center'
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
    },
    textStyleName: {
      fontFamily: themeFontFamily.raleway,
      lineHeight: 15,
      fontSize: themefonts.font14,
      margin: 2,
      // alignSelf:'center',
    },
    textStyleTime: {
      fontFamily: themeFontFamily.raleway,
      lineHeight: 15,
      fontSize: themefonts.font14,
      // margin: 2,
      alignSelf:'flex-end'
      // right:0,
      // alignSelf:'center',
    },
    buttonStyle: {
      width: 167,
    },
    btnContainerStyle: {
      alignSelf: 'center',
    },
  });