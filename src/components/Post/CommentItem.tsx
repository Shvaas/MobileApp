import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ImageSourcePropType } from 'react-native';
import {themeFontFamily, themefonts,themeColor} from '../../constants/theme';
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
  }

    let d = Date(comment.createdDate);
    console.log(comment.createdDate);
    
    let currDate = Date.now();
    console.log(d);
    //console.log(currDate);

  function getPresentableDate(){
    let d = Date(comment.createdDate);
    let currDate = Date.now();
    console.log(d.getMonth());
    console.log(currDate);
    
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <View style={styles.left}>
          <ProfilePicture uri={shikha} size={30} borderWidth={2}/>
        </View>
        <View style={styles.right}>
          <View style={styles.top}>
            <Text style={styles.name}>{comment.userName}</Text>
            <View>
              <Text style={styles.date}>{comment.createdDate}</Text>
            </View>
          </View>
          <View style={{marginRight: 5, flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.comment}>{comment.text}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomcontainer}>
      <TouchableWithoutFeedback onPress={onLikePressed}>
            {isLiked ? (
              <ADIcon name="heart" size={20} color={'#e73838'} />
            ) : (
              <ADIcon name="hearto" size={20} color={'#545454'} />
            )}
      </TouchableWithoutFeedback>
      <Text style={styles.likes}>{comment.reactions.size} Likes</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
      margin: 3,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      shadowColor:"black",
      shadowOpacity: 0.1,
      shadowRadius:4,
      shadowOffset: {
      width: -2,
      height: 2,
      },
      backgroundColor: 'white',
      opacity: 0.88,
      borderRadius: 10,
      flexDirection: "column",
    },


  topcontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 3,
  },
  left: {
    flexDirection: 'row',
    flex: 1,
  },
  right: {
    flex: 5,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex:1,
  },
  date: {
    marginRight: 5,
    fontFamily: themeFontFamily.raleway,
  },
  comment: {
    flexDirection: 'column',
    alignSelf: 'baseline',
    fontFamily: themeFontFamily.raleway,
  },
  name: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#3c3c3c',
    fontFamily: themeFontFamily.ralewayBold,
  },
  bottomcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
    marginBottom:5,
  },
  likes: {
    margin: 5,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: themeFontFamily.ralewayThin,
    color: '#3c3c3c',
  },

});
