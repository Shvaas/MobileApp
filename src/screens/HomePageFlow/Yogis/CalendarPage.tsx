import {StyleSheet, ScrollView,SafeAreaView,View,Text, Alert} from 'react-native';
import React,{ useState } from 'react';
import 'react-native-gesture-handler';
import BackgroundImage from '../../../common/BackgroundImage';
import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';
import { Button } from 'react-native-elements';

import CalendarModal from "../../../components/CalendarModal";
import TimingList from "../../../components/TimingList";

interface PropsType {
    route: any;
  navigation: any;
}

const CalendarPage: React.FC<PropsType> = ({route,navigation}) => {
    console.log(route);
    const yogiProfile = route.params;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const appointmentDates = ['2023-04-15','2023-04-17','2023-04-25'];
    var appointmentTimes = ['6:00 am','7:00 am','11:30 am', '5:00 pm'];
    const [selectedTime,setSelectedTime] = useState(0);
    const [appointmentBooked,setAppointmentBooked] = useState(false);
    // return(
    //     <SafeAreaView style={styles.container}>
    //       <View style={styles.topContainer}>
    //       <BackgroundImage>
    //       <Button title="Go Back" onPress={()=>{navigation.goBack()}} style={styles.buttonStyle}>
    //       </Button>
    //       <Text>{yogiProfile.name}</Text>
    //       </BackgroundImage>
    //       </View>
    //     </SafeAreaView>
    // );
    return (
    //     <ScrollView
    //     style={{ flex:1, backgroundColor:'white'}}
    //     contentContainerStyle={{paddingVertical:30}}
    //     showsVerticalScrollIndicator={false}
    //     automaticallyAdjustContentInsets={false}
    //   >
    <View style={{ flex:1, backgroundColor:'white', height:"100%"}}>
        <CalendarModal
          onDateChange={setSelectedDate}
          // appointmentDates = {appointmentDates}
        />
        
        {/* <AppointmentList
          service={service}
          selectedEmployee={this.state.selectedEmployee}
          listEmployees={this.listEmployees}
        /> */}

        <TimingList
          timings={appointmentTimes}
          selectedTime = {selectedTime}
          setSelectedTime ={setSelectedTime}
        //   selectedTime={this.state.selectedTime}
        //   onTimeSelect={this.onTimeSelect}
        //   timingsReducer={timingsReducer}
        />

        <Button title="Book Appointment" onPress={()=>{
             Alert.alert('Confirm the appointment', selectedDate.toString()+appointmentTimes[selectedTime], [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => {
                    console.log('OK Pressed');
                    Alert.alert(
                        'Appointment Booked for '+selectedDate.toString()+appointmentTimes[selectedTime],'',
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
          </Button>

        <Button title="Go Back" onPress={()=>{navigation.goBack()}}>
          </Button>

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

});