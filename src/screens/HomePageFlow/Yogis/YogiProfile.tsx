import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-reanimated-carousel';
import 'react-native-gesture-handler';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import RouteNames from '../../../constants/routeName';

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
  const {image, name, certificates, yearsOfExp, studentsTrained, reviews, rating, description} =
    yogiProfile;

  const getCarouselItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemTopContainer}>
          <Image source={item.image} style={styles.carousalImage} />
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <Text style={styles.itemReview}>{item.review}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundImage>
        <Image source={image} style={styles.imageStyle} />
        <PrimaryButton
          title="Book an appointment"
          onPress={() => {navigation.navigate(RouteNames.HomePageFlow.CalendarPage,yogiProfile)}}
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
          <Text style={styles.textStyle}>Rating: {rating} years</Text>
          <Text style={styles.textStyle}>Experience: {yearsOfExp} years</Text>
          <Text style={styles.textStyle}>{certificates}</Text>
          <Text style={styles.textStyle}>
            Students trained: {studentsTrained}
          </Text>
        </View>
        <View style={styles.descriptionContainerStyle}>
          <Text style={styles.textStyle}>{description}</Text>
        </View>
        <Carousel
          data={reviews}
          renderItem={getCarouselItem}
          loop
          style={styles.carouselContainer}
          width={wp(88)}
          height={220}
        />
        <PrimaryButton
          title="Go Back"
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
    justifyContent: 'center',
    backgroundColor: themeColor.background,
  },
  buttonStyle: {
    width: 167,
  },
  imageStyle: {
    borderColor: themeColor.vividRed,
    borderWidth: 2,
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
    // borderColor: themeColor.vividRed,
    // borderWidth: 1,
    borderRadius: 12,
    width: '70%',
    backgroundColor: themeColor.background,
  },
  descriptionContainerStyle: {
    marginBottom: 20,
    alignSelf: 'center',
    marginHorizontal: 26,
    padding: 15,
    // borderColor: themeColor.vividRed,
    // borderWidth: 1,
    borderRadius: 12,
    width: '90%',
    backgroundColor: themeColor.background,
  },
  textStyle: {
    fontFamily: themeFontFamily.raleway,
    fontSize: themefonts.font16,
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
  carouselContainer: {
    marginVertical: 20,
    width: '100%',
  },
  itemContainer: {
    padding: 20,
    borderRadius: 8,
    borderColor: themeColor.vividRed,
    borderWidth: 1,
    backgroundColor: themeColor.background,
    flex: 1,
    marginRight: 10,
    marginLeft: 5,
  },
  itemTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  carousalImage: {
    borderColor: themeColor.vividRed,
    borderWidth: 2,
    borderRadius: 50,
    height: 60,
    width: 60,
    resizeMode: 'cover',
  },
  itemName: {
    fontFamily: themeFontFamily.ralewayBold,
    fontSize: themefonts.font16,
    marginLeft: 10,
  },
  itemReview: {
    fontFamily: themeFontFamily.raleway,
    fontSize: themefonts.font14,
    marginLeft: 10,
  },
});
