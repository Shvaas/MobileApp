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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {useForm} from 'react-hook-form';

interface PropsType {
    navigation: any;
  }

const ConfirmCodeScreen = ({navigation, email}) => {

    const [code, setCode] = useState('');

    const {control, handleSubmit, watch} = useForm({
        defaultValues: {email: email},
      });

    const onConfirmPressed = async () => {
        try {
          await Auth.confirmSignUp(email, code);
          navigation.navigate('SignIn');
        } catch (e) {
          Alert.alert('Oops', e.message);
        }
      };
    
    const onSignInPress = () => {
    navigation.navigate('SignIn');
    };

    const onResendPress = async () => {
    try {
        await Auth.resendSignUp(email);
        Alert.alert('Success', 'Code was resent to your email');
    } catch (e) {
        Alert.alert('Oops', e.message);
    }
    };

    return(
        <ImageBackground source={backgroundImageLight} style={{height:'100%', width:'100%'}}>
            <View style={styles.container}>
            <Text>Confirm Sign Up</Text>
            <CustomInput placeholder="Email" name="email"
            control={control}
            rules={{
                required: 'Email code is required',
            }}></CustomInput>
            <CustomInput
            name="Enter your confirmation code"
            control={control}
            placeholder="Enter your confirmation code"
            value={code}
            setValue={setCode}
            rules={{
              required: 'Confirmation code is required',
            }}></CustomInput>
            <SimpleButton
                title='Confirm'
                containerStyle={styles.primaryButton}
                onPress={handleSubmit(onConfirmPressed)}
            />
            
            <View style={{flexDirection:'row',justifyContent:'space-around',width:'80%',marginVertical:20}}>
            <View><TouchableOpacity><Text>Resend code</Text></TouchableOpacity></View>
            <View><TouchableOpacity onPress={()=> navigation.navigate('SignIn')}><Text>Back to Sign In</Text></TouchableOpacity></View>
            </View>
            
            </View>
        </ImageBackground>

    );

};

export default ConfirmCodeScreen;

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