/* eslint-disable prettier/prettier */
import {createSlice, createSelector} from '@reduxjs/toolkit';


const initialState = {
  userType: '',
  timeZone: ' ',
  userId: null, // student id
  // teacherId: '313cbfd3-4fc1-4763-9d18-caedd0be4a63', // student id
  instructorPhotoLink: '',
  isSubscribed: false,
  trialUsed: false,
  firsName: '',
  lastName: '',
  height: '',
  weight: '',
  age: '',
  gender: '',
  prevAppState:'',
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
        const {type, userId, firsName, lastName, isSubscribed, trialUsed} = action.payload;
        console.log('User Slice: setUser', action.payload);
        state.userType = type;
        state.userId = userId;
        state.firsName = firsName;
        state.lastName = lastName;
        state.isSubscribed = isSubscribed;
        state.trialUsed = trialUsed;
        console.log("state.isSubscribed", state.isSubscribed);
        
        // state.instructorPhotoLink = 'https://www.yogabaron.com/wp-content/uploads/2018/12/Yoga-teacher-at-front-of-yoga-class-dec9.jpg';
      },

      setInstructor: (state, action) => {
        const {type, userId, firsName, lastName, profilePic} = action.payload;
        console.log('User Slice: setUser', action.payload);
        state.userType = type;
        state.userId = userId;
        state.firsName = firsName;
        state.lastName = lastName;
        //state.instructorPhotoLink = profilePic;
        state.instructorPhotoLink = 'https://www.yogabaron.com/wp-content/uploads/2018/12/Yoga-teacher-at-front-of-yoga-class-dec9.jpg';
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
      setSubscription: (state, action) => {
        console.log('User Slice: setUserId', action.payload);
        const subscription = action.payload;
        state.isSubscribed = subscription;
      },
      setUserProfileQuestion: (state, action) => {
        console.log('User Slice: setUserProfileQuestion', action.payload);
        const {height, weight, age, gender, questionOneState, questionTwoState} = action.payload;

        state.height = height;
        state.weight = weight;
        state.age = age;
        state.gender = gender;
        state.questionOne = questionOneState;
        state.questionTwo = questionTwoState;
      },
      setInitialState: (state, action) => {
        console.log("User Slice: setInitialState", action.payload);
        state = initialState;
        console.log(state.userId);
      },

      setTime: (state, action) => {
        const {timeZone} = action.payload;
        state.timeZone = timeZone
      },

      setAppState: (state, action) => {
        const appState = action.payload;
        state.prevAppState = appState
      },

    },
  });

  export const userFirstNameSelector = (state) => state.user.firsName;
  export const userLastNameSelector = (state) => state.user.lastName;
  export const instructorPhotoLinkSelector = (state) => state.user.instructorPhotoLink;
  export const userSelector = (state) => state.user.userType;
  export const userIdSelector = (state) => state.user.userId;
  export const userHeightSelector = (state) => state.user.height;
  export const userWeightSelector = (state) => state.user.weight;
  export const userAgeSelector = (state) => state.user.age;
  export const userGenderSelector = (state) => state.user.gender;
  export const userQuestionOneSelector = (state) => state.user.questionOne;
  export const userQuestionTwoSelector = (state) => state.user.questionTwo;
  export const userIsSubscribedSelector = (state) => state.user.isSubscribed;
  export const userTimeZone = (state) => state.user.timeZone;
  export const userPrevAppState = (state) => state.user.prevAppState;