import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {themeFontFamily, themefonts,themeColor} from '../../constants/theme';

import Video from 'react-native-video';
import myvideo from '../../images/Shvaas_presentation.mp4'

interface PropsType {
  imageUri: any;
  play: boolean;
  bodytype: number;
  caption: string;
}

// bodytype == 1 Text
// bodytype == 2 Image
// bodytype == 3 Video

const Body: React.FC<PropsType> = ({imageUri, play, bodytype, caption}) => {
  // const video = bodytype == 3;
  // const image1 = bodytype == 2;
  // const text = bodytype == 1;
  
  if (bodytype == 3) {
    return (
      <Video
        source={{uri: imageUri}}
        style={styles.image}
        muted
        controls={true} resizeMode={'stretch'} paused={!play}/>
    )}
  else if (bodytype == 2) {
    return <Image source={{uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg'}} style={styles.image} />;
  } else if (bodytype == 1) {
    return <Text style={styles.text}>{caption}</Text>;
   }
  };

export default Body;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  text: {
    width: Dimensions.get('window').width,
    margin: 10,
    fontFamily: themeFontFamily.raleway,
    fontSize: themefonts.font24,
  },
});
