import React from 'react';
import { View } from 'react-native';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

interface PropsType {
    post : any,
}

const Post: React.FC<PropsType> = ({ post }) => (
    
    
    
  <View>
      
    <Header imageUri={post.userimage} name={post.username} />
    <Body imageUri={post.videourl} />
    <Footer
      likesCount={post.likes}
      caption={post.caption}
      postedAt={post.createdAt}
    />
  </View>
)

export default Post;