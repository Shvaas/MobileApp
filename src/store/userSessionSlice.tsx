/* eslint-disable prettier/prettier */
import {createSlice, createSelector} from '@reduxjs/toolkit';

const mysessions = [
    {
      sessionId: '1',
      instructorId: 3,
      instructorPhoto: utkarsh,
      title: 'Yoga with Shikha',
      description: 'random text',
      zoomlink: ' ',
      date: 1680772845,
    },
  ];

const initialState = {
  userSessions: mysessions,
  currentSession: null,
};

export const userSessionSlice = createSlice({
  name: 'userSessions',
  initialState: initialState,
    reducers: {

      initiateSessions: (state, action) => {
        console.log('Note: Userid is dummy, used only for testing - postSlice');
        const serverSession = action.payload;

        for (let i = 0; i < serverSession.length; i++) {
          let tempSessions = {};
          tempSessions.sessionId = serverSession[i].sessionId;
          tempSessions.instructorId = serverSession[i].instructorId;
          tempSessions.instructorPhoto = serverSession[i].instructorPhoto;
          tempSessions.title = serverSession[i].title;
          tempSessions.description = serverSession[i].description;
          tempSessions.zoomlink = serverSession[i].zoomlink;
          tempSessions.date = serverSession[i].date;

          state.userSessions.push(tempSessions);
        }
      },

      addSession: (state, action) => {
        console.log('addSession', action.payload);
        const {session} = action.payload;
        state.userSessions.push(session);
      },
    },
  });


// const postSelector = (state) => state.posts.posts;

// export const getAllComments = createSelector(
//     [postSelector, (postSelector, postId: string) => postId],
//     (postSelector, postId) => {
//       const currentPost = postSelector.find(p => p.postId === postId);
  
//       return currentPost.comments;
//     },
//   );

export const getSessions = (state) => {
    const sessions =  state.userSessions.userSessions;
    const currDate = new Date();
    let completedSessions = []
    let upcommingSessions = []
    for (let index = 0; index < sessions.length; index++) {
        if (currDate > sessions[index].date) {
            completedSessions.push(sessions[index]);
        }else{
            upcommingSessions.push(sessions[index]);
        }
    }
    return [upcommingSessions, completedSessions];
};