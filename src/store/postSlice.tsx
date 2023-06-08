import {createSlice, createSelector} from '@reduxjs/toolkit';

import {aryan, shikha, utkarsh} from '../images/imageLinks';

const mypost = [
  {
    user: {
      name: 'Utkarsh',
      image: utkarsh,
    },
    id: '1',
    bodyType: 3,
    videourl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    image: utkarsh,
    isLiked: true,
    likes: 20,
    caption: 'random text',
    createdAt: '20/03/21',
  },
  {
    user: {
      name: 'Shikha',
      image: shikha,
    },
    id: '2',
    bodyType: 2,
    videourl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
    image: utkarsh,
    isLiked: false,
    likes: 20,
    caption: 'random text',
    createdAt: '20/03/21',
  },
  {
    user: {
      name: 'Aryan',
      image: aryan,
    },
    id: '3',
    bodyType: 1,
    videourl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    image: aryan,
    isLiked: true,
    likes: 20,
    caption:
      'random text, random textrandom textrandom textrandom text random textrandom text random text random text',
    createdAt: '20/03/21',
  },
  {
    user: {
      name: 'Nabeel',
      image: aryan,
    },
    id: '4',
    bodyType: 3,
    videourl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    image: aryan,
    isLiked: false,
    likes: 20,
    caption: 'random text',
    createdAt: '20/03/21',
  },
];

const initialState = {
  posts: [],
  currentPost: null,
};
// is liked
// number of likes
// number of comments
// add comment
// update reaction
export const postSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setReaction: (state, action) => {
      const postId = action.payload;
      state.currentPost = state.posts.find(p => p.postId === postId);
      const user = state.currentPost.userId;
      if (state.currentPost && state.currentPost.isLiked){
        delete state.currentPost.reactions[user];
        state.currentPost.isLiked = false;
      } else {
        state.currentPost.reactions[user] = 'LIKE';
        state.currentPost.isLiked = true;
      }
    },

    initialPost: (state, action) => {
      console.log('Note: Userid is dummy, used only for testing - postSlice');
      const serverPost = action.payload;
      for (let i = 0; i < serverPost.length; i++) {
        let tempPost = {};
        tempPost.postId = serverPost[i].postId;
        tempPost.fileURL = serverPost[i].fileURL;
        tempPost.caption = serverPost[i].caption;
        tempPost.reactions = serverPost[i].reactions;
        tempPost.userId = serverPost[i].userId;
        tempPost.userName = serverPost[i].userName;
        tempPost.userProfilePic = serverPost[i].userProfilePic;
        tempPost.userType = serverPost[i].userType;
        tempPost.createdDate = serverPost[i].createdDate;

        if ('comments' in serverPost[i]){
          tempPost.comments = serverPost[i].comments;
        }else{
          tempPost.comments = [];
        }

        if ('topComment' in serverPost[i]){
          tempPost.topComment = serverPost[i].topComment;
        }else{
          tempPost.topComment = null;
        }

        tempPost.isLiked = serverPost[i].userId in serverPost[i].reactions;
        let bodytype;
        if ('fileURL' in serverPost[i]) {
          bodytype = serverPost[i].fileURL.charAt(serverPost[i].fileURL.length - 1) === 'g' ? 2 : 3;
        } else {
          bodytype = 1;
        }
        tempPost.bodytype = bodytype;
        state.posts.push(tempPost);
      }
    },

    addComment: (state, action) => {
      console.log('addComment', action.payload);

      const {comment, postId} = action.payload;

      state.currentPost = state.posts.find(p => p.postId === postId);
      const user = state.currentPost.userName;
      if (state.currentPost){
        const commentObj = {username: user, text: comment};
        state.currentPost.comments.push(commentObj);
        state.currentPost.topComment = commentObj;
      }
    },
  },
});

const postSelector = (state) => state.posts.posts;

export const getAllComments = createSelector(
  [postSelector, (postSelector, postId: string) => postId],
  (postSelector, postId) => {
    const currentPost = postSelector.find(p => p.postId === postId);

    return currentPost.comments;
  },
);

