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
  userSessions: [],
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
        console.log("initiateSessions", sessions);
        for (let i = 0; i < sessions.length; i++) {
          let sessionId = sessions[i].courseId;
          state.currentSession = state.userSessions.find(p => p.sessionId === sessionId);

          let newSession = false;
          if (state.currentSession === undefined){
            state.currentSession = {}
            newSession = true;
          }
             // add session
             state.currentSession.sessionId = sessions[i].courseId;
             state.currentSession.instructorId = sessions[i].instructorId;
             state.currentSession.name = sessions[i].instructorName;
             
             
            if(sessions[i]?.instructorProfilePicture.substring(0, 5) === "https"){
              state.currentSession.instructorPhotoLink = sessions[i]?.instructorProfilePicture;
            }else{
              state.currentSession.instructorPhotoLink = 'https://via.placeholder.com/640x360';
            }
             
             
             state.currentSession.title = sessions[i].courseName;
             state.currentSession.description = sessions[i].description;
             state.currentSession.start_date = sessions[i]?.sessionStartTime;
             state.currentSession.end_date = sessions[i]?.sessionEndTime;
             state.currentSession.zoomlink = sessions[i]?.zoom ? sessions[i]?.zoom : '';
             state.currentSession.feedbackForStudent = sessions[i]?.feedbackForStudent ? sessions[i]?.feedbackForStudent : '';
             state.currentSession.feedbackForTeacher = sessions[i]?.feedbackForInstructor ? sessions[i]?.feedbackForInstructor : '';
             state.currentSession.ratingForTeacher = sessions[i]?.courseRatingByStudent ? sessions[i]?.courseRatingByStudent : 5;


             console.log("state.currentSession", state.currentSession);
             
             if(newSession){
              state.userSessions.push(state.currentSession);
             }

        }
        const sessions1 =  state.userSessions;
        console.log("UserSessionsessions1Slice: getSessions", sessions1);
      },

      addSession: (state, action) => {
        console.log('UserSessionSlice: addSession', action.payload);
        let sessions =  state.userSessions;
        state.userSessions.push(action.payload);
        sessions =  state.userSessions;
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

      setInitialState: (state, action) => {
        state = initialState;
      },

    },
  });

export const userSessionSelector = (state) =>  state.userSessions.userSessions;

function compareSessions(a, b) {
  // descending
  const aDate = new Date(a.start_date);
  const bDate = new Date(b.start_date);
  if (aDate > bDate){
    return -1;
  }
  if (aDate < bDate){
    return 1;
  }
  return 0;
}



export const getSessions = (state) => {
    const sessions =  state.userSessions.userSessions;
    console.log("UserSessionSlice: getSessions", sessions);


    let completedSessions = []
    let upcommingSessions = []
    for (let index = 0; index < sessions.length; index++) {
        let currDate = new Date(sessions[index].start_date);
        if ((new Date()).getTime() > currDate.getTime()) {
            completedSessions.push(sessions[index]);
        }else{
            upcommingSessions.push(sessions[index]);
        }
    }
    return [upcommingSessions.sort(compareSessions), completedSessions.sort(compareSessions)];
};