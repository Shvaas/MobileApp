/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import {StyleSheet, View, Alert} from 'react-native';
// import React,{ useState } from 'react';
// import 'react-native-gesture-handler';

// import CalendarModal from "../../../components/CalendarModal";
// import TimingList from "../../../components/TimingList";
// import SecondaryButton from '../../../common/buttons/SecondaryButton';
// import {utkarsh} from '../../../images/imageLinks'


// const CalendarPage: React.FC<PropsType> = ({route,navigation}) => {
//   const dispatch = useDispatch();
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [sessionBooked, setSessionBooked] = useState(null);
//   const onAppointmentConfirm = async () => {
//     // Add user sessions
//     if(sessionBooked == null){
//       console.log("Null session");
//       return;
//     }

//     console.log("onAppointmentConfirm1");
//     dispatch(
//       userSessionSlice.actions.addSession({
//         'sessionId': sessionBooked.sessionId,
//         'instructorId': sessionBooked.instructorId,
//         'instructorPhoto': utkarsh,
//         'title': 'Yoga with Utkarsh',
//         'description': sessionBooked.description,
//         'zoomlink': '-',
//         'date': sessionBooked.start_date,
//       }),
//     );

//     navigation.goBack();
//   };

//   // Get all sessions corresponding to a month (month starts from 0 i.e. Jan is 0) and year
//   const session = useSelector((state) => getAllSessionsbyMonthYear(state, [selectedDate.getUTCMonth(), selectedDate.getFullYear()]));
//   let sessionMap = {};
//   let sessionDateStrings = [];

//   for (let index = 0; index < session.length; index++) {
//     let myDate = new Date(session[index].start_date * 1000);
//     const key = myDate.getDate();
    
//     if (key in sessionMap){
//       sessionMap[key].push(session[index]);
//     }else{
//       sessionMap[key] = [session[index]];
//     }

//     sessionDateStrings.push(myDate.toISOString().substring(0,myDate.toISOString().search('T')))
//   }

//   return (
//     <View style={{backgroundColor:'white', height:"100%"}}>

//       <CalendarModal
//         onDateChange={setSelectedDate}
//         sessionDateStrings = {sessionDateStrings}
//       />

//       <TimingList
//         timings={(String(selectedDate.getUTCDate()) in sessionMap)? 
//           sessionMap[String(selectedDate.getUTCDate())]:['No slots']}
//         setSessionBooked ={setSessionBooked}
//       />

//       <SecondaryButton 
//         title="Book Appointment" 
//         buttonStyle={styles.buttonStyle}
//         containerStyle={styles.btnContainerStyle}
//         disabled={sessionBooked==null}
//         onPress={()=>{
//           let myDate = new Date(sessionBooked.start_date * 1000);
//           Alert.alert('Confirm the appointment', myDate.toUTCString(), [
//             {
//               text: 'Cancel',
//               onPress: () => console.log('Cancel Pressed'),
//               style: 'cancel',
//             },
//             {text: 'OK', onPress: () => {
//                 console.log('OK Pressed');
//                 Alert.alert(
//                     'Appointment Booked for '+myDate.toUTCString(),'',
//                     [
//                         {
//                             text: 'OK',
//                             onPress: () => {
//                               onAppointmentConfirm()
//                             },
//                         }
//                     ]
//                   )
//                 }
//             },
//           ]);
//         }}>
//       </SecondaryButton>

//       <SecondaryButton 
//         title="Cancel" 
//         buttonStyle={styles.buttonStyle}
//         containerStyle={styles.btnContainerStyle} 
//         onPress={()=>{navigation.goBack()}}>
//       </SecondaryButton>
//     </View>
//   );
// };

// export default CalendarPage;

// const styles = StyleSheet.create({
//   buttonStyle: {
//     width: 167,
//   },
//   btnContainerStyle: {
//     alignSelf: 'center',
//     marginTop: 10
//   },

// });

import React, {useRef, useCallback,useState} from 'react';
import {StyleSheet,View, Image, Text, SafeAreaView} from 'react-native';
import {Platform} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { ImageBackground } from 'react-native';
import {themeFontFamily, themefonts, themeColor} from '../../../constants/theme';

import AgendaItem from '../../../components/AgendaItem';
import {tick, backgroundImageLight, backButton} from '../../../images/imageLinks'

import {useDispatch, useSelector} from 'react-redux';

import {getAllSessionsbyMonthYear} from '../../../store/sessionSlice';
import {userSessionSlice} from '../../../store/userSessionSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


interface PropsType {
  route: any;
  navigation: any;
}

