import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Rating} from 'react-native-elements';

// local
import {
  themeColor,
  themeFontFamily,
  themefonts,
} from '../../../../constants/theme';
import PrimaryButton from '../../../../common/buttons/PrimaryButton';
import RouteNames from '../../../../constants/routeName';

interface PropsType {
  navigation: any;
  profile: object;
  onButtonPress: any;
}

const ProfileCardView: React.FC<PropsType> = ({profile, onButtonPress, navigation}) => {
  const {
    image,
    name,
    certificates,
    yearsOfExp,
    rating,
    studentsTrained,
    interest,
  } = profile;

  return (
    <View style={styles.container}>
      <View style={styles.internalContainer}>
        <Image source={image} style={styles.imageStyle} />
        <View style={styles.textContainerStyle}>
          <Text style={styles.textStyleBold}>{name}</Text>
          <Rating
            readonly
            // type="custom"
            // ratingColor={themeColor.vividRed}
            // tintColor={themeColor.white}
            imageSize={18}
            startingValue={rating}
            style={styles.ratings}
          />
          <Text style={styles.textStyle}>Experience: {yearsOfExp}</Text>
          <Text style={styles.textStyle}>{certificates}</Text>
          <Text style={styles.textStyle}>
            Students trained: {studentsTrained}
          </Text>
        </View>
      </View>
      <View style={styles.chipContainer}>
        {interest.map((item: string) => {
          return (
            <View style={styles.chip} key={item}>
              <Text style={styles.chipText}>{item}</Text>
            </View>
          );
        })}
      </View>
      <PrimaryButton title="Book Now" onPress={() => {onButtonPress()}} containerStyle={{}} />
    </View>
  );
};

export default ProfileCardView;

const styles = StyleSheet.create({
  container: {
    margin: '2.5%',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      width: -4,
      height: 4,
    },
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  internalContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  imageStyle: {
    borderColor: themeColor.vividRed,
    borderWidth: 2,
    borderRadius: 50,
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  textStyle: {
    fontFamily: themeFontFamily.raleway,
    lineHeight: 15,
    fontSize: themefonts.font14,
    margin: 1,
  },
  textStyleBold: {
    fontFamily: themeFontFamily.ralewayBold,
    lineHeight: 15,
    fontSize: themefonts.font16,
    marginBottom: 1,
  },
  textContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
  },
  chipContainer: {
    marginBottom: 10,
    borderRadius: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  chip: {
    padding: 5,
    margin: 5,
    borderColor: themeColor.vividRed,
    borderWidth: 1,
    borderRadius: 6,
  },
  chipText: {
    fontFamily: themeFontFamily.ralewayBold,
    color: themeColor.vividRed,
    fontSize: themefonts.font12,
  },
  ratings: {
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
});
