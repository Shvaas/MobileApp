import { Image, ImageSourcePropType, View, StyleSheet } from 'react-native';
  import React from 'react';

  // local
  import {themeColor} from '../constants/theme';
  
  interface PropsType {
    uri : ImageSourcePropType,
    size: number
  }
  
  const ProfilePicture: React.FC<PropsType> = ({uri, size=70}) => {
    return (
         
        <View style={[styles.container, { width: size + 6, height: size + 6 }]}>
            <Image source={ uri } style={[styles.image, { width: size, height: size }]}/>
        </View>
      );
  };

  export default ProfilePicture;

  const styles = StyleSheet.create({
    container: {
      margin: 7,
      borderRadius: 40,
      borderWidth: 3,
      borderColor: themeColor.vividRed,
    },
    image: {
      borderRadius: 40,
      borderWidth: 1,
      borderColor: themeColor.white,
    }
  });