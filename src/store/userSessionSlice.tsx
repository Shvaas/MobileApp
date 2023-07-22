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
        console.log('UserSessionSlice: Note: Userid is dummy, used only for testing');
        const sessions = action.payload;
        if(sessions === undefined){
          return
        }
        for (let i = 0; i < sessions.length; i++) {
          let sessionId = sessions[i].courseId;
          state.currentSession = state.userSessions.find(p => p.sessionId === sessionId);
          console.log("state.currentSession ", state.currentSession);

          if (state.currentSession === undefined){
             // add session
             state.currentSession = {}
             state.currentSession.sessionId = sessions[i].courseId
             state.currentSession.instructorId = sessions[i].instructorId;
             state.currentSession.name = sessions[i].instructorName;
             state.currentSession.instructorPhoto = utkarsh;
             state.currentSession.title = sessions[i].courseName;
             state.currentSession.description = 'One line description or tag';
             state.currentSession.start_date = 1698199909;
             state.currentSession.zoomlink = '';
             state.currentSession.feedbackForStudent = sessions[i].instructorFeedback;
             state.currentSession.feedbackForTeacher = sessions[i].studentFeedback;
             state.currentSession.ratingForTeacher = 5;
             state.userSessions.push(state.currentSession);

          }else{
            // update session
             state.currentSession.feedbackForStudent = sessions[i].instructorFeedback;
             state.currentSession.feedbackForTeacher = sessions[i].studentFeedback;
             state.currentSession.zoomlink = '';
             state.currentSession.name = sessions[i].instructorName;
             state.currentSession.instructorPhoto = utkarsh;
             state.currentSession.title = sessions[i].courseName;
             state.currentSession.start_date = 1698199909;
             state.currentSession.description = 'One line description or tag';
          }

        }
        console.log(state.userSessions);
        
      },

      addSession: (state, action) => {
        console.log('UserSessionSlice: addSession', action.payload);
        let sessions =  state.userSessions;
        console.log("UserSessionSlice: addSession", sessions);
        console.log();
        console.log();
        state.userSessions.push(action.payload);
        sessions =  state.userSessions;
        console.log("UserSessionSlice: addSession", sessions);
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

export const userSessionSelector = (state) =>  state.userSessions.userSessions;


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
    return [upcommingSessions, completedSessions];
};