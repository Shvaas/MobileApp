import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
import React from 'react';

import BackgroundImage from '../../../common/BackgroundImage';
import BackgroundImageDup from '../../../common/BackgroundImageFullPage';
import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';
import ProfileCardView from '../../../components/ProfileCardView';
import {aryan,nabeel,shikha,utkarsh} from '../../../images/imageLinks';
import Yogi from './Yogi';

interface PropsType {
    navigation: any;
}

const DATA = [
  {
    key: 1,
    name: "Shikha Asrani",
    image: shikha,
    yearsOfExp: 2,
    rating: 4.5,
    certificates: "xyz, abc, 123",
    studentsTrained: 98,
    description: "Yoga lorem ipsium the random text",
    ActiveCourses: 2
  },
  {
    key: 2,
    name: "Utkarsh Nath",
    image: utkarsh,
    yearsOfExp: 4,
    rating: 4.5,
    certificates: "xyz, 123",
    studentsTrained: 106,
    description: "Meditation",
    ActiveCourses: 3
  },
  {
    key: 3,
    name: "Aryan Mittal",
    image: aryan,
    yearsOfExp: 1,
    rating: 4.5,
    certificates: "xyz, 123",
    studentsTrained: 106,
    description: "Yoga",
    ActiveCourses: 3
  },
  {
    key: 4,
    name: "Shikha Asrani",
    image: shikha,
    yearsOfExp: 2,
    rating: 4.5,
    certificates: "xyz, abc, 123",
    studentsTrained: 98,
    description: "Yoga",
    ActiveCourses: 2
  },
  {
    key: 5,
    name: "Nabeel Bhattacharya",
    image: nabeel,
    yearsOfExp: 1,
    rating: 4.5,
    certificates: "xyz, 123",
    studentsTrained: 106,
    description: "Meditation",
    ActiveCourses: 3
  },
  {
    key: 6,
    name: "Aryan Mittal",
    image: aryan,
    yearsOfExp: 1,
    rating: 4.5,
    certificates: "xyz, 123",
    studentsTrained: 106,
    description: "Yoga",
    ActiveCourses: 3
  },
  {
    key: 7,
    name: "Utkarsh Nath",
    image: utkarsh,
    yearsOfExp: 4,
    rating: 4.5,
    certificates: "xyz, 123",
    studentsTrained: 106,
    description: "Meditation",
    ActiveCourses: 3
  },
  {
    key: 8,
    name: "Nabeel Bhattacharya",
    image: nabeel,
    yearsOfExp: 1,
    rating: 4.5,
    certificates: "xyz, 123",
    studentsTrained: 106,
    description: "Meditation",
    ActiveCourses: 3
  },
  {
    key: 9,
    name: "Utkarsh Nath",
    image: utkarsh,
    yearsOfExp: 4,
    rating: 4.5,
    certificates: "xyz, 123",
    studentsTrained: 106,
    description: "Meditation",
    ActiveCourses: 3
  },
  {
    key: 10,
    name: "Aryan Mittal",
    image: aryan,
    yearsOfExp: 1,
    rating: 4.5,
    certificates: "xyz, 123",
    studentsTrained: 106,
    description: "Yoga",
    ActiveCourses: 3
  },
  {
    key: 11,
    name: "Utkarsh Nath",
    image: utkarsh,
    yearsOfExp: 4,
    rating: 4.5,
    certificates: "xyz, 123",
    studentsTrained: 106,
    description: "Meditation",
    ActiveCourses: 3
  },
  {
    key: 12,
    name: "Aryan Mittal",
    image: aryan,
    yearsOfExp: 1,
    rating: 4.5,
    certificates: "xyz, 123",
    studentsTrained: 106,
    description: "Yoga",
    ActiveCourses: 3
  },
  {
    key: 13,
    name: "Utkarsh Nath",
    image: utkarsh,
    yearsOfExp: 4,
    rating: 4.5,
    certificates: "xyz, 123",
    studentsTrained: 106,
    description: "Meditation",
    ActiveCourses: 3
  },
  {
    key: 14,
    name: "Nabeel Bhattacharya",
    image: nabeel,
    yearsOfExp: 1,
    rating: 4.5,
    certificates: "xyz, 123",
    studentsTrained: 106,
    description: "Meditation",
    ActiveCourses: 3
  },
];

const Yogis: React.FC<PropsType> = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
         
          <ScrollView contentContainerStyle={styles.contentContainer}>
          {/*<View style={styles.topContainer}>*/}
          <BackgroundImageDup> 
          
          <View style={styles.gridView}>
          {DATA.map((item) => {
        return (
            <ProfileCardView profile={item} navigation={navigation}/>
        );
          })}
          </View>
          </BackgroundImageDup>
          {/*</View>*/}
          </ScrollView>
          
          
          
          
        </SafeAreaView>
      );
    };
    
    export default Yogis;
    
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