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
    

    const onSignUpPressed = async () => {
        try {
          await Auth.signUp({
            username: email,
            password: password,
            attributes: {email, given_name: firstName, family_name: lastName,phone_number:String(phoneNumber)},
          });
    
          navigation.navigate('ConfirmCode', {email});
        } catch (e) {
          Alert.alert('Oops', e.message);
        }
    };

    const onForgotPasswordPressed = async () => {
    };

    return(
        <ImageBackground source={backgroundImageLight} style={{height:'100%', width:'100%'}}>
            <View style={styles.container}>
            <View style={styles.topContainer}>
                <GestureHandlerRootView>
                <Image source={backButton} style={[styles.backbutton,{'opacity':0}]}/>
                </GestureHandlerRootView> 
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Sign Up</Text>
                </View>
                <Image source={backButton} style={[styles.backbutton,{'opacity':0}]}/>
            </View>
            <CustomInput
            value={firstName}
            setValue={setFirstName}
            name="firstName"
            control={control} 
            rules={{required: 'First name is required',minLength: {value: 3,
              message: 'Name should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Name should be max 24 characters long',
            }}}
            placeholder="First name"></CustomInput>
            <CustomInput
            value={lastName}
            setValue={setLastName}
            name="lastName"
            control={control}
            rules={{required: 'Last name is required',
            minLength: {
                value: 3,
                message: 'Name should be at least 3 characters long',
              },
              maxLength: {
                value: 24,
                message: 'Name should be max 24 characters long',
              }}}
              placeholder="Last name"></CustomInput>
            <CustomInput
            value={email}
            setValue={setEmail}
            name="email"
            control={control}
            rules={{required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}}}
            placeholder="email"></CustomInput>
            <CustomInput value={phoneNumber} setValue={setPhoneNumber}  name="phoneNumber" control={control} rules={{required: 'Phone number is required'}} placeholder="Phone number"></CustomInput>
            <CustomInput
                placeholder="Password"
                name="password" control={control} 
                value={password}
                setValue={setPassword}
                rules={{required: 'Password is required',
                minLength: {
                    value: 8,
                    message: 'Password should be at least 8 characters long',
                }}} 
                secureTextEntry={true}
            />
            <CustomInput
                placeholder="Repeat Password"
                value={passwordRepeat}
                setValue={setPasswordRepeat}
                name="passwordRepeat" control={control} rules={{
                    required: 'Password is required',
                    validate: value => value === pwd || 'Password do not match',
                }}
                secureTextEntry={true}
            />
            <SimpleButton
                title='Sign Up'
                containerStyle={styles.primaryButton}
                onPress={handleSubmit(onSignUpPressed)}
            />
            
            <View style={{flexDirection:'row',justifyContent:'space-around',width:'80%',marginVertical:20}}>
            <View><TouchableOpacity onPress={() => navigation.navigate("ConfirmCode")}><Text>Confirm a code</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={() => navigation.navigate("SignIn")}><Text>Sign In</Text></TouchableOpacity></View>
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
      heading: {
        fontSize: themefonts.font32,
        fontFamily: themeFontFamily.ralewaySemiBold,
        color: themeColor.black,
      },
});