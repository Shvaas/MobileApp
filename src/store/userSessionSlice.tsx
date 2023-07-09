/* eslint-disable prettier/prettier */
import {createSlice, createSelector} from '@reduxjs/toolkit';
import {aryan, shikha, utkarsh} from '../images/imageLinks';

const mysessions = [
    {
      sessionId: '1',
      instructorId: 3,
      instructorPhoto: utkarsh,
      title: 'Yoga with Shikha',
      description: 'random text',
      zoomlink: '-',
      start_date: 1680772845,
      durationMinutes: 45,
      markCompleted: true,
      feedbackForStudent: 'Good Work! See you next time',
      feedbackForTeacher: 'Great Session, Thanks!',
      ratingForTeacher: 4,
    },
    {
      sessionId: '2',
      instructorId: 3,
      instructorPhoto: utkarsh,
      title: 'Yoga with Shikha',
      description: 'random text, random text, random text, random text, random text',
      zoomlink: '-',
      start_date: 1686410728,
      durationMinutes: 45,
      markCompleted: true,
      feedbackForStudent: '',
      feedbackForTeacher: '',
      ratingForTeacher: 0,
    },
    {
      sessionId: '3',
      instructorId: 3,
      instructorPhoto: utkarsh,
      title: 'Yoga with Shikha',
      description: 'random text',
      zoomlink: '-',
      start_date: 1691458708,
      durationMinutes: 45,
      markCompleted: true,
      feedbackForStudent: 'Good Work! See you next time',
      feedbackForTeacher: 'Great Session, Thanks!',
      ratingForTeacher: 0,
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
        console.log('UserSessionSlice: Note: Userid is dummy, used only for testing - postSlice');
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
        console.log('UserSessionSlice: addSession', action.payload);
        state.userSessions.push(action.payload);
      },

      cancelSession: (state, action) => {
        console.log('UserSessionSlice: cancelSession', action.payload);
        const {sessionId} = action.payload;
        const newSession = state.userSessions.filter((item) => item.sessionId !== sessionId);
        state.userSessions = newSession;
      },

      submitFeedback: (state, action) => {
        console.log('UserSessionSlice: submitFeedback', action.payload);
        const {sessionId, feedback, rating} = action.payload;
        state.currentSession = state.userSessions.find(p => p.sessionId === sessionId);
        state.currentSession.feedbackForTeacher = feedback;
        state.currentSession.ratingForTeacher = rating;
      },

    },
  });


export const getSessions = (state) => {
    const sessions =  state.userSessions.userSessions;
    console.log("UserSessionSlice: getSessions", sessions);


    let completedSessions = []
    let upcommingSessions = []
    for (let index = 0; index < sessions.length; index++) {
        if ((new Date()).getTime() > sessions[index].start_date * 1000) {
            completedSessions.push(sessions[index]);
        }else{
            upcommingSessions.push(sessions[index]);
        }
    }
    console.log("UserSessionSlice: upcommingSessions",upcommingSessions);
    console.log("UserSessionSlice: completedSessions",completedSessions);
    return [upcommingSessions, completedSessions];
};