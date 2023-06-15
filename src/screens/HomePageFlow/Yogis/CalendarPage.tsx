/* eslint-disable prettier/prettier */
import {StyleSheet, View, Alert} from 'react-native';
import React,{ useState } from 'react';
import 'react-native-gesture-handler';

import CalendarModal from "../../../components/CalendarModal";
import TimingList from "../../../components/TimingList";
import SecondaryButton from '../../../common/buttons/SecondaryButton';
import {utkarsh} from '../../../images/imageLinks'

import {useDispatch, useSelector} from 'react-redux';

import {getAllSessionsbyMonthYear} from '../../../store/sessionSlice';
import {userSessionSlice} from '../../../store/userSessionSlice';

interface PropsType {
  route: any;
  navigation: any;
}

const CalendarPage: React.FC<PropsType> = ({route,navigation}) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessionBooked, setSessionBooked] = useState(null);
  const onAppointmentConfirm = async () => {
    // Add user sessions
    if(sessionBooked == null){
      console.log("Null session");
      return;
    }

    console.log("onAppointmentConfirm1");
    dispatch(
      userSessionSlice.actions.addSession({
        'sessionId': sessionBooked.sessionId,
        'instructorId': sessionBooked.instructorId,
        'instructorPhoto': utkarsh,
        'title': 'Yoga with Utkarsh',
        'description': sessionBooked.description,
        'zoomlink': '-',
        'date': sessionBooked.start_date,
      }),
    );

    navigation.goBack();
  };

  // Get all sessions corresponding to a month (month starts from 0 i.e. Jan is 0) and year
  const session = useSelector((state) => getAllSessionsbyMonthYear(state, [selectedDate.getUTCMonth(), selectedDate.getFullYear()]));
  let sessionMap = {};
  let sessionDateStrings = [];

  for (let index = 0; index < session.length; index++) {
    let myDate = new Date(session[index].start_date * 1000);
    const key = myDate.getDate();
    
    if (key in sessionMap){
      sessionMap[key].push(session[index]);
    }else{
      sessionMap[key] = [session[index]];
    }

    sessionDateStrings.push(myDate.toISOString().substring(0,myDate.toISOString().search('T')))
  }

  return (
    <View style={{backgroundColor:'white', height:"100%"}}>

      <CalendarModal
        onDateChange={setSelectedDate}
        sessionDateStrings = {sessionDateStrings}
      />

      <TimingList
        timings={(String(selectedDate.getUTCDate()) in sessionMap)? 
          sessionMap[String(selectedDate.getUTCDate())]:['No slots']}
        setSessionBooked ={setSessionBooked}
      />

      <SecondaryButton 
        title="Book Appointment" 
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.btnContainerStyle}
        disabled={sessionBooked==null}
        onPress={()=>{
          let myDate = new Date(sessionBooked.start_date * 1000);
          Alert.alert('Confirm the appointment', myDate.toUTCString(), [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                console.log('OK Pressed');
                Alert.alert(
                    'Appointment Booked for '+myDate.toUTCString(),'',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                              onAppointmentConfirm()
                            },
                        }
                    ]
                  )
                }
            },
          ]);
        }}>
      </SecondaryButton>

      <SecondaryButton 
        title="Cancel" 
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.btnContainerStyle} 
        onPress={()=>{navigation.goBack()}}>
      </SecondaryButton>
    </View>
  );
};

export default CalendarPage;

const styles = StyleSheet.create({
  buttonStyle: {
    width: 167,
  },
  btnContainerStyle: {
    alignSelf: 'center',
    marginTop: 10
  },

});