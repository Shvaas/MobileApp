/**
 * This file contains types, interface related to buttons.
 */

import {ViewStyle, StyleProp, TextStyle} from 'react-native';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}
