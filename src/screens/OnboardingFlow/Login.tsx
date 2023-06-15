import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Linking,
   ImageBackground,
   Button,
 } from 'react-native';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';





import {themeFontFamily, themefonts,themeColor} from '../../constants/theme';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import BackgroundImage from './LoginBackgroundImage';
import {loginbackgroundImage, fb_icon, google_icon} from '../../images/imageLinks';

import LoginButton from '../../common/buttons/LoginButton';

import { Amplify, Auth, Hub } from "aws-amplify";
import awsconfig from '../../aws-exports';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
Amplify.configure(awsconfig);


async function urlOpener(url, redirectUrl) {
  console.log('url', url, redirectUrl);
  
  await InAppBrowser.isAvailable();
  const { type, url: newUrl } = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (type === 'success') {
    Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});


const Login = () => {
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      console.log(event);
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':

        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    // getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  function fbSignIn(){
    
    try {
      Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })
    } catch(error){
      console.log("fb error", error);
    }
    
  }


  return (
        <ImageBackground source={loginbackgroundImage} style={styles.image}>
          
          <View style={styles.container}>
            
          </View>
          
          <View style={styles.container}>
            <Text style={styles.heading}>Welcome</Text>
            <Text style={styles.body}>Sign in to continue</Text>
          </View>

          <View style={styles.buttonContainer}>
          <LoginButton title={'Sign in with Facebook'} 
          titleStyle={styles.fbtextstyle}
          icon={fb_icon}
          onPress={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Cognito })}/> 

        <LoginButton title={'Sign in with Google'} 
          titleStyle={styles.googletextstyle}
          icon={google_icon}
          onPress={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}/> 
          </View>

          

          
          
          
          
          
          {/* <LoginButton title={'Sign in with Facebook'}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            containerStyle={styles.btnContainerStyle}
            onPress={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })}> fb login</LoginButton>
         */}
         
        </ImageBackground>
        
     


    // <View>
    //   <Text>User: {user ? JSON.stringify(user.attributes) : 'None'}</Text>
    //   {user ? (
    //     <Button title="Sign Out" onPress={() => Auth.signOut()} />
    //   ) : (
    //     <>
    //       {/* Go to the Cognito Hosted UI */}
    //       <Button title="Cognito" onPress={() => Auth.federatedSignIn()} />

    //       {/* Go directly to a configured identity provider */}
    //       <Button title="Facebook" onPress={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })} />
    //       <Button title="Google" onPress={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}  />
    //       <Button title="Amazon" onPress={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Amazon })} />
    //     </>
    //   )}
    // </View>

  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent:'center',
    
  },
  buttonContainer: {
    flex: 0.8,
    
  },
  heading: {
    fontSize: themefonts.font32,
    textAlign: 'center',
    fontFamily: themeFontFamily.ralewaySemiBold,
    color: themeColor.black,
    marginTop:0
    
  },
  body: {
    fontSize: themefonts.font14,
    textAlign: 'center',
    fontFamily: themeFontFamily.raleway,
    color: themeColor.black,
    marginTop:10,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
  },
  
  image: {
    justifyContent: 'center',
    height: "100%",
    width:"100%",
    // resizeMode: 'cover',
  },

  buttonStyle: {
    width: 286,
  },

  fbtextstyle:{
    color:themeColor.facebookBlue,
    fontSize: themefonts.font14,
    fontFamily: themeFontFamily.ralewayMedium,
    lineHeight: 16,
 },

 googletextstyle:{
  color:themeColor.googleRed,
  fontSize: themefonts.font14,
  fontFamily: themeFontFamily.ralewayMedium,
  lineHeight: 16,
},

  btnContainerStyle: {
    alignSelf: 'center',
    marginTop:20,
  },
});

