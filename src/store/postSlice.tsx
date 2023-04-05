import {createSlice} from '@reduxjs/toolkit';

import {aryan, shikha, utkarsh} from '../images/imageLinks';

const mypost = [
  {
    user: {
      name: 'Utkarsh',
      image: utkarsh,
    },
    bodyType: 3,
    videourl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    image: utkarsh,
    likes: 20,
    caption: 'random text',
    createdAt: '20/03/21',
  },
  {
    user: {
      name: 'Shikha',
      image: shikha,
    },
    bodyType: 2,
    videourl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
    image: utkarsh,
    likes: 20,
    caption: 'random text',
    createdAt: '20/03/21',
  },
  {
    user: {
      name: 'Aryan',
      image: aryan,
    },
    bodyType: 1,
    videourl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    image: aryan,
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
    bodyType: 3,
    videourl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    image: aryan,
    likes: 20,
    caption: 'random text',
    createdAt: '20/03/21',
  },
];

const initialState = {
  posts: mypost,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {},
});
