import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import ADIcon from 'react-native-vector-icons/AntDesign';
import ProfilePicture from '../ProfilePicture';
import {aryan,nabeel,shikha,utkarsh} from '../../images/imageLinks';

interface PropsType {
  comment: any;
}

const CommentItem: React.FC<PropsType> = ({comment}) => {

  const [isLiked, setIsLike] = useState(false);

  function onLikePressed() {
    if (!isLiked) {
      setIsLike(true);
    }else{
      setIsLike(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <ProfilePicture uri={shikha} size={30} borderWidth={2}/>
        <Text style={styles.name}>{comment.username}</Text>
        <Text>Date</Text>
      </View>

      <View style={styles.right}>
        <Text>{comment.text}</Text>
      </View>
      <View>
      <TouchableWithoutFeedback onPress={onLikePressed}>
            {isLiked ? (
              <ADIcon name="heart" size={25} color={'#e73838'} />
            ) : (
              <ADIcon name="hearto" size={25} color={'#545454'} />
            )}
      </TouchableWithoutFeedback>
      <Text>56 Likes</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 3,
  },
  left: {
    flexDirection: 'row',
  },
  right: {
    marginRight: 15,
    marginLeft: 5,
  },
  name: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#3c3c3c',
  },
});
