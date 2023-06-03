/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, TextInput, Button } from 'react-native';
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

const CommentsBox: React.FC<PropsType> = ({commentValue, handleCommentValue}) => {

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
                    <Button  type="submit"  title='Post'   
                        className="comments-button"id={changeCommentButtonStyle()}
                        disabled={enableCommentButton()}/>
                </View>
            </View>
            
            

            // <Button>
            //     Post
            // </Button>
            
        
    )
}

export default CommentsBox;

const styles = StyleSheet.create({
    container: {
      flexDirection:"row",
      margin:5,
    },
    leftContainer: {
        flex:4,
        borderColor:'red',
        borderWidth:1,
      },
    rightContainer: {
        flex:1,
        flexDirection:"row",
        justifyContent:'flex-end',
        margin:5,
        borderColor:'black',
        borderWidth:1,
      },
  });