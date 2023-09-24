import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, ImageBackground} from 'react-native';
import CustomInput from '../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import SimpleButton from '../common/buttons/SimpleButton';
import {backButton, backgroundImageLight, backgroundImageMedium} from '../images/imageLinks';
import { themeColor, themeFontFamily } from '../constants/theme';

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

  const onSubmitPressed = async () => {
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      navigation.navigate('SignIn');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ImageBackground source={backgroundImageLight} style={{height:'100%', width:'100%'}}>
    <View style={styles.container}>
    <Text style={styles.resetPasswordHeading}>Reset your password</Text>
    <CustomInput
      value={newPasswordEmail}
      setValue={setNewPasswordEmail}
      placeholder="email"
    />

    <CustomInput
      placeholder="code"
      value={code}
      setValue={setCode}
    />

    <CustomInput
      placeholder="new password"
      value={password}
      setValue={setPassword}
      secureTextEntry
    />
    <CustomInput
      placeholder="Repeat new password"
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
}
});