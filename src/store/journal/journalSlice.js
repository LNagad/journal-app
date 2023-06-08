import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
   name: 'journal',
   initialState: {
      isSaving: false,
      savedMessage: '',
      notes: [],
      activeNote: null,
      isSideBarOpen: false
      // activeNote: {
      //    id: '123',
      //    title: '',
      //    body: '',
      //    date: 12333,
      //    imageUrls: []
      // }
   },
   reducers: {
      togleSideBar: (state) => {
         state.isSideBarOpen = !state.isSideBarOpen;
      },
      savingNewNote: ( state ) => {
         state.isSaving = true;
      },
      addNewEmptyNote: ( state, action ) => {
         state.notes.push( action.payload );
         state.isSaving = false;
         state.activeNote = null;
      },
      setActiveNote: ( state, action ) => {
         state.activeNote = action.payload;
         state.savedMessage = '';
      },
      setActiveNoteNull: ( state ) => {
         state.activeNote = null;
         state.savedMessage = '';
      },
      setNotes: ( state, action ) => {
         state.notes = action.payload;
      },
      setSaving: ( state ) => {
         state.isSaving = true;
         state.savedMessage = '';
      },
      updateNote: ( state, { payload } ) => {
         state.isSaving = false;
         state.notes.pop();
         state.notes.push(payload);
         // state.notes = state.notes.map( note => {
         //    if ( note.id === payload.id ) return payload;
         //    return note;
         // });

         state.savedMessage = `${payload.title}, succesfully updated`;
         // state.activeNote = null;
      },
      setPhotosToActiveNote: ( state, { payload } ) => {
         state.activeNote.imageUrls = [ ...state.activeNote.imageUrls, ...payload];
         state.isSaving = false;
      },
      clearNotesLogout: (state) => {
         state.isSaving = false;
         state.savedMessage = '';
         state.notes = [];
         state.activeNote = null;
         state.isSideBarOpen = false;
      },
      deleteNoteById: ( state, {payload} ) => {
         state.notes = state.notes.filter( note => note.id !== payload);
         state.activeNote = null;
      },
   }
});

export const {
   addNewEmptyNote,
   clearNotesLogout,
   deleteNoteById,
   savingNewNote,
   setActiveNote,
   setActiveNoteNull,
   setNotes,
   setPhotosToActiveNote,
   setSaving,
   togleSideBar,
   updateNote,
} = journalSlice.actions;

