import React, { useState } from 'react';
import { FlatList,TouchableHighlight,StyleSheet,Text,View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { themeColor } from '../constants/theme';

interface PropsType {
    timings: any,
    selectedTime:number,
    setSelectedTime: (index: number)=>void
  }

const TimeList: React.FC<PropsType> = ({timings,selectedTime, setSelectedTime}) => {

    // const [selectedTime,setSelectedTime] = useState({id:0});
    return (
        <View style={{alignItems:'center'}} >
        {/* <View style={styles.separator}/>
        <FlatList
        data = {timings}
        renderItem = {({item}) =>
        {
            return(
                <View style={[styles.cellContainer, selectedTime.id == item.id ? styles.activeCell : {}]}>
                    <TouchableHighlight onPress={()=>setSelectedTime(item)} underlayColor='transparent'>
                        <Text style={styles.name}>
                            {item.time_en}
                        </Text>
                    </TouchableHighlight>
                </View>
            )
        }}
        /> */}
         <Picker
        style = {{width: 150}}
        onValueChange={(itemValue, itemIndex) => setSelectedTime(itemIndex)}
      >
        {/* <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" /> */}
         {timings.map((time,index)=>{return <Picker.Item label={time} value={time} key={index}/>})}
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