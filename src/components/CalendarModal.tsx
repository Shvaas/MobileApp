import React from 'react';
import { Dimensions, Modal, StyleSheet,View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

interface PropsType {
    onDateChange: (date: Date) => void,
  }

const CalendarModal: React.FC<PropsType> = ({onDateChange}) => {
  var appointmentDates = ['2023-04-15','2023-04-17','2023-04-25'];
  
  let dates = {};
  appointmentDates.forEach((val) => {
  dates[val] = {marked:true,selected:true,selectedColor:'transparent',selectedTextColor:"red",customTextStyle:{fontWeight:"bold"}};});

  return (
      <View>
          <Calendar style={styles.calendar}
          onDayPress={date => {
            console.log('selected day', date);
            onDateChange(new Date(date.dateString));
          }}
          markedDates={dates}
          onPress={(date)=>{console.log(date)}}
          />
      </View>
    )
};

export default CalendarModal;

const styles = StyleSheet.create({
  calendar: {
    margin:40,
    elevation:15,
    borderRadius:10,
  },
  });