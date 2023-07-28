/* eslint-disable prettier/prettier */
import {ActivityIndicator} from 'react-native';
import React from 'react';
import { useEffect, useState, useCallback } from 'react';

import RouteNames from '../../constants/routeName';

import {Auth} from "aws-amplify";
import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native'
import { useGetUserDetailQuery } from '../../store/apiSlice';
import { themeColor, themeFontFamily } from '../../constants/theme';
import { useDispatch } from 'react-redux';
import { userSlice } from '../../store/userSlice';

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

const WaitingSpinner = ({navigation}) => {
    const dispatch = useDispatch();

    const [userId, setUserId] = useState(null);

    const {data, error,isLoading} = useGetUserDetailQuery(userId);

    if(error){
        console.log("error", error);
    }

    if(isLoading){
        console.log("isLoading", isLoading);
    }

    if(data){
        console.log("data", data);
        const username = data?.data?.name
        if(data?.data?.type == "INSTRUCTOR"){
            dispatch(userSlice.actions.setUser({type: 'Teacher', userId: userId, name: username}));
        }
        else{
            dispatch(userSlice.actions.setUser({type: 'Student', userId: userId, name: username}));
        }
        // navigation.navigate(RouteNames.OnboardingFlow.ProfileQuestions);
        navigation.navigate('Home');
    }



    
    const updateUser = async () => {
        // Get current authenticated user
        const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
        console.log("userInfo", userInfo);
        if(userInfo) {
            setUserId(userInfo?.attributes?.sub);
        }
      }
    
    React.useEffect(() => {
        updateUser()
    }, [userId]);


    return <ActivityIndicator style={{alignSelf:'center', marginTop:150}}/>
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