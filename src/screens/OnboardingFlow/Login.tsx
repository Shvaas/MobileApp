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

import { Amplify, Auth, Hub ,Storage} from "aws-amplify";
import awsconfig from '../../aws-exports';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { NavigationContainer } from '@react-navigation/native';
// Amplify.configure(awsconfig);
import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native'

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

// Amplify.configure({
//   ...awsconfig,
//   oauth: {
//     ...awsconfig.oauth,
//     urlOpener,
//   },
// });

// const isLocalhost = Boolean(__DEV__);

// // Assuming you have two redirect URIs, and the first is for localhost and second is for production
// const [
//   localRedirectSignIn,
//   productionRedirectSignIn,
// ] = awsconfig.oauth.redirectSignIn.split(",");

// const [
//   localRedirectSignOut,
//   productionRedirectSignOut,
// ] = awsconfig.oauth.redirectSignOut.split(",");

// const updatedAwsConfig = {
//   ...awsconfig,
//   oauth: {
//     ...awsconfig.oauth,
//     redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
//     redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
//   }
// }
// Amplify.configure(updatedAwsConfig);

interface PropsType {
  navigation: any;
}

const Login: React.FC<PropsType> = ({navigation}) => {
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

  const uploadFile = async () => {
    return Storage.put('text3.txt',"Hello world", {
      level:'public',
      progressCallback(uploadProgress){
        console.log('PROGRESS--', uploadProgress.loaded + '/' + uploadProgress.total);
      }
    })
    .then((res) => {
      Storage.get(res.key)
      .then((result) => {
        console.log('RESULT --- ', result);
        let awsImageUri = result.substring(0,result.indexOf('?'))
        console.log('RESULT AFTER REMOVED URI --', awsImageUri)
      })
      .catch(e => {
        console.log(e);
      })
    }).catch(e => {
      console.log(e);
    })
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
          {/* <LoginButton title={'Sign in with Facebook'} 
          titleStyle={styles.fbtextstyle}
          icon={fb_icon}
          onPress={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Cognito })}/> 

        <LoginButton title={'Sign in with Google'} 
          titleStyle={styles.googletextstyle}
          icon={google_icon}
          onPress={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}/>  */}
          <Button title="Upload File" onPress={() => uploadFile()} />
          <Button title="Go Back" onPress={() => navigation.goBack()} />
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

const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: 
  [
    {
      label: 'Name',
      key: 'name',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 2,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 3,
      type: 'password'
    },
    {
      label: 'PhoneNumber',
      key: 'phone_number',
      required: true,
      displayOrder: 4,
      type: 'string'
    },
    // and other custom attributes
  ]
};

export default withAuthenticator(Login, { usernameAttributes: 'email', signUpConfig, includeGreetings: true }, [], null, MyTheme);

// export default withAuthenticator(Login,false, [], null, MyTheme);

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

