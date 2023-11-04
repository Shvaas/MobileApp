import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Linking,
    ImageBackground,
    Image,
    Button,
    Alert,
    useWindowDimensions,
    TouchableOpacity,
  } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import {Auth} from "aws-amplify";
import {backButton, backgroundImageLight, backgroundImageMedium} from '../images/imageLinks';
import CustomInput from '../components/CustomInput';
import PrimaryButton from '../common/buttons/PrimaryButton';
import SimpleButton from '../common/buttons/SimpleButton';
import { themeColor, themeFontFamily, themefonts } from '../constants/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {useForm} from 'react-hook-form';
import Spinner from 'react-native-loading-spinner-overlay/lib';
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

interface PropsType {
    navigation: any;
  }

const SignUpScreen = ({navigation}) => {

    const {
        control,
        handleSubmit,
        watch,
      } = useForm();

    const pwd = watch('password');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [passwordRepeat,setPasswordRepeat] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    

    const onSignUpPressed = async () => {
        try {
          setIsLoading(true);
            await Auth.signUp({
              username: email.toLowerCase(),
              password: password,
              attributes: {email, given_name: firstName, family_name: lastName,phone_number:String(phoneNumber)},
              autoSignIn: {
                enabled: true,
              }
            });
            setIsLoading(false);
          navigation.navigate('ConfirmCode', {email, password});
        } catch (e) {
          setIsLoading(false);
          Alert.alert('Error', e.message);
        }
    };

    const onConfirmCodePressed = async () => {
      if(email!=null && password!=null){
        navigation.navigate('ConfirmCode', {email, password});
      }
      else{
        navigation.navigate('ConfirmCode');
      }
    };

    const onSignInPressed = async () => {
      navigation.navigate("SignIn");
    };

    return(
      <ImageBackground source={backgroundImageLight} style={{height:'100%', width:'100%'}}>
            <Spinner
            visible={isLoading}
            textContent={'Signing Up...'}
            textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.container}>
            <Text style={styles.signUpHeading}>Sign Up</Text>
            <CustomInput
            value={firstName}
            setValue={setFirstName}
            placeholder="first name"></CustomInput>

            <CustomInput
              value={lastName}
              setValue={setLastName}
              placeholder="last name">
            </CustomInput>
            
            <CustomInput
              value={email}
              setValue={setEmail}
              name="email"
              placeholder="email"></CustomInput>

            <CustomInput
              value={phoneNumber}
              setValue={setPhoneNumber}
              placeholder="phone number"></CustomInput>
            <Text style={styles.passwordReq}>Please enter phone number with country code. For example +19999999999</Text>

            <CustomInput
                placeholder="password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />
            <Text style={styles.passwordReq}>Length minimum 8, should have 1 number, 1 special character, 1 uppercase, 1 lowercase</Text>
            <CustomInput
                placeholder="repeat password"
                value={passwordRepeat}
                setValue={setPasswordRepeat}
                secureTextEntry={true}
            />
            <SimpleButton
                title='Sign Up'
                containerStyle={styles.primaryButton}
                onPress={handleSubmit(onSignUpPressed)}
            />
            
            <View style={{flexDirection:'row',justifyContent:'space-around',width:'80%',marginVertical:20}}>
            <View><TouchableOpacity onPress={onConfirmCodePressed}><Text style={styles.footerLinks}>Confirm a code</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={onSignInPressed}><Text style={styles.footerLinks}>Sign In</Text></TouchableOpacity></View>
            </View>
            
            </View>
        </ImageBackground>

    );

};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent:'flex-start',
        height:'100%',
        width:'100%',
        top: 50,
    },
    primaryButton: {
      margin: 16,
      width: 150,
      alignSelf:'center'
    },
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
      heading: {
        fontSize: themefonts.font32,
        fontFamily: themeFontFamily.ralewaySemiBold,
        color: themeColor.black,
      },
      signUpHeading: {
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
    opacity: 0.8,
    width: '100%'
  }
});