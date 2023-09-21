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

interface PropsType {
    navigation: any;
  }

const ForgotPasswordScreen = ({navigation}) => {

    const {
        control,
        handleSubmit,
      } = useForm();

    const [email, setEmail] = useState('');

    const onForgotPasswordPressed = async () => {
        try {
            await Auth.forgotPassword(email);
            navigation.navigate('NewPassword');
          } catch (e) {
            Alert.alert('Oops', e.message);
          }
    };

    return(
        <ImageBackground source={backgroundImageLight} style={{height:'100%', width:'100%'}}>
            <View style={styles.container}>
            <View style={styles.topContainer}>
                <GestureHandlerRootView>
                <Image source={backButton} style={[styles.backbutton,{'opacity':0}]}/>
                </GestureHandlerRootView> 
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Reset your password</Text>
                </View>
                <Image source={backButton} style={[styles.backbutton,{'opacity':0}]}/>
            </View>
            <CustomInput placeholder="email" value="email" setValue={setEmail} name="email" control={control} rules={{required: 'Email is required'}}></CustomInput>
            <SimpleButton
                title='Send'
                containerStyle={styles.primaryButton}
                onPress={handleSubmit(onForgotPasswordPressed)}
            />
            
            <View style={{flexDirection:'row',justifyContent:'space-around',width:'80%',marginVertical:20}}>
            <View><TouchableOpacity onPress={() => navigation.navigate("SignIn")}><Text>Back to Sign In</Text></TouchableOpacity></View>
            </View>
            
            </View>
        </ImageBackground>

    );

};

export default ForgotPasswordScreen;

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