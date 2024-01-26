import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, Keyboard} from 'react-native';
import CustomInput from '../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import SimpleButton from '../common/buttons/SimpleButton';
import {backButton, backgroundImageLight, backgroundImageMedium} from '../images/imageLinks';
import { themeColor, themeFontFamily, themefonts } from '../constants/theme';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const NewPasswordScreen = ({route,navigation}) => {

   const {email} = route.params;

    const {
        control,
        handleSubmit,
        formState: {errors},
      } = useForm();

    const [newPasswordEmail, setNewPasswordEmail] = useState(email);
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [isLoading, setIsLoading] = useState(false);

  const onSubmitPressed = async () => {
    try {
      setIsLoading(true);
      await Auth.forgotPasswordSubmit(email, code, password);
      setIsLoading(false);
      navigation.navigate('SignIn');
    } catch (e) {
      setIsLoading(false);
      Alert.alert('Error', e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <ImageBackground source={backgroundImageLight} style={{height:'100%', width:'100%'}}>
    <Spinner
          visible={isLoading}
          textContent={'Resetting password...'}
          textStyle={styles.spinnerTextStyle}
          />
    <View style={styles.container}>
    <Text style={styles.resetPasswordHeading}>Reset your password</Text>
    <CustomInput
      value={newPasswordEmail}
      setValue={setNewPasswordEmail}
      placeholder="Email"
    />

    <CustomInput
      placeholder="Code"
      value={code}
      setValue={setCode}
    />

    <CustomInput
      placeholder="New Password"
      value={password}
      setValue={setPassword}
      secureTextEntry
    />
    <Text style={styles.passwordReq}>Length minimum 8, should have 1 number, 1 special character, 1 uppercase, 1 lowercase</Text>
    <CustomInput
      placeholder="Repeat New Password"
      value={passwordRepeat}
      setValue={setPasswordRepeat}
      secureTextEntry={true}
    />

    <SimpleButton
      title='Submit'
      containerStyle={styles.primaryButton}
      onPress={handleSubmit(onSubmitPressed)}
    />
    <View style={{flexDirection:'row',justifyContent:'space-around',width:'80%',marginVertical:10}}>
    <View style={{width: 120}}><TouchableOpacity onPress={onSignInPress}><Text style={styles.footerLinks}>Back to Sign In</Text></TouchableOpacity></View>
    </View>
    </View>
    </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default NewPasswordScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
  // primaryButton: {margin: 16,width: 150,alignSelf:'center'},

  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent:'flex-start',
    height:'100%',
    width:'100%',
    top: 50,
},
primaryButton: {margin: 16,width: 150,alignSelf:'center'},
topContainer: {
    flexDirection: 'row',
    flex: 0.1,
  }, 

  headingContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
  },
  backbutton: {
    margin: 10,
  },
  resetPasswordHeading: {
    fontFamily: themeFontFamily.raleway,
    color:'#222222',
    fontSize: 20,
    fontWeight: '500',
    margin:15
  },
  footerLinks: {
    color:themeColor.vividRed,
    fontFamily: themeFontFamily.raleway,
    fontSize: 14,
    textAlign: 'center',
  },
  spinnerTextStyle: {
    fontFamily: themeFontFamily.raleway,
    fontSize: themefonts.font14,
    color: themeColor.vividRed,
    opacity: 0.8
  },
  passwordReq: {
    fontFamily: themeFontFamily.raleway,
  fontSize: themefonts.font14,
  color: "#808080",
  opacity: 0.8}
});