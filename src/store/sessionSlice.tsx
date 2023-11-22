/* eslint-disable prettier/prettier */
import {createSlice, createSelector} from '@reduxjs/toolkit';

const mysessions = [
  {
    sessionId: '1',
    instructorId: '5a7fd716-a765-4441-9ef8-eda068138b9e',
    title: 'Title',
    description: 'One line description or tag',
    zoomlink: '-',
    start_date: '2023-02-01T10:00:00Z',
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
    instructorId: '5a7fd716-a765-4441-9ef8-eda068138b9e',
    title: 'Title',
    description: 'One line description or tag',
    zoomlink: '-',
    start_date: '2023-03-01T10:00:00Z',
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
    instructorId: '5a7fd716-a765-4441-9ef8-eda068138b9e',
    title: 'Title',
    description: 'One line description or tag',
    zoomlink: '-',
    start_date: '2023-04-01T10:00:00Z',
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
    start_date: '2023-05-01T10:00:00Z',
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
  sessions: [],
  currentSession: null,
};

export const sessionSlice = createSlice({
  name: 'sessions',
  initialState: initialState,
    reducers: {

      initiateSessions: (state, action) => {
        const {sessions, instructor_id} = action.payload;
        console.log("Session Slice: initiateSessions", sessions);
        console.log("Session slice: initiateSessions previous list:", state.sessions);
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

        //[{"capacity": 30, "courseId": "0f94e351-fd3a-4a71-84c4-123399f50bb4", 
        // "courseName": "Yoga101", "difficultyLevel": "BEGINNER", "price": 10, "sessionDate": "2023-01-01"}]
        state.sessions = [];
        for (let i = 0; i < sessions.length; i++) {
          // let sessionId = sessions[i].courseId;
        //   state.currentSession = state.sessions.find(p => p.sessionId === sessionId);
        //   let newSession = false;
        //   if (state.currentSession === undefined){
             state.currentSession = {};
          //    newSession = true;
          // }
            // add session
            state.currentSession.instructorId = instructor_id;
            state.currentSession.title = sessions[i]?.courseName;
            state.currentSession.sessionId = sessions[i]?.courseId;
            state.currentSession.total_slots = sessions[i]?.capacity;
            state.currentSession.description = sessions[i]?.description;
            state.currentSession.start_date = sessions[i]?.sessionStartTime;
            state.currentSession.end_date = sessions[i]?.sessionEndTime;
            state.currentSession.markCompleted = sessions[i]?.attendanceUpdated;
            state.currentSession.studentList = sessions[i]?.studentProfileList ? sessions[i]?.studentProfileList: []
            console.log("studentProfileList: ", state.currentSession.studentList);
            
            // if(newSession){
              state.sessions.push(state.currentSession);
            // }
        }

        console.log("Session slice: initiateSessions updated list:", state.sessions);
      },

      addSession: (state, action) => {
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

      setInitialState: (state, action) => {
        state.sessions = [];
        state.currentSession = null;
      }

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

  function compareSessions(a, b) {
    const aDate = new Date(a.start_date);
    const bDate = new Date(b.start_date);
    if (aDate < bDate){
      return -1;
    }
    if (aDate > bDate){
      return 1;
    }
    return 0;
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
      console.log("getAllSessionsbyId", userid);
      console.log(sessionSelector);
      
      const instructorSessions = sessionSelector.filter(p => p.instructorId === userid).sort(compareSessions);
      return instructorSessions;
    },
  );

  export const getStudentListbySessionId = createSelector(
    [sessionSelector, (sessionSelector, [sessionId]) => [sessionId]],
    (sessionSelector, [sessionId]) => {
      console.log("getStudentListbySessionId", sessionId);
      console.log(sessionSelector);
      
      const session = sessionSelector.filter(p => p.sessionId === sessionId);
      return session[0].studentList;
    },
  );

  export const getAttendancebySessionId = createSelector(
    [sessionSelector, (sessionSelector, [sessionId]) => [sessionId]],
    (sessionSelector, [sessionId]) => {
      console.log("getStudentListbySessionId", sessionId);
      console.log(sessionSelector);
      
      const session = sessionSelector.filter(p => p.sessionId === sessionId);
      const attendanceDict = {};
      session[0].studentList.forEach( item => {
        attendanceDict[item.studentId]=item?.attendance;
      }
      )
      return attendanceDict;
    },
  );