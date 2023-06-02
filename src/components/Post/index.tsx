/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

interface PropsType {
  post: any;
  play: boolean;
}

const Post: React.FC<PropsType> = ({post, play}) => {
  const likes = Object.keys(post.reactions).length;


  return (
    <View>
      <Header imageUri={post.userName} name={post.userName} />
      <Body
        imageUri={post.fileURL}
        play={play}
        bodytype={post.bodytype}
        caption={post.caption}
      />
      <Footer
        likesCount={likes}
        caption={post.caption}
        postedAt={post.createdDate}
        bodytype={post.bodytype}
        postId={post.postId}
        isLiked={post.isLiked}
        topComment={post.topComment}
      />
    </View>
  );
};

export default Post;
