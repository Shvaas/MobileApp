/* eslint-disable prettier/prettier */
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView,
    Button,
    ActivityIndicator,
  } from 'react-native';
import React from 'react';

import { useState, useCallback, useMemo, useRef } from "react";
import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';

import Post from '../../../components/Post';
import RouteNames from '../../../constants/routeName';

import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from 'react-native-gesture-handler'

// import { DataStore } from 'aws-amplify';
// import { SQLiteAdapter } from '@aws-amplify/datastore-storage-adapter/SQLiteAdapter';
// import { Post as Postdb } from '../../../models'

import {useDispatch, useSelector} from 'react-redux';



import { Amplify, Auth, Storage } from 'aws-amplify';

Amplify.configure({
  Auth: {
    identityPoolId: 'us-west-2:47feb859-001b-45f3-bfac-5d5bd6f48313', //REQUIRED - Amazon Cognito Identity Pool ID
    region: 'us-west-2', // REQUIRED - Amazon Cognito Region
    userPoolId: 'us-west-2_HVpUfyqbJ', //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: '4qvrcs0tkf7grletcl0bdfrpr', //OPTIONAL - Amazon Cognito Web Client ID
  },
  Storage: {
    AWSS3: {
      bucket: 'shvaas-user-feed', //REQUIRED -  Amazon S3 bucket name
      region: 'us-west-2', //OPTIONAL -  Amazon service region
    }
  }
});

// import awsconfig from '../../../aws-exports';
// Amplify.configure(awsconfig);

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

  Storage.configure({ 
    bucket: 'shvaas-user-feed',
    level: 'public',
    region: 'us-west-2',
    identityPoolId: 'us-west-2:47feb859-001b-45f3-bfac-5d5bd6f48313',
 });

  //"https://shvaas-user-feed.s3.us-west-2.amazonaws.com/test2.jpeg"
  
  
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  async function download(key: string){
    // const result = await Storage.put("test.txt", "Hello");
    console.log('try signedURL');
    try {
      const result = await Storage.get(key, { download: true });
    } catch (error) {
      console.log('download s3 error', error);
    }
    // result.Body.text().then((string) => {
    //   console.log('signedURL', signedURL);
    // });
  }

  // download('test2.jpeg');
  


  const [visibleItemIndex, setVisibleItemIndex] = useState(0);

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

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.error}</Text>;
  }

  console.log(data?.data);

  if (post.length === 0){
    dispatch(postSlice.actions.initialPost(data.data.slice(0, -1)));
  }

  // let post = null;
  // if (data){
  //   post = data.data.slice(0, -1);
  //   // console.log(post)
  // }




// async function downloadVideo(videoUrl: string){
//   let filename = videoUrl.substring(videoUrl.lastIndexOf("/") + 1, videoUrl.length);
//   let path_name = RNFS.DocumentDirectoryPath + filename;
//   console.log(path_name);

//   RNFS.exists(path_name).then(exists => {
//     if (exists) {
//       console.log("Already downloaded");
//     } else {
//       RNFS.downloadFile({
//         fromUrl: videoUrl,
//         toFile: path_name.replace(/%20/g, "_"),
//         background: true
//       })
//         .promise.then(res => {
//           console.log("File Downloaded", res);
//         })
//         .catch(err => {
//           console.log("err downloadFile", err);
//         });
//     }
//   });
// }

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


    return (

      <SafeAreaView style={styles.container}>
        <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.topContainer}>
        <Button title="Create Post"
                onPress={() => navigation.navigate(RouteNames.HomePageFlow.CreatePost)} color="green" />
        <FlatList
            data={post}
            renderItem={({item, index}) => <Post post={item} play={index===visibleItemIndex}/>}
            keyExtractor={(item) => item.postId}
            onViewableItemsChanged= {ViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 90,
              minimumViewTime: 500,
            }}
          />
        </View>
        <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
    </SafeAreaView>
      );
    };
    
export default Feed;

const styles11 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    borderColor:'grey',
    borderWidth:10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
    
const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: themeColor.background,
    },
    containerTop: {
      backgroundColor: themeColor.black,
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
});



// import React, { useCallback, useMemo, useRef } from 'react';
// import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';
// import {GestureHandlerRootView} from 'react-native-gesture-handler'
// // import { SafeAreaView } from 'react-native-safe-area-context';

// const Feed = () => {
//   // ref
//   const bottomSheetRef = useRef<BottomSheet>(null);

//   // variables
//   const snapPoints = useMemo(() => ['25%', '50%'], []);

//   // callbacks
//   const handleSheetChanges = useCallback((index: number) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   // renders
//   return (
    
//     <GestureHandlerRootView>
//     <View style={styles.container}>
      
      
      
//         <BottomSheet
//             ref={bottomSheetRef}
//             snapPoints={["50%"]}
//             index={0}
//             enablePanDownToClose>
//         <View style={styles.contentContainer}>
//           <Text>Awesome 🎉</Text>
//         </View>
//       </BottomSheet>
//     </View>
//     </GestureHandlerRootView>
    
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: 'grey',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
// });

// export default Feed;
