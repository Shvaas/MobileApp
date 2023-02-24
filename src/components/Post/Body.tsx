import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Dimensions } from 'react-native';


interface PropsType {
    imageUri : ImageSourcePropType,
  }


const Body: React.FC<PropsType> = ({imageUri}) => {
    return (
         
        <Image source={ imageUri } style={styles.image}/>
      );
  };

export default Body;

const styles = StyleSheet.create({
    image: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width,
    }
  })
  
