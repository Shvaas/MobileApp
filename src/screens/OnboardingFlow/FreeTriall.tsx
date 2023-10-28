/* eslint-disable prettier/prettier */
import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   TextInput,
   ImageBackground,
   Image,
   Alert,
 } from 'react-native';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';


import {themeFontFamily, themefonts,themeColor} from '../../constants/theme';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Button } from 'react-native-elements';
import {backgroundImageLight, backButton, tick, line} from '../../images/imageLinks';

import SimpleButton from '../../common/buttons/SimpleButton';
import LoginButton from '../../common/buttons/LoginButton';
import SubcriptionPlan from '../../components/SubcriptionPlan';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { userSlice } from '../../store/userSlice';

import { useStripe } from '@stripe/stripe-react-native';

import { useCreatePaymentIntentMutation } from '../../store/apiSlice';
import Spinner from 'react-native-loading-spinner-overlay';

import axios from "axios";
import { baseUrl } from '../../constants/urls';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import RouteNames from '../../constants/routeName';
import { CommonActions } from '@react-navigation/native';

interface PropsType {
  navigation: any;
  onSignUp: boolean;
}

const FreeTrial = ({route, navigation}) => {

  const {onSignUp} = route.params;
  console.log("onSignUp", onSignUp);
  
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [planType, setPlan] = useState(0);
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const dispatch = useDispatch();


  React.useEffect(() => {
  }, []);

  const userId = useSelector((state) => state.user.userId);


  const fetchUsers = async (userId) => {
    const abortController = new AbortController();
    const url = `${baseUrl}/user/${userId}`;
    try {
      setIsLoading(true);
      var subcription = false;
      do{
      const response = await axios.get(url, {
        signal: abortController.signal,
        timeout: 10000,
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
        }
      });

      if (response.status === 200) {
        subcription = response?.data?.data.subscriptionStatus==='ACTIVE';
        console.log("subscription status ",subcription)
        if(subcription){
          dispatch(userSlice.actions.setSubscription(subcription))
          setIsLoading(false);
          navigation.navigate('Home');
          console.log("Payment Successful");
        }
      } else {
        throw new Error("Failed to fetch users");
      }
    }
    while(subcription == false)

    } catch (error) {
      if (abortController.signal.aborted) {
        console.log("Data fetching cancelled");
      } else {
        setIsLoading(false);
      }
    }
  };

  const initializePaymentSheet = async (clientSecret) => {

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Yogit, Inc.',
      setupIntentClientSecret: clientSecret,
      defaultBillingDetails: {
        name: 'Utkarsh Nath',
      },
    });

    console.log("subscirption pressed step 1")

    if (error) {
      Alert.alert('Error','Please try again later',[{text: 'OK',onPress: () => {},}]);
      console.log('Something went wrong2', error.message);
      return;
    }
  }
  
  const onSubcriptionPressed = async () => {
    console.log("subscirption pressed");
    setIsLoading(true)
    try {
      const response = await axios.post(`${baseUrl}/payment/create-subscription`,
      {
        userId : userId,
        paymentRequestType: "CREATE_SUBSCRIPTION",
        subscriptionType: planType==0 ? 'MONTHLY' : 'QUARTERLY',
      }, {
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
        }
      });
      
      console.log("response", response.data);
      console.log("response", response.data?.data);
      if (response.status === 200) {
        console.log(response.data);
        
        const clientSecret = response.data?.data?.clientSecret;
        // const subscriptionId = response.data?.data?.subscriptionId;

        console.log("subscirption pressed step 0")
        console.log(clientSecret);

        if (response.error) {
          setIsLoading(false)
          Alert.alert('Error','Please try again later',[{text: 'OK',onPress: () => {},}]);
          console.log('Something went wrong1', response.error);
          return;
        }
        setIsLoading(false)

        await initializePaymentSheet(clientSecret);

        console.log("subscirption pressed step 2")

        const { error } = await presentPaymentSheet();

        if (error) {
          setIsLoading(false)
          Alert.alert('Error', error.message + " Please try again later.",[{text: 'OK',onPress: () => {},}]);
          console.log('Error code: ${error.code}', error.message);
          return;
        } else {
          Alert.alert('Success', 'Your order is confirmed!');
        }

        console.log("subscirption pressed step 3")

        fetchUsers(userId)

      } else {
        Alert.alert('Error','Please try again later',[{text: 'OK',onPress: () => {},}]);
        throw new Error("An error has occurred");
      }
    } catch (error) {
      // Alert.alert('Error','Please try again later',[{text: 'OK',onPress: () => {},}]);
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
            <SubcriptionPlan  onPress={() => setPlan(0)} title='Monthly Plan' subPrice='99'
            monthlyPrice='49' specialText='LIMITED OFFER' bottomText='Unlimited Classes' selected= {planType==0}/>
            <SubcriptionPlan onPress={() => setPlan(1)} title='Quaterly Plan' subPrice='299' monthlyPrice='129' 
            specialText='LIMITED OFFER' bottomText='Unlimited Classes' selected={planType==1}/>
            </View>

            <View style={styles.feedbackContainer}>
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
            <Text style={styles.couponText}> 25% Coupon Applied </Text>

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

