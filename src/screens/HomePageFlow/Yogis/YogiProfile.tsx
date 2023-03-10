import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import BackgroundImage from '../../../common/BackgroundImage';
import {
  themeFontFamily,
  themefonts,
  themeColor,
} from '../../../constants/theme';
import PrimaryButton from '../../../common/buttons/PrimaryButton';

interface PropsType {
  navigation: any;
  route: any;
}

const Yogi: React.FC<PropsType> = ({route, navigation}) => {
  const {yogiProfile} = route.params;

  const {image, name, certificates, yearsOfExp, studentsTrained} = yogiProfile;

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundImage>
        <Image source={image} style={styles.imageStyle} />
        <PrimaryButton
          title="Book an appointment"
          onPress={() => {}}
          containerStyle={styles.secondaryButton}
        />
        <View style={styles.textContainerStyle}>
          <View style={styles.headingContainer}>
            <Text style={styles.textStyleBold}>{name}</Text>
            <View style={styles.iconContainer}>
              <FontAwesome
                name="facebook-square"
                size={29}
                style={styles.fbIcon}
              />
              <FontAwesome
                name="instagram"
                size={30}
                color={themeColor.vividRed}
              />
            </View>
          </View>
          <Text style={styles.textStyle}>Experience: {yearsOfExp} years</Text>
          <Text style={styles.textStyle}>{certificates}</Text>
          <Text style={styles.textStyle}>
            Students trained: {studentsTrained}
          </Text>
        </View>
        <PrimaryButton
          title="Enroll"
          onPress={() => {
            navigation.goBack();
          }}
          containerStyle={styles.primaryButton}
        />
      </BackgroundImage>
    </SafeAreaView>
  );
};

export default Yogi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: themeColor.background,
  },
  buttonStyle: {
    width: 167,
  },
  imageStyle: {
    borderRadius: 50,
    height: 100,
    width: 100,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  secondaryButton: {marginVertical: 20, alignSelf: 'center'},
  primaryButton: {marginHorizontal: 16},
  textContainerStyle: {
    marginBottom: 20,
    alignSelf: 'center',
    marginHorizontal: 26,
    padding: 15,
    borderColor: themeColor.vividRed,
    borderWidth: 1,
    borderRadius: 6,
    width: '70%',
  },
  textStyle: {
    fontFamily: themeFontFamily.raleway,
    fontSize: themefonts.font18,
    margin: 1,
  },
  textStyleBold: {
    fontFamily: themeFontFamily.ralewayBold,
    fontSize: themefonts.font22,
    marginBottom: 1,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  fbIcon: {
    color: '#4267B2',
    marginRight: 5,
  },
});
