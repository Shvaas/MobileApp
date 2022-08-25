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
import {earphones} from '../../../../images/imageLinks';
import SecondaryButton from '../../../../common/buttons/SecondaryButton';
import {themeFontFamily, themefonts} from '../../../../constants/theme';

const BottomConent = () => {
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
        <Image style={styles.image} source={earphones} />
        <Text style={styles.heading}>
          Use your earphones for{'\n'}a better experience
        </Text>
        <SecondaryButton
          title={'Tap to Begin'}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.btnContainerStyle}
          onPress={() => {}}
        />
      </Animated.View>
    </View>
  );
};

export default BottomConent;

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
