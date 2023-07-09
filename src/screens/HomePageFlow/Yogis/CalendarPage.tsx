/* eslint-disable prettier/prettier */
import React, {useRef, useCallback,useState} from 'react';
import {StyleSheet,View, Image, Text, SafeAreaView} from 'react-native';
import {Platform} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { ImageBackground } from 'react-native';
import {themeFontFamily, themefonts, themeColor} from '../../../constants/theme';

import AgendaItem from '../../../components/AgendaItem';
import {next, prev, plus, backgroundImageLight, backButton} from '../../../images/imageLinks'

import {useDispatch, useSelector} from 'react-redux';

import {getAllSessionsbyMonthYear, sessionSelector} from '../../../store/sessionSlice';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import RouteNames from '../../../constants/routeName';
import {userSessionSlice} from '../../../store/userSessionSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


interface PropsType {
  route: any;
  navigation: any;
}

// function onMonthChange (day){
//   console.log("onDateChanged");
//   let m = useSelector(sessionSelector);
//   console.log("onMonthChange",m);
// };

const CalendarPage: React.FC<PropsType> = ({route, navigation}) => {

  const userType = useSelector((state) => state.user.userType);

const tColor = '#00AAAF';
const lightThemeColor = '#f2f7f7';

function getTheme() {
  const disabledColor = 'grey';

  return {
    // arrows
    arrowColor: themeColor.vividRed,
    arrowStyle: {padding: 0},
    // knob
    expandableKnobColor: '#22C6F3',

    // month
    monthTextColor: themeColor.vividRed,
    textMonthFontSize: themefonts.font16,
    textMonthFontFamily: themeFontFamily.ralewaySemiBold,
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
    selectedDayTextColor: themeColor.white,

    // disabled date
    textDisabledColor: disabledColor,

    // dot (marked date)
    dotColor: tColor,
    selectedDotColor: 'white',
    disabledDotColor: disabledColor,
    dotStyle: {marginTop: 1},
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
    todayButtonTextColor: themeColor.vividRed, 
  });

  // Get all sessions corresponding to a month (month starts from 0 i.e. Jan is 0) and year
  let todayDate = new Date();
  //let session = useSelector((state) => getAllSessionsbyMonthYear(state, [todayDate.getMonth()-1, todayDate.getFullYear()]));

  let session = useSelector(sessionSelector);
  console.log("all sessions", session);
  
 

  


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
    let myDate = new Date(sessionMap[{key}["key"]][0].start_date * 1000);
    var sessionItem = {
      title: myDate.toISOString().substring(0,myDate.toISOString().search('T')),
      data: sessionMap[{key}["key"]]
    }
    itemsCopy.push(sessionItem)
  };



  
    const marked = {};
      itemsCopy.forEach((val) => {
        if (val.data && val.data.length>0){
            marked[val.title] = {marked: true};
          }
          else{
            marked[val.title] = {disabled: true};
          }}
          );


  // console.log("sessionMap",sessionMap);
  const renderItem = useCallback(({item}: any) => {
    return <AgendaItem item={item} navigation={navigation}/>;
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
    <ImageBackground source={backgroundImageLight} style={styles.image}>
      <View style={styles.topContainer}>
        <GestureHandlerRootView style={{backgroundColor: themeColor.white}}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image source={backButton} style={styles.backbutton}/>
          </TouchableOpacity>
        </GestureHandlerRootView> 
        <View style={styles.headingContainer}>
            <Text style={styles.heading}>Book Session</Text>
        </View>
        <GestureHandlerRootView style={{backgroundColor: themeColor.white}}>
        <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.HomePageFlow.CreateSessions)}>
            <Image source={plus} style={[styles.backbutton, userType=='Teacher' ? {opacity:1}:{opacity:0}]}/>
        </TouchableOpacity>
        </GestureHandlerRootView> 
      </View>


    <CalendarProvider
      date= {todayDate.toISOString().substring(0,todayDate.toISOString().search('T'))}
      // onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.6}
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
          leftArrowImageSource={prev}
          rightArrowImageSource={next}
          animateScroll
          // closeOnDayPress={false}
        />
      )}
      <AgendaList
        sections={itemsCopy}
        renderItem={renderItem}
        // scrollToNextEvent
        sectionStyle={[styles.section]}
        // dayFormat={'yyyy-MM-d'}
      />
    </CalendarProvider>
    </ImageBackground>
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
    backgroundColor: 'green'
  },

  section: {
    color: '#333333',
    textTransform: 'capitalize',
    fontFamily: themeFontFamily.raleway,
    fontWeight: '600',
    fontSize: themefonts.font14,
    backgroundColor: 'transparent',
  },

  image: {
    height: "100%",
    width:"100%",
    // resizeMode: 'cover',
  },
  topContainer: {
    flexDirection: 'row',
    flex: 0.1,
    backgroundColor: themeColor.white,
  },

  headingContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: themeColor.white,
  },

  backbutton: {
    margin: 10,
  },

  buttonContainer: {
    flex: 0.8,
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

});