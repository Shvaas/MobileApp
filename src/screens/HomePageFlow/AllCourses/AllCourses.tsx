import {
    SafeAreaView,
    StyleSheet,
    Text,
    ScrollView,
    View,
  } from 'react-native';
import React from 'react';

import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';
import BackgroundImageDup from '../../../common/BackgroundImageFullPage'
import CourseCardView from '../../../components/CourseCardView';
import {aryan,nabeel,shikha,utkarsh} from '../../../images/imageLinks';

interface PropsType {
    navigation: any;
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
    instructorRating: 4.5,
    numOfStudentsEnrolled: 13,
    cost: "50$",
  },
  {
    key: 2,
    title: "Yoga2",
    description: "Yoga lorem ipsium the random text",
    level: 2,
    maxCap: 50,
    numOfSessions: 10,
    instructor: aryan,
    instructorRating: 4,
    numOfStudentsEnrolled: 45,
    cost: "30$",
  },
  {
    key: 3,
    title: "Yoga3",
    description: "Yoga lorem ipsium the random text",
    level: 1,
    maxCap: 20,
    numOfSessions: 4,
    instructor: nabeel,
    instructorRating: 4.5,
    numOfStudentsEnrolled: 13,
    cost: "70$",
  },
  {
    key: 4,
    title: "Yoga4",
    description: "Yoga lorem ipsium the random text",
    level: 1,
    maxCap: 20,
    numOfSessions: 4,
    instructor: utkarsh,
    instructorRating: 4.5,
    numOfStudentsEnrolled: 13,
    cost: "40$",
  },
  {
    key: 5,
    title: "Yoga5",
    description: "Yoga lorem ipsium the random text",
    level: 1,
    maxCap: 20,
    numOfSessions: 4,
    instructor: aryan,
    instructorRating: 4.5,
    numOfStudentsEnrolled: 13,
    cost: "90$",
  },
  {
    key: 6,
    title: "Yoga6",
    description: "Yoga lorem ipsium the random text",
    level: 1,
    maxCap: 20,
    numOfSessions: 4,
    instructor: utkarsh,
    instructorRating: 4.5,
    numOfStudentsEnrolled: 13,
    cost: "150$",
  },
  {
    key: 7,
    title: "Yoga7",
    description: "Yoga lorem ipsium the random text",
    level: 3,
    maxCap: 10,
    numOfSessions: 5,
    instructor: nabeel,
    instructorRating: 3.5,
    numOfStudentsEnrolled: 10,
    cost: "250$",
  },
];

const AllCourses: React.FC<PropsType> = ({navigation}) => {
    return (
      <SafeAreaView style={styles.container}> 
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <BackgroundImageDup> 
            <View style={styles.gridView}>
            {DATA.map((item) => {
          return (
          <CourseCardView course={item} />);
            })}
            </View>
          </BackgroundImageDup>
        </ScrollView>
      </SafeAreaView>
      );
    };
    
export default AllCourses;
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: themeColor.background,
    
  },
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
});