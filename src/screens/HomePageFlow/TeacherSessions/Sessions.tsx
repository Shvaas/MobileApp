/* eslint-disable prettier/prettier */
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
  } from 'react-native';
  import React, {useState} from 'react';

import BackgroundImage from '../../../common/BackgroundImage';
import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';
import { Button, Rating } from 'react-native-elements';
import { ImageBackground } from 'react-native';
import {backgroundImageLight, backgroundImageMedium, backButton, utkarsh} from '../../../images/imageLinks'
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PrimaryButton from '../../../common/buttons/PrimaryButton';
import ProfilePicture from '../../../components/ProfilePicture';
import TeacherAttendanceCardView from '../../../components/TeacherAttendanceCardView';
import TeacherFeedbackCardView from '../../../components/TeacherFeedbackCardView';

interface PropsType {
    navigation: any,
    route: any;
}

const Sessions: React.FC<PropsType> = ({route, navigation}) => {
    const { courseDetail } = route.params;
    const [commentValue, setcommentValue] = useState('');
    const [markCompleted, setMarkCompleted] = useState(false);

    const students = [{name:'utkarsh', photo:utkarsh, marked:true, studentFeedback: false},
                {name:'shikha', photo:utkarsh, marked:false , studentFeedback: true},
                {name:'aryan', photo:utkarsh, marked:false , studentFeedback: true},]

    console.log(courseDetail);
    
    return (
      <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={backgroundImageMedium} style={styles.image}>
      <GestureHandlerRootView>
        <ScrollView>
        <View style={styles.topContainer}>
            <View style={{flex:0.2, alignItems:'flex-start', flexDirection:'row'}}>
                  <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={backButton} style={styles.backbutton}/>
                  </TouchableOpacity>
            </View>
            <View style={styles.topContainerRight}>
                <ProfilePicture uri={utkarsh} size={70} borderWidth={2}/>
                <Text style={styles.usernameText}> Yoga with Utkarsh </Text>
            </View>
            <View style={{flex:0.2}}></View>
        </View>
        <View style={styles.secondContainer}>
            <Text style={styles.standardText}> Date </Text>
            <Text style={styles.standardText}> Number of students enrolled</Text>
            <Text style={styles.standardText}> Description </Text>
            <Text style={styles.standardText}> Zoom Link </Text>
        </View>
        {markCompleted ? <FlatList
            data={students}
            renderItem={({item, index}) => <TeacherFeedbackCardView student={item}/>}
            keyExtractor={(item) => item.name}
          /> 
          : 
          <View>
          <FlatList
          data={students}
          renderItem={({item, index}) => <TeacherAttendanceCardView student={item}/>}
          keyExtractor={(item) => item.name}/>
          <PrimaryButton
                title={"Mark Completed"}
                buttonStyle={styles.buttonStyle}
                titleStyle={{color: themeColor.vividRed}}
                onPress={setMarkCompleted}
              />
          <PrimaryButton
                title={"Cancel Session"}
                buttonStyle={styles.buttonStyle}
                titleStyle={{color: themeColor.vividRed}}
              />
          </View>
          }
        {/* <FlatList
            data={students}
            renderItem={({item, index}) => <TeacherFeedbackCardView student={item}/>}
            keyExtractor={(item) => item.name}
          /> */}
        

          

      </ScrollView>
      </GestureHandlerRootView>
      </ImageBackground>
      </SafeAreaView>
      );
    };
    
export default Sessions;
    
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: themeColor.white,
  },

  topContainer: {
    flexDirection: 'row',
    resizeMode: 'cover',
  },

  topContainerRight:{
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center'
  },

  secondContainer: {
    margin: 10,
  },

  standardText: {
    fontSize: themefonts.font14,
    fontFamily: themeFontFamily.raleway,
    color: '#000',
  },

  usernameText: {
    alignSelf: 'center',
    fontSize: themefonts.font16,
    fontFamily: themeFontFamily.ralewaySemiBold,
    color: '#313131',
  },






  

  imageStyle: {
    borderColor: themeColor.vividRed,
    borderWidth: 2,
    borderRadius: 70,
    height: 70,
    aspectRatio: 1,
  },

  

  descriptionContainer: {
    minHeight:150,
    padding:10,
    marginVertical:10,
    marginHorizontal:20,
    shadowColor:"black",
    shadowOpacity: 0.25,
    shadowRadius:4,
    shadowOffset: {
    width: -4,
    height: 4,
    },
    backgroundColor: 'white',
      opacity: 0.78,
      borderRadius:10,
  },


  

  image: {
    height: "100%",
    width:"100%",
    flex: 1,
  },

  ratings: {
    alignSelf: 'flex-start',
    marginBottom: 4,
    backgroundColor: 'transparent'
  },

  feedbackContainer: {
    margin: 10,
    height: 100,
  },

  backbutton: {
    margin: 10,
    alignSelf:'flex-end',
  },

  buttonStyle: {
    marginTop: 10,
    alignSelf:'center',
    width: 150,
    marginHorizontal: 10,
    backgroundColor: themeColor.white,
    borderColor: themeColor.vividRed,
    borderWidth: 1,
  },
  
});