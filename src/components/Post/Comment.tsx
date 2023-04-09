import React from 'react';
import { View, Text, StyleSheet, ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import ProfilePicture from '../ProfilePicture';

interface PropsType {
  comment: any;
}

const Comment: React.FC<PropsType> = ({comment}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.name}>{comment.username}</Text>
      </View>

      <View style={styles.right}>
        <Text>{comment.text}</Text>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
