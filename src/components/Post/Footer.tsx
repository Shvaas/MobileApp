/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import ADIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {themeFontFamily, themefonts,themeColor} from '../../constants/theme';
import Comment from './Comment';

import {postSlice} from '../../store/postSlice';
import {useUpdateReactionMutation} from '../../store/apiSlice';

import {useDispatch, useSelector} from 'react-redux';
import CommentsBox from './CommentBox';


interface PropsType {
  likesCount: number;
  caption: string;
  postedAt: string;
  bodytype: number;
  postId: string;
  isLiked: boolean;
  topComment: any;
}

const Footer: React.FC<PropsType> = ({
  likesCount,
  caption,
  postedAt,
  bodytype,
  postId,
  isLiked,
  topComment,
}) => {
  // const [isLiked, setIsLike] = useState(false);
  // const [likesCount, setLikesCount] = useState(0);
  const [commentValue, setcommentValue] = useState('');

  const dispatch = useDispatch();
  const [updateReaction, { data, error, isLoading }] = useUpdateReactionMutation();

  const onLikePressed = async () => {
    let like = {userId: '313cbfd3-4fc1-4763-9d18-caedd0be4a63'};
    if (!isLiked) {
      like['reactionType'] = 'LIKE';
    }
    dispatch(postSlice.actions.setReaction(postId));

    const result = await updateReaction(like);
    console.log('put result', result.data);
  };

  const onCommentPressed = async () => {
    console.log('callind onCommentPressed');
    dispatch(
      postSlice.actions.addComment({
        comment: 'Hey, how are you',
        postId: postId,
      }),
    );
    //const result = await updateReaction(like);
    // console.log('put result', result.data);
  };

  
  function handleCommentValue(e){
    setcommentValue(e.target.value);
    // setcommentValue({
    //   commentValue: e.target.value,
    //  });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        <View style={styles.leftIcons}>
          <TouchableWithoutFeedback onPress={onLikePressed}>
            {isLiked ? (
              <ADIcon name="heart" size={25} color={'#e73838'} />
            ) : (
              <ADIcon name="hearto" size={25} color={'#545454'} />
            )}
          </TouchableWithoutFeedback>
          <FontistoIcon onPress={onCommentPressed} name="comment" size={23} color={"#545454"}/>
          <IoniconsIcon name="paper-plane-outline" size={25} color={"#545454"}/>
        </View>
        <Text style={styles.postedAt}>{postedAt}</Text>
      </View>

      <Text style={styles.likes}>{likesCount} Likes</Text>
      {bodytype!=1 && <Text style={styles.caption}>{caption}</Text>}
      {topComment!=null && <Comment comment={{username: 'Utkarsh', text: 'My first comment'}} />}
      <CommentsBox commentValue={commentValue} handleCommentValue={setcommentValue}/>
      {/* <Comment comment={{name: 'Utkarsh', text: 'My first comment'}} /> */}
    </View>
  )
}

export default Footer;

const styles = StyleSheet.create({
    container: {
      margin: 5,
    },
    iconsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
    },
    leftIcons: {
      flexDirection: 'row',
      width: 120,
      justifyContent: 'space-between',
    },
    likes: {
      fontWeight: 'bold',
      margin: 3,
    },
    caption: {
      margin: 3,
      fontFamily: themeFontFamily.raleway,
    },
    postedAt: {
      color: '#8c8c8c',
      margin: 3,
    }
  });