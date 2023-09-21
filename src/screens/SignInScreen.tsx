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
import {backgroundImageLight, backgroundImageMedium} from '../images/imageLinks';
import CustomInput from '../components/CustomInput';
import PrimaryButton from '../common/buttons/PrimaryButton';
import SimpleButton from '../common/buttons/SimpleButton';
import { themefonts } from '../constants/theme';
import {useForm, Controller} from 'react-hook-form'

interface PropsType {
    navigation: any;
  }

const SignInScreen = ({navigation}) => {

    const {
        control,
        handleSubmit,
        formState: {errors},
      } = useForm();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const {height} = useWindowDimensions();
    const onSignInPressed = async () => {
        try{
            console.log("sending for sign in ",email," and ", password);
            const response = await Auth.signIn(email, password);
            console.log(response);
            navigation.navigate('Home');
        }
        catch(error){
            console.log('Error',error);
        }
        
    };

    const onSignUpPressed = async () => {
    };

    const onForgotPasswordPressed = async () => {
    };

    return(
        <ImageBackground source={backgroundImageLight} style={{height:'100%', width:'100%'}}>
            <View style={styles.container}>
            <Text style={{fontSize: themefonts.font24,margin:15}}>Sign In</Text>
            <CustomInput
            value={email}
            setValue={setEmail}
            // name="email"
            // control={control}
            // rules={{required: 'Email is required'}}
            placeholder="username"/>

            <CustomInput
            value={password}
            setValue={setPassword}
            // name="password"
            // control={control}
            // rules={{required: 'Password is required',
            // minLength: {
            //     value: 3,
            //     message: 'Password should be minimum 3 characters long',
            //   }}}
            placeholder="password"
            secureTextEntry={true}/>
            <SimpleButton
                title='Sign In'
                containerStyle={styles.primaryButton}
                onPress={handleSubmit(onSignInPressed)}
            />
            
            <View style={{flexDirection:'row',justifyContent:'space-around',width:'100%',marginVertical:20}}>
            <View><TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}><Text>Forgot Password</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={() => navigation.navigate("SignUp")}><Text>Sign Up</Text></TouchableOpacity></View>
            </View>
            
            </View>
        </ImageBackground>

    );

};

export default SignInScreen;

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
});