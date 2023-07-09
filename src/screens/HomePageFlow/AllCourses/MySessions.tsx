/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import ToggleButton from '../../../components/ToggleButton';

import {useDispatch, useSelector} from 'react-redux';

import {getSessions} from '../../../store/userSessionSlice';
import {themeColor} from '../../../constants/theme';
import {backgroundImageLight, backgroundImageMedium, backButton, utkarsh} from '../../../images/imageLinks'

interface PropsType {
  navigation: any;
}

const MySessions: React.FC<PropsType> = ({navigation}) => {

  const sessions = useSelector(getSessions);
  const upcommingSessions = sessions[0];
  const completedSessions = sessions[1];

  console.log(upcommingSessions);
  console.log(completedSessions);
  const [index, setIndex] = useState(1); 
  const onOptionPress = (x: number) => {
    if(x!=index){
      setIndex(x);
    }
  }  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={backgroundImageLight} style={styles.image}>
        <ToggleButton
          navigation = {navigation}
          disabled={false}
          activeOption={index} 
          onOptionPress={onOptionPress} 
          dataCurrent={upcommingSessions} 
          dataPast={completedSessions}
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
    