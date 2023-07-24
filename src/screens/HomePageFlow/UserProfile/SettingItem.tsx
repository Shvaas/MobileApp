/* eslint-disable prettier/prettier */
import {
    Image,
    StyleSheet,
    Text,
    View,
    Share,
  } from 'react-native';
  import React, {useState} from 'react';

  // local
  import {themeFontFamily, themefonts, themeColor} from '../../../constants/theme';
  import {next} from '../../../images/imageLinks';
  import IoniconsIcon from 'react-native-vector-icons/Ionicons';
  import { TouchableOpacity } from 'react-native-gesture-handler';
  import {GestureHandlerRootView} from 'react-native-gesture-handler';
  import RouteNames from '../../../constants/routeName';

  interface PropsType {
    item : any,
    navigation : any,
    index: any,
  }
  
  const SettingItem: React.FC<PropsType> = ({item, index, navigation}) => {

    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            'React Native | A framework for building native apps using React',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error: any) {
        Alert.alert(error.message);
      }
    };

    function onPressed(){      
      if(index==0){
        navigation.navigate(RouteNames.HomePageFlow.UserDetails);
      }
      if(index==1){
        onShare();
      }
      
    };

    return (
        <TouchableOpacity onPress={onPressed}
        style={{flexDirection:'row', alignItems:'center', marginVertical:10, height:40}}>
            <View style={{flex:0.8}}>
                <Text style={styles.standardText}>{item.title}</Text>
                <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
            <View style={{flex:0.2, alignItems:'flex-end'}}>
                <Image source={next} style={styles.backbutton}/>
            </View>
        </TouchableOpacity>
      );
  };

  export default SettingItem;

  const styles = StyleSheet.create({
    container: {
      margin:10,
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
    internalContainer: {
      width:'100%',
        flexDirection: 'row',
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

    textStyleName: {
      fontFamily: themeFontFamily.raleway,
      fontSize: themefonts.font14,
      color: '#000',
      margin: 2,
    },

    standardText: {
        fontSize: themefonts.font14,
        fontFamily: themeFontFamily.raleway,
        color: '#000',
        alignSelf: 'flex-start',
      },

    descriptionText: {
        fontSize: themefonts.font12,
        fontFamily: themeFontFamily.raleway,
        color: '#666666',
        alignSelf: 'flex-start',
    },

    backbutton: {
        margin: 10,
    },

  });