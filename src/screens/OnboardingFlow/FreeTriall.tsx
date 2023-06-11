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
 } from 'react-native';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';


import {themeFontFamily, themefonts,themeColor} from '../../constants/theme';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import BackgroundImage from './LoginBackgroundImage';
import {backgroundImageLight, backButton, tick, line} from '../../images/imageLinks';

import LoginButton from '../../common/buttons/LoginButton';
import SubcriptionPlan from '../../components/SubcriptionPlan';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import axios from "axios";

interface PropsType {
  navigation: any;
}

const FreeTrial = ({navigation}) => {
  const [user, setUser] = useState(null);

  React.useEffect(() => {
  }, []);

  const onSubcriptionPressed = async () => {
    console.log('callind onSubcriptionPressed');

    axios.post('https://6sm5d5xzu8.execute-api.us-west-2.amazonaws.com/stage/payment/create-subscription', {
      userId: '313cbfd3-4fc1-4763-9d18-caedd0be4a63',
      subscriptionType: 'STANDARD'
  })
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
    
    //const result = await updateReaction(like);
    // console.log('put result', result.data);
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

            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Now, enjoy complete zen access to all {"\n"} the exercises with a premium plan</Text>
            </View>

            <View style={styles.bodyContainer}>
                <Text style={styles.bodyText}>What's in it for you?</Text>
                <View style={styles.bodyItemContainer}>
                    <View style={styles.bodyItem}>
                        <Image source={tick} style={styles.tickbutton}/>
                        <Text style={styles.bodyItemText}>Unlock the full shvaas experience</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image source={tick} style={styles.tickbutton}/>
                        <Text style={styles.bodyItemText}>Access to our library of ambient sounds</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image source={tick} style={styles.tickbutton}/>
                        <Text style={styles.bodyItemText}>20+ guided meditations for every feeling</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image source={tick} style={styles.tickbutton}/>
                        <Text style={styles.bodyItemText}>Get in touch with the experts</Text>
                    </View>
                </View>
            </View>

            <View style={styles.lineContainer}>
                <Image  source={line}/>
                <View style={{'justifyContent':'center', 'alignItems':'center', 'marginHorizontal': 10}}>
                    <Text style={styles.lineText}>Choose a plan</Text>
                </View>
                <Image source={line}/>
            </View>

            <View style={styles.planContainer}>
            <SubcriptionPlan onPress={onSubcriptionPressed} title='Basic Plan' monthlyPrice='49' specialText='LIMITED OFFER' bottomText='Cancel anytime'/>
            <SubcriptionPlan title='Premium Plan' monthlyPrice='79' specialText='LIMITED OFFER' bottomText='Cancel anytime'/>
            </View>

          
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

