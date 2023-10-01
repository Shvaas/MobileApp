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
 import {useDispatch, useSelector} from 'react-redux';

 import SubcriptionPlan from '../../components/SubcriptionPlan';
 import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
 import {GestureHandlerRootView} from 'react-native-gesture-handler';
 import SettingItem from './SettingItem';
 import {userFirstNameSelector, userLastNameSelector, userIsSubscribedSelector} from '../../../store/userSlice';
 import {userSessionSelector} from '../../../store/userSessionSlice';
 import UserAvatar from 'react-native-user-avatar';
 
 interface PropsType {
   navigation: any;
 }
 
 const Profile = ({navigation}) => {

  const settings = [{title:'Profile Questions', description: 'Your health profile'},
                    {title:'Invite Friends', description: 'Invite your friends to a zenful session'},
                    {title:'Help', description: 'Understand Yogit better'},
                    {title:'Manage Subscription'},
                    {title:'Logout'},]

  const settingsUnsubscribed = [{title:'Profile Questions', description: 'Your health profile'},
                    {title:'Invite Friends', description: 'Invite your friends to a zenful session'},
                    {title:'Help', description: 'Understand Yogit better'},
                    {title:'Logout'},]

 
  const [currentIndex, setCurrentIndex] = useState(0);
  const {width} = useWindowDimensions();

  const username = useSelector(userFirstNameSelector) + " " + useSelector(userLastNameSelector);
  const sessions = useSelector(userSessionSelector);
  const subscription = useSelector(userIsSubscribedSelector);

  console.log("sessions.length", sessions.length);


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

 
  console.log("isSubscribed", subscription);
  
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
                {/* <Image source={utkarsh} style={styles.imageStyle}/> */}
                <UserAvatar size={100} name={username}  style={styles.imageStyle}/>
          </View>
          <Text style={styles.usernameText}> {username} </Text>
          <View style={styles.thirdContainer}>
                <Text style={styles.standardText}> Level : </Text>
                <Text style={[styles.standardText, {color: themeColor.vividRed}]}> Beginner </Text>
          </View>
          <View style={styles.progressContainer}>
            <ProgressBar progress={sessions.length/100} width={width-40} height={10}
            borderRadius={6}
            color={themeColor.vividRed}
            unfilledColor={themeColor.white} />
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
                <Text style={[styles.standardText]}>{sessions.length}/100 sessions</Text>
                <Text style={[styles.standardText]}>Next Level: Intermidiate</Text>
            </View>
          </View>

          <GestureHandlerRootView style={{marginTop:10, marginHorizontal:20}}>
          <FlatList
            data={subscription? settings: settingsUnsubscribed}
            ItemSeparatorComponent={FlatListItemSeparator}
            renderItem={({item, index}) => <SettingItem item={item} index={index} teacher={false} navigation={navigation} isSubscribed={subscription}/>}
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

          { !subscription && <GestureHandlerRootView style={styles.premiumContainer}>
            <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.OnboardingFlow.FreeTrial)}>
                <View style={{height:'100%', alignItems: 'center', justifyContent:'center'}}>
                    <Text style={[styles.inviteHeadingText, {color:themeColor.white}]}>Get Shvaas Premium</Text>
                    <Text style={[styles.inviteText, {color:themeColor.white}]}>50 % off on all subsciptions</Text>
                </View>
            </TouchableOpacity>
          </GestureHandlerRootView>}

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
