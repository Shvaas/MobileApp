/* eslint-disable prettier/prettier */
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';

import {themeFontFamily, themefonts, themeColor} from '../constants/theme';
import {utkarsh} from '../images/imageLinks';
import ProfilePicture from '../components/ProfilePicture';
import PrimaryButton from '../common/buttons/PrimaryButton';
import SimpleButton from '../common/buttons/SimpleButton';
import {userSessionSlice} from '../store/userSessionSlice';
import {useDispatch, useSelector} from 'react-redux';

import {getSessions} from '../../../store/userSessionSlice';
  
interface PropsType {
  course : object
}


const UpcomingSessionCardView: React.FC<PropsType> = ({item}) => {
  const dispatch = useDispatch();

  const month = ['Jan', 'Feb', 'Mar', 'April', 'May',
                  'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  let myDate = new Date(item.start_date);

    let minutes = '';
    if(myDate.getMinutes() < 10){
      minutes = "0" + myDate.getMinutes();
    }else{
      minutes = myDate.getMinutes().toString();
    }
    let am = " am";
    if(myDate.getHours()> 12){
      am = " pm";
    }

  const displayDate = myDate.getDate()
                      + " " 
                      + month[myDate.getMonth()]
                      + ", " 
                      + myDate.getHours()
                      + " : " 
                      + minutes
                      + am;

  const onCancel = async () => {
    dispatch(
      userSessionSlice.actions.cancelSession({
        'sessionId' : item.sessionId,
      }),
    );
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row'}}>
        <View style={{flex:0.27, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <ProfilePicture uri={utkarsh} size={70} borderWidth={2}/>
        </View>
        <View style={{flex:0.73, flexDirection:'column', marginLeft:10}}>
          <Text style={[styles.itemTitleText,{marginBottom:5}]}>{item.title}</Text>
          <Text style={[styles.textStyle,{marginTop:5, fontFamily: themeFontFamily.ralewaySemiBold}]}>{displayDate}</Text>
          <Text style={[styles.textStyle,{marginTop:5}]}>{item.description}</Text>
        </View>
      </View>
      <View style={styles.internalContainer2}>
        <SimpleButton
        title='Start'
        containerStyle={styles.primaryButton}
        />
        <SimpleButton
        title='Cancel'
        containerStyle={styles.primaryButton}
        onPress={onCancel}/>
      </View>
    </View>

  );
};

  export default UpcomingSessionCardView;
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
      color: themeColor.black,
      textAlign:'justify'
    },

    internalContainer2: {
      width:'100%',
      flexDirection: 'row',
      justifyContent:'space-around',
      alignSelf:'center',
      marginTop: 10,
    },

    primaryButton: {marginHorizontal: 16,width: 150,alignSelf:'center'},

    buttonStyle: {
      width: 100,
    },
    btnContainerStyle: {
      alignSelf: 'center',
    },
  });

  const styles1 = StyleSheet.create({
    container: {
      margin: "2.5%",
      height: 170,
      width: "95%",
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
      flexDirection:"column",
      justifyContent:'space-around'
      
    },
    internalContainer: {
      width:'100%',
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    internalContainer2: {
      width:'100%',
        flexDirection: 'row',
        justifyContent:'space-around',
        alignSelf:'center'
    },
    imageStyle: {
        borderColor: themeColor.vividRed,
        borderWidth: 2,
        borderRadius: 50,
        height: 70,
        width: 70,
        margin: 10,
        resizeMode: 'contain',
    },
    textStyle: {
      fontFamily: themeFontFamily.raleway,
      // flex: 1,
      // flexWrap: 'wrap',
      lineHeight: 15,
      fontSize: themefonts.font14,
      margin: 1,
    },
    ratingStyle: {
      fontFamily: themeFontFamily.ralewayExtraBold,
      bottom:10,
      right:10,
      fontSize: themefonts.font18,
      color: themeColor.vividRed,
      shadowOffset: {
        width: -4,
        height: 4,
        },
      position:'absolute'
    },
    textStyleBold: {
      fontFamily: themeFontFamily.ralewayBold,
      // flex: 1,
      // flexWrap: 'wrap',
      lineHeight: 15,
      fontSize: themefonts.font14,
      margin: 1
    },
    textDescription: {
      fontFamily: themeFontFamily.raleway,
      // flexWrap: 'wrap',
      textAlign: 'center',
      lineHeight: 15,
      fontSize: themefonts.font14,
    },
    textContainerStyle: {
      flex: 1,
      flexWrap: 'wrap',
      left: 20,
      top: 10
    },
    textStyleName: {
      fontFamily: themeFontFamily.raleway,
      lineHeight: 15,
      fontSize: themefonts.font14,
      margin: 2,
      // alignSelf:'center',
    },
    textStyleTime: {
      fontFamily: themeFontFamily.raleway,
      lineHeight: 15,
      fontSize: themefonts.font14,
      // margin: 2,
      alignSelf:'flex-end'
      // right:0,
      // alignSelf:'center',
    },
    buttonStyle: {
      width: 167,
    },
    btnContainerStyle: {
      alignSelf: 'center',
    },
  });