import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Dimensions } from 'react-native';
import Video from "react-native-video";
import myvideo from '../../images/Shvaas_presentation.mp4'

interface PropsType {
    imageUri : any,
  }


const Body: React.FC<PropsType> = ({imageUri}) => {
    return (
        <Video  source={{uri:imageUri}} style={styles.image}/>
        // <Image source={ imageUri } style={styles.image}/>
      );
  };

export default Body;

const styles = StyleSheet.create({
    image: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width,
    }
  })
  
