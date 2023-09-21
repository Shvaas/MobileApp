/* eslint-disable prettier/prettier */
import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Linking,
   ImageBackground,
   Image,
   Button,
   Alert,
 } from 'react-native';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';


import {themeFontFamily, themefonts,themeColor} from '../../constants/theme';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import BackgroundImage from './LoginBackgroundImage';
import {backgroundImageLight, backButton, tick, line} from '../../images/imageLinks';

import SimpleButton from '../../common/buttons/SimpleButton';
import LoginButton from '../../common/buttons/LoginButton';
import SubcriptionPlan from '../../components/SubcriptionPlan';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import { useStripe } from '@stripe/stripe-react-native';

import { useCreatePaymentIntentMutation } from '../../store/apiSlice';


import axios from "axios";
import { baseUrl } from '../../constants/urls';
import { useSelector } from 'react-redux';

interface PropsType {
  navigation: any;
}

const FreeTrial = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [planType, setPlan] = useState(0);
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();


  React.useEffect(() => {
  }, []);

  const userId = useSelector((state) => state.user.userId);
  
  const onSubcriptionPressed = async () => {
    console.log("subscirption pressed");

    try {
      const response = await axios.post(`${baseUrl}/payment/create-subscription`,
      {
        userId : userId,
        paymentRequestType: "CREATE_SUBSCRIPTION",
        subscriptionType: 'STANDARD'
      });

      console.log("response", response.data);
      console.log("response", response.data?.data);
      if (response.status === 200) {
        console.log(response.data);

        const clientSecret = response.data?.data?.clientSecret;
        const subscriptionId = response.data?.data?.subscriptionId;

        console.log("subscirption pressed step 0")
        console.log(clientSecret, subscriptionId);

        if (response.error) {
          console.log('Something went wrong1', response.error);
          return;
        }

        const { error: paymentSheetError } = await initPaymentSheet({
          merchantDisplayName: 'Yogit, Inc.',
          setupIntentClientSecret: clientSecret,
          defaultBillingDetails: {
            name: 'Utkarsh Nath',
          },
        });

        if (paymentSheetError) {
          console.log('Something went wrong2', paymentSheetError.message);
          return;
        }

        const { error: paymentError } = await presentPaymentSheet();
        if (paymentError) {
          console.log('Error code: ${paymentError.code}', paymentError.message);
          return;
        }

        console.log("Payment Successful");

      } else {
        Alert.alert('Error','Please try again later',[{text: 'OK',onPress: () => {},}]);
        throw new Error("An error has occurred");
      }
    } catch (error) {
      // Alert.alert('Error','Please try again later',[{text: 'OK',onPress: () => {},}]);
      console.log("error",error);
    }

  };


  return (
    <SafeAreaView style={styles.safeArea}>
        <ImageBackground source={backgroundImageLight} style={styles.image}>
            <View style={styles.topContainer}>
                <GestureHandlerRootView>
                  <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={backButton} style={styles.backbutton}/>
                  </TouchableOpacity>
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

            <SimpleButton
            title="Start 7 days Free Trial"
            onPress={onSubcriptionPressed}
            containerStyle={styles.primaryButton}
            />
            <GestureHandlerRootView>
            <TouchableOpacity>
              <Text style={styles.skip}>Skip</Text>
            </TouchableOpacity>
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
    margin: 10,
  },

  buttonContainer: {
    flex: 0.8,
  },

  heading: {
    fontSize: themefonts.font32,
    fontFamily: themeFontFamily.ralewaySemiBold,
    color: themeColor.black,
  },

  infoContainer: {
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    flex: 0.1,
  },

  infoText: {
    fontSize: themefonts.font16,
    fontFamily: themeFontFamily.raleway,
    color: '#222222',
    marginHorizontal: 10, 
  },

  bodyContainer: {
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 20,
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
    marginBottom: 20
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
    marginBottom: 10,
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
    flex: 0.3
  },

  primaryButton: {
    marginHorizontal: 10,
    width: 200,
    alignSelf:'center',
    marginTop: 20,
  },

  skip:{
    fontSize: themefonts.font16,
    fontFamily: themeFontFamily.raleway,
    alignSelf:'center',
    marginVertical: 10,
    color: themeColor.vividRed,
    textDecorationLine: 'underline',
  },

//   heading: {
//     fontSize: themefonts.font32,
//     alignContent:'center',
//     justifyContent: 'center',
    
//     fontFamily: themeFontFamily.ralewaySemiBold,
//     color: themeColor.black,
//     marginTop:0,
//     borderColor:'black',
//     borderWidth:2,
    
    
//   },

  
  image: {
    height: "100%",
    width:"100%",
    // resizeMode: 'cover',
  },


});

