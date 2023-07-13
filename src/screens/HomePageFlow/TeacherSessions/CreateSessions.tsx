/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CheckBox from "react-native-bouncy-checkbox";

import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';
import {backgroundImageLight, backgroundImageMedium, backButton, line} from '../../../images/imageLinks'
// import RNCalendarEvents from 'react-native-calendar-events';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SimpleButton from '../../../common/buttons/SimpleButton';

import {sessionSlice} from '../../../store/sessionSlice';
import {useDispatch, useSelector} from 'react-redux';

import {useCreateSessionMutation} from '../../../store/apiSlice';
interface PropsType {
  navigation: any,
  route: any;
}

  const CreateSessions: React.FC<PropsType> = ({route, navigation}) => {
  const [createSession, { data, error, isLoading }] = useCreateSessionMutation();
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDescription, setSessionDescription] = useState('');
  const [nSeat, setnSeat] = useState(0);

  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [dateValue, setdateValue] = React.useState('');

  const [enddate, setEndDate] = useState(new Date());
  const [endDateOpen, setEndDateOpen] = React.useState(false);
  const [endDateValue, setEndDateValue] = React.useState('');

  const [dropopen, setDropOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([
    {label: 'Never', value: 0},
    {label: 'Every Day', value: 1},
    {label: 'Every Week', value: 2},
    {label: 'Every 2 Week', value: 3}
  ]);

  const addSession = async () => {
    console.log('addSession', sessionTitle);
    
    if (sessionTitle.trim() === '') {
      Alert.alert('Error', 'Please enter a valid Title');
    }
    else if(sessionDescription.trim() === '') {
      Alert.alert('Error', 'Please enter a valid Description');
    }
    else if(nSeat <= 0) {
      Alert.alert('Error', 'Please enter a valid number of seats');
    }
    else if(date.getTime() <= (new Date()).getTime()) {      
      Alert.alert('Error', 'Please enter a valid future date');
    }
    else if(value>0 && enddate.getTime() <= (new Date()).getTime()) {
      Alert.alert('Error', 'Please enter a valid end date');
    }
    else{
        const session = {
          title: sessionTitle,
          description: sessionDescription,
          keys2: false,
          total_slots: nSeat,
          start_date: date.getTime()/1000,
          instructorId: 5,
          markCompleted: false,
          available_slots: nSeat,
          zoomlink: '',
          studentList: [],
          durationMinutes: 45,
          session_type: 1,
          };

        const serverSession = {
          userId: userId,
          courseName: sessionTitle,
          sessionDate: 1689383758,
          description: sessionDescription,
          capacity: nSeat,
          recommendedEquipments: '',
          difficultyLevel: '',
          reactionType: '',
          sessionStartTime: 1689383758,
          sessionEndTime: 1689383758,
        }

        const result = await createSession(serverSession);
        console.log(" result ",result);
        

        console.log("Create Session --> Note: Do this after succesfull session creation at server");
        
        dispatch(
            sessionSlice.actions.addSession({
              'session' : session,
            }),
          );
        
          Alert.alert('Success', 'New Session Created');
          navigation.goBack();
    }
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={backgroundImageMedium} style={styles.image}>
      <View style={styles.topContainer}>
        <GestureHandlerRootView>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image source={backButton} style={styles.backbutton}/>
          </TouchableOpacity>
        </GestureHandlerRootView> 
        <View style={styles.headingContainer}>
            <Text style={styles.heading}>Create Session</Text>
        </View>
        <Image source={backButton} style={[styles.backbutton,{'opacity':0}]}/>
      </View>


      <View style={[styles.feedbackContainer1, {marginTop:50}]}>
        <View style={styles.leftContainer}>
            <TextInput
            placeholder="Title"
            placeholderTextColor={'#666'}
            value={sessionTitle}
            onChangeText={setSessionTitle}
            style={[styles.descriptionText,{width:'100%', height:40, color:themeColor.black}]}/>
            <Image source={line} style={{width:'95%'}}/>
            <TextInput
            placeholder="Description"
            placeholderTextColor={'#666'}
            value={sessionDescription}
            onChangeText={setSessionDescription}
            style={[styles.descriptionText,{width:'100%', height:40, color:themeColor.black}]}/>
            <Image source={line} style={{width:'95%'}}/>
            <TextInput
            placeholder="Total number of seats"
            placeholderTextColor={'#666'}
            value={nSeat}
            onChangeText={setnSeat}
            style={[styles.descriptionText,{width:'100%', height:40, color:themeColor.black}]}/>
        </View>
      </View>

      <View style={[styles.feedbackContainer1, {height: value!=0 ? 130: 90}]}>
        <View style={[styles.leftContainer,{borderWidth:0}]}>

          <TouchableOpacity
                style={{width:'100%', height:40, flexDirection:'row', 
                justifyContent:'space-between', alignItems:'center'}}
                onPress={() => setOpen(true)}>
                <Text style={styles.descriptionText}> Date </Text>
                <Text style={styles.descriptionText}> {dateValue} </Text>
          </TouchableOpacity>

          { value!=0  && <Image source={line} style={{width:'95%'}}/> }

          { value!=0  && (<TouchableOpacity
                disabled={dropopen}
                style={{width:'100%', height:40, flexDirection:'row', 
                justifyContent:'space-between', alignItems:'center'}}
                onPress={() => setEndDateOpen(true)}>
                <Text style={styles.descriptionText}> Repeat End Date </Text>
                <Text style={styles.descriptionText}> {endDateValue} </Text>
          </TouchableOpacity>)}

          <Image source={line} style={{width:'95%'}}/>

          <View style={{width:'100%', height:40, flexDirection:'row', 
          justifyContent:'center', alignItems:'center', }}>
            <View style={{width:'50%'}}>
              <Text style={styles.descriptionText}> Repeat </Text>
            </View>
            <View style={{width:'50%',  height:'100%', justifyContent:'center', alignItems:'center', 
          }}>
              <DropDownPicker
                modalTitle='rgrgr'
                listMode='SCROLLVIEW'
                open={dropopen}
                value={value}
                items={items}
                setOpen={setDropOpen}
                setValue={setValue}
                setItems={setItems}
                // showArrowIcon={true}
                translation={{
                  PLACEHOLDER: "None"
                }}

                style={{minHeight:30, borderWidth:0,}}
                textStyle={{
                  fontSize: themefonts.font16, 
                  fontFamily: themeFontFamily.raleway, 
                  textAlign: 'right'
                }}

                containerStyle={{
                  height:'60%',
                  alignItems:'center', justifyContent:'center'
                }}
                dropDownContainerStyle={{width:'100%', opacity:1, }}
                listItemContainer={{
                  height: 40, 
                  backgroundColor: "grey"
                }}
              />
            </View>
          </View>

        </View>
      </View>

     

          <DatePicker
                modal
                open={open}
                date={date}
                minuteInterval={15}
                onConfirm={date => {
                  var currentdate = new Date(date);
                  var datetime =
                    +currentdate.getDate() +
                    '/' +
                    (currentdate.getMonth() + 1) +
                    '/' +
                    currentdate.getFullYear() +
                    ' - ' +
                    currentdate.getHours() +
                    ':' +
                    currentdate.getMinutes();

                  setOpen(false);
                  setDate(currentdate);
                  setdateValue(datetime.toString());
                }}
                minimumDate={new Date()}
                onCancel={() => {
                  setOpen(false);
                }}
              />



              <DatePicker
                modal
                open={endDateOpen}
                date={enddate}
                minuteInterval={15}
                onConfirm={enddate => {
                  var currentenddate = new Date(enddate);
                  var enddatetime =
                    +currentenddate.getDate() +
                    '/' +
                    (currentenddate.getMonth() + 1) +
                    '/' +
                    currentenddate.getFullYear() +
                    ' - ' +
                    currentenddate.getHours() +
                    ':' +
                    currentenddate.getMinutes();

                  setEndDateOpen(false);
                  setEndDate(currentenddate);
                  setEndDateValue(enddatetime.toString());
                }}
                minimumDate={new Date()}
                onCancel={() => {
                  setEndDateOpen(false);
                }}
              />


        <View style={{bottom:20, width:'100%', position:'absolute', alignItems:'center'}}>
            <SimpleButton
            title="Create Session"
            buttonStyle={{width:150,}}
            onPress={addSession}
            />
          </View>




        </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({


  topContainer: {
    flexDirection: 'row',
    flex: 0.2,
  },

  headingContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
  },

  backbutton: {
    margin: 10,
  },

  heading: {
    fontSize: themefonts.font18,
    fontFamily: themeFontFamily.ralewayBold,
    color: themeColor.black,
  },
  safeArea: {
    flex: 1,
    backgroundColor: themeColor.white,
  },

  image: {
    height: "100%",
    width:"100%",
    flex: 1,
  },

leftContainer: {
  paddingHorizontal:10,
  flex:1,
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
},

feedbackContainer: {
  marginTop:10,
  marginHorizontal:10,
  flexDirection:"row",
  margin:2,
  backgroundColor: '#ebe8e9',
  borderRadius: 10,
  height:40,
},

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

feedbackContainer1: {
  flexDirection:"row",
  margin:20,
  backgroundColor: 'white',
  borderRadius: 10,
},

descriptionText: {
  fontSize: themefonts.font16,
  fontFamily: themeFontFamily.raleway,
  color: '#000',
},

checkboxText: {
  fontSize: themefonts.font16,
  fontFamily: themeFontFamily.raleway,
  textDecorationLine: "none",
  color: '#222222',
},





  container: {
    flex: 1,
    backgroundColor: '#f4f4fc',
    marginTop: 50,
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },

  singleElement: {
    display: 'flex',
    flex: 4,
    flexDirection: 'column',
  },

  textInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 1,
  },

  dateInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 1,
    margin: 2,
  },

  dateIcon: {
    padding: 10,
  },
});

export default CreateSessions;