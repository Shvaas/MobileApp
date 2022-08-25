import React, {FC, ReactElement} from 'react';
import {Button} from 'react-native-elements';
import {StyleSheet, TouchableOpacity} from 'react-native';

// Local
import {ButtonProps} from './types';
import {themeColor, themeFontFamily, themefonts} from '../../constants/theme';

const SecondaryButton: FC<ButtonProps> = (props): ReactElement => {
  return (
    <Button
      titleStyle={[styles.buttonTitle, props.titleStyle]}
      buttonStyle={[styles.secondaryButton, styles.border, props?.buttonStyle]}
      title={props.title}
      onPress={props.onPress}
      containerStyle={props?.containerStyle}
      TouchableComponent={TouchableOpacity}
    />
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  buttonTitle: {
    fontFamily: themeFontFamily.raleway,
    color: themeColor.vividRed,
    fontSize: themefonts.font14,
    lineHeight: 16,
  },
  secondaryButton: {
    backgroundColor: themeColor.transparent,
    height: 42,
  },
  border: {
    borderColor: themeColor.vividRed,
    borderRadius: 6,
    borderWidth: 0.5,
  },
});
