/* eslint-disable prettier/prettier */
import {createSlice, createSelector} from '@reduxjs/toolkit';


const initialState = {
  userType: 'Student',
  userId: '313cbfd3-4fc1-4763-9d18-abcdef', // student id
  // teacherId: '313cbfd3-4fc1-4763-9d18-caedd0be4a63', // student id
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
    reducers: {

      setUser: (state, action) => {
        const {type, userId} = action.payload;
        console.log('User Slice: setUser', action.payload);
        state.userType = type;
        state.userId = userId;
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
    },
  });

  export const userSelector = (state) => state.user.userType;
  