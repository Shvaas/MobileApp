import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import ADIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {themeFontFamily, themefonts,themeColor} from '../../constants/theme';

interface PropsType {
    commentValue: string,
    handleCommentValue: () => void,
    enterCommentLine: () => void,
    submitCommentLine: () => void,
}

const CommentsBox: React.FC<PropsType> = ({commentValue, handleCommentValue, enterCommentLine, submitCommentLine}) => {

    const enableCommentButton = () => {
        return (commentValue ? false : true);
    }

    const changeCommentButtonStyle = () => {
         return (commentValue ? "comments-button-enabled" : 
         "comments-button-disabled");
    }

    return (
        <div className="comments-box">
            <input onKeyPress={enterCommentLine} value={commentValue}
            id="comments-input" onChange={handleCommentValue}
            type="text" placeholder="Add a comment..." />
            <button onClick={submitCommentLine} type="submit"     
            className="comments-button"id={changeCommentButtonStyle()}
            disabled={enableCommentButton()}>Post</button>
        </div>
    )
}

export default CommentsBox;