import React from 'react';
import { View } from 'react-native';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

interface PropsType {
    post : any,
    play: boolean,
    
}

const Post: React.FC<PropsType> = ({ post, play }) => (
   
    
 
  <View>
      
    <Header imageUri={post.user.image} name={post.user.name} />
    <Body imageUri={post.videourl} play={play} bodytype={post.bodyType} caption={post.caption}/>
    <Footer
      likesCount={post.likes}
      caption={post.caption}
      postedAt={post.createdAt}
      bodytype={post.bodyType}
    />
  </View>
)

export default Post;