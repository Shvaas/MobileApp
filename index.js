/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import { Amplify} from "aws-amplify";
import awsconfig from './src/aws-exports';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { withOAuth , withAuthenticator, AmplifyTheme} from "aws-amplify-react-native";

AppRegistry.registerComponent(appName, () => withOAuth(App));

const isLocalhost = Boolean(__DEV__);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = awsconfig.oauth.redirectSignIn.split(",");

const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = awsconfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
  }
}
Amplify.configure(updatedAwsConfig);
