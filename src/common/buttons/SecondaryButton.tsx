import React, {FC, ReactElement} from 'react';
import {Button} from 'react-native-elements';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Local
import {ButtonProps} from './types';
import {themeColor, themeFontFamily, themefonts} from '../../constants/theme';

const SecondaryButton: FC<ButtonProps> = (props): ReactElement => {
  return (
    <LinearGradient
      colors={[`${themeColor.vividRed}21`, themeColor.vividRed]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={[styles.border, props?.containerStyle]}>
      <Button
        titleStyle={[styles.buttonTitle, props.titleStyle]}
        buttonStyle={[
          styles.secondaryButton,
          styles.border,
          props?.buttonStyle,
        ]}
        title={props.title}
        onPress={props.onPress}
        TouchableComponent={TouchableOpacity}
      />
    </LinearGradient>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  buttonTitle: {
    fontFamily: themeFontFamily.ralewayMedium,
    color: themeColor.vividRed,
    fontSize: themefonts.font14,
    lineHeight: 16,
  },
  secondaryButton: {
    backgroundColor: themeColor.white,
    height: 42,
    margin: 1,
  },
  border: {
    borderRadius: 6,
  },
});
