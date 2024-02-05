import React, { useRef } from 'react';
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
    TouchableWithoutFeedback,
    Keyboard,
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
import PhoneInput from "react-native-phone-number-input";
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

interface PropsType {
    navigation: any;
  }

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

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
    const [phoneNumberWithoutCode, setPhoneNumberWithoutCode] = useState('');
    const [passwordRepeat,setPasswordRepeat] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const phoneInput = useRef<PhoneInput>(null);

    console.log("phonenumber", phoneNumberWithoutCode);
    console.log("formattedphonenumber",phoneNumber);

    const onSignUpPressed = async () => {
        try {

          if(password.length < 8){
            Alert.alert('Error', "Password less than 8 characters. Password should have atleast 8 characters.");
            return;
          }
          if( password !== passwordRepeat){
            Alert.alert('Error', "Repeated Password is different than original.");
            return;
          }

          setEmail(email.toLowerCase());
          setIsLoading(true);
            await Auth.signUp({
              username: email,
              password: password,
              attributes: {email: email, given_name: firstName, family_name: lastName,phone_number:String(phoneNumber)},
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
      // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <HideKeyboard>
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
            placeholder="First Name"></CustomInput>

            <CustomInput
              value={lastName}
              setValue={setLastName}
              placeholder="Last Name">
            </CustomInput>
            
            <CustomInput
              value={email}
              setValue={setEmail}
              name="email"
              placeholder="Email"></CustomInput>

            {/* <CustomInput
              value={phoneNumber}
              setValue={setPhoneNumber}
              placeholder="phone number"></CustomInput>
            <Text style={styles.passwordReq}>Please enter phone number with country code. For example +19999999999</Text> */}

              <PhoneInput
                  ref={phoneInput}
                  defaultValue={phoneNumber}
                  defaultCode="IN"
                  layout="first"
                  onChangeText={(text) => {
                    setPhoneNumberWithoutCode(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setPhoneNumber(text);
                  }}
                  autoFocus
                  containerStyle = {{backgroundColor:'white',
                  width: '100%',
                  height: 44,
                  borderColor:'#e8e8e8',
                  // borderColor:'red',
                  borderWidth:1,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  marginVertical: 5,
                  // paddingVertical:10,
                  }}
                  textInputStyle = {{
                    height: 20,
                    textAlignVertical: 'center',
                    // color:'red'
                  }}
                  textContainerStyle = {{
                    height: 40,
                    backgroundColor:'white',
                    borderWidth:1,
                    borderRadius: 5,
                    borderColor:'white',
                    alignSelf:'center',
                    // borderColor:'transparent',
                    // opacity:0,
                    // padding: 2,
                  }}
                  codeTextStyle = {{
                    height: 20,
                    //marginTop: 19,
                    // textAlignVertical: 'center',
                    // justifyContent: 'center'
                    // borderColor:'red'
                  }}
              />

            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />
            <Text style={styles.passwordReq}>Minimum 8 characters.</Text>
            <CustomInput
                placeholder="Repeat Password"
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
        </HideKeyboard>
        // </TouchableWithoutFeedback>

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