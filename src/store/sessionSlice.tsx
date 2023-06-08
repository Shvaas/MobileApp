/* eslint-disable prettier/prettier */
import {createSlice, createSelector} from '@reduxjs/toolkit';

const initialState = {
  sessions: [],
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
          tempSession.end_date = serverSessions[i].end_date;
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

  export const getAllSessionsbyMonthYear = createSelector(
    [sessionSelector, (sessionSelector, [month, year]) => [month, year]],
    (sessionSelector, [month, year]) => {
      const currentSession = sessionSelector.find(p => p.start_date.getMonth() === month &&  p.start_date.getYear() === year);
  
      return currentSession;
    },
  );