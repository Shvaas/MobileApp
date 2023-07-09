/* eslint-disable prettier/prettier */
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';

  // local
  import {themeFontFamily, themefonts, themeColor} from '../constants/theme';
  import RouteNames from '../constants/routeName';

  interface PropsType {
    item : object, 
    navigation: any,
  }
  
  const SessionCardView: React.FC<PropsType> = ({item, navigation}) => {

    const month = ['Jan', 'Feb', 'Mar', 'April', 'May',
                  'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    let myDate = new Date(item.start_date * 1000);

    const displayDate = myDate.getDate() + " " + month[myDate.getMonth()] + ", " + myDate.getHours() + " : " + myDate.getMinutes();


    return (
        <TouchableOpacity style={styles.container} testID={'item'} onPress={() =>
          navigation.navigate(RouteNames.HomePageFlow.AllCourseDetail,{session: item})}>
          <View style={{flex:0.7, flexDirection:'column'}}>
            <Text style={[styles.itemTitleText,{marginBottom:5}]}>{item.title}</Text>
            <Text style={[styles.textStyle,{marginTop:5}]}>{item.description}</Text>
          </View>
          <View style={{flexDirection:'column', flex:0.4, justifyContent:'flex-end', alignItems:'flex-end'}}>
            <Text style={[styles.textStyle,{fontFamily: themeFontFamily.ralewaySemiBold}]}> {displayDate} </Text>
            {/* <Text style={styles.textStyle}> 4 Slots left </Text> */}
          </View>
        </TouchableOpacity>
      );
  };

  export default SessionCardView;

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