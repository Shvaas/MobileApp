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

  interface PropsType {
    course : object
  }
  
  const TeacherAttendanceCardView: React.FC<PropsType> = ({student}) => {
    const [marked, setMarked] = useState(student.marked);

    return (
        <GestureHandlerRootView>
        <View style={styles.container}>
            <View style={styles.internalContainer}>
                <View style={{flexDirection:'row',width:'60%'}}>
                    <Image source={student.photo} style={styles.imageStyle}></Image>
                    <Text style={styles.standardText}>{student.name}</Text>
              </View>
              {marked ? <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center', width:'40%'}}>
                <Text style={[styles.standardText]}> Attended </Text>
                <IoniconsIcon name="checkmark-outline" size={25} color={"#25D366"}/>
              </View>:
              <View style={{flexDirection:'column',alignItems:'center', justifyContent:'center', width:'40%'}}> 
              <Text style={[styles.standardText, {marginBottom:5}]}> Attended ? </Text>
              <View style={{flexDirection:'row', marginTop:5}}>
                  <TouchableOpacity style={{marginHorizontal:10,}} onPress={()=>{setMarked(true)}}>
                      {/* click color e73838 */}
                      <IoniconsIcon name="checkmark-outline" size={25} color={"#545454"}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginHorizontal:10,}} onPress={()=>{setMarked(true)}}>
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