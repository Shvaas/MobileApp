import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
  } from 'react-native';

import React, { useState, useEffect } from 'react';

import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';
import BackgroundImageDup from '../../../common/BackgroundImageFullPage'
import CourseCardView from '../../../components/CourseCardView';
import {aryan,nabeel,shikha,utkarsh} from '../../../images/imageLinks';

import RouteNames from '../../../constants/routeName';
import ToggleButton from '../../../components/ToggleButton';

interface PropsType {
  navigation: any;
  // firstOption: string;
  // secondOption: string;
  // activeOption?: number;
  // onOptionPress?: (index: OPTION) => void;
  // disabled?: boolean;
}

const DATA = [
  {
    key: 1,
    title: "Yoga1",
    description: "Yoga lorem ipsium the random text",
    level: 1,
    maxCap: 20,
    numOfSessions: 4,
    instructor: shikha,
    name: "Shikha",
    instructorRating: 4.5,
    numOfStudentsEnrolled: 13,
    cost: "50$",
    date: "10/5/23",
    time: "5:00 am"
  },
  {
    key: 2,
    title: "Yoga2",
    description: "Yoga lorem ipsium the random text",
    level: 2,
    maxCap: 50,
    numOfSessions: 10,
    instructor: aryan,
    name: "Aryan",
    instructorRating: 4,
    numOfStudentsEnrolled: 45,
    cost: "30$",
    date: "10/5/23",
    time: "5:00 am"
  },
  {
    key: 3,
    title: "Yoga3",
    description: "Yoga lorem ipsium the random text",
    level: 1,
    maxCap: 20,
    numOfSessions: 4,
    instructor: nabeel,
    name: "Nabeel",
    instructorRating: 4.5,
    numOfStudentsEnrolled: 13,
    cost: "70$",
    date: "10/5/23",
    time: "5:00 am"
  },
  {
    key: 4,
    title: "Yoga4",
    description: "Yoga lorem ipsium the random text",
    level: 1,
    maxCap: 20,
    numOfSessions: 4,
    instructor: utkarsh,
    name: "Utkarsh",
    instructorRating: 4.5,
    numOfStudentsEnrolled: 13,
    cost: "40$",
    date: "10/5/23",
    time: "5:00 am"
  },
  {
    key: 5,
    title: "Yoga5",
    description: "Yoga lorem ipsium the random text",
    level: 1,
    maxCap: 20,
    numOfSessions: 4,
    instructor: aryan,
    name: "Aryan",
    instructorRating: 4.5,
    numOfStudentsEnrolled: 13,
    cost: "90$",
    date: "10/5/23",
    time: "5:00 am"
  },
  {
    key: 6,
    title: "Yoga6",
    description: "Yoga lorem ipsium the random text",
    level: 1,
    maxCap: 20,
    numOfSessions: 4,
    instructor: utkarsh,
    name: "Utkarsh",
    instructorRating: 4.5,
    numOfStudentsEnrolled: 13,
    cost: "150$",
    date: "10/5/23",
    time: "5:00 am"
  },
  {
    key: 7,
    title: "Yoga7",
    description: "Yoga lorem ipsium the random text",
    level: 3,
    maxCap: 10,
    numOfSessions: 5,
    instructor: nabeel,
    name: "Nabeel",
    instructorRating: 3.5,
    numOfStudentsEnrolled: 10,
    cost: "250$",
    date: "10/5/23",
    time: "5:00 am"
  },
];

const DATA1 = [
  {
    key: 1,
    title: "Yoga1",
    description: "Yoga lorem ipsium the random text",
    level: 1,
    maxCap: 20,
    numOfSessions: 4,
    instructor: aryan,
    name: "Aryan",
    instructorRating: 4.5,
    numOfStudentsEnrolled: 13,
    cost: "50$",
    date: "10/5/23",
    time: "5:00 am"
  },
  {
    key: 2,
    title: "Yoga2",
    description: "Yoga lorem ipsium the random text",
    level: 2,
    maxCap: 50,
    numOfSessions: 10,
    instructor: utkarsh,
    name: "Utkarsh",
    instructorRating: 4,
    numOfStudentsEnrolled: 45,
    cost: "30$",
    date: "10/5/23",
    time: "5:00 am"
  },
  {
    key: 3,
    title: "Yoga3",
    description: "Yoga lorem ipsium the random text",
    level: 1,
    maxCap: 20,
    numOfSessions: 4,
    instructor: shikha,
    name: "Shikha",
    instructorRating: 4.5,
    numOfStudentsEnrolled: 13,
    cost: "70$",
    date: "10/5/23",
    time: "5:00 am"
  },
  {
    key: 4,
    title: "Yoga4",
    description: "Yoga lorem ipsium the random text",
    level: 1,
    maxCap: 20,
    numOfSessions: 4,
    instructor: nabeel,
    name: "Nabeel",
    instructorRating: 4.5,
    numOfStudentsEnrolled: 13,
    cost: "40$",
    date: "10/5/23",
    time: "5:00 am"
  },
  {
    key: 5,
    title: "Yoga5",
    description: "Yoga lorem ipsium the random text",
    level: 1,
    maxCap: 20,
    numOfSessions: 4,
    instructor: aryan,
    name: "Aryan",
    instructorRating: 4.5,
    numOfStudentsEnrolled: 13,
    cost: "90$",
    date: "10/5/23",
    time: "5:00 am"
  },
  {
    key: 6,
    title: "Yoga6",
    description: "Yoga lorem ipsium the random text",
    level: 1,
    maxCap: 20,
    numOfSessions: 4,
    instructor: utkarsh,
    name: "Utkarsh",
    instructorRating: 4.5,
    numOfStudentsEnrolled: 13,
    cost: "150$",
    date: "10/5/23",
    time: "5:00 am"
  },
  {
    key: 7,
    title: "Yoga7",
    description: "Yoga lorem ipsium the random text",
    level: 3,
    maxCap: 10,
    numOfSessions: 5,
    instructor: nabeel,
    name: "Nabeel",
    instructorRating: 3.5,
    numOfStudentsEnrolled: 10,
    cost: "250$",
    date: "10/5/23",
    time: "5:00 am"
  },
];

