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

interface PropsType {
    navigation: any;
  }

const ForgotPasswordScreen = ({navigation}) => {

    const {
        control,
        handleSubmit,
      } = useForm();

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onForgotPasswordPressed = async () => {
        try {
            setIsLoading(true);
            await Auth.forgotPassword(email);
            setIsLoading(false);
            navigation.navigate('NewPassword',{email});
          } catch (e) {
            setIsLoading(false);
            Alert.alert('Error', e.message);
          }
    };

    return(
        <ImageBackground source={backgroundImageLight} style={{height:'100%', width:'100%'}}>
          <Spinner
            visible={isLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
            />
          <View style={styles.container}>
          <Text style={styles.resetPasswordHeading}>Reset your password</Text>
          <CustomInput
          value={email}
          setValue={setEmail}
          placeholder="email"/>
          <SimpleButton
            title='Send'
            containerStyle={styles.primaryButton}
            onPress={handleSubmit(onForgotPasswordPressed)}
          />
          <View style={{flexDirection:'row',justifyContent:'space-around',width:'80%',marginVertical:10}}>
          <View style={{width: 120}}><TouchableOpacity onPress={() => navigation.navigate("SignIn")}><Text style={styles.footerLinks}>Back to Sign In</Text></TouchableOpacity></View>
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
      }
});