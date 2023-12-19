/* eslint-disable prettier/prettier */
import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   ImageBackground,
   Image,
   Alert,
   Linking,
   AppState
 } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';


import {themeFontFamily, themefonts,themeColor} from '../../constants/theme';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {backgroundImageLight, backButton, tick, line} from '../../images/imageLinks';

import SimpleButton from '../../common/buttons/SimpleButton';
import SubcriptionPlan from '../../components/SubcriptionPlan';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { userSlice, userTimeZone, userPrevAppState} from '../../store/userSlice';

import { useStripe } from '@stripe/stripe-react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import axios from "axios";
import { baseUrl } from '../../constants/urls';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import { CommonActions } from '@react-navigation/native';

interface PropsType {
  navigation: any;
  onSignUp: boolean;
}

const FreeTrial = ({route, navigation}) => {

  const {onSignUp} = route.params;
  console.log("onSignUp", onSignUp);
  
  const [isLoading, setIsLoading] = useState(false);

  const [planType, setPlan] = useState(1);

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userId);
  const timezone = useSelector(userTimeZone);
  console.log("timezone", timezone);
  const isIndia = (timezone=='Asia/Calcutta' || timezone=='Asia/Kolkata');
  const prevAppState = useSelector(userPrevAppState);

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
    console.log("fetchusers called");
    const abortController = new AbortController();
    const url = `${baseUrl}/user/${userId}`;
    try {
      setIsLoading(true);
      var subcription = false;

      const response = await axios.get(url, {
        signal: abortController.signal,
        timeout: 10000,
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
        }
      });

      console.log('fetchUsers', response?.data?.data);

      if (response.status === 200) {
        subcription = response?.data?.data.subscriptionStatus==='ACTIVE';
        console.log("subscription status ",subcription)
        updateUserTimeZone(userId);
        if(subcription){
          dispatch(userSlice.actions.setSubscription(subcription))
          onSkip();
          console.log("Payment Successful");
        }
        else{
          setIsLoading(false);
          console.log("Payment Cancelled");
        }
      } else {
        throw new Error("Failed to fetch users");
      }

    } catch (error) {
      if (abortController.signal.aborted) {
        console.log("Data fetching cancelled");
      } else {
        setIsLoading(false);
      }
    }
  };
  
  useEffect(() => {
    console.log("useEffect");

    const handleUrlChange = (event) => {
      // Check if the URL matches the universal link you expect to return to your app.
      if (event.url.includes('https://yogit.link/')) {
        // Your app has been reopened from the universal link. You can perform actions here.
        // For example, you can extract data from the URL and use it in your app.
        console.log('App reopened from the universal link:', event.url);
      }
    };

    Linking.addEventListener('url', handleUrlChange);


    const handleAppStateChange = (nextAppState) => {
      console.log("nextAppState", nextAppState);
      console.log("previous app state", prevAppState);

      if (prevAppState!='active' && nextAppState === 'active') {
        console.log('nextAppState');
        setTimeout(() => {fetchUsers(userId)},5000);

        // Your app has returned to the active state (e.g., from the background).
        // You can perform actions when your app is brought back to the foreground.
      }
      else if (prevAppState==='active' && nextAppState === 'inactive') {
        setIsLoading(false);
      }
      dispatch(userSlice.actions.setAppState(nextAppState))
      //setAppState(nextAppState);
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      Linking.removeEventListener('url', handleUrlChange);
      AppState.removeEventListener('change', handleAppStateChange);
      dispatch(userSlice.actions.setAppState(''))
    };

  }, []);

  const onSubcriptionPressed = async () => {
    console.log("subscirption pressed");
    setIsLoading(true)
    let subscriptionType = 'MONTHLY'
    if(planType==0){
      subscriptionType = 'WEEKLY'
    }else if (planType==2){
      subscriptionType = 'QUARTERLY'
    }
    try {
      const response = await axios.post(`${baseUrl}/payment/create-subscription`,
      {
        userId : userId,
        paymentRequestType: "CREATE_SUBSCRIPTION",
        subscriptionType: subscriptionType,
      }, {
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
        }
      });
      
      console.log("response", response.data);
      console.log("response", response.data?.data);

      if (response.status === 200) {
        console.log('success');
        const redirectURL = response.data?.data?.redirectURL;
        console.log("redirectURL", redirectURL);
        Linking.openURL(redirectURL)
      } else {
        setIsLoading(false);
        Alert.alert('Error','Please try again later',[{text: 'OK',onPress: () => {},}]);
        throw new Error("An error has occurred");
      }


    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error',error,[{text: 'OK',onPress: () => {},}]);
      console.log("error",error);
    }

  };

  const onSkip = async() =>{
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: 'Home'}]
    });
    navigation.dispatch(resetAction);
    // navigation.navigate('Home')
  }


  return (
    <SafeAreaView style={styles.safeArea}>
        <ImageBackground source={backgroundImageLight} style={styles.image}>
          <Spinner
            visible={isLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
            <View style={styles.topContainer}>
                <GestureHandlerRootView>
                  {onSignUp?
                    <TouchableOpacity>
                      <Image source={backButton} style={[styles.backbutton, {'opacity': 0}]}/>
                    </TouchableOpacity> 
                    :
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                      <Image source={backButton} style={styles.backbutton}/>
                    </TouchableOpacity>
                  }
                </GestureHandlerRootView>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Get Premium</Text>
                </View>
                <Image source={backButton} style={[styles.backbutton,{'opacity':0}]}/>
            </View>
            {/* Now, enjoy complete zen access to all {"\n"} the exercises with a premium plan */}
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                Book classes hassle-free, and experience yoga without distractions, ensuring a focused practice
                  </Text>
            </View>

            <View style={styles.bodyContainer}>
                <Text style={styles.bodyText}>What's in it for you?</Text>
                <View style={styles.bodyItemContainer}>
                    <View style={styles.bodyItem}>
                        <Image source={tick} style={styles.tickbutton}/>
                        <Text style={styles.bodyItemText}>Unlimited Online Yoga classes</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image source={tick} style={styles.tickbutton}/>
                        <Text style={styles.bodyItemText}>Pick your favourite instructor</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image source={tick} style={styles.tickbutton}/>
                        <Text style={styles.bodyItemText}>Choose between different Yoga styles</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image source={tick} style={styles.tickbutton}/>
                        <Text style={styles.bodyItemText}>Learn according to your availability</Text>
                    </View>
                </View>
            </View>

            <View style={styles.lineContainer}>
                <Image  source={line}/>
                <View style={{'justifyContent':'center', 'alignItems':'center', 'marginHorizontal': 10}}>
                    <Text style={styles.lineText}> Choose a plan</Text>
                </View>
                <Image source={line}/>
            </View>

            <View style={styles.planContainer}>
            {isIndia ? 
            <SubcriptionPlan  onPress={() => setPlan(1)} title='Monthly Plan' subPrice='9999'
            monthlyPrice='7500' specialText='LIMITED OFFER' bottomText='Unlimited Classes' 
            selected={planType==1} isIndia={isIndia}
            repeatText='Month'/>
            :
            <SubcriptionPlan  onPress={() => setPlan(0)} title='Weekly Plan' subPrice='79'
            monthlyPrice='59' specialText='LIMITED OFFER' bottomText='Unlimited Classes' 
            selected={planType==0} isIndia={isIndia}
            repeatText='Week'/>
            }

            {isIndia ? 
            <SubcriptionPlan onPress={() => setPlan(2)} title='Quaterly Plan' subPrice='24999' monthlyPrice='17999' 
            specialText='LIMITED OFFER' bottomText='Unlimited Classes' selected={planType==2} 
            isIndia={isIndia} repeatText='Quater'/>
            :
            <SubcriptionPlan  onPress={() => setPlan(1)} title='Monthly Plan' subPrice='249'
            monthlyPrice='199' specialText='LIMITED OFFER' bottomText='Unlimited Classes' 
            selected={planType==1} isIndia={isIndia}
            repeatText='Month'/>
            }
            </View>

            {/* <View style={styles.feedbackContainer}>
                <View style={styles.leftContainer}>
                    <TextInput 
                    placeholder="Coupon Code" 
                    value={couponCode}
                    style={{'fontSize': themefonts.font16}}
                    onChangeText={setCouponCode}/>
                </View>
                <View style={styles.rightContainer}>
                    <Button titleStyle={styles.button} onPress={()=>{}} type="submit" title="Apply"  
                        className="comments-button" />
                </View>
            </View>
            <Text style={styles.couponText}> 25% Coupon Applied </Text> */}

            <SimpleButton
            title="Start 7 days Free Trial"
            onPress={onSubcriptionPressed}
            containerStyle={styles.primaryButton}
            />
            <GestureHandlerRootView>
            {onSignUp && <TouchableOpacity onPress={onSkip}>
              <Text style={styles.skip}>Skip</Text>
            </TouchableOpacity>}
            </GestureHandlerRootView>

          
        </ImageBackground>

        </SafeAreaView>

  );
};

