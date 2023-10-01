/* eslint-disable prettier/prettier */
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Linking,
    ImageBackground,
    Image,
    useWindowDimensions,
    Share,
  } from 'react-native';
 import React, { Component } from 'react';
 import { useEffect, useState, useCallback } from 'react';

 import ProgressBar from 'react-native-progress/Bar';

 import CheckBox from "react-native-bouncy-checkbox";
 import RouteNames from '../../../constants/routeName';
 
 import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';

 import {inviteIcon, utkarsh, backgroundImageMedium, backButton, settingsButton, line} from '../../../images/imageLinks';
 
 import LoginButton from '../../common/buttons/LoginButton';
 import PrimaryButton from '../../../common/buttons/PrimaryButton';

 import SubcriptionPlan from '../../components/SubcriptionPlan';
 import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
 import {GestureHandlerRootView} from 'react-native-gesture-handler';
 import SettingItem from './SettingItem';
 import {userSlice} from '../../../store/userSlice';

 import {useDispatch, useSelector} from 'react-redux';
 import {Picker} from '@react-native-picker/picker';
 import { userHeightSelector, userWeightSelector, userAgeSelector, userGenderSelector, userQuestionOneSelector, userQuestionTwoSelector } from '../../../store/userSlice';
import { DropdownList } from 'react-native-ultimate-modal-picker';
 
 interface PropsType {
   navigation: any;
 }
 
 const UserDetails = ({navigation}) => {


    const QuestionTwoInitialState = {
        keys0: false,
        keys1: false,
        keys2: true,
        keys3: false,
        keys4: false,
        keys5: false,
        keys6: false,
        keys7: false,
        };
    
        const QuestionOneInitialState = {
        keys0: false,
        keys1: false,
        keys2: true,
        keys3: false,
        keys4: false,
        keys5: false,
        keys6: false,
        keys7: true,
        keys8: false,
        };
    
    const userHeight = useSelector(userHeightSelector);
    const userWeight = useSelector(userWeightSelector);
    const userAge = useSelector(userAgeSelector);
    const userGender = useSelector(userGenderSelector);
    const userQuestionOne = useSelector(userQuestionOneSelector);
    const userQuestionTwo = useSelector(userQuestionTwoSelector);

    const [questionOneState, setquestionOneState] = useState(QuestionOneInitialState);
    const [questionTwoState, setquestionTwoState] = useState(QuestionTwoInitialState);
    const [selectedHeight, setSelectedHeight] = useState(" ");
    const [selectedWeight, setSelectedWeight] = useState(" ");
    const [selectedAge, setSelectedAge] = useState(" ");
    const [selectedGender, setSelectedGender] = useState(" ");


    const {width} = useWindowDimensions();
    const dispatch = useDispatch();

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

    const age = [];
    for (let index = 7; index < 110; index++) {
        age.push(index)
    }

    const gender = ["Female","Male","Other","Don't wish to specify"];

    const heightItems = height.map((item) => {return {label:item, value:item}});
    const weightItems = weight.map((item) => {return {label:item, value:item}});
    const ageItems = age.map((item) => {return {label:""+item, value:item}});
    const genderItems = gender.map((item) => {return {label:item, value:item}});

    const QuestionOnekeys = ["Asthma", "Depression or/and Anxiety", "Cardiovascular issues", "Arthritis",
    "Osteoporosis", "Back Pain", "Cancer", "Obstructive pulmonary problems", "Diabetes"]

    const QuestionTwokeys = ["Stress relief", "Weight loss", "Flexibility",
    "Concentration","Strength", "Focused cure according to chronic ailments", 
    "General health benefits", "Community engagement"]


    React.useEffect(() => {
        setSelectedHeight(userHeight);
        setSelectedWeight(userWeight);
        setSelectedAge(userAge);
        setSelectedGender(userGender);
        setquestionOneState(userQuestionOne);
        setquestionTwoState(userQuestionTwo);
      }, []);


    
      const updateInfo = () => {
        dispatch(userSlice.actions.setUserProfileQuestion({
          height: selectedHeight,
          weight: selectedWeight,
          age: selectedAge,
          gender: selectedGender,
          questionOneState: questionOneState,
          questionTwoState: questionTwoState,
      }));
        
      navigation.goBack();
    }


   return (
     <SafeAreaView style={styles.safeArea}>
         <ImageBackground source={backgroundImageMedium} style={styles.image}>
         <GestureHandlerRootView style={{flex:1}}>
         <View style={styles.topContainer}>
            <GestureHandlerRootView style={styles.topContainerItem}>
                  <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Image source={backButton} style={styles.backbutton}/>
                  </TouchableOpacity>
                  <View style={styles.headingContainer}>
                    <Text style={styles.title}>My Profile</Text>
                  </View>
                  <TouchableOpacity >
                        <Image source={settingsButton} style={[styles.backbutton, {opacity:0}]}/>
                  </TouchableOpacity>
            </GestureHandlerRootView>
          </View>

         <ScrollView style={{flex:0.8}}>
          <View style={[styles.middleContainer, {width}, {marginTop:10}]}>
              <View style={styles.middleContainerItem}>
                <Text style={styles.heading}> Height :  </Text>
                {/* <Picker style={styles.infoContainer} itemStyle={{height: 40}}
                    selectedValue={selectedHeight}
                    itemStyle={styles.pickerItem}
                    onValueChange={(itemValue, itemIndex) => setSelectedHeight(itemValue)}>
                    {(height.map(item => {
                  return <Picker.Item
                  label={item}
                  value={item}
                  key={item}/>}
                  ))}
                  </Picker> */}
                  <DropdownList
                    title=""
                    items={heightItems}
                    onChange={(value: string) => setSelectedHeight(value)}
                    customStyleContainer={{
                      containerLight: {
                        borderBottomWidth: -1,
                      },
                      containerDark: {
                        borderBottomWidth: -1,
                      },
                    }}
                    customStyleFieldText={{
                      fieldTextLight: {
                        fontFamily: styles.heading.fontFamily,
                        fontSize: styles.heading.fontSize,
                        fontWeight: '100',
                      },
                      fieldTextDark: {
                        fontFamily: styles.heading.fontFamily,
                        fontSize: styles.heading.fontSize,
                        fontWeight: '100',
                      },
                    }}
                    defaultValue = {selectedHeight}
                  />
              </View>

              <View style={styles.middleContainerItem}>
                <Text style={styles.heading}> Weight : </Text>
                {/* <Picker style={styles.infoContainer} itemStyle={{height: 40}}
                    itemStyle={styles.pickerItem}
                    selectedValue={selectedWeight}
                    onValueChange={(itemValue, itemIndex) => setSelectedWeight(itemValue)}>
                    {(weight.map(item => {
                  return <Picker.Item
                  label={item}
                  value={item}
                  key={item}/>}
                  ))}
                  </Picker> */}
                  <DropdownList
                    title=""
                    items={weightItems}
                    onChange={(value: string) => setSelectedWeight(value)}
                    customStyleContainer={{
                      containerLight: {
                        borderBottomWidth: -1,
                      },
                      containerDark: {
                        borderBottomWidth: -1,
                      },
                    }}
                    customStyleFieldText={{
                      fieldTextLight: {
                        fontFamily: styles.heading.fontFamily,
                        fontSize: styles.heading.fontSize,
                        fontWeight: '100',
                      },
                      fieldTextDark: {
                        fontFamily: styles.heading.fontFamily,
                        fontSize: styles.heading.fontSize,
                        fontWeight: '100',
                      },
                    }}
                    defaultValue = {selectedWeight}
                  />
              </View>
              <View style={styles.middleContainerItem}>
                <Text style={styles.heading}> Age : </Text>
                  <DropdownList
                    title=""
                    items={ageItems}
                    onChange={(value: number) => setSelectedAge(value)}
                    customStyleContainer={{
                      containerLight: {
                        borderBottomWidth: -1,
                      },
                      containerDark: {
                        borderBottomWidth: -1,
                      },
                    }}
                    customStyleFieldText={{
                      fieldTextLight: {
                        fontFamily: styles.heading.fontFamily,
                        fontSize: styles.heading.fontSize,
                        fontWeight: '100',
                      },
                      fieldTextDark: {
                        fontFamily: styles.heading.fontFamily,
                        fontSize: styles.heading.fontSize,
                        fontWeight: '100',
                      },
                    }}
                    defaultValue = {selectedAge}
                  />
              </View>
              <View style={styles.middleContainerItem}>
                <Text style={styles.heading}> Gender : </Text>
                  <DropdownList
                      title=""
                      items={genderItems}
                      onChange={(value) => setSelectedGender(value)}
                      customStyleContainer={{
                        containerLight: {
                          borderBottomWidth: -1,
                        },
                        containerDark: {
                          borderBottomWidth: -1,
                        },
                      }}
                      customStyleFieldText={{
                        fieldTextLight: {
                          fontFamily: styles.heading.fontFamily,
                          fontSize: styles.heading.fontSize,
                          fontWeight: '100',
                        },
                        fieldTextDark: {
                          fontFamily: styles.heading.fontFamily,
                          fontSize: styles.heading.fontSize,
                          fontWeight: '100',
                        },
                      }}
                      defaultValue = {selectedGender}
                    />
              </View>
          </View>

          <View style={[styles.middleContainer, {width}]}>
               <Text style={styles.greetingText}>Please select all the health challenges you may have</Text>
              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                isChecked={questionOneState['keys0']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[0]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionOneState({...questionOneState, keys0 : !questionOneState['keys0']})}
                />
              </View>
              
              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                isChecked={questionOneState['keys1']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[1]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionOneState({...questionOneState, keys1 : !questionOneState['keys1']})}
                />
              </View>

              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                isChecked={questionOneState['keys2']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[2]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionOneState({...questionOneState, keys2 : !questionOneState['keys2']})}
                />
              </View>

              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                isChecked={questionOneState['keys3']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[3]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionOneState({...questionOneState, keys3 : !questionOneState['keys3']})}
                />
              </View>

              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                isChecked={questionOneState['keys4']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[4]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionOneState({...questionOneState, keys4 : !questionOneState['keys4']})}
                />
              </View>
              
              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                isChecked={questionOneState['keys5']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[5]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionOneState({...questionOneState, keys5 : !questionOneState['keys5']})}
                />
              </View>

              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                isChecked={questionOneState['keys6']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[6]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionOneState({...questionOneState, keys6 : !questionOneState['keys6']})}
                />
              </View>

              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                isChecked={questionOneState['keys7']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[7]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionOneState({...questionOneState, keys7 : !questionOneState['keys7']})}
                />
              </View>

              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                isChecked={questionOneState['keys8']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[8]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionOneState({...questionOneState, keys8 : !questionOneState['keys8']})}
                />
            </View>





            <View style={[styles.middleContainer, {width}]}>
                <Text style={styles.greetingText}>How can we help you?</Text>
                <View style={styles.middleContainerItem}>
                <CheckBox
                size={25}
                isChecked={questionTwoState['keys0']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionTwokeys[0]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionTwoState({...questionTwoState, keys0 : !questionTwoState['keys0']})}
                />
                </View>

                <View style={styles.middleContainerItem}>
                <CheckBox
                size={25}
                isChecked={questionTwoState['keys1']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionTwokeys[1]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionTwoState({...questionTwoState, keys1 : !questionTwoState['keys1']})}
                />
                </View>

                <View style={styles.middleContainerItem}>
                <CheckBox
                size={25}
                isChecked={questionTwoState['keys2']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionTwokeys[2]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionTwoState({...questionTwoState, keys2 : !questionTwoState['keys2']})}
                />
                </View>

                <View style={styles.middleContainerItem}>
                <CheckBox
                size={25}
                isChecked={questionTwoState['keys3']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionTwokeys[3]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionTwoState({...questionTwoState, keys3 : !questionTwoState['keys3']})}
                />
                </View>

                <View style={styles.middleContainerItem}>
                <CheckBox
                size={25}
                isChecked={questionTwoState['keys4']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionTwokeys[4]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionTwoState({...questionTwoState, keys4 : !questionTwoState['keys4']})}
                />
                </View>

                <View style={styles.middleContainerItem}>
                <CheckBox
                size={25}
                isChecked={questionTwoState['keys5']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionTwokeys[5]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionTwoState({...questionTwoState, keys5 : !questionTwoState['keys5']})}
                />
                </View>

                <View style={styles.middleContainerItem}>
                <CheckBox
                size={25}
                isChecked={questionTwoState['keys6']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionTwokeys[6]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionTwoState({...questionTwoState, keys6 : !questionTwoState['keys6']})}
                />
                </View>

                <View style={styles.middleContainerItem}>
                <CheckBox
                size={25}
                isChecked={questionTwoState['keys7']}
                disableBuiltInState
                fillColor= {themeColor.vividRed}
                text={QuestionTwokeys[7]}
                textStyle={styles.checkboxText}
                onPress={() => setquestionTwoState({...questionTwoState, keys7 : !questionTwoState['keys7']})}
                />
                </View>
            </View>
          </View>
          </ScrollView>
          <View style={{alignItems:'center', justifyContent:'center', flex:0.1}}>
            <PrimaryButton
                    title={"Save"}
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{color: themeColor.vividRed}}
                    onPress={updateInfo}
                />
          </View>
        </GestureHandlerRootView>
         </ImageBackground>

         </SafeAreaView>
      
   );
 };
 
 export default UserDetails;

 const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: themeColor.white,
      },
   
      image: {
       height: "100%",
       width:"100%",
       flex: 1,
     },
   
     topContainer: {
       flexDirection: 'row',
       alignItems:'center',
       flex: 0.1,
     },
   
     topContainerItem: {
       flexDirection:'row', 
       justifyContent:'space-between',
       width:'100%',
       height:'100%',
     },

     headingContainer: {
      flex: 1,
      justifyContent:'center',
      alignItems: 'center',
    },

    greetingText: {
        fontSize: themefonts.font16,
        fontFamily: themeFontFamily.raleway,
        color: '#222222',
        marginHorizontal: 20,
        marginBottom: 10,
        },
    
       middleContainer: {
         marginTop: 20,
       },
    
       middleContainerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: 20,
      }, 
    
    
      checkboxText: {
        fontSize: themefonts.font16,
        fontFamily: themeFontFamily.raleway,
        textDecorationLine: "none",
        color: '#222222',
      },
    
        image: {
          height: "100%",
          width:"100%",
          flex: 1,
        },

        title: {
          fontSize: themefonts.font18,
          fontFamily: themeFontFamily.ralewaySemiBold,
          color: '#222222'
        },
    
        heading: {
         fontSize: themefonts.font16,
         fontFamily: themeFontFamily.raleway,
         color: '#222222'
       },
    
       pickerItem: {
        height: 45,
        fontSize: themefonts.font16,
        fontFamily: themeFontFamily.raleway,
        color: '#222222'
      },
    
       infoContainer: {
         height: 40,
         width: 200,
       },

       backbutton: {
        margin: 10,
      },

      buttonStyle: {
        width: 150,
        marginHorizontal: 10,
        backgroundColor: themeColor.white,
        borderColor: themeColor.vividRed,
        borderWidth: 1,
      },
    
      });
 


