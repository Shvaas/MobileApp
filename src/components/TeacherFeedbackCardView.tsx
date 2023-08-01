/* eslint-disable prettier/prettier */
import {
    Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
  } from 'react-native';
  import React, {useState} from 'react';

  // local
  import {themeFontFamily, themefonts, themeColor} from '../constants/theme';
  import IoniconsIcon from 'react-native-vector-icons/Ionicons';
  import { TouchableOpacity } from 'react-native-gesture-handler';
  import {GestureHandlerRootView} from 'react-native-gesture-handler';
  import { Button, Rating } from 'react-native-elements';
  import ProfilePicture from './ProfilePicture';
  import {utkarsh} from '../images/imageLinks';
  import UserAvatar from 'react-native-user-avatar';

  import {sessionSlice} from '../store/sessionSlice';
  import {useDispatch, useSelector} from 'react-redux';

  interface PropsType {
    student : any,
    sessionId: any
  }

  const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
  
  const TeacherFeedbackCardView: React.FC<PropsType> = ({student, sessionId}) => {

    const feedbackForTeacher = 'Great Session!';
    const ratingForTeacher = 5;

    const [marked, setMarked] = useState(student.marked);
    const [commentValue, setcommentValue] = useState(student.feedbackForStudent);
    // const [commentPosted, setcommentPosted] = useState(false);
    // const [buttonTitle, setbuttonTitle] = useState('Post');

    const [commentPosted, setcommentPosted] = useState(student.feedbackForStudent?.length > 0);
    const [buttonTitle, setbuttonTitle] = useState(student.feedbackForStudent?.length > 0 ? 'Edit' : 'Post');

    const dispatch = useDispatch();

    const enableCommentButton = () => {
        return (commentValue ? false : true);
    }

    const changeCommentButtonStyle = () => {
         return (commentValue ? "comments-button-enabled" : 
         "comments-button-disabled");
    }

    // const onPostButton = () => {
    //     if (!commentPosted){
    //         setbuttonTitle('Edit');
    //     }else{
    //         setbuttonTitle('Post');
    //     }
    //     setcommentPosted(!commentPosted);
    //     return (commentValue ? false : true);
    // }



    const onPostButton = async () => {
      if (!commentPosted){
          setbuttonTitle('Edit');
      }else{
          setbuttonTitle('Post');
      }
      setcommentPosted(!commentPosted);
      dispatch(
        sessionSlice.actions.addFeedbackForStudent({
          sessionId: sessionId,
          studentId: student.studentId,
          feedback: commentValue,
        }),
      );

      // const result = await updateReaction(like);
      // console.log('put result', result.data);
    };

    student.abs = 5;
    console.log("student.feedbackForTeacher", student);
    

    return (
        <GestureHandlerRootView>
        <HideKeyboard>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.internalContainer}>
                <View style={{flexDirection:'row',width:'100%', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', resizeMode: 'cover', marginHorizontal:10}}>
                        {/* <ProfilePicture uri={utkarsh} size={50} borderWidth={2}/> */}
                        <UserAvatar size={45} name={student.studentName}  
                        style={{alignSelf: 'center', resizeMode: 'cover', margin: 7}}/>
                        <Text style={styles.standardText}>{student.studentName}</Text>
                    </View>

                    {feedbackForTeacher?.length > 0 && <View style={{alignItems:'center', justifyContent:'center', marginHorizontal:10}}>
                        <Rating
                        type='custom'
                        readonly
                        ratingColor={'#FD7C23'}
                        imageSize={18}
                        startingValue={ratingForTeacher}
                        />
                    </View>}
              </View>
              {feedbackForTeacher?.length > 0 && <Text style={styles.descriptionText}>{feedbackForTeacher}</Text>}
            <View style={styles.feedbackContainer}>
                <View style={styles.leftContainer}>
                    {commentPosted? <Text style={styles.descriptionText}> {commentValue} </Text> :
                    <TextInput 
                    placeholder=" Write an encouraging feedback..." 
                    value={commentValue}
                    onChangeText={setcommentValue}
                    multiline/>}
                </View>
                <View style={styles.rightContainer}>
                    <Button titleStyle={styles.button} onPress={onPostButton} type="submit" title={buttonTitle}  
                        className="comments-button" id={changeCommentButtonStyle()}
                        disabled={enableCommentButton()}/>
                </View>
            </View>
            </View>
        </KeyboardAvoidingView>
        </HideKeyboard>
        </GestureHandlerRootView>
      );
  };

  export default TeacherFeedbackCardView;

  const styles = StyleSheet.create({
    container: {
      margin:10,
      shadowColor:"black",
      shadowOpacity: 0.25,
      shadowRadius:4,
      shadowOffset: {
      width: -4,
      height: 4,
      },
      backgroundColor: 'white',
      opacity: 0.78,
      borderRadius:10,
      flexDirection:"row",
      justifyContent:'space-between' 
    },
    internalContainer: {
      width:'100%',
    },
    imageStyle: {
        borderColor: themeColor.vividRed,
        borderWidth: 2,
        borderRadius: 50,
        height: 70,
        width: 70,
        margin: 10,
        resizeMode: 'contain',
    },

    textStyleName: {
      fontFamily: themeFontFamily.raleway,
      lineHeight: 15,
      fontSize: themefonts.font14,
      margin: 2,
      alignSelf:'flex-start',
    },

    standardText: {
        fontSize: themefonts.font18,
        fontFamily: themeFontFamily.raleway,
        color: '#000',
        alignSelf: 'center',
      },

    descriptionText: {
        margin:10,
        fontSize: themefonts.font14,
        fontFamily: themeFontFamily.raleway,
        color: '#000',
    },


    feedbackContainer: {
        flexDirection:"row",
        margin:10,
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