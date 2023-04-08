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
  console.log(likes, 'likes');
  
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
        postedAt={post.userName}
        bodytype={post.bodytype}
        postId={post.postId}
        isLiked={post.isLiked}
      />
    </View>

    // <View>
    //   <Header imageUri={post.user.image} name={post.user.name} />
    //   <Body
    //     imageUri={post.videourl}
    //     play={play}
    //     bodytype={post.bodyType}
    //     caption={post.caption}
    //   />
    //   <Footer
    //     likesCount={post.likes}
    //     caption={post.caption}
    //     postedAt={post.createdAt}
    //     bodytype={post.bodyType}
    //   />
    // </View>
  );
};

export default Post;
