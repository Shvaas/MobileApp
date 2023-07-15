import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,

} from 'react-native';
import React from 'react';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// local
import {
  themeColor,
  themeFontFamily,
  themefonts,
} from '../../../constants/theme';
import BottomComponent from './components/BottomComponent';
import RouteNames from '../../../constants/routeName';
import BackgroundImage from '../../../common/BackgroundImage';
import PrimaryButton from '../../../common/buttons/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import { Button } from 'react-native-elements';
import {Auth} from "aws-amplify";

import {useState} from 'react';
import {userSlice} from '../../../store/userSlice';
interface PropsType {
  navigation: any;
}

const Welcome: React.FC<PropsType> = ({navigation}) => {
  const [userType, setUserType] = useState('Student');

  const dispatch = useDispatch();

  const translateTopContainer = React.useRef(
    new Animated.Value(Dimensions.get('screen').height / 4 - 20),
  ).current;

  React.useEffect(() => {
    Animated.timing(translateTopContainer, {
      duration: 1500,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [translateTopContainer]);

  const setType = () => {
    if (userType=='Teacher'){
      setUserType('Student')
      dispatch(userSlice.actions.setUser({type: 'Student', userId: '313cbfd3-4fc1-4763-9d18-abcdef'}));
    }else{
      setUserType('Teacher')
      dispatch(userSlice.actions.setUser({type: 'Teacher', userId: '313cbfd3-4fc1-4763-9d18-caedd0be4a63'}));
    }
    
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Animated.View
          style={{transform: [{translateY: translateTopContainer}]}}>
          <BackgroundImage>
            <Text style={styles.heading}>Welcome</Text>
          </BackgroundImage>
        </Animated.View>
      </View>
      {/* <Text> {usertype.userType} </Text> */}
      <View style={styles.bottomContainer}>
        <BottomComponent
          onButtonPress_Login={() => {
            navigation.navigate(RouteNames.OnboardingFlow.ProfileQuestions);
          }}
          onButtonPress_Home={() => {
            navigation.navigate('Home');
          }}
        />
        <PrimaryButton
                title={userType=='Teacher'? "Set to Student":"Set to Teacher"}
                buttonStyle={styles.buttonStyle}
                titleStyle={{color: themeColor.vividRed}}
                onPress={setType}
          />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: themeColor.background,
  },
  heading: {
    fontSize: themefonts.font32,
    textAlign: 'center',
    fontFamily: themeFontFamily.raleway,
    color: themeColor.white,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
  },
  buttonStyle: {
    width: 150,
    marginHorizontal: 10,
    backgroundColor: themeColor.white,
    borderColor: themeColor.vividRed,
    borderWidth: 1,
  },
});