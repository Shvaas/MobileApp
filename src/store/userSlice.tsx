/* eslint-disable prettier/prettier */
import {createSlice, createSelector} from '@reduxjs/toolkit';


const initialState = {
  userType: 'Student',
  userId: '313cbfd3-4fc1-4763-9d18-abcdef', // student id
  // teacherId: '313cbfd3-4fc1-4763-9d18-caedd0be4a63', // student id
  name: '',
  height: '',
  weight: '',
  questionOne: {
    keys0: false,
    keys1: false,
    keys2: false,
    keys3: false,
    keys4: false,
    keys5: false,
    keys6: false,
    keys7: false,
  },
  questionTwo:{
    keys0: false,
    keys1: false,
    keys2: false,
    keys3: false,
    keys4: false,
    keys5: false,
    keys6: false,
    keys7: false,
    keys8: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
    reducers: {

      setUser: (state, action) => {
        const {type, userId, name} = action.payload;
        console.log('User Slice: setUser', action.payload);
        state.userType = type;
        state.userId = userId;
        state.name = name;
      },

      setUserType: (state, action) => {
        console.log('User Slice: setUserType', action.payload);
        const userType = action.payload;
        state.userType = userType;
      },
      setUserId: (state, action) => {
        console.log('User Slice: setUserId', action.payload);
        const userId = action.payload;
        state.userType = userId;
      },
      setUserProfileQuestion: (state, action) => {
        console.log('User Slice: setUserProfileQuestion', action.payload);
        const {height, weight, questionOneState, questionTwoState} = action.payload;

        state.height = height;
        state.weight = weight;
        state.questionOne = questionOneState;
        state.questionTwo = questionTwoState;
      },
    },
  });

  export const userNameSelector = (state) => state.user.name;
  export const userSelector = (state) => state.user.userType;
  export const userHeightSelector = (state) => state.user.height;
  export const userWeightSelector = (state) => state.user.weight;
  export const userQuestionOneSelector = (state) => state.user.questionOne;
  export const userQuestionTwoSelector = (state) => state.user.questionTwo;