enum OPTION {
  FIRST,
  SECOND,
}


const AllCourses: React.FC<PropsType> = ({navigation}) => {
  // const selectedOption = activeOption ?? OPTION.FIRST;
  // // const selectedOption = OPTION.FIRST;
  // const handleOptionPress = (index) => {
  //   onOptionPress(index);
  // };

  const [index, setIndex] = useState(1); 
  const onOptionPress = (x: number) => {
    if(x!=index){
      setIndex(x);
    }
  }  
  return (
    <ToggleButton disabled={false} firstOption="FIRST" secondOption="SECOND" activeOption={index} onOptionPress={onOptionPress} dataCurrent={DATA} dataPast={DATA1}/>
      // <SafeAreaView style={styles.container}> 
      //     <BackgroundImageDup> 
      //     <ScrollView contentContainerStyle={styles.contentContainer}>
      //     <FlatList
      //     data={DATA}
      //     renderItem = {({item}) => {
      //       return(
      //         <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.HomePageFlow.AllCourseDetail, {
      //           courseDetail: item,
      //         })}>
      //       <CourseCardView course={item} />
      //       </TouchableOpacity>
      //       )
      //     }
      //     }/>  

      //   </ScrollView>
      //   </BackgroundImageDup>
      // </SafeAreaView>
    //   <View style={styles.container}>
    //   <TouchableWithoutFeedback
    //     disabled={disabled}
    //     onPress={() => handleOptionPress(OPTION.FIRST)}>
    //     <View
    //       style={[
    //         selectedOption === OPTION.FIRST ? styles.activeFirstContainer : {},
    //         styles.option,
    //         styles.activeFirstContainer,
    //       ]}>
    //       <Text
    //         style={[
    //           selectedOption === OPTION.FIRST
    //             ? styles.firstOption
    //             : styles.optionText,
    //           styles.firstOption,
    //         ]}>
    //         {firstOption}
    //       </Text>
    //     </View>
    //   </TouchableWithoutFeedback>
    //   <TouchableWithoutFeedback
    //     disabled={disabled}
    //     onPress={() => handleOptionPress(OPTION.SECOND)}>
    //     <View
    //       style={[
    //         selectedOption === OPTION.SECOND
    //           ? styles.activeSecondContainer
    //           : {},
    //         styles.option,
    //         styles.activeSecondContainer,
    //       ]}>
    //       <Text
    //         style={[
    //           selectedOption === OPTION.SECOND
    //             ? styles.secondOption
    //             : styles.optionText,
    //           styles.secondOption,
    //         ]}>
    //         {secondOption}
    //       </Text>
    //     </View>
    //   </TouchableWithoutFeedback>
    // </View>
      );
    };
    
export default AllCourses;
    
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   //justifyContent: 'center',
  //   backgroundColor: themeColor.background,
    
  // },
  heading: {
    fontSize: themefonts.font32,
    textAlign: 'center',
    fontFamily: themeFontFamily.raleway,
    color: themeColor.white,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
  },
  buttonStyle: {
    width: 167,
  },
  btnContainerStyle: {
    alignSelf: 'center',
  },
  gridView: {
    flexDirection: "row",
    flexWrap: "wrap",
    //justifyContent: 'space-around'
  },
  contentContainer: {
    paddingVertical: 5,
    contentOffset: {x:0, y:0},
  },
  container: {
    flexDirection: 'row',
    // backgroundColor: themeColor.black80,
    backgroundColor: themeColor.black,
    borderRadius: 6,
    padding: 4,
    width: 110,
  },
  optionContainer: {
    minWidth: 0,
  },
  activeFirstContainer: {
    backgroundColor: themeColor.white,
  },
  activeSecondContainer: {
    // backgroundColor: themeColor.flyfinGreen,
    backgroundColor: themeColor.googleRed,
  },
  option: {
    borderRadius: 6,
    paddingHorizontal: 13,
    paddingVertical: 3,
  },
  optionText: {
    textAlign: 'center',
    // color: themeColor.silver,
    color: themeColor.white,
  },
  firstOption: {
    color: themeColor.black,
  },
  secondOption: {
    color: themeColor.black,
  },
});