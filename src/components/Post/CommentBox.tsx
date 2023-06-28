/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, TextInput } from 'react-native';
import {Button} from 'react-native-elements';
import ADIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {themeFontFamily, themefonts,themeColor} from '../../constants/theme';
// import { Button } from 'react-native-elements';


interface PropsType {
    commentValue: string,
    handleCommentValue: () => void,
    enterCommentLine: () => void,
    submitCommentLine: () => void,
}

const CommentsBox: React.FC<PropsType> = ({commentValue, handleCommentValue, submitCommentLine}) => {

    const enableCommentButton = () => {
        return (commentValue ? false : true);
    }

    const changeCommentButtonStyle = () => {
         return (commentValue ? "comments-button-enabled" : 
         "comments-button-disabled");
    }

    return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <TextInput 
                    placeholder=" Add a comment..." 
                    value={commentValue} 
                    onChangeText={handleCommentValue}
                    multiline/>
                </View>
                <View style={styles.rightContainer}>
                    <Button titleStyle={styles.button} onPress={submitCommentLine} type="submit" title='Post'   
                        className="comments-button" id={changeCommentButtonStyle()}
                        disabled={enableCommentButton()}/>
                </View>
            </View>
    )
}

export default CommentsBox;

const styles = StyleSheet.create({
    container: {
      flexDirection:"row",
      margin:5,
      backgroundColor: '#ebe8e9',
      borderRadius: 10,
    },
    leftContainer: {
        flex:5,
        paddingLeft: 5,
        justifyContent: 'center',
      },
    rightContainer: {
        flex:1,
        flexDirection:"row",
        justifyContent:'flex-end',
        margin:5,
      },
      button: {
        color: themeColor.vividRed,
      },
  });