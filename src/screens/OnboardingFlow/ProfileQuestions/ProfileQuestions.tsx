/* eslint-disable prettier/prettier */
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Linking,
    ImageBackground,
    Image,
    Button,
    Animated,
    Alert,
  } from 'react-native';
 import React, { Component } from 'react';
 import { useEffect, useState, useCallback } from 'react';

 import CheckBox from '@react-native-community/checkbox';
 import RouteNames from '../../../constants/routeName';
 
 import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';

 import {backgroundImageLight, loginbackgroundImage, backgroundImageMedium, backButton, image1stpage, line} from '../../../images/imageLinks';
 
 import LoginButton from '../../common/buttons/LoginButton';
 import PrimaryButton from '../../../common/buttons/PrimaryButton';

 import SubcriptionPlan from '../../components/SubcriptionPlan';
 import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
 import {GestureHandlerRootView} from 'react-native-gesture-handler';
 
 import { useStripe } from '@stripe/stripe-react-native';
 
 import { useCreatePaymentIntentMutation } from '../../store/apiSlice';
 import {userFirstNameSelector} from '../../../store/userSlice';
 import { userTimeZone } from '../../../store/userSlice';
 
 import QuestionItem from './QuestionItem'
 import Paginator from './Paginator';

 import {userSlice} from '../../../store/userSlice';


 import axios from "axios";

 import {Picker} from '@react-native-picker/picker';
import { useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Auth} from "aws-amplify";
import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native'
import { baseUrl } from '../../../constants/urls';
import Spinner from 'react-native-loading-spinner-overlay';

