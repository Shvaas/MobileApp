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

const ConfirmCodeScreen = ({route,navigation}) => {
    console.log("ConfirmCodeScreen");

   const {email, password} = route.params;

    const dispatch = useDispatch();

    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isResendingCode, setIsResendingCode] = useState(false);
    const [hasError, setErrorFlag] = useState(false);
    const [confirmEmail, setConfirmEmail] = useState(email);

    const {control, handleSubmit, watch} = useForm({
        defaultValues: {email: email},
      });

      const updateUserTimeZone = async (userId) => {
        const urlBackStage = `${baseUrl}/user/${userId}/update-user-data/`;
        var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        dispatch(userSlice.actions.setTime({timeZone:timeZone}))
        console.log("timezone",timeZone);
        try{
          const response = await axios.post(urlBackStage, {timezone: timeZone} ,{
            headers: {
              Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            }
          });
          console.log("update user response",response);
        }
        catch(error){
          console.log("update user error",error.message);
        }
    
      }
      
      const fetchUsers = async (userId) => {
        const abortController = new AbortController();
        const url = `${baseUrl}/user/${userId}`;
        try {
          const response = await axios.get(url, {
            signal: abortController.signal,
            timeout: 10000,
            headers: {
              Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
            }
          });
          console.log("response", response.data);
          console.log("response", response.data.data);
          if (response.status === 200) {
            updateUserTimeZone(userId);
            if (response?.data?.data.type === "INSTRUCTOR"){
              dispatch(userSlice.actions.setInstructor({type: 'Teacher', userId: userId,
              firsName: response?.data?.data.name, lastName:response?.data?.data.name,
              profilePic: response?.data?.data.userProfilePic}));
              navigation.navigate('Home');
              // setUserStatus('userSignedInKnown');
          }
          else {
              var profileQuestionnaireCompleted = response?.data?.data.profileQuestionnaireCompleted;
              dispatch(userSlice.actions.setUser({type: 'Student', userId: userId,
              firsName: response?.data?.data.firstName, 
              lastName:response?.data?.data.lastName,
              isSubscribed:response?.data?.data.subscriptionStatus==='ACTIVE', 
              trialUsed:response?.data?.data.trailUsed}));
              if (profileQuestionnaireCompleted){
                navigation.navigate('Home');
              }
              else{
                navigation.navigate(RouteNames.OnboardingFlow.ProfileQuestions);
              }
          }
            setIsSigningIn(false);
            return;
          } else {
            // setErrorFlag(true);
            setIsLoading(false);
            console.log("confirm error", "Failed to fetch user");
            Alert.alert('Error', "Failed to fetch user");
            // throw new Error("Failed to fetch users");
          }
        } catch (error) {
          if (abortController.signal.aborted) {
            console.log("Data fetching cancelled");
          } else {
            // setErrorFlag(true);
            setIsLoading(false);
            console.log("confirm error", error.message);
            Alert.alert('Error', error.message);
            setIsSigningIn(false);
            return;
          }
        }
      };

    const onConfirmPressed = async () => {
        try {
          if(confirmEmail!=null){
            console.log("confirm sign up email", confirmEmail);
            setIsLoading(true);
            const response = await Auth.confirmSignUp(confirmEmail, code);
            setIsLoading(false);
            console.log(response);
            if (response=="SUCCESS") {
              console.log("success");
              if(password!=null && password!=""){
                setIsSigningIn(true);
                console.log("password",password);
                const signInResponse = await Auth.signIn(confirmEmail, password);
                console.log(signInResponse);
                const userId = signInResponse?.attributes?.sub;
                if (userId != null){
                    console.log("userId", userId);
                    fetchUsers(userId);
                }
                else{
                  setIsSigningIn(false);
                }
              }
              else{
                setIsSigningIn(false);
                console.log("sign in error");
                navigation.navigate("SignIn");
              }  
            }
          }
          else{
            setIsLoading(false);
            console.log("email error");
            Alert.alert("Error","Enter your email");
          }
          
        } catch (e) {
          setIsLoading(false);
          console.log("confirm error");
          Alert.alert('Error', e.message);
        }
    };
    
    const onSignInPress = () => {
      navigation.navigate('SignIn');
    };

    const onResendPress = async () => {
    try {
        setIsResendingCode(true);
        await Auth.resendSignUp(confirmEmail);
        setIsResendingCode(false);
        Alert.alert('Success', 'Code was resent to your email');
    } catch (e) {
        Alert.alert('Error', e.message);
    }
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

    // if(isLoading){
    //     return (
    //         <ImageBackground source={backgroundImageMedium} style={{height:'100%', width:'100%'}}>
    //             <ActivityIndicator style={{alignSelf:'center', marginTop:150}}/>
    //         </ImageBackground>
    //         )
    // }

    return(
        <ImageBackground source={backgroundImageLight} style={{height:'100%', width:'100%'}}>
            <Spinner
            visible={isLoading}
            textContent={'Confirming code...'}
            textStyle={styles.spinnerTextStyle}
            />
            <Spinner
            visible={isResendingCode}
            textContent={'Resending code...'}
            textStyle={styles.spinnerTextStyle}
            />
            <Spinner
            visible={isSigningIn}
            textContent={'Signing In...'}
            textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.container}>
            <Text style={styles.confirmCodeHeading}>Confirm Code</Text>
            <CustomInput
            placeholder="email"
            value = {confirmEmail}
            setValue = {setConfirmEmail}
            ></CustomInput>
            <CustomInput
            placeholder="Enter your confirmation code"
            value={code}
            setValue={setCode}></CustomInput>
            <SimpleButton
                title='Confirm'
                containerStyle={styles.primaryButton}
                onPress={handleSubmit(onConfirmPressed)}
            />
            
            <View style={{flexDirection:'row',justifyContent:'space-around',width:'80%',marginVertical:10}}>
            <View><TouchableOpacity onPress={onResendPress}><Text style={styles.footerLinks}>Resend code</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={onSignInPress}><Text style={styles.footerLinks}>Back to Sign In</Text></TouchableOpacity></View>
            </View>
            
            </View>
        </ImageBackground>

    );

};

export default ConfirmCodeScreen;

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
    }
});