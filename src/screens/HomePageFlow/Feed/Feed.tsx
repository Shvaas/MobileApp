/* eslint-disable prettier/prettier */
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Button,
    ActivityIndicator,
    TextInput,
    Image
  } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {utkarsh} from '../../../images/imageLinks';
import { useState, useCallback, useMemo, useRef } from "react";
import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import Post from '../../../components/Post';
import RouteNames from '../../../constants/routeName';
import {Storage,Auth} from "aws-amplify";

// import BottomSheet from '@gorhom/bottom-sheet';
// import {GestureHandlerRootView} from 'react-native-gesture-handler'

// import { DataStore } from 'aws-amplify';
// import { SQLiteAdapter } from '@aws-amplify/datastore-storage-adapter/SQLiteAdapter';
// import { Post as Postdb } from '../../../models'

import {useDispatch, useSelector} from 'react-redux';



// import { Amplify, Auth, Storage } from 'aws-amplify';

// Amplify.configure({
//   Auth: {
//     identityPoolId: 'us-west-2:47feb859-001b-45f3-bfac-5d5bd6f48313', //REQUIRED - Amazon Cognito Identity Pool ID
//     region: 'us-west-2', // REQUIRED - Amazon Cognito Region
//     userPoolId: 'us-west-2_HVpUfyqbJ', //OPTIONAL - Amazon Cognito User Pool ID
//     userPoolWebClientId: '4qvrcs0tkf7grletcl0bdfrpr', //OPTIONAL - Amazon Cognito Web Client ID
//   },
//   Storage: {
//     AWSS3: {
//       bucket: 'shvaas-user-feed', //REQUIRED -  Amazon S3 bucket name
//       region: 'us-west-2', //OPTIONAL -  Amazon service region
//     }
//   }
// });


import {useGetPostsQuery} from '../../../store/apiSlice';

var RNFS = require('react-native-fs');

import { postSlice } from '../../../store/postSlice';

// DataStore.configure({
//   storageAdapter: SQLiteAdapter
// });

interface PropsType {
    navigation: any;
}



