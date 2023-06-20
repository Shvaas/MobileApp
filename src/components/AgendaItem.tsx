// import isEmpty from 'lodash/isEmpty';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Alert, View, Text, TouchableOpacity, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {userSessionSlice} from '../store/userSessionSlice';
import {utkarsh} from '../images/imageLinks'

interface PropsType {
    item: any
}

const AgendaItem: React.FC<PropsType> = ({item}) => {
const dispatch = useDispatch();
  console.log("item",item);
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
      console.log("here")
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item} testID={'item'}>
      <View>
        <Text style={styles.itemHourText}>{item.hour}</Text>
        <Text style={styles.itemDurationText}>{item.durationMinutes}</Text>
      </View>
      <Text style={styles.itemTitleText}>{item.description}</Text>
      <View style={styles.itemButtonContainer}>
        <Button color={'grey'} title={'Info'} onPress={buttonPressed}/>
      </View>
    </TouchableOpacity>
  );
};

export default AgendaItem;


const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row'
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
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14
  }
});