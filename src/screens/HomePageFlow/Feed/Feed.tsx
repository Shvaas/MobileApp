import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Button,
  } from 'react-native';
import React from 'react';
import axios from "axios";
import { useState } from "react";

import BackgroundImage from '../../../common/BackgroundImage';
import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';

interface PropsType {
    navigation: any;
}

const Feed: React.FC<PropsType> = ({navigation}) => {


  const getRequest = () => {
    axios.get("https://6sm5d5xzu8.execute-api.us-west-2.amazonaws.com/stage/course")
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
};

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.topContainer}>
          <BackgroundImage>
          
          <Button title="Get Advice" 
                onPress={getRequest} color="green" />
          </BackgroundImage>
          </View>
        </SafeAreaView>
      );
    };
    
export default Feed;
    
const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: themeColor.background,
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
});