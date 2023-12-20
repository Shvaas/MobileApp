/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';
import { useEffect, useState } from 'react';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

import {Picker} from '@react-native-picker/picker';
import CheckBox from "react-native-bouncy-checkbox";
import {DropdownList,PickerDate,PickerItem} from 'react-native-ultimate-modal-picker';
import { withTheme } from 'react-native-elements';
import { userTimeZone } from '../../../store/userSlice';
import { useSelector } from 'react-redux';

interface PropsType {
  item: any;
  index: any;
  questionOneState: any;
  setquestionOneState: any;
  questionTwoState: any;
  setquestionTwoState: any;
  selectedAge: any;
  setSelectedAge: any;
  selectedGender:any;
  setSelectedGender:any;
}

const QuestionItem: React.FC<PropsType> = ({item, index, 
    questionOneState, setquestionOneState, 
    questionTwoState, setquestionTwoState,
    selectedHeight, setSelectedHeight,
    selectedWeight, setSelectedWeight,
    selectedAge, setSelectedAge,
  selectedGender,setSelectedGender}) => {

    const {width} = useWindowDimensions();

    const height = ["Select", "4 Foot", "4 Foot 1 inch", "4 Foot 2 inch", "4 Foot 3 inch", "4 Foot 4 inch", "4 Foot 5 inch", 
    "4 Foot 6 inch", "4 Foot 7 inch", "4 Foot 8 inch", "4 Foot 9 inch", "4 Foot 10 inch", "4 Foot 11 inch", "4 Foot 12 inch",
    "5 Foot", "5 Foot 1 inch", "5 Foot 2 inch", "5 Foot 3 inch", "5 Foot 4 inch", "5 Foot 5 inch", 
    "5 Foot 6 inch", "5 Foot 7 inch", "5 Foot 8 inch", "5 Foot 9 inch", "5 Foot 10 inch", "5 Foot 11 inch", "5 Foot 12 inch", 
    "6 Foot", "6 Foot 1 inch", "6 Foot 2 inch", "6 Foot 3 inch", "6 Foot 4 inch", "6 Foot 5 inch", 
    "6 Foot 6 inch", "6 Foot 7 inch", "6 Foot 8 inch", "6 Foot 9 inch", "6 Foot 10 inch", "6 Foot 11 inch", "6 Foot 12 inch",];

   const timezone = useSelector(userTimeZone);
   const isIndia = (timezone=='Asia/Calcutta' || timezone=='Asia/Kolkata');

    const weight = ["Select"];
    if (!isIndia){
      for (let index = 0; index < 500; index++) {
        weight.push(index + " lb")
      }
    }else{
      for (let index = 0; index < 200; index++) {
        weight.push(index + " kg")
      }
    }
    

    const age = ["Select"];
    for (let index = 7; index < 110; index++) {
        age.push(index)
    }

    const gender = ["Select", "Female", "Male","Other","Don't wish to specify"];

    const QuestionOnekeys = ["Asthma", "Depression or/and Anxiety", "Cardiovascular issues", "Arthritis",
    "Osteoporosis", "Back Pain", "Spondylitis", "Obstructive pulmonary problems", "Diabetes"]

    const QuestionTwokeys = ["Stress relief", "Pain Relief", "Weight loss", "Flexibility",
    "Concentration","Strength", "Focused cure according to chronic ailments", 
    "General health benefits", "Community engagement"]

    const heightItems = height.map((item) => {return {label:item, value:item}});
    const weightItems = weight.map((item) => {return {label:item, value:item}});
    const ageItems = age.map((item) => {return {label:""+item, value:item}});
    const genderItems = gender.map((item) => {return {label:item, value:item}});
    
    // height.map(item => { items.push(<PickerItem>{ label:{item}, value:{item}})});
    if(index==0){
        return (
            <View style={[styles.middleContainer, {width}]}>
              <View style={styles.middleInternalContainer}>
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
                    defaultValue = "Select"
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
                    defaultValue = "Select"
                  />
              </View>
              <View style={styles.middleContainerItem}>
                <Text style={styles.heading}> Age :       </Text>
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
                    defaultValue = "Select"
                  />
              </View>
              <View style={styles.middleContainerItem}>
                <Text style={styles.heading}> Gender :</Text>
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
                      defaultValue = "Select"
                    />
              </View>
              </View>
            </View>
          ); 
    }
    if(index==1){
        return (
            <View style={[styles.middleContainer, {width}]}>
              <View style={styles.middleInternalContainer}>
               <Text style={styles.greetingText}>Please select all the health challenges you may have</Text>
              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[0]}
                textStyle={styles.checkboxText}
                onPress={(value) => setquestionOneState({...questionOneState, keys0 : value})}
                />
              </View>
              
              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[1]}
                textStyle={styles.checkboxText}
                onPress={(value) => setquestionOneState({...questionOneState, keys1 : value})}
                />
              </View>

              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[2]}
                textStyle={styles.checkboxText}
                onPress={(value) => setquestionOneState({...questionOneState, keys2 : value})}
                />
              </View>

              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[3]}
                textStyle={styles.checkboxText}
                onPress={(value) => setquestionOneState({...questionOneState, keys3 : value})}
                />
              </View>

              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[4]}
                textStyle={styles.checkboxText}
                onPress={(value) => setquestionOneState({...questionOneState, keys4 : value})}
                />
              </View>
              
              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[5]}
                textStyle={styles.checkboxText}
                onPress={(value) => setquestionOneState({...questionOneState, keys5 : value})}
                />
              </View>

              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[6]}
                textStyle={styles.checkboxText}
                onPress={(value) => setquestionOneState({...questionOneState, keys6 : value})}
                />
              </View>

              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[7]}
                textStyle={styles.checkboxText}
                onPress={(value) => setquestionOneState({...questionOneState, keys7 : value})}
                />
              </View>

              <View style={styles.middleContainerItem}>
              <CheckBox
                size={25}
                fillColor= {themeColor.vividRed}
                text={QuestionOnekeys[8]}
                textStyle={styles.checkboxText}
                onPress={(value) => setquestionOneState({...questionOneState, keys8 : value})}
                />
              </View>
              </View>
          </View>

          ); 
    }
   
  return (
    <View style={[styles.middleContainer, {width}]}>
      <View style={styles.middleInternalContainer}>
    <Text style={styles.greetingText}>How can we help you?</Text>
    <View style={styles.middleContainerItem}>
    <CheckBox
      size={25}
      fillColor= {themeColor.vividRed}
      text={QuestionTwokeys[0]}
      textStyle={styles.checkboxText}
      onPress={(value) => setquestionTwoState({...questionTwoState, keys0 : value})}
      />
    </View>

    <View style={styles.middleContainerItem}>
    <CheckBox
      size={25}
      fillColor= {themeColor.vividRed}
      text={QuestionTwokeys[1]}
      textStyle={styles.checkboxText}
      onPress={(value) => setquestionTwoState({...questionTwoState, keys1 : value})}
      />
    </View>

    <View style={styles.middleContainerItem}>
    <CheckBox
      size={25}
      fillColor= {themeColor.vividRed}
      text={QuestionTwokeys[2]}
      textStyle={styles.checkboxText}
      onPress={(value) => setquestionTwoState({...questionTwoState, keys2 : value})}
      />
    </View>

    <View style={styles.middleContainerItem}>
    <CheckBox
      size={25}
      fillColor= {themeColor.vividRed}
      text={QuestionTwokeys[3]}
      textStyle={styles.checkboxText}
      onPress={(value) => setquestionTwoState({...questionTwoState, keys3 : value})}
      />
    </View>

    <View style={styles.middleContainerItem}>
    <CheckBox
      size={25}
      fillColor= {themeColor.vividRed}
      text={QuestionTwokeys[4]}
      textStyle={styles.checkboxText}
      onPress={(value) => setquestionTwoState({...questionTwoState, keys4 : value})}
      />
    </View>

    <View style={styles.middleContainerItem}>
    <CheckBox
      size={25}
      fillColor= {themeColor.vividRed}
      text={QuestionTwokeys[5]}
      textStyle={styles.checkboxText}
      onPress={(value) => setquestionTwoState({...questionTwoState, keys5 : value})}
      />
    </View>

    <View style={styles.middleContainerItem}>
    <CheckBox
      size={25}
      fillColor= {themeColor.vividRed}
      text={QuestionTwokeys[6]}
      textStyle={styles.checkboxText}
      onPress={(value) => setquestionTwoState({...questionTwoState, keys6 : value})}
      />
    </View>

    <View style={styles.middleContainerItem}>
    <CheckBox
      size={25}
      fillColor= {themeColor.vividRed}
      text={QuestionTwokeys[7]}
      textStyle={styles.checkboxText}
      onPress={(value) => setquestionTwoState({...questionTwoState, keys7 : value})}
      />
    </View>
    </View>

</View>
  );
};

export default QuestionItem;

const styles = StyleSheet.create({

greetingText: {
    fontSize: themefonts.font16,
    fontFamily: themeFontFamily.raleway,
    color: '#222222',
    marginHorizontal: 20,
    marginBottom: 10,
    },

   middleContainer: {
     flex: 0.5,
     marginTop: 10
   },

   middleInternalContainer: {
    margin: 15,
    backgroundColor: 'white',
    padding: 20,
    paddingHorizontal:10,
     shadowColor:"black",
     shadowOpacity: 0.25,
     shadowRadius:4,
     shadowOffset: {
     width: -4,
     height: 4,
     },
     opacity: 0.78,
     borderRadius:10,
     // justifyContent: 'center',
     height: "90%"
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

  });
