import React, {FC, ReactElement} from 'react';
import {StyleSheet, TouchableOpacity, Text, Image} from 'react-native';

// Local
import {ButtonProps} from './types';
import {themeColor} from '../../constants/theme';


const LoginButton: FC<ButtonProps> = (props): ReactElement => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <Image source={props.icon} style={styles.buttonstyle}/>
        <Text style={props.titleStyle}> {props.title} </Text>
    </TouchableOpacity>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
 container:{
     alignSelf:'center',
     flexDirection:'row',
     width:286,
     height: 42,
     backgroundColor: themeColor.white,
     borderColor:themeColor.black,
     borderRadius: 6,
     shadowColor:themeColor.black,
     shadowRadius:100,
     justifyContent: 'center',
     alignItems:'center',
     marginTop:10,
 },
 

buttonstyle:{
        marginHorizontal:10
},
 
border: {
    borderRadius: 6,
  },
});
