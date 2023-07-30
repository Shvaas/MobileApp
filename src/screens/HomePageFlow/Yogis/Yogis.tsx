/* eslint-disable prettier/prettier */
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { useState} from "react";

import BackgroundImageDup from '../../../common/BackgroundImageFullPage';
import {
  themeFontFamily,
  themefonts,
  themeColor,
} from '../../../constants/theme';
import ProfileCardView from './components/ProfileCardView';
import {aryan, nabeel, shikha, utkarsh, yoga_instructor1, yoga_instructor2, backgroundImageLight} from '../../../images/imageLinks';
import RouteNames from '../../../constants/routeName';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {useGetTeachersQuery} from '../../../store/apiSlice';

import {useDispatch, useSelector} from 'react-redux';
import {yogiSlice, YogiSelector} from '../../../store/yogiSlice';
import {userFirstNameSelector, userLastNameSelector} from '../../../store/userSlice';
import UserAvatar from 'react-native-user-avatar';
interface PropsType {
  navigation: any;
}





const Yogis: React.FC<PropsType> = ({navigation}) => {

  const {data, error,isLoading} = useGetTeachersQuery();
  // const [bookSession, { data, error, isLoading }] = useBookSessionMutation();
  const dispatch = useDispatch();


  let yogi = useSelector(YogiSelector);
  console.log("yogi", yogi);

  const username = useSelector(userFirstNameSelector) + " " + useSelector(userLastNameSelector);


  React.useEffect(() => {
    console.log("error", error, data);

    if (data && !error){
      dispatch(yogiSlice.actions.initialYogi(data?.data?.userList));
    }
  }, [data, dispatch]);

  if (isLoading && yogi.length==0) {
    return <ActivityIndicator style={{alignSelf:'center', marginTop:150}}/>
  }


  // dispatch(yogiSlice.actions.initialYogi(data?.data));

  // const onBookSession = async () => {
  //   let session = {userId: '313cbfd3-4fc1-4763-9d18-caedd0be4a63',
  //               courseId: '0f94e351-fd3a-4a71-84c4-123399f50bb4'};

  // const result = await bookSession(session);
  // console.log('put result', result.data);
  // };

  // onBookSession()

  // console.log(data.data);
  // console.log(data.data.userList[0].slots);
  

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImageLight} style={styles.image}>
        <View contentContainerStyle={styles.contentContainer}>
        <View style={[styles.header, {flexDirection:"row",justifyContent:"space-between",padding:10, backgroundColor: themeColor.white}]}>
          <TouchableOpacity onPress={() => navigation.navigate(RouteNames.HomePageFlow.UserProfile)}>
            {/* <Image source={utkarsh} style={styles.imageStyle} /> */}
            <UserAvatar size={45} name={username}  style={{alignSelf: 'center', resizeMode: 'cover'}}/>
          </TouchableOpacity>
          <Text style={{color:themeColor.vividRed,fontSize: themefonts.font22,
            fontFamily:themeFontFamily.ralewayBold, alignSelf:"center"}}>
            YOGIT</Text>
          <View style={{flexDirection:"row"}}>
            <IoniconsIcon name="notifications" color={"#939393"} size={30} style={{alignSelf:"center", marginRight:5}}/>
          </View>
          </View>
          <FlatList
            style={{height:'90%'}}
            data={yogi}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(RouteNames.HomePageFlow.YogiProfile, {
                      yogiProfile: item,
                    })
                  }>
                  <ProfileCardView profile={item} onButtonPress={() =>
                    navigation.navigate(RouteNames.HomePageFlow.CalendarPage, item)
                  } />
                </TouchableOpacity>
              );
            }}
          />
        </View>
        </ImageBackground>
    </SafeAreaView>
  );
};

export default Yogis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.background,
  },
  header:{
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: {
      width: -2,
      height: 2,
    },
  },
  heading: {
    fontSize: themefonts.font32,
    textAlign: 'center',
    fontFamily: themeFontFamily.raleway,
    color: themeColor.white,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
  },
  buttonStyle: {
    width: 167,
  },
  btnContainerStyle: {
    alignSelf: 'center',
  },
  gridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contentContainer: {
    paddingVertical: 5,
    contentOffset: {x: 0, y: 0},
  },
  imageStyle: {
    borderColor: themeColor.vividRed,
    borderWidth: 1,
    borderRadius: 50,
    height: 50,
    width: 50,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  image: {
    height: "100%",
    width:"100%",
    flex: 1,
  },
});
