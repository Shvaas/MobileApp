import {ImageBackground, StyleSheet} from 'react-native';
import React from 'react';

// local
import {backgroundImage} from '../images/imageLinks';

interface PropsType {
  children: JSX.Element;
}

const BackgroundImage: React.FC<PropsType> = ({children}) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.image}>
      {children}
    </ImageBackground>
  );
};

export default BackgroundImage;

const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    height: 500,
  },
});
