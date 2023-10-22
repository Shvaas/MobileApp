/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import ToggleButton from '../../../components/ToggleButton';

import {userSessionSlice, getSessions} from '../../../store/userSessionSlice';
import {themeColor} from '../../../constants/theme';
import {baseUrl} from '../../../constants/urls';
import {backgroundImageLight, backgroundImageMedium, backButton, utkarsh} from '../../../images/imageLinks'

import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import Auth from '@aws-amplify/auth';
interface PropsType {
  navigation: any;
}

const MySessions: React.FC<PropsType> = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);

  const dispatch = useDispatch();
  let sessions = useSelector(getSessions);
  const userId = useSelector((state) => state.user.userId);


  React.useEffect(() => {
    const abortController = new AbortController();
      const url = `${baseUrl}/course/student/${userId}`;
      console.log(url);
      
      const fetchUserSessions = async () => {
        console.log("fetchUserSessions");
        try {
          setIsLoading(true);
          const response = await axios.get(url, {
            signal: abortController.signal,
            timeout: 10000,
            headers: {
              Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
            }
          });
          console.log(" fetchUserSessions response", response.data);
          console.log(" fetchUserSessions response", response.data.data);
          if (response.status === 200) {
            dispatch(userSessionSlice.actions.initiateSessions(response.data?.data?.courses));
            setIsLoading(false);
            return;
          } else {
            setErrorFlag(true);
            throw new Error("Failed to fetch users");
          }
        } catch (error) {
          if (abortController.signal.aborted) {
            console.log("Data fetching cancelled");
          } else {
            console.log("error", error);

            setErrorFlag(true);
            setIsLoading(false);
          }
        }
      };
      fetchUserSessions();
  }, []);

  


  const [index, setIndex] = useState(1); 
  const onOptionPress = (x: number) => {
    if(x!=index){
      setIndex(x);
    }
  }  

  if (sessions[0].length === 0 && sessions[1].length === 0 && isLoading) {
    return <ActivityIndicator style={{alignSelf:'center', marginTop:150}}/>
  }

  if (sessions[0].length === 0 && sessions[1].length === 0 && hasError){
    return (
      <ImageBackground source={backgroundImageLight} style={{height:'100%', width:'100%'}}>
      <View style={{alignItems:'center', justifyContent:'center', height:'100%', width:'100%'}}>
        <Text style={{fontSize: themefonts.font16, fontFamily: themeFontFamily.raleway, margin:20}}> 
        Something went wrong, Please try again later after sometime. </Text>
      </View>
     </ImageBackground>
    )
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={backgroundImageLight} style={styles.image}>
        <ToggleButton
          navigation = {navigation}
          disabled={false}
          activeOption={index} 
          onOptionPress={onOptionPress} 
          dataCurrent={sessions[0]} 
          dataPast={sessions[1]}
          />
      </ImageBackground>
    </SafeAreaView>
      );
    };

export default MySessions;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: themeColor.white,
  },

  image: {
    height: "100%",
    width:"100%",
    flex: 1,
  },
  
});
    