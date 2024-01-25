import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Linking,
    ImageBackground,
    Image,
    Button,
    Alert,
    useWindowDimensions,
    TouchableOpacity,
    ActivityIndicator,
  } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import {Auth} from "aws-amplify";
import {backgroundImageLight, backgroundImageMedium} from '../images/imageLinks';
import CustomInput from '../components/CustomInput';
import PrimaryButton from '../common/buttons/PrimaryButton';
import SimpleButton from '../common/buttons/SimpleButton';
import { themeColor, themeFontFamily, themefonts } from '../constants/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {useForm} from 'react-hook-form';
import SignInScreen from './SignInScreen';
import axios from "axios";
import { userSlice } from '../store/userSlice';
import RouteNames from '../constants/routeName';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { baseUrl } from '../constants/urls';

interface PropsType {
    navigation: any;
  }

const DiscountCodeScreen = ({route,navigation}) => {
    console.log("DiscountCodeScreen");

    // const dispatch = useDispatch();

    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setErrorFlag] = useState(false);

    console.log("code",code);

    // const {control, handleSubmit, watch} = useForm({
    //     defaultValues: {email: email},
    //   });

      // const updateUserTimeZone = async (userId) => {
      //   const urlBackStage = `${baseUrl}/user/${userId}/update-user-data/`;
      //   var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      //   dispatch(userSlice.actions.setTime({timeZone:timeZone}))
      //   console.log("timezone",timeZone);
      //   try{
      //     const response = await axios.post(urlBackStage, {timezone: timeZone} ,{
      //       headers: {
      //         Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
      //       }
      //     });
      //     console.log("update user response",response);
      //   }
      //   catch(error){
      //     console.log("update user error",error.message);
      //   }

      // }

      // const fetchUsers = async (userId) => {
      //   const abortController = new AbortController();
      //   const url = `${baseUrl}/user/${userId}`;
      //   try {
      //     const response = await axios.get(url, {
      //       signal: abortController.signal,
      //       timeout: 10000,
      //       headers: {
      //         Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
      //       }
      //     });
      //     console.log("response", response.data);
      //     console.log("response", response.data.data);
      //     if (response.status === 200) {
      //       updateUserTimeZone(userId);
      //       if (response?.data?.data.type === "INSTRUCTOR"){
      //         dispatch(userSlice.actions.setInstructor({type: 'Teacher', userId: userId,
      //         firsName: response?.data?.data.name, lastName:response?.data?.data.name,
      //         profilePic: response?.data?.data.userProfilePic}));
      //         navigation.navigate('Home');
      //         // setUserStatus('userSignedInKnown');
      //     }
      //     else {
      //         var profileQuestionnaireCompleted = response?.data?.data.profileQuestionnaireCompleted;
      //         dispatch(userSlice.actions.setUser({type: 'Student', userId: userId,
      //         firsName: response?.data?.data.firstName, 
      //         lastName:response?.data?.data.lastName,
      //         isSubscribed:response?.data?.data.subscriptionStatus==='ACTIVE', 
      //         trialUsed:response?.data?.data.trailUsed}));
      //         if (profileQuestionnaireCompleted){
      //           navigation.navigate('Home');
      //         }
      //         else{
      //           navigation.navigate(RouteNames.OnboardingFlow.ProfileQuestions);
      //         }
      //     }
      //       setIsSigningIn(false);
      //       return;
      //     } else {
      //       // setErrorFlag(true);
      //       setIsLoading(false);
      //       console.log("confirm error", "Failed to fetch user");
      //       Alert.alert('Error', "Failed to fetch user");
      //       // throw new Error("Failed to fetch users");
      //     }
      //   } catch (error) {
      //     if (abortController.signal.aborted) {
      //       console.log("Data fetching cancelled");
      //     } else {
      //       // setErrorFlag(true);
      //       setIsLoading(false);
      //       console.log("confirm error", error.message);
      //       Alert.alert('Error', error.message);
      //       setIsSigningIn(false);
      //       return;
      //     }
      //   }
      // };

    
    
    const onSkipPress = () => {
      navigation.navigate('Home');
    };

    const onSubmitPress = async () => {
      navigation.navigate('Home');
    };

    if (hasError){
      return (
        <ImageBackground source={backgroundImageMedium} style={{height:'100%', width:'100%'}}>
        <View style={{alignItems:'center', justifyContent:'center', height:'100%', width:'100%'}}>
          <Text style={{fontSize: themefonts.font16, fontFamily: themeFontFamily.raleway, margin:20}}> 
          Something went wrong, Please try again later after sometime. </Text>
        </View>
       </ImageBackground>
      )
    }

    return(
        <ImageBackground source={backgroundImageLight} style={{height:'100%', width:'100%'}}>
            <Spinner
            visible={isLoading}
            textContent={'Confirming code...'}
            textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.container}>
            <Text style={styles.confirmCodeHeading}>Claim your discount!</Text>
            <CustomInput
            placeholder="Enter your promo code"
            value={code}
            setValue={setCode}></CustomInput>
            {/* <Text style={styles.DiscountCodeReq}> Don't have any? Skip</Text> */}
            
            <View style={{flexDirection:'row',justifyContent:'space-around',width:'100%',marginVertical:10}}>
            {/* <View><TouchableOpacity onPress={onSkipPress}><Text style={styles.footerLinks}>Skip</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={onSubmitPress}><Text style={styles.footerLinks}>Submit</Text></TouchableOpacity></View> */}
            <SimpleButton
                title='Skip'
                containerStyle={styles.primaryButton}
                onPress={onSkipPress}
            />
            <SimpleButton
                title='Submit'
                containerStyle={styles.primaryButton}
                onPress={onSubmitPress}
            />
            </View>
            
            </View>
        </ImageBackground>

    );

};

export default DiscountCodeScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent:'flex-start',
        height:'100%',
        width:'100%',
        top: 50,
    },
    confirmCodeHeading: {
      fontFamily: themeFontFamily.raleway,
      color:'#222222',
      fontSize: 20,
      fontWeight: '500',
      margin:15
    },
    footerLinks: {
      color:themeColor.vividRed,
      fontFamily: themeFontFamily.raleway,
      fontSize: 14,
      textAlign: 'center',
    },
    primaryButton: {margin: 16,width: 150,alignSelf:'center'},
    spinnerTextStyle: {
        fontFamily: themeFontFamily.raleway,
        fontSize: themefonts.font14,
        color: themeColor.vividRed,
        opacity: 0.8
    },
    DiscountCodeReq: {
      fontFamily: themeFontFamily.raleway,
      fontSize: themefonts.font14,
      color: "#808080",
      opacity: 0.8,
      width: '100%'
    }
});