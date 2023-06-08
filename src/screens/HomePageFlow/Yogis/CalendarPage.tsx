import {StyleSheet, ScrollView,SafeAreaView,View,Text, Alert} from 'react-native';
import React,{ useState } from 'react';
import 'react-native-gesture-handler';
import BackgroundImage from '../../../common/BackgroundImage';
import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';
import { Button } from 'react-native-elements';

import CalendarModal from "../../../components/CalendarModal";
import TimingList from "../../../components/TimingList";
import PrimaryButton from "../../../common/buttons/PrimaryButton";
import SecondaryButton from '../../../common/buttons/SecondaryButton';

interface PropsType {
    route: any;
  navigation: any;
}

const CalendarPage: React.FC<PropsType> = ({route,navigation}) => {
    console.log(route);
    const yogiProfile = route.params;
    const [selectedDate, setSelectedDate] = useState(new Date());

    const appointmentTimes = new Map<string, string[]>();
    appointmentTimes.set('2023-6-5',['6:00 am','7:00 am']);
    appointmentTimes.set('2023-6-15',['6:00 am','7:00 am']);
    appointmentTimes.set('2023-6-20',['6:00 am','7:00 am','10:30 am','3:00 pm'])
    appointmentTimes.set('2023-6-25',['6:00 am','7:00 am','9:00 am','11:30 am','2:00 pm'])

    
    const [selectedTime,setSelectedTime] = useState(0);
    const [appointmentBooked,setAppointmentBooked] = useState(false);
    console.log("selected date",[selectedDate.getFullYear(), selectedDate.getMonth()+1, selectedDate.getDate()+1].join('-'));
    return (
    <View style={{backgroundColor:'white', height:"100%"}}>
        <CalendarModal
          onDateChange={setSelectedDate}
        />
        <TimingList
          timings={appointmentTimes.has([selectedDate.getFullYear(), selectedDate.getMonth()+1, selectedDate.getDate()+1].join('-'))?
          appointmentTimes.get([selectedDate.getFullYear(), selectedDate.getMonth()+1, selectedDate.getDate()+1].join('-')):
          ['No slots']}
          selectedTime = {selectedTime}
          setSelectedTime ={setSelectedTime}
        />

        <SecondaryButton title="Book Appointment" buttonStyle={styles.buttonStyle}
            containerStyle={styles.btnContainerStyle} onPress={()=>{
             Alert.alert('Confirm the appointment', [selectedDate.getFullYear(), selectedDate.getMonth()+1, selectedDate.getDate()+1].join('-') + " "+ appointmentTimes.get([selectedDate.getFullYear(), selectedDate.getMonth()+1, selectedDate.getDate()+1].join('-'))[selectedTime], [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => {
                    console.log('OK Pressed');
                    Alert.alert(
                        'Appointment Booked for '+[selectedDate.getFullYear(), selectedDate.getMonth()+1, selectedDate.getDate()+1].join('-') + " "+ appointmentTimes.get([selectedDate.getFullYear(), selectedDate.getMonth()+1, selectedDate.getDate()+1].join('-'))[selectedTime],'',
                        [
                            {
                                text: 'OK',
                                onPress: () => {navigation.goBack()},
                            }
                        ]
                      )
                    }
                },
              ]);
        }}>
          </SecondaryButton>

        <SecondaryButton title="Cancel" buttonStyle={styles.buttonStyle}
            containerStyle={styles.btnContainerStyle} onPress={()=>{navigation.goBack()}}>
          </SecondaryButton>

        {/* {
          employees &&
          <EmployeePicker
            employees={employees}
            onEmployeeSelect={this.onEmployeeSelect}
            onClosed={this.onEmployeeListModalClosed}
            showEmployeeListModal={this.state.showEmployeeListModal}
          />
        } */}
        {/* <AppointmentConfirm
          company={company}
          service={service}
          userReducer={userReducer}
          selectedEmployee={this.state.selectedEmployee}
          selectedTime={this.state.selectedTime}
          selectedDate={this.state.selectedDate}
          showAppointmentConfirmModal={this.state.showAppointmentConfirmModal}
          onClosed={this.onAppointmentConfirmModalListClosed}
          onAppointmentConfirm={this.handleConfirm}
          inValidateAppointment={this.inValidateAppointment}
        />

        {!this.state.showAppointmentConfirmModal  &&
        <FormButton
          onPress={this.handleNext}
          buttonText='Next'
          containerStyle={{padding:5,margin:10,marginTop:0,marginBottom:0,backgroundColor:'tomato',opacity:0.7}}
        />
        } */}
      </View>
      // </ScrollView>
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