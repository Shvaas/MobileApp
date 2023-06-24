/* eslint-disable prettier/prettier */
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Animated,
    useWindowDimensions
  } from 'react-native';
 import React, { Component } from 'react';
 import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';

 interface PropsType {
    data: any;
  }
  
  const Paginator = ({data, scrollX}) => {
    const {width} = useWindowDimensions();

    return (
        <View style={{flexDirection:'row', height:64}}>
            {
                data.map((i)=>{
                    const inputRange = [(i-1) * width, i * width, (i+1) * width]
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [10,20,10],
                        extrapolate: 'clamp',
                    });
                    const dotOpacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3,1,0.3],
                        extrapolate: 'clamp',
                    });
                    return <Animated.View  style={[style.dot, {width: dotWidth, opacity: dotOpacity }]} key={i.toString()}/>
                })
            }

        </View>
    )
  };
  export default Paginator;

  const style = StyleSheet.create({
      dot: {
          height: 10,
          borderRadius: 5,
          marginHorizontal: 10,
          backgroundColor: themeColor.vividRed
      }
  })