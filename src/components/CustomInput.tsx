import React from 'react';
import {StyleSheet,TextInput, View,Text} from 'react-native';
import {Controller} from 'react-hook-form';

interface PropsType {
    placeholder: string,
    value : any,
    setValue : any,
    secureTextEntry: boolean,
    rules: any,
    control: any,
    name: any,
  }

const CustomInput: React.FC<PropsType> = ({placeholder, value, setValue, control, name, rules, secureTextEntry=false}) => {
    console.log(value);
  return (
    // <View style = {styles.container}>
    // <Controller
    //     control={control}
    //     rules={rules}
    //     render={({ field: {onBlur, value }, fieldState: {error}}) => (
    //         <>
    //         <View
    //         style={[
    //           styles.container,
    //           {borderColor: error ? 'red' : '#e8e8e8'},
    //         ]}>
    //         <TextInput
    //         value={value}
    //         onChangeText={setValue}
    //         placeholder={placeholder}
    //         style={styles.input}
    //         secureTextEntry={secureTextEntry}
    //         onBlur={onBlur}
    //         />
    //         </View>
    //         {error?
    //         <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>:
    //         null
    //         }
    //         </>
    //         )}
    //     name={name}
    //   />
      // </View>

      <View style = {styles.container}>
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            />
      </View>
    )
};

export default CustomInput;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width: '100%',
        borderColor:'#e8e8e8',
        borderWidth:1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },

    input:{
        height: 40,
    }
});