/* eslint-disable prettier/prettier */
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
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
import {userSessionSlice} from '../../../store/userSessionSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useSendFeedbackToTeacherMutation} from '../../../store/apiSlice';
import Spinner from 'react-native-loading-spinner-overlay';

import {baseUrl} from '../../../constants/urls';
import axios from "axios";

interface PropsType {
    navigation: any,
    route: any;
}

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const SessionFeedback: React.FC<PropsType> = ({route, navigation}) => {
  const userId = useSelector((state) => state.user.userId);
  const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const {session} = route.params;

    const [commentValue, setcommentValue] = useState(session.feedbackForTeacher);
    const [rating, setRating] = useState(session.ratingForTeacher);
    console.log("SessionFeedback: ", session, session.title);

    const month = ['Jan', 'Feb', 'Mar', 'April', 'May',
                  'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    
    let myDate = new Date(session.start_date);

    let minutes = '';
    if(myDate.getMinutes() < 10){
      minutes = "0" + myDate.getMinutes();
    }else{
      minutes = myDate.getMinutes().toString();
    }
    let am = " am";
    if(myDate.getHours()> 12){
      am = " pm";
    }

  const displayDate = myDate.getDate()
                      + " " 
                      + month[myDate.getMonth()]
                      + ", " 
                      + myDate.getHours()
                      + " : " 
                      + minutes
                      + am;

    const submitFeedback = async () => {
      if (commentValue.trim() == '' && rating==0) {
        Alert.alert('Error', 'Please enter a valid feedback or rating');
        return
      }

      console.log(session.sessionId, userId, commentValue, rating);
      
      
      setIsLoading(true);
      try {
        
        const response = await axios.post(`${baseUrl}/course/${session.sessionId}/instructor-feedback`,
        {userId: userId,
         feedbackForInstructor: commentValue,
         courseRating: rating,
        }, {
          headers: {
            Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
          }
        });

        console.log("response", response.data);
        console.log("response", response.data?.data);
        if (response.status === 200) {
          Alert.alert('Success', 'Succesfully submitted the feedback');
            dispatch(
              userSessionSlice.actions.submitFeedback({
                'sessionId' : session.sessionId,
                'feedback' : commentValue,
                'rating' : rating,
              }),
            );
            setIsLoading(false);
        } else {
          setIsLoading(false);
          Alert.alert('Error','Please try again later',[{text: 'OK',onPress: () => {},}]);
          throw new Error("An error has occurred");
        }
      } catch (error) {
        setIsLoading(false);
        Alert.alert('Error','Please try again later',[{text: 'OK',onPress: () => {},}]);
      }


      // const result = await sendFeedback([session.sessionId,
      //   {userId: userId,
      //     instructorFeedback: commentValue,
      //     courseRating: rating,
      //   }]);
      // console.log("result", result);
      
      
      
    }

    return (
      <SafeAreaView style={styles.safeArea}>
      <HideKeyboard>
      <ImageBackground source={backgroundImageMedium} style={styles.image}>
      <Spinner
          visible={isLoading}
          
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.topContainer}>
            <GestureHandlerRootView>    
                  <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={backButton} style={styles.backbutton}/>
                  </TouchableOpacity>
            </GestureHandlerRootView>
        </View>
        <View style={styles.secondContainer}>
                <Image source={{uri:session.instructorPhotoLink}} style={styles.imageStyle}/>
          </View>
        <Text style={styles.usernameText}> {session.title} </Text>
        <View style={{margin:20}}>
            <Text style={styles.standardText}>{displayDate}</Text>
            <Text style={styles.standardText}>{session.description}</Text>
        </View>
        <View style={styles.descriptionContainer}>
            <Text style={[styles.standardText,{fontFamily: themeFontFamily.ralewaySemiBold, marginBottom:10}]}>Teacher's feedback for student</Text>
            <Text style={styles.standardText}>{session.feedbackForStudent}</Text>
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
                onFinishRating={setRating}
                minValue={1}
                imageSize={18}
                startingValue={rating}
                
                style={styles.ratings}
              />
            </View>
          <TextInput 
            placeholder="Add a comment..."
            value={commentValue}
            style={[styles.standardText, {minHeight:100}]}
            onChangeText={setcommentValue}
            multiline/>
        </View>
        <PrimaryButton
                title={"Submit Feedback"}
                buttonStyle={styles.buttonStyle}
                titleStyle={{color: themeColor.vividRed}}
                onPress={submitFeedback}
              />

      </ImageBackground>
      </HideKeyboard>
      </SafeAreaView>
      );
    };
    
export default SessionFeedback;
    
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: themeColor.white,
  },

  spinnerTextStyle: {
    fontFamily: themeFontFamily.raleway,
    fontSize: themefonts.font14,
    color: themeColor.vividRed,
    opacity: 0.8
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