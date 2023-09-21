import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity} from 'react-native';
import CustomInput from '../components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import SimpleButton from '../common/buttons/SimpleButton';

const NewPasswordScreen = ({navigation}) => {

    const {
        control,
        handleSubmit,
        formState: {errors},
      } = useForm();

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
          control={control}
          name="email"
          rules={{required: 'Email is required'}}
        />

        <CustomInput
          placeholder="Code"
          value={code}
          setValue={setCode}
          name="code"
          control={control}
          rules={{required: 'Code is required'}}
        />

        <CustomInput
          placeholder="Enter your new password"
          value={password}
          setValue={setPassword}
          secureTextEntry
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />

        <SimpleButton
            title='Submit'
            containerStyle={styles.primaryButton}
            onPress={handleSubmit(onSubmitPressed)}
        />

<       View style={{flexDirection:'row',justifyContent:'space-around',width:'80%',marginVertical:20}}>
            <View><TouchableOpacity onPress={() => navigation.navigate("SignIn")}><Text>Back to Sign In</Text></TouchableOpacity></View>
        </View>
      </View>
    </ScrollView>
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
  primaryButton: {margin: 16,width: 150,alignSelf:'center'},
});