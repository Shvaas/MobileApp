import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
  } from 'react-native';
  import React from 'react';

  // local
  import {themeFontFamily, themefonts} from '../constants/theme';
  
  interface PropsType {
    profile : object,
    navigation: any
  }
  
  const ProfileCardView: React.FC<PropsType> = ({profile,navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.internalContainer}>
                <View>
                    <Image source={profile.image} style={styles.imageStyle}></Image>
                </View>
                <View style={styles.textContainerStyle}>
                    <Text style={styles.textStyleBold}>{profile.name}</Text>
                    <Text style={styles.textStyle}>{profile.yearsOfExp} years</Text>
                    <Text style={styles.textStyle}>Rating: {profile.rating}</Text>
                    <Text style={styles.textStyle}>{profile.certificates}</Text>
                    <Text style={styles.textStyle}>{profile.studentsTrained} trained{'\n'}</Text>
                </View>
            </View>
            <View>
                <Text style= {styles.textDescription}>Teaching: {profile.description}</Text>
                <Text style={styles.textDescription}>Active Courses: {profile.ActiveCourses}</Text>
            </View>  
        </View>
      );
  };

  export default ProfileCardView;

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
    },
    internalContainer: {
        flexDirection: 'row',
    },
    imageStyle: {
        borderRadius: 50,
        height: 90,
        width: 90,
        margin: 10
    },
    textStyle: {
      fontFamily: themeFontFamily.raleway,
      // flex: 1,
      // flexWrap: 'wrap',
      lineHeight: 15,
      fontSize: themefonts.font14,
      margin: 1
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