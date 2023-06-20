import React, {FC, ReactElement} from 'react';
import {Button} from 'react-native-elements';
import {StyleSheet, TouchableOpacity} from 'react-native';

// Local
import {ButtonProps} from './types';
import {themeColor, themeFontFamily, themefonts} from '../../constants/theme';

const SimpleButton: FC<ButtonProps> = (props): ReactElement => {
  return (
      <Button
        titleStyle={[styles.buttonTitle, props.titleStyle]}
        buttonStyle={[
          styles.simpleButton,
          styles.border,
          props?.buttonStyle,
        ]}
        title={props.title}
        onPress={props.onPress}
        TouchableComponent={TouchableOpacity}
        containerStyle={props?.containerStyle}
        disabled = {props.disabled}
      />
  );
};

export default SimpleButton;

const styles = StyleSheet.create({
  buttonTitle: {
    fontFamily: themeFontFamily.ralewayMedium,
    color: themeColor.vividRed,
    fontSize: themefonts.font14,
    lineHeight: 16,
  },
  simpleButton: {
    backgroundColor: themeColor.white,
    height: 42,
    margin: 1,
  },
  border: {
    borderRadius: 6,
    borderColor: themeColor.vividRed,
    borderWidth:0.5
  },
});
