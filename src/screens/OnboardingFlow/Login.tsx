import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Linking,
   Button,
 } from 'react-native';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { Amplify, Auth, Hub } from "aws-amplify";

import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from '../../aws-exports';

import {themeFontFamily, themefonts,themeColor} from '../../constants/theme';
import InAppBrowser from 'react-native-inappbrowser-reborn';

Amplify.configure(awsconfig);

async function urlOpener(url, redirectUrl) {
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


  return (
    <View>
      <Text>User: {user ? JSON.stringify(user.attributes) : 'None'}</Text>
      {user ? (
        <Button title="Sign Out" onPress={() => Auth.signOut()} />
      ) : (
        <>
          {/* Go to the Cognito Hosted UI */}
          <Button title="Cognito" onPress={() => Auth.federatedSignIn()} />

          {/* Go directly to a configured identity provider */}
          <Button title="Facebook" onPress={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })} />
          <Button title="Google" onPress={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}  />
          <Button title="Amazon" onPress={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Amazon })} />
        </>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: themeColor.background,
  },
  heading: {
    fontSize: themefonts.font32,
    textAlign: 'center',
    fontFamily: themeFontFamily.raleway,
    color: themeColor.white,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
  },
});

