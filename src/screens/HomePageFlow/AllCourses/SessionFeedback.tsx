/* eslint-disable prettier/prettier */
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
  } from 'react-native';
  import React, {useState} from 'react';

import BackgroundImage from '../../../common/BackgroundImage';
import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';
import { Button, Rating } from 'react-native-elements';
import { ImageBackground } from 'react-native';
import {backgroundImageLight, backgroundImageMedium, backButton, utkarsh} from '../../../images/imageLinks'
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PrimaryButton from '../../../common/buttons/PrimaryButton';
import RouteNames from '../../../constants/routeName';

interface PropsType {
    navigation: any,
    route: any;
}

const SessionFeedback: React.FC<PropsType> = ({route, navigation}) => {
    const { courseDetail } = route.params;
    const [commentValue, setcommentValue] = useState('');

    console.log(courseDetail);
    
    return (
      <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={backgroundImageMedium} style={styles.image}>
        <View style={styles.topContainer}>
            <GestureHandlerRootView>    
                  <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={backButton} style={styles.backbutton}/>
                  </TouchableOpacity>
            </GestureHandlerRootView>
        </View>
        <View style={styles.secondContainer}>
                <Image source={utkarsh} style={styles.imageStyle}/>
          </View>
        <Text style={styles.usernameText}> Yoga with Utkarsh </Text>
        <View style={{margin:20}}>
            <Text style={styles.standardText}>Session Time</Text>
            <Text style={styles.standardText}>Session Description Session Description Session Description Session 
            Description Session DescriptionSession Description Session Description Session Description 
            Session Description Session Description Session Description Session Description</Text>
        </View>
        <View style={styles.descriptionContainer}>
            <Text style={[styles.standardText,{fontFamily: themeFontFamily.ralewaySemiBold, marginBottom:10}]}>Teacher's feedback for student</Text>
            <Text style={styles.standardText}>Session Description Session Description Session Description Session 
            Description Session DescriptionSession Description Session Description Session Description 
            Session Description Session Description Session Description Session Description</Text>
        </View>
        <View style={styles.descriptionContainer}>
            <Text style={[styles.standardText,{fontFamily: themeFontFamily.ralewaySemiBold}]}>
              Please let us know how was the session!
            </Text>
            <View style={{marginTop:10}}>
                <Rating
                type='custom'
                // type="custom"
                ratingColor={'#FD7C23'}
                // tintColor={themeColor.white}
                imageSize={18}
                startingValue={0}
                style={styles.ratings}
              />
            </View>
          <TextInput 
            placeholder=" Add a comment..."
            value={commentValue} 
            onChangeText={setcommentValue}
            multiline/>
        </View>
        <PrimaryButton
                title={"Submit Feedback"}
                buttonStyle={styles.buttonStyle}
                titleStyle={{color: themeColor.vividRed}}
                
              />

      </ImageBackground>
      </SafeAreaView>
      );
    };
    
export default SessionFeedback;
    
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: themeColor.white,
  },

  topContainer: {
    flexDirection: 'row',
    alignItems:'center',
    flex: 0.1,
  },

  secondContainer: {
    justifyContent:'center',
    alignItems: 'center',
    margin: 10,
  },

  imageStyle: {
    borderColor: themeColor.vividRed,
    borderWidth: 2,
    borderRadius: 150,
    height: 70,
    aspectRatio: 1,
    alignSelf: 'center',
    resizeMode: 'cover',
  },

  usernameText: {
    alignSelf: 'center',
    fontSize: themefonts.font16,
    fontFamily: themeFontFamily.ralewaySemiBold,
    color: '#313131',
  },

  descriptionContainer: {
    minHeight:150,
    padding:10,
    marginVertical:10,
    marginHorizontal:20,
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


  standardText: {
    fontSize: themefonts.font14,
    fontFamily: themeFontFamily.raleway,
    color: '#000',
  },

  image: {
    height: "100%",
    width:"100%",
    flex: 1,
  },

  ratings: {
    alignSelf: 'flex-start',
    marginBottom: 4,
    backgroundColor: 'transparent'
  },

  feedbackContainer: {
    margin: 10,
    height: 100,
  },

  backbutton: {
    margin: 10,
  },

  buttonStyle: {
    marginTop: 10,
    alignSelf:'center',
    width: 150,
    marginHorizontal: 10,
    backgroundColor: themeColor.white,
    borderColor: themeColor.vividRed,
    borderWidth: 1,
  },
  
});