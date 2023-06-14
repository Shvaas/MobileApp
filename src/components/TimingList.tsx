import React, { useState } from 'react';
import { FlatList,TouchableHighlight,StyleSheet,Text,View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { themeColor } from '../constants/theme';

interface PropsType {
    timings: any,
    selectedTime: object,
    setSelectedTime: (index: object)=>void
  }

  
const TimeList: React.FC<PropsType> = ({timings,selectedTime, setSelectedTime}) => {
  console.log("timings",timings);
  console.log("selected session",selectedTime);
    // const [selectedTime,setSelectedTime] = useState({id:0});
    return (
      <View style={{alignItems:'center'}} >
         <Picker
        style = {{width: 250}}
        onValueChange={(itemValue, itemIndex) => setSelectedTime(itemValue)}
        >
          { timings[0]=='No slots' ? (<Picker.Item label={'No slots'} value={'No slots'} key={'No slots'}/> ):
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
    separator: {
        height:1,
        backgroundColor:'#f0f5f5',
      },
      container: {
        marginBottom:20
      },
      cellContainer:{
        flex:1,
        backgroundColor:'#e7e7e7',
        height:50,
        width:50,
        borderRadius:25,
        margin:5,
        marginTop:10,
        marginBottom:0
      },
      activeCell : {
        backgroundColor:themeColor.facebookBlue,
      },
      name: {
        color: '#FFFFFD',
        fontSize:14,
        fontWeight:'700',
        textAlign:'center',
        paddingTop:10,
      },
})