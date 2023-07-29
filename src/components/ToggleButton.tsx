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
import RouteNames from '../constants/routeName';

import {useDispatch, useSelector} from 'react-redux';
import {useGetStudentSessionsQuery} from '../store/apiSlice';
import {userSessionSlice, getSessions} from '../store/userSessionSlice';
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
  const userId = useSelector((state) => state.user.userId);
  const {data, error, isLoading} = useGetStudentSessionsQuery(userId);

  const dispatch = useDispatch();

  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }

  React.useEffect(() => {
    //data?.data?.status
    if (data && data?.status==200){
      // console.log("dispatch(userSessionSlice", data?.data);
      dispatch(userSessionSlice.actions.initiateSessions(data?.data?.courses));
    }
  }, [data, dispatch]);


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
              style={styles.firstOption}>
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
              style={styles.secondOption}>
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
    borderRadius: 15,
    padding: 4,
    marginHorizontal: 5,
  },
  
  option: {
    borderRadius: 6,
    justifyContent: 'center',
    width: "50%",
    height: 30,
    padding: 2,
  },
  FirstContainer: {
  },
  SecondContainer: {
  },
  activeFirstContainer: {
    backgroundColor: themeColor.lightBlue,
  },
  activeSecondContainer: {
    backgroundColor: themeColor.lightBlue,
  },

  firstOption: {
    textAlign: 'center',
    color: themeColor.black,
  },
  secondOption: {
    textAlign: 'center',
    color: themeColor.black,
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