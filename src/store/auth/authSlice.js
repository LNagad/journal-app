import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      status: 'checking', // not-authenticated, checking
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: null
   },
   reducers: {
      login: ( state, { payload } ) => {
         state.status = 'authenticated'; // not-authenticated, checkin;
         state.uid = payload.uid;
         state.email = payload.email;
         state.displayName = payload.displayName;
         state.photoURL = payload.photoURL;
         state.errorMessage = null;
      },
      logout: ( state, { payload } ) => {
         state.status = 'not-authenticated'; // not-authenticated, checkin;
         state.uid = null;
         state.email = null;
         state.displayName = null;
         state.photoURL = null;
         state.errorMessage = payload?.errorMessage;
      },
      checkingCredentials: ( state ) => {
         state.status = 'checking';
      },
      resetErroMessage: (state) => {
         state.errorMessage = null;
      }
   }
});

export const { login, logout, checkingCredentials, resetErroMessage } = authSlice.actions;
