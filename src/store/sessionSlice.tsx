/* eslint-disable prettier/prettier */
import {createSlice, createSelector} from '@reduxjs/toolkit';

const mysessions = [
  {
    sessionId: '1',
    instructorId: 3,
    description: 'random text',
    zoomlink: '-',
    start_date: 1680772845,
    durationMinutes: 45,
    session_type: 1,
    total_slots: 10,
    available_slots: 4,
  },
  {
    sessionId: '2',
    instructorId: 3,
    description: 'random text',
    zoomlink: '-',
    start_date: 1686331014,
    durationMinutes: 45,
    session_type: 1,
    total_slots: 10,
    available_slots: 4,
  },
  {
    sessionId: '2',
    instructorId: 3,
    description: 'random text',
    zoomlink: '-',
    start_date: 1685633128,
    durationMinutes: 45,
    session_type: 1,
    total_slots: 10,
    available_slots: 4,
  },
  {
    sessionId: '1',
    instructorId: 3,
    description: 'random text',
    zoomlink: '-',
    start_date: 1686290400,
    durationMinutes: 45,
    session_type: 1,
    total_slots: 10,
    available_slots: 4,
  },
];


const initialState = {
  sessions: mysessions,
};

export const sessionSlice = createSlice({
  name: 'sessions',
  initialState: initialState,
    reducers: {

      initiateSessions: (state, action) => {
        console.log('Note: Userid is dummy, used only for testing - postSlice');
        const serverSessions = action.payload;
        // instructor_id
        // start_date, end_date
        // total slots
        // total available slots
        // description
        // zoom link
        // session_type - group, private
        for (let i = 0; i < serverSessions.length; i++) {
          let tempSession = {};
          tempSession.instructor_id = serverSessions[i].sessionId;
          tempSession.start_date = serverSessions[i].start_date;
          tempSession.durationMinutes = serverSessions[i].durationMinutes;
          tempSession.total_slots = serverSessions[i].total_slots;
          tempSession.available_slots = serverSessions[i].available_slots;
          tempSession.description = serverSessions[i].description;
          tempSession.zoomlink = serverSessions[i].zoomlink;
          tempSession.session_type = serverSessions[i].session_type;

          state.sessions.push(tempSession);
        }
      },

      addSession: (state, action) => {
        console.log('addSession', action.payload);
        const {session} = action.payload;
        state.userSessions.push(session);
      },
    },
  });

  const sessionSelector = (state) => state.sessions.sessions;

  function getMonth(currDate){
    let myDate = new Date(currDate*1000);
    let dateStr = myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds()
    console.log(dateStr);
    
    return myDate.getMonth();
  }

  function getYear(currDate){
    let myDate = new Date(currDate*1000);
    return myDate.getFullYear();
  }

  export const getAllSessionsbyMonthYear = createSelector(
    [sessionSelector, (sessionSelector, [month, year]) => [month, year]],
    (sessionSelector, [month, year]) => {

      const currentSession = sessionSelector.filter(p => getMonth(p.start_date) === month &&  getYear(p.start_date) === year);

      return currentSession;
    },
  );