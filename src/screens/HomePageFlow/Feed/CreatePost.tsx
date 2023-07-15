import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {Amplify, Storage} from 'aws-amplify';


import BackgroundImage from '../../../common/BackgroundImage';
import {
  themeFontFamily,
  themefonts,
  themeColor,
} from '../../../constants/theme';
import {Button, Image} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {ScrollView} from 'react-native-gesture-handler';
import SecondaryButton from '../../../common/buttons/SecondaryButton';
import PrimaryButton from '../../../common/buttons/PrimaryButton';
import LoginButton from '../../../common/buttons/LoginButton';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import s3Storage from '../../../aws-exports';
// Amplify.configure(s3Storage);

interface PropsType {
  navigation: any;
  route: any;
}

const CreatePost: React.FC<PropsType> = ({navigation}) => {
  const [caption, onCaptionChange] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState(null);





  const [asset, setAsset] = useState(null);
  const [progressText, setProgressText] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const selectFile = async () => {
    await launchImageLibrary({mediaType: 'mixed'}, result => {
      if (!result.assets) {
        Alert.alert(result.errorMessage);
        return;
      }
      setProgressText('');
      setAsset(result.assets[0]);
    });
  };

  const fetchResourceFromURI = async uri => {
    const response = await fetch(uri);
    console.log(response);
    const blob = await response.blob();
    return blob;
  };

  const uploadResource = async () => {
    console.log('uploadResource');
    navigation.goBack()
    // if (isLoading) return;
    // setisLoading(true);

    const response = await fetch(image);
    const imgblob = await response.blob();
    console.log('got blob');
    
    return Storage.put(image, imgblob, {
      level: 'public',
      progressCallback(uploadProgress) {
        setProgressText(
          `Progress: ${Math.round(
            (uploadProgress.loaded / uploadProgress.total) * 100,
          )} %`,
        );
        console.log(
          `Progress: ${uploadProgress.loaded}/${uploadProgress.total}`,
        );
      },
    })
      .then(res => {
        setProgressText('Upload Done: 100%');
        setAsset(null);
        setisLoading(false);
        Storage.get(res.key)
          .then(result => console.log('Success : ', result))
          .catch(err => {
            setProgressText('Upload Error');
            console.log('Error : ',err);
          });
      })
      .catch(err => {
        setisLoading(false);
        setProgressText('Upload Error');
        console.log('Error : ', err);
      });
  };




  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'any',
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
      setImageUrl(image.sourceURL);
    //   this.bs.current.snapTo(1);
    });
  };


  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'any',
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  const savePost = () => {
    navigation.goBack()
  };

  return (
    
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
      <ScrollView>
        {image.length > 0 && (
          <Image source={{uri: image}} style={styles.image} />
        )}
        <TextInput
          style={styles.input}
          onChangeText={onCaptionChange}
          value={caption}
          placeholder="What are you thinking?"
          multiline
        />

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Upload"
            onPress={choosePhotoFromLibrary}
            buttonStyle={styles.buttonStyle}
          />
          <PrimaryButton
            title="Post"
            onPress={uploadResource}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
    
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: themeColor.background,
  },
  input: {
    height: 150,
    width: Dimensions.get('window').width - 10,
    backgroundColor: themeColor.white,
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  image: {
    height: 300,
    width: Dimensions.get('window').width - 10,
    margin: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },
  heading: {
    fontSize: themefonts.font32,
    textAlign: 'center',
    fontFamily: themeFontFamily.raleway,
    color: themeColor.white,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
  },
  buttonStyle: {
    width: 150,
    marginHorizontal: 10,
  },
  btnContainerStyle: {
    alignSelf: 'center',
  },
});
