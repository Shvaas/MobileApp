import {ImageBackground, StyleSheet} from 'react-native';
import React from 'react';

// local
import {backgroundImage} from '../images/imageLinks';

interface PropsType {
  children: React.ReactNode;
}

const BackgroundImageFullPage: React.FC<PropsType> = ({children}) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.image}>
      {children}
    </ImageBackground>
  );
};

export default BackgroundImageFullPage;

const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    height: "100%",
  },
});
