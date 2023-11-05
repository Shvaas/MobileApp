/* eslint-disable prettier/prettier */
import {ActivityIndicator, Text, View, ImageBackground,} from 'react-native';
import React from 'react';
import { useEffect, useState, useCallback } from 'react';

import RouteNames from '../constants/routeName';

import {Auth} from "aws-amplify";
import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native'
import { useGetUserDetailQuery } from '../store/apiSlice';
import { themeColor, themefonts, themeFontFamily } from '../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { userSlice, userIdSelector } from '../store/userSlice';
import {backgroundImageMedium} from '../images/imageLinks';
import SplashScreen from 'react-native-splash-screen';

import axios from "axios";
import LoginStack from '../screenStack/LoginStack';
import { BounceOutRight } from 'react-native-reanimated';
import { NavigationHelpersContext } from '@react-navigation/core';
import { baseUrl } from '../constants/urls';

const MyTheme = {
    ...AmplifyTheme,
    buttonText: [ AmplifyTheme.buttonText, { lineHeight: 16, color: themeColor.vividRed, fontFamily: themeFontFamily.raleway }],
    button: [AmplifyTheme.button, { justifyContent:'center', alignSelf: 'center',width: 150, margin:1,padding:10, backgroundColor: 'white', borderColor: themeColor.vividRed, borderWidth: 1, borderRadius: 6, height: 42, top:40}],
    buttonDisabled:[AmplifyTheme.buttonDisabled, {justifyContent:'center', backgroundColor: 'white',borderColor: themeColor.vividRed, borderWidth: 1, alignSelf: 'center',width: 150, margin:1,padding:10,borderRadius: 6, height: 42,top:40}],
    signInButtonIcon: { display: "none" },
    section: [AmplifyTheme.section],
    sectionHeaderText: [AmplifyTheme.sectionHeaderText, {color:'#222222', fontFamily: themeFontFamily.raleway}],
    input: [AmplifyTheme.input, {borderRadius: 5,}],
    sectionFooterLinkDisabled: [AmplifyTheme.sectionFooterLinkDisabled],
    sectionFooter: [AmplifyTheme.sectionFooter, { top: 40}],
    sectionFooterLink: [AmplifyTheme.sectionFooterLink, {color:themeColor.vividRed, fontFamily: themeFontFamily.raleway}],
    signedOutMessage: [AmplifyTheme.signedOutMessage, {opacity:0}],
    errorRow: [AmplifyTheme.errorRow, {top: 40}]
  };
  
interface PropsType {
    navigation: any,
  }

const WaitingSpinner3 = ({navigation}) => {
    console.log("WaitingSpinner3");
    
    const dispatch = useDispatch();

    const [userStatus, setUserStatus] = useState("null");
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setErrorFlag] = useState(false);
    const [token,setToken] = useState();

    console.log("userStatus",userStatus);

    const updateUserTimeZone = async (userId, jwtToken) => {
      const urlBackStage = `${baseUrl}/user/${userId}/update-user-data/`;
      var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      dispatch(userSlice.actions.setTime({timeZone:timeZone}))
      console.log("timezone",timeZone);
      console.log("token",jwtToken);
      try{
        const response = await axios.post(urlBackStage, {timezone: timeZone} ,{
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          }
        });
        console.log("update user response",response);
      }
      catch(error){
        console.log("update user error",error.message);
      }

    }

    const fetchUsers = async (userId, jwtToken) => {
        const abortController = new AbortController();
        const url = `${baseUrl}/user/${userId}`;
        try {
          setIsLoading(true);
          const response = await axios.get(url, {
            signal: abortController.signal,
            timeout: 10000,
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            }
          });
          // console.log("response", response.data);
          console.log(" fetchUsers response", response.data.data);
          if (response.status === 200) {
            updateUserTimeZone(userId, jwtToken);
            if (response?.data?.data.type === "INSTRUCTOR"){
              dispatch(userSlice.actions.setInstructor({type: 'Teacher', userId: userId,
              firsName: response?.data?.data.name, lastName:response?.data?.data.lastName,
              profilePic: response?.data?.data.userProfilePic}));
              navigation.navigate('Home');
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
            console.log("failed to fetch users");
            throw new Error("Failed to fetch users");
            
          }
        } catch (error) {
          if (abortController.signal.aborted) {
            console.log("Data fetching cancelled");
          } else {
            console.log("failed to fetch users");
            setErrorFlag(true);
            setIsLoading(false);
          }
        }
      };

    const updateUser = async () => {
        // Get current authenticated user
        console.log("updateUser");

        //check auth if not in local db
        var userInfo;
        try {
          userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
        }
        catch(e){
          userInfo = null;
        }
        console.log("userInfo", userInfo);
        if(userInfo) {
          // check local db
            if (userInfo?.attributes?.sub){
                console.log("update user userId",userInfo?.attributes?.sub);
                fetchUsers(userInfo?.attributes?.sub, userInfo?.signInUserSession?.idToken?.jwtToken);
            }
            else{
                console.log("updateUser2");
                navigation.navigate('SignIn');
            }
        }
        else{
            console.log("updateUser1");
            navigation.navigate('SignIn');
        }
      }


    React.useEffect(() => {
      SplashScreen.hide();
      updateUser();
    }, [userStatus]);

    if(userStatus == "null"){
        return (
            <ImageBackground source={backgroundImageMedium} style={{height:'100%', width:'100%'}}>
                <ActivityIndicator style={{alignSelf:'center', marginTop:150}}/>
            </ImageBackground>
            )
    }

    if(userStatus == "userNotSignedIn"){
        console.log("updateUser3");
        navigation.navigate('SignIn',{setUserStatus});
    }

    if(userStatus == "userSignedInUnknown"){
        updateUser();
    }

    if(userStatus == "userSignedInKnown"){
        navigation.navigate('Home');
    }


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

    return (
    <ImageBackground source={backgroundImageMedium} style={{height:'100%', width:'100%'}}>
        <ActivityIndicator style={{alignSelf:'center', marginTop:150}}/>
    </ImageBackground>
    )
    
};

const signUpConfig = {
    hideAllDefaults: true,
    defaultCountryCode: '1',
    autoSignIn: {
      enabled: true
    },
    signUpFields: 
    [
      {
        label: "First Name",
        key: "given_name",
        placeholder: "First Name",
        required: true,
        displayOrder: 1
      },
      {
        label: "Last Name",
        key: "family_name",
        placeholder: "Last Name",
        required: true,
        displayOrder: 2
      },
      {
        label: 'Email',
        key: 'email',
        required: true,
        displayOrder: 3,
        type: 'string'
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 4,
        type: 'password'
      },
      {
        label: 'PhoneNumber',
        key: 'phone_number',
        required: true,
        displayOrder: 5,
        type: 'string'
      },
      // and other custom attributes
    ]
  };

// export default withAuthenticator(WaitingSpinner, { usernameAttributes: 'email', signUpConfig, includeGreetings: false }, [], null, MyTheme);
export default WaitingSpinner3;