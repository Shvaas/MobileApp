import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React from 'react';
  
  // local
  import SecondaryButton from '../../../../common/buttons/SecondaryButton';
  import {themeFontFamily, themefonts} from '../../../../constants/theme';
  
  interface PropsType {
    onButtonPress_Login: () => void;
    onButtonPress_Home: () => void;
  }
  
  const BottomComponent: React.FC<PropsType> = ({onButtonPress_Login,onButtonPress_Home}) => {
    const translateYAnimate = React.useRef(
      new Animated.Value(Dimensions.get('screen').height / 3),
    ).current;
  
    React.useEffect(() => {
      Animated.timing(translateYAnimate, {
        duration: 1500,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }, [translateYAnimate]);
  
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {transform: [{translateY: translateYAnimate}]},
          ]}>
          <SecondaryButton
            title={'Tap to Login'}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.btnContainerStyle}
            onPress={onButtonPress_Login}
          />
          <SecondaryButton
            title={'Skip Login'}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.btnContainerStyle}
            onPress={onButtonPress_Home}
          />
        </Animated.View>
      </View>
    );
  };
  
  export default BottomComponent;
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-end',
      padding: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    animatedContainer: {
      padding: 10,
      paddingBottom: 50,
    },
    heading: {
      fontSize: themefonts.font16,
      textAlign: 'center',
      marginTop: 25,
      marginBottom: 40,
      fontFamily: themeFontFamily.raleway,
      lineHeight: 27,
    },
    image: {
      alignSelf: 'center',
      width: 22,
      height: 24,
    },
    buttonStyle: {
      width: 167,
    },
    btnContainerStyle: {
      alignSelf: 'center',
    },
  });