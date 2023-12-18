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
    BackHandler
  } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import {Auth} from "aws-amplify";
import {backgroundImageLight, backgroundImageMedium} from '../images/imageLinks';
import CustomInput from '../components/CustomInput';
import PrimaryButton from '../common/buttons/PrimaryButton';
import SimpleButton from '../common/buttons/SimpleButton';
import { themeColor, themeFontFamily, themefonts } from '../constants/theme';
import {useForm, Controller} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { userSlice } from '../store/userSlice';
import RouteNames from '../constants/routeName';
import Spinner from 'react-native-loading-spinner-overlay';
import { baseUrl } from '../constants/urls';

interface PropsType {
    navigation: any;
  }

const SignInScreen = ({navigation}) => {

  React.useEffect(() => {

    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

  }, []);

    console.log("SignInScreen");
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setErrorFlag] = useState(false);

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
          setIsLoading(true);
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
            setEmail('');
            setPassword('');
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
            setIsLoading(false);
            return;
          } else {
            setErrorFlag(true);
            throw new Error("Failed to fetch users");
          }
        } catch (error) {
          if (abortController.signal.aborted) {
            console.log("Data fetching cancelled");
          } else {
            setErrorFlag(true);
            setIsLoading(false);
          }
        }
      };

    const {
        control,
        handleSubmit,
        formState: {errors},
      } = useForm();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onSignInPressed = async () => {
        try{
            setEmail(email.toLowerCase());
            console.log("sending for sign in ",email," and ", password);
            setIsLoading(true);
            const response = await Auth.signIn(email, password);
            console.log(response);
            const userId = response?.attributes?.sub;
            if (userId != null){
                console.log("userId", userId);
                fetchUsers(userId);
            }
            else{
                setIsLoading(false);
            }
        }
        catch(e){
            console.log('Error',e);
            if(e.message=="User is not confirmed."){
              setIsLoading(false);
              Alert.alert('Error', e.message + "\nPlease confirm the code",[{text: 'OK',onPress: () => {navigation.navigate('ConfirmCode', {email, password})},}]);
            }
            else{
              Alert.alert('Error', e.message);
              setIsLoading(false);
            }
            
        }
        
    };

    const onSignUpPressed = async () => {
        navigation.navigate("SignUp");
    };

    const onForgotPasswordPressed = async () => {
        navigation.navigate("ForgotPassword");
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
            textContent={'Signing In...'}
            textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.container}>
            <Text style={styles.signInHeading}>Sign In</Text>
            <CustomInput
            value={email}
            setValue={setEmail}
            placeholder="email"/>

            <CustomInput
            value={password}
            setValue={setPassword}
            placeholder="password"
            secureTextEntry={true}/>

            <SimpleButton
                title='Sign In'
                containerStyle={styles.primaryButton}
                onPress={handleSubmit(onSignInPressed)}
            />
            
            <View style={{flexDirection:'row',justifyContent:'space-around',width:'80%',marginVertical:10}}>
            <View><TouchableOpacity onPress={onForgotPasswordPressed}><Text style={styles.footerLinks}>Forgot Password</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={onSignUpPressed}><Text style={styles.footerLinks}>Sign Up</Text></TouchableOpacity></View>
            </View>
            
            </View>
        </ImageBackground>

    );

};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent:'flex-start',
        height:'100%',
        width:'100%',
        top: 50,
    },
    primaryButton: {
        margin: 16,
        width: 150,
        alignSelf:'center'
    },
    signInHeading: {
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
    spinnerTextStyle: {
        fontFamily: themeFontFamily.raleway,
        fontSize: themefonts.font14,
        color: themeColor.vividRed,
        opacity: 0.8
    }
});