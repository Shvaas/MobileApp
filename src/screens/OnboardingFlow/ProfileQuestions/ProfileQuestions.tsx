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
    Animated,
  } from 'react-native';
 import React, { Component } from 'react';
 import { useEffect, useState, useCallback } from 'react';

 import CheckBox from '@react-native-community/checkbox';
 import RouteNames from '../../../constants/routeName';
 
 import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';

 import {backgroundImageLight, loginbackgroundImage, backgroundImageMedium, backButton, image1stpage, line} from '../../../images/imageLinks';
 
 import LoginButton from '../../common/buttons/LoginButton';
 import PrimaryButton from '../../../common/buttons/PrimaryButton';

 import SubcriptionPlan from '../../components/SubcriptionPlan';
 import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
 import {GestureHandlerRootView} from 'react-native-gesture-handler';
 
 import { useStripe } from '@stripe/stripe-react-native';
 
 import { useCreatePaymentIntentMutation } from '../../store/apiSlice';
 
 import QuestionItem from './QuestionItem'
 import Paginator from './Paginator';

 import {userSlice} from '../../../store/userSlice';


 import axios from "axios";

 import {Picker} from '@react-native-picker/picker';
import { useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
 
 interface PropsType {
   navigation: any;
 }
 
 const ProfileQuestion = ({navigation}) => {

const QuestionTwoInitialState = {
    keys0: false,
    keys1: false,
    keys2: false,
    keys3: false,
    keys4: false,
    keys5: false,
    keys6: false,
    keys7: false,
    };

    const QuestionOneInitialState = {
    keys0: false,
    keys1: false,
    keys2: false,
    keys3: false,
    keys4: false,
    keys5: false,
    keys6: false,
    keys7: false,
    keys8: false,
    };

const [questionOneState, setquestionOneState] = useState(QuestionOneInitialState);
const [questionTwoState, setquestionTwoState] = useState(QuestionTwoInitialState);
const [selectedHeight, setSelectedHeight] = useState(" ");
const [selectedWeight, setSelectedWeight] = useState(" ");

  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const height = [" ", "4 Foot", "4 Foot 1 inch", "4 Foot 2 inch", "4 Foot 3 inch", "4 Foot 4 inch", "4 Foot 5 inch", 
  "4 Foot 6 inch", "4 Foot 7 inch", "4 Foot 8 inch", "4 Foot 9 inch", "4 Foot 10 inch", "4 Foot 11 inch", "4 Foot 12 inch",
  "5 Foot", "5 Foot 1 inch", "5 Foot 2 inch", "5 Foot 3 inch", "5 Foot 4 inch", "5 Foot 5 inch", 
  "5 Foot 6 inch", "5 Foot 7 inch", "5 Foot 8 inch", "5 Foot 9 inch", "5 Foot 10 inch", "5 Foot 11 inch", "5 Foot 12 inch", 
  "6 Foot", "6 Foot 1 inch", "6 Foot 2 inch", "6 Foot 3 inch", "6 Foot 4 inch", "6 Foot 5 inch", 
  "6 Foot 6 inch", "6 Foot 7 inch", "6 Foot 8 inch", "6 Foot 9 inch", "6 Foot 10 inch", "6 Foot 11 inch", "6 Foot 12 inch",];

  const weight = [" "];
  for (let index = 0; index < 500; index++) {
    weight.push(index + " lb")
  }

 
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);

  const scrollX = useRef(new Animated.Value(0)).current;



  const ViewableItemsChanged = useCallback(
    (info: { changed: ViewToken[] }): void => {
      const visibleItems = info.changed.filter((entry) => entry.isViewable);

      if (visibleItems && visibleItems.length !== 0) {
        setCurrentIndex(visibleItems[0].index)
      }
    },
    []
  );

  const scrollTo = () => {
      if (currentIndex < 2){
        slidesRef.current.scrollToIndex({index: currentIndex+1});
      }else{
          console.log(questionOneState);
          console.log(questionTwoState);
          console.log(selectedHeight);
          console.log(selectedWeight);
      }
  }

  const scrollBack = () => {
    if (currentIndex > 0){
      slidesRef.current.scrollToIndex({index: currentIndex-1});
    }else{
        navigation.goBack()
    }
  }


  
   return (
     <SafeAreaView style={styles.safeArea}>
         <ImageBackground source={backgroundImageMedium} style={styles.image}>
         
         <View style={styles.topContainer}>
            <GestureHandlerRootView>    
                  <TouchableOpacity onPress={scrollBack}>
                    <Image source={backButton} style={styles.backbutton}/>
                  </TouchableOpacity>
            </GestureHandlerRootView>
          </View>

          <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>Hello Utkarsh!</Text>
                <Text style={styles.greetingText}>Please let us know more about you</Text>
          </View>
          <View style={styles.middleContainer}>
          <GestureHandlerRootView style={{height: '100%',}}>   
              <FlatList
                data={[1,2,3]}
                renderItem={({item, index}) => <QuestionItem item={item} index={index}
                questionOneState={questionOneState} 
                setquestionOneState={setquestionOneState}
                questionTwoState={questionTwoState} 
                setquestionTwoState={setquestionTwoState}
                selectedHeight={selectedHeight}
                setSelectedHeight={setSelectedHeight}
                selectedWeight={selectedWeight}
                setSelectedWeight={setSelectedWeight}
            />}
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={32}
                // keyExtractor={(item) => item.id}
                onScroll={Animated.event([{nativeEvent: {contentOffset : {x: scrollX } } } ], {
                    useNativeDriver: false
                })}
                onViewableItemsChanged= {ViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50,
                  }}
                ref={slidesRef}
                />
             </GestureHandlerRootView>
          </View>
          <View style={styles.paginatorContainer}>
            <Paginator data={[0, 1, 2]} scrollX={scrollX} />
          </View>
          <View style={styles.buttonContainer}>
              <PrimaryButton
                title={currentIndex==2? "Done":"Next"}
                buttonStyle={styles.buttonStyle}
                titleStyle={{color: themeColor.vividRed}}
                onPress={scrollTo}
              />
            </View>

         </ImageBackground>
         </SafeAreaView>
      
   );
 };
 
 export default ProfileQuestion;
 
 const styles = StyleSheet.create({
   safeArea: {
     flex: 1,
     backgroundColor: themeColor.white,
   },

  topContainer: {
    flexDirection: 'row',
    alignItems:'center',
    flex: 0.1,
  }, 

  greetingContainer: {
    justifyContent:'center',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    flex: 0.2,
  },

  greetingText: {
    fontSize: themefonts.font16,
    fontFamily: themeFontFamily.raleway,
    color: '#222222',
    marginTop: 10,
  },

  middleContainer: {
    flex: 0.8,
  }, 

  middleContainerItem: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 10,
  }, 

  paginatorContainer: {
    justifyContent:'center',
    alignItems: 'center',
    flex: 0.1,
  },

   image: {
     height: "100%",
     width:"100%",
     flex: 1,
   },

   heading: {
    fontSize: themefonts.font22,
    fontFamily: themeFontFamily.raleway,
    color: '#222222'
  },

  infoContainer: {
    height: 50,
    width: 250,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.3,
  },

  buttonStyle: {
    width: 150,
    marginHorizontal: 10,
    backgroundColor: themeColor.white,
    borderColor: themeColor.vividRed,
    borderWidth: 1,
  },

   backbutton: {
    margin: 10,
  },
 
 
 });
