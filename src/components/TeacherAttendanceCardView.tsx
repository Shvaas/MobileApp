/* eslint-disable prettier/prettier */
import {
    Image,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React, {useState} from 'react';

  // local
  import {themeFontFamily, themefonts, themeColor} from '../constants/theme';
  import IoniconsIcon from 'react-native-vector-icons/Ionicons';
  import { TouchableOpacity } from 'react-native-gesture-handler';
  import {GestureHandlerRootView} from 'react-native-gesture-handler';
  import {utkarsh} from '../images/imageLinks';

  import {sessionSlice} from '../store/sessionSlice';
  import {useDispatch, useSelector} from 'react-redux';
  interface PropsType {
    student : any,
    sessionId: any,
  }
  
  const TeacherAttendanceCardView: React.FC<PropsType> = ({student, sessionId}) => {
    console.log("TeacherAttendanceCardView", student);


    const [marked, setMarked] = useState(student.attendance!=null);
    const [attendance, setAttendance] = useState(student.attendance);

    const dispatch = useDispatch();

    const mark = async (attendance) => {
      setMarked(true);
      setAttendance(attendance);
      dispatch(
        sessionSlice.actions.markAttendence({
          sessionId: sessionId,
          studentId: student.studentId,
          attendance: attendance,
        }),
      );

      // const result = await updateReaction(like);
      // console.log('put result', result.data);
    };

    return (
        <GestureHandlerRootView>
        <View style={styles.container}>
            <View style={styles.internalContainer}>
                <View style={{flexDirection:'row',width:'60%'}}>
                    <Image source={utkarsh} style={styles.imageStyle}></Image>
                    <Text style={styles.standardText}>{student.studentName}</Text>
              </View>
              {marked ? <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center', width:'40%'}}>
                <Text style={[styles.standardText]}> Attended </Text>
                {attendance ? <IoniconsIcon name="checkmark-outline" size={25} color={"#25D366"}/> 
                : <IoniconsIcon name="close-outline" size={25} color={'red'}/>}
              </View>:
              <View style={{flexDirection:'column',alignItems:'center', justifyContent:'center', width:'40%'}}> 
              <Text style={[styles.standardText, {marginBottom:5}]}> Attended ? </Text>
              <View style={{flexDirection:'row', marginTop:5}}>
                  <TouchableOpacity style={{marginHorizontal:10,}} onPress={()=>{mark(true)}}>
                      {/* click color e73838 */}
                      <IoniconsIcon name="checkmark-outline" size={25} color={"#545454"}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginHorizontal:10,}} onPress={()=>{mark(false)}}>
                      <IoniconsIcon name="close-outline" size={25} color={"#545454"}/>
                  </TouchableOpacity>
              </View>
            </View>
              }
            </View>
        </View>
        </GestureHandlerRootView>
      );
  };

  export default TeacherAttendanceCardView;

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
        flexDirection: 'row',
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
        alignSelf: 'center'
      },

    textStyleTime: {
      fontFamily: themeFontFamily.raleway,
      lineHeight: 15,
      fontSize: themefonts.font14,
      padding: 10,
      alignSelf:'flex-end',
    },
  });