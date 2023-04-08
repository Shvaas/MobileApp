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
import React, {  useRef, Component } from 'react';
import axios from "axios";
import { useState, useCallback } from "react";

import BackgroundImage from '../../../common/BackgroundImage';
import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';

import ProfilePicture from '../../../components/ProfilePicture';
import Post from '../../../components/Post';
import {aryan,nabeel,shikha,utkarsh} from '../../../images/imageLinks';

// import { DataStore } from 'aws-amplify';
// import { SQLiteAdapter } from '@aws-amplify/datastore-storage-adapter/SQLiteAdapter';
// import { Post as Postdb } from '../../../models'

import {useDispatch, useSelector} from 'react-redux';

import {Amplify} from "aws-amplify";
import awsconfig from '../../../aws-exports';
Amplify.configure(awsconfig);

import {useGetPostsQuery} from '../../../store/apiSlice';

var RNFS = require('react-native-fs');


// import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';

import myvideo from '../../../images/Shvaas_presentation.mp4'
import { postSlice } from '../../../store/postSlice';

// DataStore.configure({
//   storageAdapter: SQLiteAdapter
// });

interface PropsType {
    navigation: any;
}



const Feed: React.FC<PropsType> = ({navigation}) => {
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
  

  const [allPosts, updatePost] = useState([])
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
  
  
  // console.log('wtf');
  // console.log("$$$$$$$", post);
  // console.log('wtf');
  

  
  




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





    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.topContainer}>
          {/* <Button title="Get Advice" 
                onPress={reinisiallizepost} color="green" /> */}
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
});


