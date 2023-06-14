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
      date: 1680772845,
    },
    {
      sessionId: '2',
      instructorId: 3,
      instructorPhoto: utkarsh,
      title: 'Yoga with Shikha',
      description: 'random text',
      zoomlink: '-',
      date: 1686410728,
    },
    
  ];

  
  // {
  //   key: 7,
  //   title: "Yoga7",
  //   description: "Yoga lorem ipsium the random text",
  //   level: 3,
  //   maxCap: 10,
  //   numOfSessions: 5,
  //   instructor: nabeel,
  //   name: "Nabeel",
  //   instructorRating: 3.5,
  //   numOfStudentsEnrolled: 10,
  //   cost: "250$",
  //   date: "10/5/23",
  //   time: "5:00 am"
  // },

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
        console.log(1, state.userSessions);
        state.userSessions.push(action.payload);
      },
    },
  });


export const getSessions = (state) => {
    const sessions =  state.userSessions.userSessions;
    console.log("getSessions", sessions);
    
    const currDate =  Date.now()/1000;

    let myDate = new Date(currDate*1000);
    let dateStr = myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds()
    console.log("dateStr", dateStr);
    // console.log("sessions", sessions);

    let completedSessions = []
    let upcommingSessions = []
    for (let index = 0; index < sessions.length; index++) {
        if (currDate > sessions[index].date) {
            completedSessions.push(sessions[index]);
        }else{
            upcommingSessions.push(sessions[index]);
        }
    }
    console.log("upcommingSessions",upcommingSessions);
    console.log("completedSessions",completedSessions);
    return [upcommingSessions, completedSessions];
};