import React, {FC, ReactElement} from 'react';
import {Button} from 'react-native-elements';
import {StyleSheet, TouchableOpacity} from 'react-native';

// Local
import {ButtonProps} from './types';
import {themeColor, themeFontFamily, themefonts} from '../../constants/theme';

const PrimaryButton: FC<ButtonProps> = (props): ReactElement => {
  return (
    <Button
      titleStyle={[styles.buttonTitle, props.titleStyle]}
      buttonStyle={[styles.primaryButton, styles.border, props?.buttonStyle]}
      title={props.title}
      onPress={props.onPress}
      containerStyle={props?.containerStyle}
      TouchableComponent={TouchableOpacity}
    />
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonTitle: {
    fontFamily: themeFontFamily.ralewayMedium,
    color: themeColor.white,
    fontSize: themefonts.font14,
    lineHeight: 16,
  },
  primaryButton: {
    backgroundColor: themeColor.vividRed,
    height: 42,
    margin: 1,
  },
  border: {
    borderRadius: 6,
  },
});
