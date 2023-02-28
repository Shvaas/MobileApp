import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView,
  } from 'react-native';
import React, {  useRef, Component } from 'react';
import axios from "axios";
import { useState } from "react";

import BackgroundImage from '../../../common/BackgroundImage';
import {themeFontFamily, themefonts,themeColor} from '../../../constants/theme';

import ProfilePicture from '../../../components/ProfilePicture';
import Post from '../../../components/Post';
import {aryan,nabeel,shikha,utkarsh} from '../../../images/imageLinks';

import { DataStore } from 'aws-amplify';
import { SQLiteAdapter } from '@aws-amplify/datastore-storage-adapter/SQLiteAdapter';
import { Post as Postdb } from '../../../models'

var RNFS = require('react-native-fs');

// import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
import myvideo from '../../../images/Shvaas_presentation.mp4'

DataStore.configure({
  storageAdapter: SQLiteAdapter
});

interface PropsType {
    navigation: any;
}

const post = [{
      user : {
        name : 'Utkarsh',
        image : utkarsh
      },
      videourl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      image: utkarsh,
      likes: 20,
      caption: 'random text',
      createdAt: '20/03/21'
},
{
  user : {
    name : 'Shikha',
    image : shikha
  },
  videourl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  image: utkarsh,
  likes: 20,
  caption: 'random text',
  createdAt: '20/03/21'
}
]

const Feed: React.FC<PropsType> = ({navigation}) => {
  
  const [allPosts, updatePost] = useState([])
  console.log(1, RNFS.DocumentDirectoryPath);
  
  React.useEffect(() => {
    // const posts = getAllPost()
    // downloadVideo("https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")
  }, []);

  async function createPost() {
    try {
      await DataStore.save(
        new Postdb({
          username: "My First Post", 
          caption: "Hi, how are you, khana khaakr jana han"
        })
      );
      console.log("Post saved successfully!");
    } catch (error) {
      console.log("Error saving post", error);
    }
}
async function getAllPost() {
  try {
    const posts = await DataStore.query(Postdb);
    updatePost(posts)
    console.log("Posts retrieved successfully!", JSON.stringify(posts, null, 2));
    return posts
  } catch (error) {
    console.log("Error retrieving posts", error);
  }
}

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



  const getRequest = () => {
    axios.get("https://6sm5d5xzu8.execute-api.us-west-2.amazonaws.com/stage/course")
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
};
let viewabilityConfig = {
  waitForInteraction: true,
  // At least one of the viewAreaCoveragePercentThreshold or itemVisiblePercentThreshold is required.
  viewAreaCoveragePercentThreshold: 95,
  
}

let onViewableItemsChanged = ({viewableItems, changed}) => {
  console.log("Visible items are", viewableItems);
  console.log("Changed in this iteration", changed);
}; 

//  let _onViewableItemsChanged = props => {
//   const changed = props.changed;
//   changed.forEach(item => {
//     console.log(111, item);
//     // const cell = this.cellRefs[item.key];
    
//     // if(cell){
      
      
//     //   if(item.isViewable){

//     //   }else{

//     //   }
//     // }
    
//   });
// };

const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.topContainer}>
          {/* <Video  source={myvideo}/> */}
         
          {/* <FlatList
            data={post}
            
            renderItem={({item}) => <Post post={item} />}
            keyExtractor={({id}) => id}
          /> */}

          <Video source={{uri: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}}   // Can be a URL or a local file.
         />
          


          {/* <Button title="Get Advice" 
                onPress={getRequest} color="green" /> */}
          
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
});