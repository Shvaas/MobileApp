/* eslint-disable prettier/prettier */
import {createSlice, createSelector} from '@reduxjs/toolkit';


const initialState = {
  userType: 'Student',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
    reducers: {

      initiateUserType: (state, action) => {
        console.log('Note: Userid is dummy, used only for testing - postSlice');
        const type = action.payload;
        state.userType = type;
      },

      setUserType: (state, action) => {
        console.log('setUserType', action.payload);
        const userType = action.payload;
        state.userType = userType;
      },
    },
  });

  const userSelector = (state) => state.user.userType;