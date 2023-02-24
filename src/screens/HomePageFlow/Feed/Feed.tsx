import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
  } from 'react-native';
import React, { Component } from 'react';
import axios from "axios";
import { useState } from "react";

import BackgroundImage from '../../../common/BackgroundImage';
import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';

import ProfilePicture from '../../../components/ProfilePicture';
import Post from '../../../components/Post';
import {aryan,nabeel,shikha,utkarsh} from '../../../images/imageLinks';

interface PropsType {
    navigation: any;
}

const post = [{
      user : {
        name : 'Utkarsh',
        image : utkarsh
      },
      image: utkarsh,
      likes: 20,
      caption: 'random text',
      createdAt: '20/03/21'
},
{
  user : {
    name : 'Utkarsh',
    image : utkarsh
  },
  image: utkarsh,
  likes: 20,
  caption: 'random text',
  createdAt: '20/03/21'
}
]

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
         
          {/* <ProfilePicture uri={shikha} /> */}
          {/* <Post post={post}/> */}
          <FlatList
            data={post}
            renderItem={({item}) => <Post post={item} />}
            keyExtractor={({id}) => id}
          />
          {/* <Button title="Get Advice" 
                onPress={getRequest} color="green" /> */}
          
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