export default FreeTrial;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: themeColor.white,
  },

  topContainer: {
    flexDirection: 'row',
    flex: 0.1,
  }, 

  headingContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
  },

  backbutton: {
    marginLeft: 10,
  },

  buttonContainer: {
    flex: 0.8,
  },

  spinnerTextStyle: {
    fontFamily: themeFontFamily.raleway,
    fontSize: themefonts.font14,
    color: themeColor.vividRed,
    opacity: 0.8
  },

  heading: {
    fontSize: themefonts.font32,
    fontFamily: themeFontFamily.ralewaySemiBold,
    color: themeColor.black,
  },

  infoContainer: {
    justifyContent:'center',
    alignItems: 'center',
    flex: 0.1,
  },

  infoText: {
    fontSize: themefonts.font16,
    fontFamily: themeFontFamily.raleway,
    color: '#222222',
    marginTop: 10, 
    marginHorizontal: 10, 
  },

  bodyContainer: {
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 10,
    flex: 0.5,
  },

  bodyItemContainer: {
    flexDirection: 'column',
  },

  bodyItem: {
    flexDirection: 'row',
  },

  tickbutton: {
    margin: 10,
    height: 30, 
    width: 30,
  },

  bodyText: {
    fontSize: themefonts.font24,
    fontFamily: themeFontFamily.ralewayMedium,
    color: themeColor.black,
    marginBottom: 10
  },

  bodyItemText: {
    fontSize: themefonts.font16,
    fontFamily: themeFontFamily.raleway,
    color: '#222222',
    alignSelf:'center',
  },

  lineContainer: {
    paddingHorizontal: 10,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems: 'center',
    flex:0.1,
  },

  lineText: {
    fontSize: themefonts.font24,
    fontFamily: themeFontFamily.ralewayMedium,
    color: themeColor.black,
  },

  planContainer: {
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems: 'center',
    flex: 0.4,
  },

  primaryButton: {
    marginHorizontal: 10,
    width: 200,
    alignSelf:'center',
    marginTop: 5,
  },

  skip:{
    fontSize: themefonts.font16,
    fontFamily: themeFontFamily.raleway,
    alignSelf:'center',
    marginVertical: 10,
    color: themeColor.vividRed,
    textDecorationLine: 'underline',
  },

feedbackContainer: {
  flexDirection:"row",
  margin:2,
  marginHorizontal:10, 
  // backgroundColor: '#ebe8e9',
  borderWidth:1,
  borderColor: themeColor.vividRed,
  borderRadius: 10,
},
leftContainer: {
    flex:3,
    paddingLeft: 10,
    //borderWidth:1, 
    justifyContent: 'center',
  },
  couponText:{
    marginHorizontal:10,
    fontSize: themefonts.font14,
    fontFamily: themeFontFamily.raleway,
    color: '#000',
    opacity: 0
  },

  rightContainer: {
    flex:1,
    //borderWidth:1, 
    flexDirection:"row",
    justifyContent:'flex-end',
    margin:5,
  },

  descriptionText: {
    margin:10,
    fontSize: themefonts.font14,
    fontFamily: themeFontFamily.raleway,
    color: '#000',
  },
  
  button: {
    color: themeColor.vividRed,
    fontSize: themefonts.font18,
    fontFamily: themeFontFamily.raleway,
  },

  
  image: {
    height: "100%",
    width:"100%",
    // resizeMode: 'cover',
  },


});

