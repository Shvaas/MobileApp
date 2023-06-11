/* eslint-disable prettier/prettier */
import { Image, Text, ImageSourcePropType, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';


  // local
  import {themeFontFamily, themefonts, themeColor} from '../constants/theme';
  
  interface PropsType {
    title : string,
    monthlyPrice: string,
    specialText: string,
    bottomText: string,
    onPress: any,
  }
 
  const SubcriptionPlan: React.FC<PropsType> = ({onPress, title, monthlyPrice, specialText, bottomText}) => {
    return (
     
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title}> {title}</Text>
            <Text style={styles.price}> $ {monthlyPrice} / Mo</Text>
            <TouchableOpacity style={styles.specialText}>
            <Text>{specialText}</Text> 
            </TouchableOpacity>
            <Text style={styles.bottomText}>{bottomText}</Text>
        </TouchableOpacity>

      );
  };

  export default SubcriptionPlan;

  const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: themeColor.vividRed,
        width: 165,
        height: 165,
        borderRadius: 5
    }, 

    title: {
        fontSize: themefonts.font18,
        fontFamily: themeFontFamily.raleway,
        color: '#2D2D2D',
        margin: 5
      },

    price: {
        fontSize: themefonts.font24,
        fontFamily: themeFontFamily.ralewayBold,
        color: '#2D2D2D',
        margin: 5
      },

    specialText: {
        fontSize: themefonts.font16,
        fontFamily: themeFontFamily.ralewayBold,
        color: '#474747',
        borderRadius: 5,
        padding: 10, 
        margin: 5,
        backgroundColor: '#F2D1DF',
      },

      bottomText: {
        fontSize: themefonts.font14,
        fontFamily: themeFontFamily.ralewayLight,
        color: '#2D2D2D',
        margin: 5
      },
  });