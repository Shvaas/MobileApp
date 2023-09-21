/* eslint-disable prettier/prettier */
import {ActivityIndicator, Text, View, ImageBackground,} from 'react-native';
import React from 'react';
import { useEffect, useState, useCallback } from 'react';

import RouteNames from '../../constants/routeName';

import {Auth} from "aws-amplify";
import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native'
import { useGetUserDetailQuery } from '../../store/apiSlice';
import { themeColor, themefonts, themeFontFamily } from '../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { userSlice, userIdSelector } from '../../store/userSlice';
import {backgroundImageMedium} from '../../images/imageLinks';

import axios from "axios";

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
    navigation: any;
  }

const baseUrl = 'https://6sm5d5xzu8.execute-api.us-west-2.amazonaws.com/stage';

const WaitingSpinner = ({navigation}) => {
    const dispatch = useDispatch();

    const [userId, setUserId] = useState(useSelector(userIdSelector));
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setErrorFlag] = useState(false);


    const updateUser = async () => {
        // Get current authenticated user
        const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
        console.log("userInfo", userInfo);

        if(userInfo) {
            setUserId(userInfo?.attributes?.sub);
            setFirstName(userInfo?.attributes?.given_name);
            setLastName(userInfo?.attributes?.family_name);
        }
      }



    React.useEffect(() => {
        updateUser();

        const abortController = new AbortController();
        const url = `${baseUrl}/user/${userId}`;
        const fetchUsers = async () => {
          try {
            setIsLoading(true);
            const response = await axios.get(url, {
              signal: abortController.signal,
              timeout: 10000,
            });
            console.log("response.data.data", response.data.data);
            if (response.status === 200) {

              if (response?.data?.data.type === "INSTRUCTOR"){
                dispatch(userSlice.actions.setInstructor({type: 'Teacher', userId: userId,
                firsName: response?.data?.data.name, lastName:response?.data?.data.name,
                profilePic: response?.data?.data.userProfilePic}));
                navigation.navigate('Home');
            }
            else {
                var profileQuestionnaireCompleted = response?.data?.data.profileQuestionnaireCompleted;
                dispatch(userSlice.actions.setUser({type: 'Student', userId: userId,
                firsName: response?.data?.data.name, lastName:response?.data?.data.name}));
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
        if (userId != null){
          console.log("userId", userId);
          
          fetchUsers();
        }
    }, [userId]);


    // useEffect(() => {
      
      
      
  
    //   return () => abortController.abort("Data fetching cancelled");
    // }, [userId]);


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
    </ImageBackground>)
    
};

const signUpConfig = {
    header: 'My Customized Sign Up',
    hideAllDefaults: true,
    defaultCountryCode: '1',
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

export default withAuthenticator(WaitingSpinner, { usernameAttributes: 'email', signUpConfig, includeGreetings: false }, [], null, MyTheme);