/* eslint-disable prettier/prettier */
import {createSlice, createSelector} from '@reduxjs/toolkit';

const mysessions = [
  {
    sessionId: '1',
    instructorId: '313cbfd3-4fc1-4763-9d18-caedd0be4a63',
    title: 'Title',
    description: 'One line description or tag',
    zoomlink: '-',
    start_date: 1680772845,
    durationMinutes: 45,
    session_type: 1,
    total_slots: 10,
    available_slots: 4,
    markCompleted: true,
    studentList:[{
      studentId: 1,
      studentName: 'Utkarsh',
      attendance: true,
      feedbackForStudent: 'Good Work! See you next time',
      feedbackForTeacher: 'Great Session, Thanks!',
      ratingForTeacher: 5,
    },
    {
      studentId: 2,
      studentName: 'Shikha',
      attendance: false,
      feedbackForStudent: '',
      feedbackForTeacher: '',
      ratingForTeacher: 5,
    },
    {
      studentId: 3,
      studentName: 'Aryan',
      attendance: null,
      feedbackForStudent: '',
      feedbackForTeacher: '',
      ratingForTeacher: 5,
    },]
  },
  {
    sessionId: '2',
    instructorId: '313cbfd3-4fc1-4763-9d18-caedd0be4a63',
    title: 'Title',
    description: 'One line description or tag',
    zoomlink: '-',
    start_date: 1686331014,
    durationMinutes: 45,
    session_type: 1,
    total_slots: 10,
    available_slots: 4,
    markCompleted: true,
    studentList:[{
      studentId: 1,
      studentName: 'Utkarsh',
      attendance: true,
      feedbackForStudent: 'Good Work! See you next time',
      feedbackForTeacher: 'Great Session, Thanks!',
      ratingForTeacher: 5,
    },
    {
      studentId: 2,
      studentName: 'Shikha',
      attendance: false,
      feedbackForStudent: '',
      feedbackForTeacher: '',
      ratingForTeacher: 5,
    },
    {
      studentId: 3,
      studentName: 'Aryan',
      attendance: null,
      feedbackForStudent: '',
      feedbackForTeacher: '',
      ratingForTeacher: 5,
    },]
  },
  {
    sessionId: '3',
    instructorId: '313cbfd3-4fc1-4763-9d18-caedd0be4a63',
    title: 'Title',
    description: 'One line description or tag',
    zoomlink: '-',
    start_date: 1685633128,
    durationMinutes: 45,
    session_type: 1,
    total_slots: 10,
    available_slots: 4,
    markCompleted: false,
    studentList:[{
      studentId: 1,
      studentName: 'Utkarsh',
      attendance: true,
      feedbackForStudent: 'Good Work! See you next time',
      feedbackForTeacher: 'Great Session, Thanks!',
      ratingForTeacher: 5,
    },
    {
      studentId: 2,
      studentName: 'Shikha',
      attendance: false,
      feedbackForStudent: '',
      feedbackForTeacher: '',
      ratingForTeacher: 5,
    },
    {
      studentId: 3,
      studentName: 'Aryan',
      attendance: null,
      feedbackForStudent: '',
      feedbackForTeacher: '',
      ratingForTeacher: 5,
    },]
  },
  {
    sessionId: '4',
    instructorId: '313cbfd3-4fc1-4763-9d18-caedd0be4a63',
    title: 'Title',
    description: 'One line description or tag',
    zoomlink: '-',
    start_date: 1686290400,
    durationMinutes: 45,
    session_type: 1,
    total_slots: 10,
    available_slots: 4,
    markCompleted: false,
    studentList:[{
      studentId: 1,
      studentName: 'Utkarsh',
      attendance: true,
      feedbackForStudent: 'Good Work! See you next time',
      feedbackForTeacher: 'Great Session, Thanks!',
      ratingForTeacher: 5,
    },
    {
      studentId: 2,
      studentName: 'Shikha',
      attendance: false,
      feedbackForStudent: '',
      feedbackForTeacher: '',
      ratingForTeacher: 5,
    },
    {
      studentId: 3,
      studentName: 'Aryan',
      attendance: null,
      feedbackForStudent: '',
      feedbackForTeacher: '',
      ratingForTeacher: 5,
    },]
  },
];


const initialState = {
  sessions: mysessions,
  currentSession: null,
};

