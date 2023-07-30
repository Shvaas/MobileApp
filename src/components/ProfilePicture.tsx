import { Image, ImageSourcePropType, View, StyleSheet } from 'react-native';
  import React from 'react';

  // local
  import {themeColor} from '../constants/theme';
  
  interface PropsType {
    uri : ImageSourcePropType,
    size: number,
    borderWidth: number,
  }
  
  // eslint-disable-next-line prettier/prettier
  const ProfilePicture: React.FC<PropsType> = ({uri, size=70, borderWidth=3, borderColor=themeColor.vividRed}) => {
    return (
        <View style={[styles.container, { borderColor: borderColor, width: size + 2*borderWidth, height: size + 2*borderWidth , borderWidth: borderWidth}]}>
            <Image source={{uri: uri}} style={[styles.image, { width: size, height: size }]}/>
        </View>
      );
  };

  export default ProfilePicture;

  const styles = StyleSheet.create({
    container: {
      margin: 7,
      borderRadius: 40,
      alignItems: 'center',
      borderColor: themeColor.vividRed,
    },
    image: {
      borderRadius: 40,
      borderWidth: 1,
      borderColor: themeColor.white,
    }
  });