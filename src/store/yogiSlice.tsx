/* eslint-disable prettier/prettier */
import {createSlice, createSelector} from '@reduxjs/toolkit';
import {aryan, nabeel, shikha, utkarsh, yoga_instructor1, yoga_instructor2, yoga_instructor3} from '../images/imageLinks';

const YOGI = [
    {
      key: 1,
      name: 'Anna',
      image: yoga_instructor1,
      yearsOfExp: 2,
      rating: 4.5,
      certificates: 'Masters in Yoga, RYT-500',
      studentsTrained: 450,
      description: 'Yoga lorem ipsium the random text',
      ActiveCourses: 2,
      interest: ['meditation', 'Yoga', 'hatha Yoga'],
      reviews: [
        {
          image: utkarsh,
          name: 'Utkarsh Nath',
          review:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vitae cumque, sed, dolor culpa cum praesentium possimus animi quia, omnis quod distinctio magnam qui? Ab dignissimos vero aliquam velit!',
        },
        {
          image: aryan,
          name: 'Aryan Mittal',
          review:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vitae cumque, sed, dolor culpa cum praesentium possimus animi quia, omnis quod distinctio magnam qui? Ab dignissimos vero aliquam velit!',
        },
        {
          image: utkarsh,
          name: 'Utkarsh Nath 2.0',
          review:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vitae cumque, sed, dolor culpa cum praesentium possimus animi quia, omnis quod distinctio magnam qui? Ab dignissimos vero aliquam velit!',
        },
      ],
    },
    {
      key: 2,
      name: 'Emma',
      image: yoga_instructor2,
      yearsOfExp: 4,
      rating: 4.9,
      certificates: 'RYT-200, RYT-500',
      studentsTrained: 700,
      description: 'Meditation',
      ActiveCourses: 3,
      interest: ['yoga', 'meditation', 'Yin Yoga', 'Anxiety'],
      reviews: [
        {
          image: shikha,
          name: 'Shikha Asrani',
          review:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vitae cumque, sed, dolor culpa cum praesentium possimus animi quia, omnis quod distinctio magnam qui? Ab dignissimos vero aliquam velit!",
        },
        {
          image: aryan,
          name: 'Aryan Mittal',
          review:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vitae cumque, sed, dolor culpa cum praesentium possimus animi quia, omnis quod distinctio magnam qui? Ab dignissimos vero aliquam velit!',
        },
      ],
    },
    {
      key: 3,
      name: 'Olivia',
      image: yoga_instructor3,
      yearsOfExp: 1,
      rating: 3.5,
      certificates: 'RYT-200',
      studentsTrained: 106,
      description: 'Yoga',
      ActiveCourses: 3,
      interest: ['yoga', 'Children\'s Yoga', 'Pranayama'],
      reviews: [
        {
          image: utkarsh,
          name: 'Utkarsh Nath',
          review:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vitae cumque, sed, dolor culpa cum praesentium possimus animi quia, omnis quod distinctio magnam qui? Ab dignissimos vero aliquam velit!',
        },
        {
          image: shikha,
          name: 'Shikha Asrani',
          review:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vitae cumque, sed, dolor culpa cum praesentium possimus animi quia, omnis quod distinctio magnam qui? Ab dignissimos vero aliquam velit!',
        },
      ],
    },
  ];

const initialState = {
  yogi: YOGI,
  currentYogi: null,
};

export const yogiSlice = createSlice({
  name: 'yogi',
  initialState: initialState,
    reducers: {

        initialYogi: (state, action) => {
            const serverYogi = action.payload;
            // [{"name": "Asif Hasnain", "rating": 5, "shavaasStudentsCount": 1, "slotCount": 0, "slots": [],
            //  "userId": "313cbfd3-4fc1-4763-9d18-caedd0be4a63", "userProfilePic": "test1.jpeg"}]
            if(serverYogi === undefined){
              return
            }
            for (let i = 0; i < serverYogi.length; i++) {

              let yogiId = serverYogi[i]?.userId;
              state.currentYogi = state.yogi.find(p => p.userId === yogiId);
              if (state.currentYogi === undefined){
             // add session
             state.currentYogi = {}
             state.currentYogi.userId = serverYogi[i]?.userId;
             state.currentYogi.name = serverYogi[i]?.name;
             state.currentYogi.rating = serverYogi[i]?.rating;
             state.currentYogi.studentsTrained = serverYogi[i]?.shavaasStudentsCount;
             state.currentYogi.sessionCount = serverYogi[i]?.slotCount;
             state.currentYogi.sessions = serverYogi[i]?.slots;
             state.currentYogi.certificates = 'RYT-200';
             state.currentYogi.interest = ['yoga', 'Children\'s Yoga', 'Pranayama'];
             state.currentYogi.yearsOfExp = 3
             state.currentYogi.image = yoga_instructor3;
             state.yogi.push(state.currentYogi);

              }else{
                // update session
                state.currentYogi.studentsTrained = serverYogi[i]?.shavaasStudentsCount;
                state.currentYogi.sessionCount = serverYogi[i]?.slotCount;
                state.currentYogi.sessions = serverYogi[i]?.slots;
                state.currentYogi.certificates = 'RYT-200';
                state.currentYogi.interest = ['yoga', 'Children\'s Yoga', 'Pranayama'];
                state.currentYogi.yearsOfExp = 3
                state.currentYogi.image = yoga_instructor3;
              }
            }
          },
          addYogiDetail: (state, action) => {
            console.log('Yogi Slice: ', action.payload);
            const {userId, name} = action.payload;

            state.currentYogi = state.yogi.find(p => p.userId === userId);
            // state.currentyogi.name = name;
          },
          setSelectedYogi: (state, action) => {
            const userId = action.payload;
            state.currentYogi = state.yogi.find((p) => p.userId === userId);
          },

    },
  });

  export const YogiSelector = (state) => state.yogi.yogi;

  export const CurrentYogiSelector = (state) => state.yogi.currentyogi;