const Feed: React.FC<PropsType> = ({navigation}) => {


  const [visibleItemIndex, setVisibleItemIndex] = useState(0);
  const [searchText, setSearchText] = useState("");

  const trackItem = (item) =>
    console.log("### track " + item.user.name);



const ViewableItemsChanged = useCallback(
  (info: { changed: ViewToken[] }): void => {
    const visibleItems = info.changed.filter((entry) => entry.isViewable);
    if (visibleItems && visibleItems.length !== 0) {
      setVisibleItemIndex(visibleItems[0].index);
      console.log("index", visibleItems[0].index);
    }
    // visibleItems.forEach((visible) => {
    //   trackItem(visible.item);
    // });
  },
  []
);

  // let post = useSelector((state) => state.posts.posts);

  const {data,error,isLoading} = useGetPostsQuery();

  const dispatch = useDispatch();

  console.log(1, RNFS.DocumentDirectoryPath);
  
  React.useEffect(() => {
    // downloadVideo("https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")
  }, []);

  const post = useSelector((state) => state.posts.posts);
  console.log("before loading post", post.length);


  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.error}</Text>;
  }

  if (data){
    console.log("data", data.data);
  }
  const data1 = [{"caption": "First post everrr!", "createdDate": 1680772845, "dummy": [Array], "fileURL": "s3://shvaas-user-feed/test2.jpeg", "postId": "d4668569-4590-4787-9c11-4158fdaa9bd3", "reactions": [Object], "userId": "313cbfd3-4fc1-4763-9d18-caedd0be4a63", "userName": "Asif Hasnain", "userProfilePic": "test1.jpeg", "userType": "INSTRUCTOR"}, {"caption": "First post everrr!", "createdDate": 1681075969, "dummy": [Array], "fileURL": "test2.jpeg", "postId": "afb1bac4-321e-4966-8e11-a7c8a11e4698", "reactions": [Object], "userId": "313cbfd3-4fc1-4763-9d18-caedd0be4a63", "userName": "Asif Hasnain", "userProfilePic": "test1.jpeg", "userType": "INSTRUCTOR"}, {"caption": "First post everrr!", "createdDate": 1681072759, "dummy": [Array], "fileURL": "testing.jpg", "postId": "85eb38ee-ffb0-49ee-9f82-410c523f6b8c", "reactions": [Object], "userId": "313cbfd3-4fc1-4763-9d18-caedd0be4a63", "userName": "Asif Hasnain", "userProfilePic": "test1.jpeg", "userType": "INSTRUCTOR"}, {"caption": "First post everrr!", "createdDate": 1681072466, "dummy": [Array], "fileURL": "test2.jpeg", "postId": "696b4303-e2a3-4557-a4c8-8b2e678de3e8", "reactions": [Object], "userId": "313cbfd3-4fc1-4763-9d18-caedd0be4a63", "userName": "Asif Hasnain", "userProfilePic": "test1.jpeg", "userType": "INSTRUCTOR"}, {"caption": "test1", "comments": [Array], "createdDate": 1680414428, "dummy": [Array], "postId": "37f1687e-ce62-4076-b075-7c338bdf4034", "reactions": [Object], "userId": "313cbfd3-4fc1-4763-9d18-caedd0be4a63", "userName": "Asif Hasnain", "userProfilePic": "test1.jpeg", "userType": "INSTRUCTOR"}, {"caption": "test", "createdDate": 1677736028, "dummy": [Array], "fileURL": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", "postId": "0cf4ad69-2c79-456e-a574-0b30ad52256b", "reactions": [Object], "userId": "313cbfd3-4fc1-4763-9d18-caedd0be4a63", "userName": "Asif Hasnain", "userProfilePic": "test1.jpeg", "userType": "INSTRUCTOR"}]
  // 

  if (post.length === 0){
    dispatch(postSlice.actions.initialPost(data?.data.slice(0,-1)));
  }

  // let post = null;
  // if (data){
  //   post = data.data.slice(0, -1);
  //   // console.log(post)
  // }




async function downloadVideo(videoUrl: string){
  let filename = videoUrl.substring(videoUrl.lastIndexOf("/") + 1, videoUrl.length);
  let path_name = RNFS.DocumentDirectoryPath + filename;
  console.log(path_name);

  RNFS.exists(path_name).then(exists => {
    if (exists) {
      console.log("Already downloaded");
    } else {
      RNFS.downloadFile({
        fromUrl: videoUrl,
        toFile: path_name.replace(/%20/g, "_"),
        background: true
      })
        .promise.then(res => {
          console.log("File Downloaded", res);
        })
        .catch(err => {
          console.log("err downloadFile", err);
        });
    }
  });
}

// /Users/utkarshnath/Library/Developer/CoreSimulator/Devices/611BC7CB-329F-456B-9701-216C58A90541/data/Containers/Data/Application/47BA8D82-FA43-4D65-9E2B-DE82B9D1CDAB/DocumentsBigBuckBunny.mp4
// async function getVideo(filename:string) {
//   let fileName = videoURL.substring(videoURL.lastIndexOf("/") + 1, videoURL.length);

// this.getVideoUrl(videoURL, fileName)
//   .then(res => {
//     this.setState({ videoUri: res });
//   })
//   .catch(url => {
//     this.setState({ videoUri: url });
//   });


// getVideoUrl = (url, filename) => {
//   return new Promise((resolve, reject) => {
//     RNFS.readDir(RNFS.DocumentDirectoryPath)
//       .then(result => {
//         result.forEach(element => {
//           if (element.name == filename.replace(/%20/g, "_")) {
//             resolve(element.path);
//           }
//         });
//       })
//       .catch(err => {
//         reject(url);
//       });
//   });
// };
// }

// createPost()
// createPost()



//   const getRequest = () => {
//     axios.get('https://6sm5d5xzu8.execute-api.us-west-2.amazonaws.com/stage/feed/313cbfd3-4fc1-4763-9d18-caedd0be4a63')
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// };

const reinisiallizepost = () => {
  dispatch(postSlice.actions.initialPost(data.data.slice(0, -1)));
};

const uploadFile = async () => {
  Auth.currentAuthenticatedUser().then((user) => {
    console.log('user email = ' + user.attributes.email);
    console.log('user name = '+ user.attributes.name)
  });
  return Storage.put('text3.txt',"Hello world", {
    level:'public',
    progressCallback(uploadProgress){
      console.log('PROGRESS--', uploadProgress.loaded + '/' + uploadProgress.total);
    }
  })
  .then((res) => {
    Storage.get(res.key)
    .then((result) => {
      console.log('RESULT --- ', result);
      let awsImageUri = result.substring(0,result.indexOf('?'))
      console.log('RESULT AFTER REMOVED URI --', awsImageUri)
    })
    .catch(e => {
      console.log(e);
    })
  }).catch(e => {
    console.log(e);
  })
}





    return (

      
        <SafeAreaView style={styles.container}>
          <View style={styles.topContainer}>
          
          {/* <Button title="Create Post"
                onPress={() => navigation.navigate(RouteNames.HomePageFlow.CreatePost)} color="green" /> */}
          {/* <SearchBar
            placeholder="Type Here..."
            containerStyle={{ backgroundColor: "white"}}
            inputContainerStyle={{ backgroundColor: "white" }}
            value={searchText}
          /> */}
          <View style={{flexDirection:"row",justifyContent:"space-between",padding:10}}>
          <TouchableOpacity onPress={() => navigation.navigate(RouteNames.HomePageFlow.UserProfile)}> 
            <Image source={utkarsh} style={styles.imageStyle} />
          </TouchableOpacity>
          <Text style={{color:themeColor.vividRed,fontSize: themefonts.font18,fontFamily:themeFontFamily.ralewayBold,alignSelf:"center"}}>Shvaas</Text>
          <View style={{flexDirection:"row"}}>
          <MaterialCommunityIcons name="message" color={"#939393"} size={23} style={{alignSelf:"flex-start",padding:5}}/>
          <IoniconsIcon name="notifications" color={"#939393"} size={23} style={{alignSelf:"flex-start",padding:5}}/>
          </View>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-around",padding:10}}>
          {/* <FontAwesome
                name="search"
                size={30}
              /> */}
          <View style={{alignSelf:"center", width:"80%"}}>
          <TextInput 
                    placeholder="Search here..." 
                    value={searchText} 
                    onChangeText={setSearchText}/>
          </View>
          {/* <IoniconsIcon name="add-circle-outline" size={35} color={"#737373"} 
          onPress={() => navigation.navigate(RouteNames.HomePageFlow.CreatePost)}/> */}
           <IoniconsIcon name="add-circle-outline" size={35} color={"#737373"} 
          onPress={() => uploadFile()}/>
          </View>
          <FlatList
            data={post}
            renderItem={({item, index}) => <Post post={item} play={index===visibleItemIndex} navigation={navigation}/>}
            keyExtractor={(item) => item.postId}
            onViewableItemsChanged= {ViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 90,
              minimumViewTime: 500,
            }}
          />

          </View>
          
        </SafeAreaView>
        
        
      );
    };
    
export default Feed;
    
const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: themeColor.background,
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
    width: 167,
    },
    btnContainerStyle: {
    alignSelf: 'center',
    },
    video:{
      width:'100%',
      height:'50%'
    },
    imageStyle: {
      borderColor: themeColor.vividRed,
      borderWidth: 2,
      borderRadius: 50,
      height: 70,
      width: 70,
      alignSelf: 'center',
      resizeMode: 'cover',
    },
});


