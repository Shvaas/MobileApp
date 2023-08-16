/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import {themeColor, themefonts} from '../constants/theme';
import BackgroundImageDup from '../common/BackgroundImageFullPage'
import SessionCardView from '../components/SessionCardView';
import UpcomingSessionCardView from './UpcomingSessionCardView';
import { useState} from "react";
import RouteNames from '../constants/routeName';


import {useDispatch, useSelector} from 'react-redux';
import {useGetStudentSessionsQuery} from '../store/apiSlice';
import {userSessionSlice, getSessions} from '../store/userSessionSlice';
import { withTheme } from 'react-native-elements';

export interface ToggleButtonProps {
  navigation: any;
  activeOption?: number;
  onOptionPress?: (index: OPTION) => void;
  disabled?: boolean;
  dataCurrent : any;
  dataPast: any;
}

enum OPTION {
  FIRST,
  SECOND,
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  navigation,
  activeOption,
  onOptionPress = () => {},
  disabled = false,
  dataCurrent,
  dataPast,
}) => {

  const selectedOption = activeOption ?? OPTION.FIRST;
  const handleOptionPress = (index) => {
    onOptionPress(index);
  };
  return (
    <View>
      <View>
      <View style={styles.container}>
        <TouchableWithoutFeedback
          disabled={disabled}
          onPress={() => handleOptionPress(OPTION.FIRST)}>
          <View
            style={[
              styles.option,
              styles.FirstContainer,
              selectedOption === OPTION.FIRST ? styles.activeFirstContainer : {},
            ]}>
            <Text
              style={[
                styles.firstOption,
                selectedOption === OPTION.FIRST ? styles.activeFirstOption : {}]}>
              {"Upcoming sessions"}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          disabled={disabled}
          onPress={() => handleOptionPress(OPTION.SECOND)}>
          <View
            style={[
              styles.option,
              styles.SecondContainer,
              selectedOption === OPTION.SECOND ? styles.activeSecondContainer : {},
            ]}>
            <Text
              style={[
                styles.secondOption,
                selectedOption === OPTION.SECOND ? styles.activeSecondOption : {}]}>
              {"Completed sessions"}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {selectedOption === OPTION.FIRST?
      dataCurrent.length==0?
      <Text style={styles.noSessionText}>No sessions</Text>:
      <View style={styles.scrollContainerStyle}>
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
            <FlatList
            data={dataCurrent}
            renderItem = {({item}) => {
              return(
                <TouchableOpacity>
                   <UpcomingSessionCardView item={item}/>
                </TouchableOpacity>
              )
            }}/>  
        </ScrollView>
      </View>
      :
      dataPast.length==0?
      <Text style={styles.noSessionText}>No sessions</Text>:
      <View style={styles.scrollContainerStyle}>
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
            <FlatList
            data={dataPast}
            renderItem = {({item}) => {
              return(
                  <SessionCardView item={item} navigation={navigation}/>
              )
            }}/>  
        </ScrollView>
      </View>
      }

      </View>
    </View>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: themeColor.white,
    borderRadius: 6,
    // padding: 4,
    marginHorizontal: 5,
    // borderBottomWidth: 2,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    // borderWidth: 1,
    // borderColor: themeColor.vividRed,
    // borderColor: "#fa661c", //bright orange
    // borderColor: '#fbd6bc',//light orange
    // borderColor: themeColor.lightBlue
    // borderColor: '#FD7C23',
  },
  
  option: {
    borderRadius: 6,
    borderBottomStartRadius:0,
    borderBottomEndRadius:0,
    justifyContent: 'center',
    width: "50%",
    height: 30,
    padding: 2,
    opacity: 0.6,

  },
  FirstContainer: {
  },
  SecondContainer: {
  },
  activeFirstContainer: {
    backgroundColor: themeColor.vividRed,
    opacity: 1,
    // backgroundColor: '#fa661c'
    // backgroundColor: '#fbd6bc',//light orange
    // borderWidth: 1.5,
    // borderColor: themeColor.vividRed,
    // backgroundColor:themeColor.lightBlue,
    // backgroundColor: '#FD7C23',


  },
  activeSecondContainer: {
    backgroundColor: themeColor.vividRed,
    opacity: 1,
    // backgroundColor: '#fa661c'
    // backgroundColor: '#fbd6bc',//light orange
    // borderWidth: 1.5,
    // borderColor: themeColor.vividRed,
    // backgroundColor:themeColor.lightBlue,
    // backgroundColor: '#FD7C23',
  },

  firstOption: {
    textAlign: 'center',
    color: themeColor.vividRed,
    // color: "#fa661c"
    // color: '#fbd6bc',//light orange
    // color:themeColor.lightBlue,
    // color: '#FD7C23',
  },
  secondOption: {
    textAlign: 'center',
    color: themeColor.vividRed,
    // color: "#fa661c"
    // color: '#fbd6bc',//light orange
    // color:themeColor.lightBlue,
    // color: '#FD7C23',
  },
  activeFirstOption: {
    color: themeColor.white,
    // fontWeight:"bold",
  },
  activeSecondOption: {
    color: themeColor.white,
    // fontWeight:"bold",
  },

  scrollContainerStyle: {
    padding:10,
  },
  scrollViewStyle: {
    paddingVertical: 5,
    contentOffset: {x:0, y:0},
  },
  noSessionText:{
    color:'grey',
    fontSize:themefonts.font18,
    alignSelf:'center',
    justifyContent: 'center',
    marginTop: (Dimensions.get('window').height/2)-30,
  }

}); 