const CalendarPage: React.FC<PropsType> = ({route, navigation}) => {

const tColor = '#00AAAF';
const lightThemeColor = '#f2f7f7';

function getTheme() {
  const disabledColor = 'grey';

  return {
    // arrows
    arrowColor: 'black',
    arrowStyle: {padding: 0},
    // knob
    expandableKnobColor: '#22C6F3',

    // month
    monthTextColor: '#000000',
    textMonthFontSize: themefonts.font18,
    textMonthFontFamily: themeFontFamily.ralewayBold,
    textMonthFontWeight: 'bold' as const,

    // day names
    textSectionTitleColor: '#39393A',
    textDayHeaderFontSize: themefonts.font14,
    textDayHeaderFontFamily: themeFontFamily.raleway,
    textDayHeaderFontWeight: 'normal' as const,

    // dates
    dayTextColor: '#39393A',
    todayTextColor: '#22C6F3',
    textDayFontSize: themefonts.font16,
    textDayFontFamily: themeFontFamily.raleway,
    textDayFontWeight: '500' as const,
    textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},

    // selected date
    selectedDayBackgroundColor: '#22C6F3',
    selectedDayTextColor: 'white',

    // disabled date
    textDisabledColor: disabledColor,

    // dot (marked date)
    dotColor: tColor,
    selectedDotColor: 'white',
    disabledDotColor: disabledColor,
    dotStyle: {marginTop: -3}
  };
}

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(12);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(numberOfDays: number) {
  const array = [];
  for (let index = 1; index <= numberOfDays; index++) {
    let d = Date.now();
    if (index > 8) {
      // set dates on the next month
      const newMonth = new Date(d).getMonth() + 1;
      d = new Date(d).setMonth(newMonth);
    }
    const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}
function getPastDate(numberOfDays: number) {
  return new Date(Date.now() - 864e5 * numberOfDays).toISOString().split('T')[0];
}

const dispatch = useDispatch();


  // const {weekView} = props;
  const weekView = false;
  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: 'blue'
  });

  // Get all sessions corresponding to a month (month starts from 0 i.e. Jan is 0) and year
  let todayDate = new Date();
  const session = useSelector((state) => getAllSessionsbyMonthYear(state, [todayDate.getUTCMonth(), todayDate.getFullYear()]));

  let sessionMap = {};
  let sessionDateStrings = [];
  let itemsCopy = [];

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

  
  for (var key in sessionMap) {
    // console.log('sessionmapitem',sessionMap[{key}["key"]]);
    let myDate = new Date(sessionMap[{key}["key"]][0].start_date * 1000);
    var sessionItem = {
      title: myDate.toISOString().substring(0,myDate.toISOString().search('T')),
      data: sessionMap[{key}["key"]]
    }
    itemsCopy.push(sessionItem)
  };

  console.log("itemscopy", itemsCopy);


  
    const marked = {};
    console.log("itemscopy", itemsCopy);
      itemsCopy.forEach((val) => {
        if (val.data && val.data.length>0){
            marked[val.title] = {marked: true};
          }
          else{
            marked[val.title] = {disabled: true};
          }}
          );


  console.log("sessionMap",sessionMap);
  const renderItem = useCallback(({item}: any) => {
    return <AgendaItem item={item}/>;
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
    
      <View style={styles.topContainer}>
        <GestureHandlerRootView>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image source={backButton} style={styles.backbutton}/>
          </TouchableOpacity>
        </GestureHandlerRootView> 
        <View style={styles.headingContainer}>
            <Text style={styles.heading}>Book Session</Text>
        </View>
        <Image source={backButton} style={[styles.backbutton,{'opacity':0}]}/>
      </View>


    <CalendarProvider
      date= {todayDate.toISOString().substring(0,todayDate.toISOString().search('T'))}
      // onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      showTodayButton
      // disabledOpacity={0.6}
      theme={todayBtnTheme.current}
      // todayBottomMargin={16}
    >
      {weekView ? (
        <WeekCalendar testID={'weekCalendar'} firstDay={1} markedDates={marked} />
      ) : (
        <ExpandableCalendar
          testID={'expandableCalendar'}
          // horizontal={false}
          // hideArrows
          // disablePan
          // hideKnob
          // initialPosition={ExpandableCalendar.positions.OPEN}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.header} // for horizontal only
          // disableWeekScroll
          theme={theme.current}
          // disableAllTouchEventsForDisabledDays
          firstDay={1}
          markedDates={marked}
          leftArrowImageSource={tick}
          rightArrowImageSource={tick}
          // animateScroll
          // closeOnDayPress={false}
        />
      )}
      <AgendaList
        sections={itemsCopy}
        renderItem={renderItem}
        // scrollToNextEvent
        sectionStyle={styles.section}
        // dayFormat={'yyyy-MM-d'}
      />
    </CalendarProvider>
    </SafeAreaView>
  );
};

export default CalendarPage;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    backgroundColor: 'lightgrey'
  },
  section: {
    backgroundColor: 'white',
    color: 'grey',
    textTransform: 'capitalize'
  },
  image: {
    height: "100%",
    width:"100%",
    // resizeMode: 'cover',
  },
  topContainer: {
    flexDirection: 'row',
    flex: 0.1,
  }, 

  headingContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    borderWidth:1, 
  },

  backbutton: {
    margin: 10,
  },

  buttonContainer: {
    flex: 0.8,
  },
  heading: {
    fontSize: themefonts.font32,
    fontFamily: themeFontFamily.ralewaySemiBold,
    color: themeColor.lightBlue,
  },
  safeArea: {
    flex: 1,
    backgroundColor: themeColor.white,
  },

});