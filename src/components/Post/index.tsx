import React from 'react';
import { View } from 'react-native';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

interface PropsType {
  post: any;
  play: boolean;
}

const Post: React.FC<PropsType> = ({post, play}) => (

  <View>
    <Header imageUri={post.userName} name={post.userName} />
    <Body
      imageUri={post.fileURL}
      play={play}
      bodytype={post.fileURL.charAt(post.fileURL.length - 1) == 'g' ? 2: 3}
      caption={post.caption}
    />
    <Footer
      likesCount={20}
      caption={post.caption}
      postedAt={post.userName}
      bodytype={post.fileURL.charAt(post.fileURL.length - 1) == 'g' ? 2: 3}
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

export default Post;
