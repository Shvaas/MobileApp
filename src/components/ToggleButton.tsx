import React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList
} from 'react-native';
// import Text from 'src/common/DesignSystem/Text/Text';
// import {themeColor} from 'src/common/theme';
import {themeFontFamily, themefonts,themeColor} from '../constants/theme';
import BackgroundImageDup from '../common/BackgroundImageFullPage'
import CourseCardView from '../components/CourseCardView';
import RouteNames from '../constants/routeName';
import { Header } from 'react-native-elements';
import UpcomingCourseCardView from './UpcomingCourseCardView';

export interface ToggleButtonProps {
  navigation: any;
  firstOption: string;
  secondOption: string;
  containerStyle?: ViewStyle;
  activeFirstContainerStyle?: ViewStyle;
  activeSecondContainerStyle?: ViewStyle;
  firstOptionStyle?: TextStyle;
  secondOptionStyle?: TextStyle;
  activeOption?: number;
  onOptionPress?: (index: OPTION) => void;
  disabled?: boolean;
  dataCurrent : any;
  dataPast: any;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: themeColor.white,
    borderRadius: 15,
    padding: 4,
    top: 70,
    width: "100%",
  },
  optionContainer: {
    minWidth: 0,
  },
  FirstContainer: {
    width: "50%",
    height: 30,
    padding: 2,
    borderColor:"blue",
  },
  SecondContainer: {
    width: "50%",
    height: 30,
    padding: 2,
    borderColor:"green"
  },
  activeFirstContainer: {
    backgroundColor: "#bae2f1",
  },
  activeSecondContainer: {
    backgroundColor: "#bae2f1",
  },
  option: {
    borderRadius: 6,
    alignSelf:'center',
    textAlignVertical:'center',
    borderWidth:1,
    justifyContent: 'center'
  },
  optionText: {
    textAlign: 'center',
    color: themeColor.white,
  },
  firstOption: {
    textAlign: 'center',
    color: themeColor.black,
    borderWidth:1,
    borderColor:"red"
  },
  secondOption: {
    textAlign: 'center',
    color: themeColor.black,
    borderWidth:1,
    borderColor:"red"
  },
  contentContainer: {
    paddingVertical: 5,
    contentOffset: {x:0, y:0},
  },
  containerView: {
    backgroundColor: themeColor.background,
  },
});

enum OPTION {
  FIRST,
  SECOND,
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  navigation,
  firstOption,
  secondOption,
  containerStyle,
  activeFirstContainerStyle,
  activeSecondContainerStyle,
  firstOptionStyle,
  secondOptionStyle,
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
      <BackgroundImageDup>
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
                selectedOption === OPTION.FIRST
                  ? styles.firstOption
                  : styles.optionText,
                styles.firstOption,
              ]}>
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
              selectedOption === OPTION.SECOND
                ? styles.activeSecondContainer
                : {},
            ]}>
            <Text
              style={[
                selectedOption === OPTION.SECOND
                  ? styles.secondOption
                  : styles.optionText,
                styles.secondOption,
              ]}>
              {"Completed sessions"}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{padding:10, top: 70}}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <FlatList
            data={selectedOption === OPTION.FIRST
              ? dataCurrent
              : dataPast}
            renderItem = {({item}) => {
              return(
                <TouchableOpacity>
                {/* onPress={()=>navigation.navigate(RouteNames.HomePageFlow.AllCourseDetail, {
                  courseDetail: item,
                })}> */}
                  {selectedOption === OPTION.FIRST ?
                <CourseCardView course={item} />
                : <UpcomingCourseCardView course={item} />
                  }
                </TouchableOpacity>
              )
            
            }}
            />  
        </ScrollView>
      </View>
      </View>
      </BackgroundImageDup>
    </View>
  );
};

export default ToggleButton;
