/* eslint-disable prettier/prettier */
import {Image, SafeAreaView, StyleSheet, 
  Text, View, TouchableOpacity, ImageBackground, ActivityIndicator} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-reanimated-carousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import RouteNames from '../../../constants/routeName';
import { backButton, backgroundImageMedium, backgroundImageLight } from '../../../images/imageLinks';

import BackgroundImage from '../../../common/BackgroundImage';
import {
  themeFontFamily,
  themefonts,
  themeColor,
} from '../../../constants/theme';
import PrimaryButton from '../../../common/buttons/PrimaryButton';

import { Rating } from 'react-native-ratings';
import SecondaryButton from '../../../common/buttons/SecondaryButton';
import SimpleButton from '../../../common/buttons/SimpleButton';

import { useGetTeacherDetailQuery} from '../../../store/apiSlice';
import {useDispatch, useSelector} from 'react-redux';
import {yogiSlice, YogiSelector} from '../../../store/yogiSlice';
interface PropsType {
  navigation: any;
  route: any;
}

const Yogi: React.FC<PropsType> = ({route, navigation}) => {
  const {yogiProfile} = route.params;
  const {image, name, certificates, yearsOfExp, studentsTrained, reviews, rating, description, userId} =
    yogiProfile;

    console.log("userId", userId);
    
  const {data, error,isLoading} = useGetTeacherDetailQuery(userId);
  const dispatch = useDispatch();

  if (isLoading && name==null) {
    return <ActivityIndicator />;
  }

  React.useEffect(() => {
    if (data){
      dispatch(yogiSlice.actions.addYogiDetail(data?.data));
    }
  }, [data, dispatch]);
  
  const getCarouselItem = ({item}) => {
    return (
      <View style={styles.textContainerStyle}>
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
      <ImageBackground source={backgroundImageLight} style={styles.image}>
        <GestureHandlerRootView style={{marginTop:0}}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image source={backButton} style={styles.backbutton}/>
          </TouchableOpacity>
        </GestureHandlerRootView>

        <Image source={image} style={styles.imageStyle} />
        <View style={{flexDirection:'row', alignItems:'center' , justifyContent:'center'}}>
            <Text style={styles.usernameText}>{name}</Text>
        </View>
        
        <View style={{flexDirection:'row', alignItems:'center' , justifyContent:'center'}}>
          <Rating
            type='custom'
              readonly
              // type="custom"
              ratingColor={'#FD7C23'}
              tintColor='none'
              imageSize={18}
              startingValue={rating}
              style={styles.ratings}
            />
            <Text style={{fontFamily:themeFontFamily.raleway, fontSize:themefonts.font12}}> (12 ratings)</Text>
          
        </View>


          <View style={{flexDirection:'row'}}>
          <View style={{marginHorizontal:10, marginTop:20}}>
              <Text style={styles.textStyle}>Experience: {yearsOfExp} years</Text>
              <Text style={styles.textStyle}>{certificates}</Text>
              <Text style={styles.textStyle}>Students trained: {studentsTrained}</Text>
          </View>
          <View style={{ marginTop:0, flex:1}}>
            <SimpleButton
            title="Book session"
            onPress={() => {navigation.navigate(RouteNames.HomePageFlow.CalendarPage, {userId: userId})}}
              containerStyle={styles.primaryButton}
            />
          </View>
          </View>

        <View style={{marginHorizontal:10}}>
          <View style={{flexDirection:'row', marginBottom:5}}>
            <Text style={styles.textStyle}>Connect on: </Text>
            <FontAwesome name="facebook-square" size={20} style={styles.fbIcon} />
            <FontAwesome name="instagram" size={20} color={themeColor.vividRed} />
        </View>
          <Text style={styles.textStyle}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vita 
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vita
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vita
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur 
          </Text>
        </View>


        <GestureHandlerRootView style={{justifyContent: 'flex-end', flex:1 , alignItems:'center'}}>
          <Carousel
            data={reviews}
            renderItem={getCarouselItem}
            loop
            style={styles.carouselContainer}
            width={wp(88)}
            height={220}
          />
        </GestureHandlerRootView>

      </ImageBackground>
    </SafeAreaView>
  );
};

export default Yogi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: themeColor.white,
  },
  textContainerStyle: {
    margin: 10,
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
    opacity: 0.78
  },

  usernameText: {
    alignSelf: 'center',
    fontSize: themefonts.font22,
    fontFamily: themeFontFamily.ralewayBold,
    color: '#313131',
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
  primaryButton: {marginHorizontal: 10, width: 150, alignSelf:'flex-end',marginVertical: 20},

 

  textStyle: {
    fontFamily: themeFontFamily.raleway,
    fontSize: themefonts.font16,
    textAlign: 'justify',
    margin: 1,
  },


  fbIcon: {
    color: '#4267B2',
    marginHorizontal: 10,
  },

  carouselContainer: {
    marginVertical: 20,
    width: '100%',
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

  ratings: {
    alignSelf: 'flex-start',
    marginBottom: 4,
    backgroundColor: 'black'
  },

  topContainer: {
    flexDirection: 'row',
    flex: 0.1,
  },

  backbutton: {
    margin: 0,
    marginLeft: 10,
  },

  image: {
    height: "100%",
    width:"100%",
    flex: 1,
  },

});