export const sessionSlice = createSlice({
  name: 'sessions',
  initialState: initialState,
    reducers: {

      initiateSessions: (state, action) => {
        const {sessions, instructor_id} = action.payload;
        console.log("Session Slice: initiateSessions", sessions);
        if(sessions === undefined){
          return
        }
        // instructor_id
        // start_date, end_date
        // total slots
        // total available slots
        // description
        // zoom link
        // session_type - group, private
        // student list - {student id, attendance, feedback for student, feedback for teacher, rating for teacher}
        console.log(typeof(sessions));
        
        //[{"capacity": 30, "courseId": "0f94e351-fd3a-4a71-84c4-123399f50bb4", 
        // "courseName": "Yoga101", "difficultyLevel": "BEGINNER", "price": 10, "sessionDate": "2023-01-01"}]
        for (let i = 0; i < sessions.length; i++) {
          let sessionId = sessions[i].courseId;
          state.currentSession = state.sessions.find(p => p.sessionId === sessionId);
          if (state.currentSession === undefined){
             // add session
             state.currentSession = {}
             state.currentSession.instructorId = instructor_id;
             state.currentSession.title = sessions[i].courseName;
             state.currentSession.sessionId = sessions[i].courseId;
             state.currentSession.total_slots = sessions[i].capacity;
             state.currentSession.description = 'One line description or tag';
             state.currentSession.start_date = 1686290400;
             state.currentSession.markCompleted = false;
             state.currentSession.studentList = [];
              state.sessions.push(state.currentSession);

          }else{
            // update session
            state.currentSession.title = sessions[i].courseName;
            state.currentSession.total_slots = sessions[i].capacity;
          }

        }
      },

      addSession: (state, action) => {
        console.log('Session Slice: addSession', action.payload);
        const {session} = action.payload;
        state.sessions.push(session);
        console.log('Session Slice: addSession', state.sessions);
      },

      cancelSession: (state, action) => {
        console.log('Session Slice: cancelSession', action.payload);
        const {sessionId} = action.payload;
        const newSession = state.sessions.filter((item) => item.sessionId !== sessionId);
        state.sessions = newSession;
      },


      markSessionCompleted: (state, action) => {
        console.log('Session Slice: markSessionCompleted', action.payload);
        const {sessionId} = action.payload;
        state.currentSession = state.sessions.find(p => p.sessionId === sessionId);
        state.currentSession.markCompleted = true;

      },

      markAttendence: (state, action) => {
        console.log('Session Slice: markAttendence', action.payload);
        const {sessionId, studentId, attendance} = action.payload;
        state.currentSession = state.sessions.find(p => p.sessionId === sessionId);

        for (let index = 0; index < state.currentSession.studentList.length; index++) {
          if (state.currentSession.studentList[index].studentId == studentId){
            state.currentSession.studentList[index].attendance = attendance;
          }
        }
      },

      addFeedbackForStudent: (state, action) => {
        console.log('Session Slice: addFeedbackForStudent', action.payload);
        const {sessionId, studentId, feedback} = action.payload;
        state.currentSession = state.sessions.find(p => p.sessionId === sessionId);

        for (let index = 0; index < state.currentSession.studentList.length; index++) {
          if (state.currentSession.studentList[index].studentId == studentId){
            state.currentSession.studentList[index].feedbackForStudent = feedback;
            break;
          }
        }
      },

      addFeedbackForTeacher: (state, action) => {
        console.log('Session Slice: addFeedbackForTeacher', action.payload);
        const {sessionId, studentId, feedback, rating} = action.payload;
        state.currentSession = state.sessions.find(p => p.sessionId === sessionId);

        for (let index = 0; index < state.currentSession.studentList.length; index++) {
          if (state.currentSession.studentList[index].studentId == studentId){
            state.currentSession.studentList[index].feedbackForTeacher = feedback;
            state.currentSession.studentList[index].ratingForTeacher = rating;
            break;
          }
        }
      },


    },
  });

  export const sessionSelector = (state) => state.sessions.sessions;

  function getMonth(currDate){
    let myDate = new Date(currDate*1000);
    // let dateStr = myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds()
    return myDate.getMonth();
  }

  function getYear(currDate){
    let myDate = new Date(currDate*1000);
    return myDate.getFullYear();
  }

  export const getAllSessionsbyMonthYear = createSelector(
    [sessionSelector, (sessionSelector, [month, year]) => [month, year]],
    (sessionSelector, [month, year]) => {
      console.log(" Session Slice: getAllSessionsbyMonthYear");
      

      const currentSession = sessionSelector.filter(p => getMonth(p.start_date) === month &&  getYear(p.start_date) === year);

      return currentSession;
    },
  );

  export const getAllSessionsbyId = createSelector(
    [sessionSelector, (sessionSelector, [userid]) => [userid]],
    (sessionSelector, [userid]) => {
      const instructorSessions = sessionSelector.filter(p => p.instructorId === userid);
      return instructorSessions;
    },
  );