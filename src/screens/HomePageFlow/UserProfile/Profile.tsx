/* eslint-disable prettier/prettier */
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Linking,
    ImageBackground,
    Image,
    useWindowDimensions,
    Share,
  } from 'react-native';
 import React, { Component } from 'react';
 import { useEffect, useState, useCallback } from 'react';

 import ProgressBar from 'react-native-progress/Bar';

 import CheckBox from '@react-native-community/checkbox';
 import RouteNames from '../../../constants/routeName';
 
 import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';

 import {inviteIcon, utkarsh, backgroundImageMedium, backButton, settingsButton, line} from '../../../images/imageLinks';
 
 import LoginButton from '../../common/buttons/LoginButton';
 import PrimaryButton from '../../../common/buttons/PrimaryButton';

 import SubcriptionPlan from '../../components/SubcriptionPlan';
 import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
 import {GestureHandlerRootView} from 'react-native-gesture-handler';
 import SettingItem from './SettingItem';
 
 interface PropsType {
   navigation: any;
 }
 
 const Profile = ({navigation}) => {

  const settings = [{title:'Profile Questions', description: 'Your health profile'},
                    {title:'Invite Friends', description: 'Invite your friends to a zenful session'},
                    {title:'Help', description: 'Understand Shvaas better'},
                    {title:'Logout', description: 'Sign out'},]

 
  const [currentIndex, setCurrentIndex] = useState(0);
  const {width} = useWindowDimensions();

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#666666",
          opacity: 0.1,
        }}
      />
    );
  }

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


   return (
     <SafeAreaView style={styles.safeArea}>
         <ImageBackground source={backgroundImageMedium} style={styles.image}>
         
         <View style={styles.topContainer}>
            <GestureHandlerRootView style={styles.topContainerItem}>
                  <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Image source={backButton} style={styles.backbutton}/>
                  </TouchableOpacity>
                  <TouchableOpacity >
                        <Image source={settingsButton} style={[styles.backbutton, {opacity:0}]}/>
                  </TouchableOpacity>
            </GestureHandlerRootView>
          </View>

          <View style={styles.secondContainer}>
                <Image source={utkarsh} style={styles.imageStyle}/>
          </View>
          <Text style={styles.usernameText}> Utkarsh Nath </Text>
          <View style={styles.thirdContainer}>
                <Text style={styles.standardText}> Level : </Text>
                <Text style={[styles.standardText, {color: themeColor.vividRed}]}> Beginner </Text>
          </View>
          <View style={styles.progressContainer}>
            <ProgressBar progress={0.3} width={width-40} height={10}
            borderRadius={6}
            color={themeColor.vividRed}
            unfilledColor={themeColor.white} />
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                <Text style={[styles.standardText]}>10/100 sessions</Text>
                <Text style={[styles.standardText]}>Next Level: Intermidiate</Text>
            </View>
          </View>

          <GestureHandlerRootView style={{marginTop:10, marginHorizontal:20}}>
          <FlatList
            data={settings}
            ItemSeparatorComponent={FlatListItemSeparator}
            renderItem={({item}) => <SettingItem item={item} navigation={navigation}/>}
            keyExtractor={(item) => item.title}
          /> 
          </GestureHandlerRootView>

          <View style={{flex:0.5, justifyContent:'flex-end'}}>

          {/* <GestureHandlerRootView style={styles.shareContainer}>
            <TouchableOpacity style={{flexDirection: 'row', height:'100%'}} onPress={onShare}>
                <View style={{ flex:0.2, justifyContent:'center', alignItems: 'center',}}>
                <Image source={inviteIcon} style={styles.backbutton}/>
                </View>
                <View style={{flex:0.8, justifyContent:'center'}}>
                    <Text style={styles.inviteHeadingText}>Invite Friends</Text>
                    <Text style={styles.inviteText}>Invite your friends to a zenful session</Text>
                </View>
            </TouchableOpacity>
          </GestureHandlerRootView> */}

          <GestureHandlerRootView style={styles.premiumContainer}>
            <TouchableOpacity>
                <View style={{height:'100%', alignItems: 'center', justifyContent:'center'}}>
                    <Text style={[styles.inviteHeadingText, {color:themeColor.white}]}>Get Shvaas Premium</Text>
                    <Text style={[styles.inviteText, {color:themeColor.white}]}>10 % off on all subsciptions</Text>
                </View>
            </TouchableOpacity>
          </GestureHandlerRootView>

          </View>
        

         </ImageBackground>
         </SafeAreaView>
      
   );
 };
 
 export default Profile;
 
 const styles = StyleSheet.create({
   safeArea: {
     flex: 1,
     backgroundColor: themeColor.white,
   },

  topContainer: {
    flexDirection: 'row',
    alignItems:'center',
    flex: 0.1,
  },

  topContainerItem: {
    flexDirection:'row', 
    justifyContent:'space-between',
    width:'100%',
    height:'100%',
  },

  secondContainer: {
    justifyContent:'center',
    alignItems: 'center',
    margin: 10,
    flex: 0.3,
  },

  imageStyle: {
    borderColor: themeColor.vividRed,
    borderWidth: 2,
    borderRadius: 150,
    height: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    resizeMode: 'cover',
  },

  usernameText: {
    alignSelf: 'center',
    fontSize: themefonts.font18,
    fontFamily: themeFontFamily.ralewaySemiBold,
    color: '#313131',
  },

  thirdContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
  },

  progressContainer: {
    marginHorizontal:20,
    justifyContent:'center',
    flex: 0.1,
  },

  standardText: {
    alignSelf: 'center',
    fontSize: themefonts.font12,
    fontFamily: themeFontFamily.raleway,
    color: '#000',
  },

  shareContainer:{
      height: 70,
      borderRadius: 6,
      marginHorizontal:20,
      marginVertical:10,
      justifyContent:'center',
      backgroundColor: '#FFDEC8'
  },

  inviteHeadingText:{
    fontSize: themefonts.font14,
    fontFamily: themeFontFamily.ralewaySemiBold,
    color: '#000',
  },

  inviteText:{
    marginTop: 3,
    fontSize: themefonts.font12,
    fontFamily: themeFontFamily.raleway,
    color: '#000',
  },

  premiumContainer:{
    height: 60,
    borderRadius: 6,
    marginHorizontal:20,
    marginVertical:10,
    justifyContent:'center',
    marginBottom:20,
    backgroundColor: themeColor.vividRed,
  },





  middleContainer: {
    flex: 0.8,
  }, 

  middleContainerItem: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 10,
  }, 

  paginatorContainer: {
    justifyContent:'center',
    alignItems: 'center',
    flex: 0.1,
  },

   image: {
     height: "100%",
     width:"100%",
     flex: 1,
   },

   heading: {
    fontSize: themefonts.font22,
    fontFamily: themeFontFamily.raleway,
    color: '#222222'
  },

  infoContainer: {
    height: 50,
    width: 250,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.3,
  },

  buttonStyle: {
    width: 150,
    marginHorizontal: 10,
    backgroundColor: themeColor.white,
    borderColor: themeColor.vividRed,
    borderWidth: 1,
  },

   backbutton: {
    margin: 10,
  },
 
 
 });
