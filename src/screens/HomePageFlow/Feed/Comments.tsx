/* eslint-disable prettier/prettier */
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    Text,
    Button,
    FlatList,
  } from 'react-native';
  import React, {useState} from 'react';

  import IoniconsIcon from 'react-native-vector-icons/Ionicons';

  import CommentItem from '../../../components/Post/CommentItem';
  import CommentsBox from '../../../components/Post/CommentBox';

  import {
    themeFontFamily,
    themefonts,
    themeColor,
  } from '../../../constants/theme';

  import {postSlice, getAllComments} from '../../../store/postSlice';
  import {useDispatch, useSelector} from 'react-redux';
 
  interface PropsType {
    caption: any;
    navigation: any;
  }

  const Comments: React.FC<PropsType> = ({route, navigation}) => {

    const dispatch = useDispatch();

    const { caption, postId } = route.params;
    const [commentValue, setcommentValue] = useState('');

    const comments = useSelector((state) => getAllComments(state, postId));
    console.log("comments", comments);
    

    const onCommentPost = async () => {
      dispatch(
        postSlice.actions.addComment({
          comment: commentValue,
          postId: postId,
        }),
      );
      setcommentValue('');
      // const result = await updateReaction(like);
      // console.log('put result', result.data);
    };

    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.cross}>
            <IoniconsIcon name="close" onPress={() => navigation.goBack()} size={25} color={"#000"}/>
          </View>

          <Text style={styles.caption}>{caption}</Text>
          <View style={styles.line}></View>
          <FlatList style={styles.commentbox}
            data={comments}
            renderItem={({item, index}) => <CommentItem comment={item} />}
            keyExtractor={item => item.username}/>
          <View style={styles.inputbox}>
            <CommentsBox commentValue={commentValue} handleCommentValue={setcommentValue} submitCommentLine={onCommentPost}/>
          </View>

      </SafeAreaView>
    );
  };
  
  export default Comments;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColor.background,
    },
    caption: {
      flexDirection:"row",
      justifyContent:'flex-end',
      margin:5,
    },

    cross: {
        flexDirection:"row",
        justifyContent:'flex-end',
        margin:5,
      },

    line: {
        flexDirection:"row",
        justifyContent:'flex-end',
        margin:5,
        borderColor:'black',
        borderWidth:0.5,
      },

    commentbox:{
        margin:5,
    },

    inputbox:{
        margin:5,
    }
  });
  