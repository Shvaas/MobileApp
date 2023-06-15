import React from 'react';
import {StyleSheet,View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { themeColor } from '../constants/theme';

interface PropsType {
    timings: any,
    setSessionBooked: (index: object)=>void
  }

  
const TimeList: React.FC<PropsType> = ({timings, setSessionBooked}) => {
  return (
    <View style={{alignItems:'center'}} >
      <Picker
        style = {styles.pickerStyle}
        onValueChange={(itemValue) => {
          if(itemValue=='No slots'){
            setSessionBooked(null)
          }
          else{
            setSessionBooked(itemValue)
      }}}>
      { timings[0]=='No slots' ? 
        (<Picker.Item label={'No slots'} value={'No slots'} key={'No slots'}/> ):
        (timings.map(item => {
          let myDate = new Date(item.start_date * 1000);
          return <Picker.Item 
            label={myDate.toTimeString()} 
            value={item} 
            key={item}/>}
          ))}
      </Picker>
    </View>
  )
};

export default TimeList;

const styles = StyleSheet.create({
  pickerStyle:{
    width: 250,
  },
})