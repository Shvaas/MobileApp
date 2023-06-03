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

  interface PropsType {
    caption: any;
    comments: any;
    navigation: any;
  }

  const Comments: React.FC<PropsType> = ({route, navigation}) => {

    const { caption, comments } = route.params;
    const [commentValue, setcommentValue] = useState('');

    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.cross}>
            <IoniconsIcon name="close" onPress={() => navigation.goBack()} size={25} color={"#000"}/>
          </View>

          <Text>{caption}</Text>
          <View style={styles.line}></View>
          <FlatList style={styles.inputbox}
            data={comments}
            renderItem={({item, index}) => <CommentItem comment={item} />}
            keyExtractor={item => item.username}/>
          <View style={styles.inputbox}>
            <CommentsBox commentValue={commentValue} handleCommentValue={setcommentValue}/>
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
    inputbox:{
        margin:5,
        borderColor:'black',
        borderWidth:1,
    }
  });
  