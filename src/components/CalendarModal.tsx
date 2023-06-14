import React from 'react';
import { Dimensions, Modal, StyleSheet,View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

interface PropsType {
    onDateChange: (date: Date) => void,
    sessionDateStrings: any,
  }

const CalendarModal: React.FC<PropsType> = ({onDateChange,sessionDateStrings}) => {
  console.log("sessionDateStrings cal modal", sessionDateStrings);
  let dates = {};
  sessionDateStrings.forEach((val) => {
  dates[val] = {selected:true,selectedColor:'lightblue',customTextStyle:{fontWeight:"bold"}};});

  return (
      <View>
          <Calendar style={styles.calendar}
          onDayPress={date => {
            console.log('selected day', new Date(date.dateString));
            onDateChange(new Date(date.dateString));
          }}
          markedDates={dates}
          onPress={(date)=>{console.log(new Date(date.dateString))}}
          />
      </View>
    )
};

export default CalendarModal;

const styles = StyleSheet.create({
  calendar: {
    paddingTop: 20,
    margin:40,
    elevation:15,
    borderRadius:10,
  },
  });