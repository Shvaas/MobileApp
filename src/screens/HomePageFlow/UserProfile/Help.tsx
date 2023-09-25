/* eslint-disable prettier/prettier */
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';

// local
import {themeFontFamily, themefonts, themeColor} from '../../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import {backgroundImageLight, backButton, tick, line} from '../../../images/imageLinks';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const DATA = [
  {
    id: 1,
    question: '1. What is the subscription cost for the app?',
    answer: 'The subscription fee is $49 per month, granting you access to unlimited group yoga classes.',
  },
  {
    id: 2,
    question: '2. How many participants are allowed in a group class?',
    answer: 'Each group class can accommodate a maximum of 15 participants, ensuring a personalized experience.',
  },
  {
    id: 3,
    question: '3. Can I choose my preferred Yoga instructor?',
    answer: 'Yes, you have the freedom to select any Yoga instructor listed on Yogit for your classes.',
  },
  {
    id: 4,
    question: '4. Are there any limitations on the number of classes I can attend?',
    answer: 'With your subscription, you can participate in an unlimited number of group classes throughout the month.',
  },
  {
    id: 5,
    question: '5. How do I book a class?',
    answer: 'Booking a class is simple! Navigate to the Yogis page to select the preferred instructor. Select your desired class and time slot from the available slots, and confirm your attendance.',
  },
  {
    id: 6,
    question: '6. Can I speak to an instructor about any health concerns before taking a class?',
    answer: 'Our instructors organize office hours once a week. Feel free to join and discuss any concerns you might have.',
  },
  {
    id: 7,
    question: '7. How will I attend a class?',
    answer: 'Link to the class will be provided to you on the booking schedule. Please join through the link before class time.',
  },
  {
    id: 8,
    question: '8. What if I cannot attend a class after booking?',
    answer: 'If your plans change, make sure to cancel your booking at least 24 hours in advance to allow others to join.',
  },
  {
    id: 9,
    question: '9. Is there a trial period available?',
    answer: 'Currently, we offer a 7-days free trial where you can avail an unlimited number of classes and instructor profiles even before subscribing.',
  },
  {
    id: 10,
    question: '10. How can I get support for technical issues or other concerns?',
    answer: 'For any technical problems or questions, feel free to reach out to our dedicated support team at admin@yogit.live',
  },
];

//Enjoy your journey to wellness with Yogit and don’t forget to drop a review on the app store!

interface PropsType {
  item : any,
  navigation : any,
  index: any,
  question: any,
  answer: any,
}

const Item: React.FC<PropsType> = ({question, answer, index}) => (
  <View style={{marginVertical:10}}>
    <Text style={styles.question}>{question}</Text>
    <Text style={styles.answer}>{answer}</Text>
  </View>
);

const help: React.FC<PropsType> = ({navigation}) => {

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
                  <Text style={styles.heading}>Frequently Asked Questions</Text>
              </View>
              <Image source={backButton} style={[styles.backbutton,{'opacity':0}]}/>
          </View>
          <View style={{flex: 0.9, margin:10}}>
          <FlatList
            data={DATA}
            renderItem={({item, index}) => <Item question={item.question}  answer={item.answer} index={index} />}
            keyExtractor={item => item.id}
          />
          </View>
      </ImageBackground>

      </SafeAreaView>

  )
      
};

export default help;

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
  
    heading: {
      fontSize: themefonts.font18,
      fontFamily: themeFontFamily.ralewaySemiBold,
      color: themeColor.black,
    },

    question: {
      fontSize: themefonts.font16,
      fontFamily: themeFontFamily.ralewaySemiBold,
      color: themeColor.black,
    },

    answer: {
      fontSize: themefonts.font14,
      fontFamily: themeFontFamily.raleway,
      // color: themeColor.black,
    },

    image: {
      height: "100%",
      width:"100%",
      // resizeMode: 'cover',
    },


});