/* eslint-disable prettier/prettier */
import { Image, Text, ImageSourcePropType, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';


  // local
  import {themeFontFamily, themefonts, themeColor} from '../constants/theme';
import { color } from 'react-native-elements/dist/helpers';
  
  interface PropsType {
    title : string,
    subPrice: string,
    monthlyPrice: string,
    specialText: string,
    bottomText: string,
    selected: boolean,
    onPress: any,
  }
 
  const SubcriptionPlan: React.FC<PropsType> = ({onPress, title, subPrice, monthlyPrice, specialText, bottomText, selected}) => {

    if (selected){
      return (
        <TouchableOpacity style={styles.selectedContainer} onPress={onPress}>
            <Text style={styles.selectedTitle}> {title}</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.price, {color:'#FFFFFF'}]}>$</Text>
              <Text style={[styles.subprice, {textDecorationLine: 'line-through', color:'#FFFFFF'}]}> {subPrice}</Text>
              <Text style={[styles.price, {color:'#FFFFFF'}]}> {monthlyPrice}</Text>
            </View>
            <Text style={{fontSize: themefonts.font12, fontFamily: themeFontFamily.raleway, 
                alignSelf:'center', justifyContent:'flex-end', color:'#FFFFFF'}}>per month</Text>
            <View style={styles.selectedSpecialText}>
            <Text style={{fontSize: themefonts.font12, 
            fontFamily: themeFontFamily.ralewayBold, color: '#FAFDFE',}}>{specialText}</Text>
            </View>
            <Text style={[styles.bottomText, {color:'#FEFEFE'}]}>{bottomText}</Text>
            <Text style={[styles.bottomText, {color:'#FEFEFE'}]}>Cancel Anytime</Text>
        </TouchableOpacity>
      )
    } else {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title}> {title}</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.price}>$</Text>
              <Text style={[styles.subprice, {textDecorationLine: 'line-through'}]}> {subPrice}</Text>
              <Text style={styles.price}> {monthlyPrice}</Text>
            </View>
            <Text style={{fontSize: themefonts.font12, fontFamily: themeFontFamily.raleway, 
                alignSelf:'center', justifyContent:'flex-end', borderWidth:0}}>per quarter</Text>
            <View style={styles.specialText}>
            <Text style={{fontSize: themefonts.font12, 
            fontFamily: themeFontFamily.raleway, color: '#2D2D2D',}}>{specialText}</Text> 
            </View>
            <Text style={styles.bottomText}>{bottomText}</Text>
            <Text style={styles.bottomText}>Cancel Anytime</Text>
        </TouchableOpacity>
      );
    }
  };

  export default SubcriptionPlan;

  const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: themeColor.vividRed,
        width: 175,
        height: 175,
        borderRadius: 5
    }, 

    selectedContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: themeColor.vividRed,
      backgroundColor: themeColor.vividRed,
      width: 175,
      height: 175,
      borderRadius: 5
  }, 

    title: {
        fontSize: themefonts.font18,
        fontFamily: themeFontFamily.raleway,
        color: '#2D2D2D',
        margin: 3
      },

    selectedTitle: {
        fontSize: themefonts.font18,
        fontFamily: themeFontFamily.raleway,
        color: '#FFFFFF',
        margin: 3
      },

    subprice: {
        fontSize: themefonts.font20,
        fontFamily: themeFontFamily.ralewaySemiBold,
        color: '#2D2D2D',
        marginVertical: 3
      },

    price: {
        fontSize: themefonts.font24,
        fontFamily: themeFontFamily.ralewayBold,
        color: '#2D2D2D',
        marginVertical: 3
      },

    specialText: {
        fontSize: themefonts.font16,
        fontFamily: themeFontFamily.ralewayBold,
        color: '#474747',
        borderRadius: 5,
        padding: 10, 
        margin: 3,
        marginBottom:5,
        backgroundColor: '#F2D1DF',
      },

    selectedSpecialText: {
        fontSize: themefonts.font16,
        fontFamily: themeFontFamily.raleway,
        borderRadius: 5,
        padding: 10, 
        margin: 3,
        backgroundColor: 'rgba(242,209,223, 0.4)',
      },

      bottomText: {
        fontSize: themefonts.font14,
        fontFamily: themeFontFamily.raleway,
        justifyContent:'center',
        color: '#2D2D2D',
        marginVertical: 2,
        marginHorizontal:10,
      },
  });