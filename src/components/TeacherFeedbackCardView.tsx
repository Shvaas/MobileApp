/* eslint-disable prettier/prettier */
import {
    Image,
    StyleSheet,
    Text,
    View,
    TextInput,
  } from 'react-native';
  import React, {useState} from 'react';

  // local
  import {themeFontFamily, themefonts, themeColor} from '../constants/theme';
  import IoniconsIcon from 'react-native-vector-icons/Ionicons';
  import { TouchableOpacity } from 'react-native-gesture-handler';
  import {GestureHandlerRootView} from 'react-native-gesture-handler';
  import { Button, Rating } from 'react-native-elements';
  import ProfilePicture from './ProfilePicture';

  interface PropsType {
    course : object
  }
  
  const TeacherFeedbackCardView: React.FC<PropsType> = ({student}) => {
    const [marked, setMarked] = useState(student.marked);
    const [commentValue, setcommentValue] = useState('');
    const [commentPosted, setcommentPosted] = useState(false);
    const [buttonTitle, setbuttonTitle] = useState('Post');
    

    const enableCommentButton = () => {
        return (commentValue ? false : true);
    }

    const changeCommentButtonStyle = () => {
         return (commentValue ? "comments-button-enabled" : 
         "comments-button-disabled");
    }

    const onPostButton = () => {
        if (!commentPosted){
            setbuttonTitle('Edit');
        }else{
            setbuttonTitle('Post');
        }
        setcommentPosted(!commentPosted);
        return (commentValue ? false : true);
    }


    return (
        <GestureHandlerRootView>
        <View style={styles.container}>
            <View style={styles.internalContainer}>
                <View style={{flexDirection:'row',width:'100%', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', resizeMode: 'cover', marginHorizontal:10}}>
                        <ProfilePicture uri={student.photo} size={50} borderWidth={2}/>
                        <Text style={styles.standardText}>{student.name}</Text>
                    </View>

                    {student.studentFeedback && <View style={{alignItems:'center', justifyContent:'center',  borderWidth:1, marginHorizontal:10}}>
                        <Rating
                        type='custom'
                        readonly
                        ratingColor={'#FD7C23'}
                        imageSize={18}
                        startingValue={4}
                        />
                    </View>}
              </View>
              {student.studentFeedback && <Text style={styles.descriptionText}>Session Description Session Description Session Description Session 
            Description Session DescriptionSession Description Session Description Session Description 
            Session Description Session Description Session Description Sessi</Text>}
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
        </View>
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