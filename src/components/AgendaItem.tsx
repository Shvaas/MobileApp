/* eslint-disable prettier/prettier */
// import isEmpty from 'lodash/isEmpty';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Alert, View, Text, TouchableOpacity, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {userSessionSlice} from '../store/userSessionSlice';
import {utkarsh} from '../images/imageLinks'
import {
  themeFontFamily,
  themefonts,
  themeColor,
} from '../constants/theme';
interface PropsType {
    item: any
}

const AgendaItem: React.FC<PropsType> = ({item}) => {
const dispatch = useDispatch();
  console.log("AgendaItem",item);
  let myDate = new Date(item.start_date * 1000);

  const onAppointmentConfirm = async () => {
    // Add user sessions
    if(item == null){
      console.log("Null session");
      return;
    }
    console.log("session being booked",item);

    console.log("onAppointmentConfirm1");
    dispatch(
      userSessionSlice.actions.addSession({
        'sessionId': item.sessionId,
        'instructorId': item.instructorId,
        'instructorPhoto': utkarsh,
        'title': 'Yoga with Utkarsh',
        'description': item.description,
        'zoomlink': '-',
        'date': item.start_date,
      }),
    );

    // navigation.goBack();
  };

  const buttonPressed = useCallback(() => {
    Alert.alert('Show me more');
  }, []);

  const itemPressed = async () => {
    // let myDate = new Date(sessionBooked.start_date * 1000);
    Alert.alert('Confirm the appointment at', myDate.toISOString().substring(0,myDate.toISOString().search('T')) + ' for '+item.description,
    [
    {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
    },
    {text: 'OK', onPress: () => {
        console.log('OK Pressed');
        Alert.alert(
            'Appointment Booked at '+ myDate.toISOString().substring(0,myDate.toISOString().search('T'))+' for '+item.description,'',
            [
                {
                    text: 'OK',
                    onPress: () => {onAppointmentConfirm()},
                }
            ]
            )
        }
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
    <TouchableOpacity onPress={itemPressed} style={styles.container} testID={'item'}>
      <View style={{flex:0.7, flexDirection:'column'}}>
        <Text style={[styles.itemTitleText,{marginBottom:5}]}>Title</Text>
        <Text style={[styles.textStyle,{marginTop:5}]}>One line description or tags </Text>
      </View>
      <View style={{flexDirection:'column', flex:0.3, justifyContent:'flex-end', alignItems:'flex-end'}}>
        <Text style={[styles.textStyle,{fontFamily: themeFontFamily.ralewaySemiBold}]}> 10 - 11 AM </Text>
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
  
});