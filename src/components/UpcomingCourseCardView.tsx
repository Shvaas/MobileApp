import {
    Image,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React from 'react';

import {themeFontFamily, themefonts, themeColor} from '../constants/theme';
import PrimaryButton from '../common/buttons/PrimaryButton';
  
interface PropsType {
  course : object
}
  
const UpcomingCourseCardView: React.FC<PropsType> = ({course}) => {
  return (
    <View style={styles.container}>
      <View style={styles.internalContainer}>
        <View style={{flexDirection:'row',width:'100%',justifyContent:'space-evenly'}}> 
          <Image source={course.instructor} style={styles.imageStyle}></Image>
          <View style={{flexDirection:'column',alignSelf:'center'}}>
            <Text style={styles.textStyleName}>{"Yoga with "}{course.name}</Text>
            <Text style={styles.textStyleName}>{course.description}</Text>
            <Text style={styles.textStyleTime}>{course.date}{", "}{course.time}</Text>
          </View>
        </View>
      </View>
      <View style={styles.internalContainer2}>
        <PrimaryButton
        title={'Start'}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.btnContainerStyle}
        onPress={()=>{}}/>
        <PrimaryButton
        title={'Cancel'}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.btnContainerStyle}
        onPress={()=>{}}/>
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
        borderColor: themeColor.vividRed,
        borderWidth: 2,
        borderRadius: 50,
        height: 70,
        width: 70,
        margin: 10,
        resizeMode: 'contain',
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