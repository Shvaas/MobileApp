/* eslint-disable prettier/prettier */
import {
    Image,
    StyleSheet,
    Text,
    View,
    Share,
    Alert,
  } from 'react-native';
  import React, {useState} from 'react';
  import { Linking} from 'react-native';

  // local
  import {themeFontFamily, themefonts, themeColor} from '../../../constants/theme';
  import {next} from '../../../images/imageLinks';
  import IoniconsIcon from 'react-native-vector-icons/Ionicons';
  import { TouchableOpacity } from 'react-native-gesture-handler';
  import {GestureHandlerRootView} from 'react-native-gesture-handler';
  import RouteNames from '../../../constants/routeName';
  import { userIdSelector, userSlice,  } from '../../../store/userSlice';
  import { useDispatch, useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import { userSessionSlice } from '../../../store/userSessionSlice';
import { sessionSlice } from '../../../store/sessionSlice';
import { yogiSlice } from '../../../store/yogiSlice';
import {baseUrl} from '../../../constants/urls';
import axios from "axios";
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import Spinner from 'react-native-loading-spinner-overlay';
import RNRestart from 'react-native-restart';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

  interface PropsType {
    item : any,
    navigation : any,
    index: any,
    teacher: boolean,
    isSubscribed: boolean,
  }
  
  const SettingItem: React.FC<PropsType> = ({item, index, teacher, navigation, isSubscribed}) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);
    const [isLoading, setIsLoading] = useState(false);

    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            'React Native | A framework for building native apps using React',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error: any) {
        Alert.alert(error.message);
      }
    };

    const onSignOut = async () => {

      Auth.signOut()
      .then(() => {
        dispatch(userSlice.actions.setUserId(null));
        dispatch(userSlice.actions.setInitialState(null));
        dispatch(sessionSlice.actions.setInitialState(null));
        dispatch(userSessionSlice.actions.setInitialState(null));
        dispatch(yogiSlice.actions.setInitialState(null));
        AsyncStorage.clear();
        RNRestart.restart();
        
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name : "StudentTabNavigator"}],
        // });
        // navigation.navigate('SignIn');
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: 'SignIn'}]
        });
        navigation.dispatch(resetAction);
        
        
      })
      .catch(err => console.log(err));

      // console.log(userIdSelector(userIdSelector));
    };

    const onDeleteAccount = async () => {

      Auth.deleteUser()
      .then(() => {
        dispatch(userSlice.actions.setUserId(null));
        dispatch(userSlice.actions.setInitialState(null));
        dispatch(sessionSlice.actions.setInitialState(null));
        dispatch(userSessionSlice.actions.setInitialState(null));
        dispatch(yogiSlice.actions.setInitialState(null));
        AsyncStorage.clear();
        RNRestart.restart();
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: 'SignIn'}]
        });
        navigation.dispatch(resetAction);
        
        
      })
      .catch(err => console.log(err));
    };

    const openLink = async (url) => {
      console.log(url);
      
      try {
        if (await InAppBrowser.isAvailable()) {
          const result = await InAppBrowser.open(url, {
            // iOS Properties
            dismissButtonStyle: 'cancel',
            // preferredBarTintColor: themeColor.vividRed,
            // preferredControlTintColor: 'white',
            readerMode: false,
            animated: true,
            modalPresentationStyle: 'fullScreen',
            modalTransitionStyle: 'coverVertical',
            modalEnabled: true,
            enableBarCollapsing: false,
            // Android Properties
            showTitle: true,
            secondaryToolbarColor: 'black',
            navigationBarColor: 'black',
            navigationBarDividerColor: 'white',
            enableUrlBarHiding: true,
            enableDefaultShare: true,
            forceCloseOnRedirection: false,
            // Specify full animation resource identifier(package:anim/name)
            // or only resource name(in case of animation bundled with app).
            animations: {
              startEnter: 'slide_in_right',
              startExit: 'slide_out_left',
              endEnter: 'slide_in_left',
              endExit: 'slide_out_right'
            },
          })
        }
        else Linking.openURL(url)
      } catch (error) {
        console.log(error);
        Alert.alert("Sorry, something went wrong!")
      }
    }

    const onManageSubscription = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(`${baseUrl}/payment/dashboard-url`,{userId: userId}, {
          headers: {
            Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
          }
        });
        setIsLoading(false);
        console.log("response", response.data);
        console.log("response", response.data?.data?.redirectURL);
        
        if (response.status === 200) {
          console.log('success');
          const redirectURL = response.data?.data?.redirectURL;
          console.log("redirectURL", redirectURL);
          await InAppBrowser.close();
          openLink(redirectURL);
          
        } else {
          setIsLoading(false);
          Alert.alert('Error','Please try again later',[{text: 'OK',onPress: () => {},}]);
          throw new Error("An error has occurred");
        }
      } catch (error) {
        setIsLoading(false);
        Alert.alert('Error','Please try again later',[{text: 'OK',onPress: () => {},}]);
      }
      
    };

    function onPressed(){      
      if(index === 0){
        //Profile Questions
        if(teacher){
          onSignOut();
        }
        else{
          navigation.navigate(RouteNames.HomePageFlow.UserDetails);
        }
      }
      if(index === 1){
        //Invite Friends
        onShare();
      }
      if(index === 2){
        //Help
        console.log("RouteNames.HomePageFlow.Help");
        navigation.navigate(RouteNames.HomePageFlow.Help);
      }
      if(index === 3){
        //Manage Subscription
        if(isSubscribed){
          onManageSubscription();
        }else{
          onSignOut();
        }
      }
      if(index === 4){
        if(isSubscribed){
          //Logout
          onSignOut();
        }else{
          Alert.alert("Are you sure you want to delete your account?", "On deleting your account you will loose your remaining subscription period and access to any classes you have already booked.",
          [
            {
                text: 'NO',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'YES', onPress: () => {
              //Delete account
              onDeleteAccount();
            }
          }]);
        }
      }
      if(index === 5){
        Alert.alert("Are you sure you want to delete your account?", "On deleting your account you will loose your remaining subscription period and access to any classes you have already booked.",
        [
          {
              text: 'NO',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
          },
          {text: 'YES', onPress: () => {
            //Delete account
            onDeleteAccount();
          }
        }]);
      } 
    };

    return (
        <TouchableOpacity onPress={onPressed}
        style={{flexDirection:'row', alignItems:'center', marginVertical:10, height:40}}>
          <Spinner
          visible={isLoading}
          // textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          />
            <View style={{flex:0.8}}>
                <Text style={styles.standardText}>{item.title}</Text>
                {item.description && <Text style={styles.descriptionText}>{item.description}</Text>}
            </View>
            <View style={{flex:0.2, alignItems:'flex-end'}}>
                <Image source={next} style={styles.backbutton}/>
            </View>
        </TouchableOpacity>
      );
  };

  export default SettingItem;

  const styles = StyleSheet.create({
    container: {
      margin:10,
      shadowColor:"black",
      shadowOpacity: 0.25,
      shadowRadius:4,
      shadowOffset: {
      width: -4,
      height: 4,
      },
      backgroundColor: 'white',
      opacity: 0.78,
      borderRadius:10,
      flexDirection:"row",
      justifyContent:'space-between'
      
    },
    internalContainer: {
      width:'100%',
        flexDirection: 'row',
    },
    imageStyle: {
        borderColor: themeColor.vividRed,
        borderWidth: 2,
        borderRadius: 50,
        height: 70,
        width: 70,
        margin: 10,
        resizeMode: 'contain',
    },

    textStyleName: {
      fontFamily: themeFontFamily.raleway,
      fontSize: themefonts.font14,
      color: '#000',
      margin: 2,
    },

    standardText: {
        fontSize: themefonts.font14,
        fontFamily: themeFontFamily.raleway,
        color: '#000',
        alignSelf: 'flex-start',
      },

    descriptionText: {
        fontSize: themefonts.font12,
        fontFamily: themeFontFamily.raleway,
        color: '#666666',
        alignSelf: 'flex-start',
    },

    backbutton: {
        margin: 10,
    },

    spinnerTextStyle: {
      fontFamily: themeFontFamily.raleway,
      fontSize: themefonts.font14,
      color: themeColor.vividRed,
      opacity: 0.8
    }

  });