const MyTheme = {
  ...AmplifyTheme,
  buttonText: [ AmplifyTheme.buttonText, { lineHeight: 16, color: themeColor.vividRed, fontFamily: themeFontFamily.raleway }],
  button: [AmplifyTheme.button, { justifyContent:'center', alignSelf: 'center',width: 150, margin:1,padding:10, backgroundColor: 'white', borderColor: themeColor.vividRed, borderWidth: 1, borderRadius: 6, height: 42, top: 40}],
  buttonDisabled:[AmplifyTheme.buttonDisabled, {justifyContent:'center', backgroundColor: 'white',borderColor: themeColor.vividRed, borderWidth: 1, alignSelf: 'center',width: 150, margin:1,padding:10,borderRadius: 6, height: 42,top:40}],
  signInButtonIcon: { display: "none" },
  section: [AmplifyTheme.section],
  sectionHeaderText: [AmplifyTheme.sectionHeaderText, {color:'#222222', fontFamily: themeFontFamily.raleway}],
  input: [AmplifyTheme.input, {borderRadius: 5,}],
  sectionFooterLinkDisabled: [AmplifyTheme.sectionFooterLinkDisabled],
  sectionFooter: [AmplifyTheme.sectionFooter, {top: 40}],
  sectionFooterLink: [AmplifyTheme.sectionFooterLink, {color:themeColor.vividRed, fontFamily: themeFontFamily.raleway}],
  signedOutMessage: [AmplifyTheme.signedOutMessage, {opacity:0}]
};

 interface PropsType {
   navigation: any;
 }
 
 const ProfileQuestion = ({navigation}) => {



const QuestionTwoInitialState = {
    keys0: false,
    keys1: false,
    keys2: false,
    keys3: false,
    keys4: false,
    keys5: false,
    keys6: false,
    keys7: false,
    };

    const QuestionOneInitialState = {
    keys0: false,
    keys1: false,
    keys2: false,
    keys3: false,
    keys4: false,
    keys5: false,
    keys6: false,
    keys7: false,
    keys8: false,
    };

const [questionOneState, setquestionOneState] = useState(QuestionOneInitialState);
const [questionTwoState, setquestionTwoState] = useState(QuestionTwoInitialState);
const [selectedHeight, setSelectedHeight] = useState(" ");
const [selectedWeight, setSelectedWeight] = useState(" ");
const [selectedAge, setSelectedAge] = useState(0);
const [selectedGender, setSelectedGender] = useState();

  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const height = [" ", "4 Foot", "4 Foot 1 inch", "4 Foot 2 inch", "4 Foot 3 inch", "4 Foot 4 inch", "4 Foot 5 inch", 
  "4 Foot 6 inch", "4 Foot 7 inch", "4 Foot 8 inch", "4 Foot 9 inch", "4 Foot 10 inch", "4 Foot 11 inch", "4 Foot 12 inch",
  "5 Foot", "5 Foot 1 inch", "5 Foot 2 inch", "5 Foot 3 inch", "5 Foot 4 inch", "5 Foot 5 inch", 
  "5 Foot 6 inch", "5 Foot 7 inch", "5 Foot 8 inch", "5 Foot 9 inch", "5 Foot 10 inch", "5 Foot 11 inch", "5 Foot 12 inch", 
  "6 Foot", "6 Foot 1 inch", "6 Foot 2 inch", "6 Foot 3 inch", "6 Foot 4 inch", "6 Foot 5 inch", 
  "6 Foot 6 inch", "6 Foot 7 inch", "6 Foot 8 inch", "6 Foot 9 inch", "6 Foot 10 inch", "6 Foot 11 inch", "6 Foot 12 inch",];

  const timezone = useSelector(userTimeZone);
  const isIndia = (timezone=='Asia/Calcutta' || timezone=='Asia/Kolkata');

   const weight = ["Select"];
   if (!isIndia){
     for (let index = 0; index < 500; index++) {
       weight.push(index + " lb")
     }
   }else{
     for (let index = 0; index < 200; index++) {
       weight.push(index + " kg")
     }
   }


  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const slidesRef = useRef(null);

  const userId = useSelector((state) => state.user.userId);

  const scrollX = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();


  const ViewableItemsChanged = useCallback(
    (info: { changed: ViewToken[] }): void => {
      const visibleItems = info.changed.filter((entry) => entry.isViewable);

      if (visibleItems && visibleItems.length !== 0) {
        setCurrentIndex(visibleItems[0].index)
      }
    },
    []
  );

  const scrollTo = async () => {
      if (currentIndex < 2){
        slidesRef.current.scrollToIndex({index: currentIndex+1});
      }else{
        setIsLoading(true);
        let profileQuestionnaire = {profileQuestionnaire: {
          height: selectedHeight,
          weight: selectedWeight,
          age: selectedAge,
          gender: selectedGender,
          questionOneState: questionOneState,
          questionTwoState: questionTwoState,
      }}
      
      try {
        
        const response = await axios.post(`${baseUrl}/user/${userId}/add-questionnaire`, profileQuestionnaire, {
          headers: {
            Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
          }
        });

        console.log("response profile quesition", response.data);
        console.log("response", response.data?.data);
        if (response.status === 200) {
          console.log(questionOneState);
          console.log(questionTwoState);
          console.log(selectedHeight);
          console.log(selectedWeight);
          dispatch(userSlice.actions.setUserProfileQuestion({
            height: selectedHeight,
            weight: selectedWeight,
            age: selectedAge,
            gender: selectedGender,
            questionOneState: questionOneState,
            questionTwoState: questionTwoState,
          }));

          setIsLoading(false);

          navigation.navigate(RouteNames.OnboardingFlow.FreeTrial, {onSignUp:true});
          
        } else {
          setIsLoading(false);
          Alert.alert('Error','Please try again later',[{text: 'OK',onPress: () => {},}]);
          throw new Error("An error has occurred");
        }
      } catch (error) {
        setIsLoading(false);
        Alert.alert('Error','Please try again later',[{text: 'OK',onPress: () => {},}]); 
      }
      }
  }

  const scrollBack = () => {
    if (currentIndex > 0){
      slidesRef.current.scrollToIndex({index: currentIndex-1});
    }else{
        navigation.goBack()
    }
  }

  const username = useSelector(userFirstNameSelector);
  useEffect(() => {
    setUser(username);
  }, [])
  
   return (
     <SafeAreaView style={styles.safeArea}>
         <ImageBackground source={backgroundImageMedium} style={styles.image}>
         <Spinner
            visible={isLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
         <View style={styles.topContainer}>
            <GestureHandlerRootView>    
                  <TouchableOpacity disabled={currentIndex==0} onPress={scrollBack}>
                    <Image source={backButton} style={[styles.backbutton, currentIndex==0 ? {opacity:0}:{opacity:1}]}/>
                  </TouchableOpacity>
            </GestureHandlerRootView>
          </View>

          <View style={styles.greetingContainer}>
            {
            user? 
            <Text style={styles.greetingText}>Hello {user}!</Text> : 
            <Text style={styles.greetingText}>Hello Anonymous!</Text>
            }
                <Text style={styles.greetingText}>Please let us know more about you</Text>
          </View>
          <View style={styles.middleContainer}>
          <GestureHandlerRootView style={{height: '100%',}}>   
              <FlatList
                data={[1,2,3]}
                renderItem={({item, index}) => <QuestionItem item={item} index={index}
                questionOneState={questionOneState} 
                setquestionOneState={setquestionOneState}
                questionTwoState={questionTwoState} 
                setquestionTwoState={setquestionTwoState}
                selectedHeight={selectedHeight}
                setSelectedHeight={setSelectedHeight}
                selectedWeight={selectedWeight}
                setSelectedWeight={setSelectedWeight}
                selectedAge={selectedAge}
                setSelectedAge={setSelectedAge}
                selectedGender={selectedGender}
                setSelectedGender={setSelectedGender}
            />}
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={32}
                // keyExtractor={(item) => item.id}
                onScroll={Animated.event([{nativeEvent: {contentOffset : {x: scrollX } } } ], {
                    useNativeDriver: false
                })}
                onViewableItemsChanged= {ViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50,
                  }}
                ref={slidesRef}
                />
             </GestureHandlerRootView>
          </View>
          <View style={styles.paginatorContainer}>
            <Paginator data={[0, 1, 2]} scrollX={scrollX} />
          </View>
          <View style={styles.buttonContainer}>
              <PrimaryButton
                title={currentIndex==2? "Done":"Next"}
                buttonStyle={styles.buttonStyle}
                titleStyle={{color: themeColor.vividRed}}
                onPress={scrollTo}
              />
            </View>

         </ImageBackground>
         </SafeAreaView>
   );
 };

export default ProfileQuestion;
 
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

  greetingContainer: {
    justifyContent:'center',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    flex: 0.2,
  },

  greetingText: {
    fontSize: themefonts.font16,
    fontFamily: themeFontFamily.raleway,
    color: '#222222',
    marginTop: 10,
  },

  middleContainer: {
    flex: 0.8,
  }, 

  middleContainerItem: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 10,
  }, 

  paginatorContainer: {
    justifyContent:'center',
    alignItems: 'center',
    flex: 0.1,
  },

   image: {
     height: "100%",
     width:"100%",
     flex: 1,
   },

   heading: {
    fontSize: themefonts.font22,
    fontFamily: themeFontFamily.raleway,
    color: '#222222'
  },

  infoContainer: {
    height: 50,
    width: 250,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.3,
  },

  buttonStyle: {
    width: 150,
    marginHorizontal: 10,
    backgroundColor: themeColor.white,
    borderColor: themeColor.vividRed,
    borderWidth: 1,
  },

   backbutton: {
    margin: 10,
  },
 
  spinnerTextStyle: {
    fontFamily: themeFontFamily.raleway,
    fontSize: themefonts.font14,
    color: themeColor.vividRed,
    opacity: 0.8
  },
 
 });
