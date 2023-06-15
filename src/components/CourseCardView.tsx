import {
    Image,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React from 'react';

  // local
  import {themeFontFamily, themefonts, themeColor} from '../constants/theme';
  
  interface PropsType {
    course : object
  }
  
  const CourseCardView: React.FC<PropsType> = ({course}) => {
    let myDate = new Date(course.date * 1000);
    return (
        <View style={styles.container}>
            <View style={styles.internalContainer}>
              <Image source={course.instructorPhoto} style={styles.imageStyle}></Image>
              <View style={{flexDirection:'column',alignSelf:'center',width:'75%'}}> 
                <Text style={styles.textStyleName}>{course.title}</Text>
                <Text style={styles.textStyleTime}>{myDate.toUTCString()}</Text>
              </View>
            </View>
        </View>
      );
  };

  export default CourseCardView;

  const styles = StyleSheet.create({
    container: {
      margin: "2.5%",
      height: 100,
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
      justifyContent:'space-between'
      
    },
    internalContainer: {
      width:'100%',
        flexDirection: 'row',
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

    textStyleName: {
      fontFamily: themeFontFamily.raleway,
      lineHeight: 15,
      fontSize: themefonts.font14,
      margin: 2,
      alignSelf:'flex-start',
    },
    textStyleTime: {
      fontFamily: themeFontFamily.raleway,
      lineHeight: 15,
      fontSize: themefonts.font14,
      padding: 10,
      alignSelf:'flex-end',
    },
  });