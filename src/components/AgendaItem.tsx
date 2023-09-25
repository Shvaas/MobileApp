/* eslint-disable prettier/prettier */
// import isEmpty from 'lodash/isEmpty';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Alert, View, Text, TouchableOpacity, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {userSessionSlice, userSessionSelector} from '../store/userSessionSlice';
import {utkarsh} from '../images/imageLinks';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  themeFontFamily,
  themefonts,
  themeColor,
} from '../constants/theme';
import RouteNames from '../constants/routeName';

import {useBookSessionMutation} from '../store/apiSlice';
import axios from "axios";
import {baseUrl} from '../constants/urls';
import { extractKeyIfExists } from '@aws-amplify/datastore/lib-esm/util';

interface PropsType {
    item: any,
    navigation: any,
}

const AgendaItem: React.FC<PropsType> = ({item, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const userType = useSelector((state) => state.user.userType);
  const userId = useSelector((state) => state.user.userId);


  const month = ['Jan', 'Feb', 'Mar', 'April', 'May',
                'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  let myDate = new Date(item.start_date);
  console.log("myDate", myDate);
  
  let minutes = '';
  if(myDate.getMinutes() < 10){
    minutes = "0" + myDate.getMinutes();
  }else{
    minutes = myDate.getMinutes().toString();
  }
  let am = " am";
  if(myDate.getHours()> 12){
    am = " pm";
  }
  
  const displayDate = myDate.getDate()
                      + " " 
                      + month[myDate.getMonth()]
                      + ", " 
                      + myDate.getHours()
                      + " : " 
                      + minutes
                      + am;



  const onAppointmentConfirm = async () => {
    // Add user sessions
    if(item == null){
      console.log("Null session");
      return;
    }
    console.log("session being booked", item);

    let session = {userId: userId,
                courseId: item.sessionId};

    console.log("onAppointmentConfirm", userId, item.sessionId);
    setIsLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/course/enroll`, session);
      console.log("response dara", response.data);

      if (response.data.status === 200) {
        dispatch(
          userSessionSlice.actions.addSession({
            'sessionId': item.sessionId,
            'instructorId': item.instructorId,
            'instructorPhoto': utkarsh,
            'title': item.title,
            'description': item.description,
            'zoomlink': '-',
            'start_date': item.start_date,
            'markCompleted':  false,
          }));
          Alert.alert(
            'Session Booked at ' + item.start_date.substring(0,item.start_date.search('T'))
            + ' for ' + item.title,'',
            [
                {
                    text: 'OK',
                    onPress: () => {},
                }
            ]
            )
// 9004 already extract
// 9002 course not found
        setIsLoading(false);
      }
      else if (response.data.status === 9004 || response.data.status === 9002 ) {
        setIsLoading(false);
          Alert.alert('Error', response.data.message,[{text: 'OK',onPress: () => {},}]);
      }
      else {
        setIsLoading(false);
        Alert.alert('Error','Please try again later',[{text: 'OK',onPress: () => {},}]);
        // throw new Error("An error has occurredd");
      }
      
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error','Please try again later',[{text: 'OK',onPress: () => {},}]);
      alert("An error has occurred");
      
    }


  };

  const buttonPressed = useCallback(() => {
    Alert.alert('Show me more');
  }, []);

  const getSession = async () => {
    navigation.navigate(RouteNames.HomePageFlow.TeacherSessions,
      {
        session: item,
      })
  }




  const bookAppointment = async () => {
    // let myDate = new Date(sessionBooked.start_date * 1000);
    Alert.alert('Confirm the appointment at',
    myDate.toISOString().substring(0,myDate.toISOString().search('T')) + ' for ' + item.title,
    [
    {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
    },
    {text: 'OK', onPress: () => {onAppointmentConfirm()}
    }]);
    }


  if (Object.keys(item).length === 0) {
    return (
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text style={styles.textStyle}>No Events Planned Today</Text>
      </View>
    );
  }
// Title, Descripion, duration
  return (
    <TouchableOpacity onPress={userType=='Teacher' ? getSession : bookAppointment} style={styles.container} testID={'item'}>
      <Spinner
          visible={isLoading}
          textContent={'Booking...'}
          textStyle={styles.spinnerTextStyle}
        />
      <View style={{flex:0.6, flexDirection:'column'}}>
        <Text style={[styles.itemTitleText,{marginBottom:5}]}>{item.title}</Text>
        <Text style={[styles.textStyle,{marginTop:5}]}>{item.description}</Text>
      </View>
      <View style={{flexDirection:'column', flex:0.4, justifyContent:'flex-end', alignItems:'flex-end'}}>
        <Text style={[styles.textStyle,{fontFamily: themeFontFamily.ralewaySemiBold}]}> {displayDate} </Text>
        {/* <Text style={styles.textStyle}> 4 Slots left </Text> */}
      </View>
    </TouchableOpacity>

  );
};

export default AgendaItem;


const styles = StyleSheet.create({
  container: {
    margin:10,
    padding:20,
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
    flexDirection:"row",
    justifyContent:'space-between'
  },

  item: {
    marginVertical:10,
    marginHorizontal:20,
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth:0.2,
    borderBottomColor:'#666666',
    flexDirection: 'row',
    opacity:.78
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },

  itemTitleText: {
    fontSize: themefonts.font16,
    fontFamily: themeFontFamily.ralewaySemiBold,
    color: '#FD7C23',
  },

  textStyle: {
    fontFamily: themeFontFamily.raleway,
    fontSize: themefonts.font14,
    color: themeColor.black
  },

  spinnerTextStyle: {
    fontFamily: themeFontFamily.raleway,
    fontSize: themefonts.font14,
    color: themeColor.vividRed,
    opacity: 0.8
  }
  
});