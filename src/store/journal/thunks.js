import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './';
import { fileUpload, loadNotes } from '../../helpers';

export const startNewNote = () => {
   return async( dispatch, getState ) => {

      dispatch( savingNewNote() );

      // const { uid } = getState().auth;

      const newNote = {
         title: '',
         body: '',
         date: new Date().getTime(),
         imageUrls: []
      };

      // const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) );
      // await setDoc( newDoc, newNote );

      // newNote.id = newDoc.id;
      // dispatch
      
      //TODO: dispatch ( newNote )
      dispatch( addNewEmptyNote( newNote ) );
      dispatch( setActiveNote( newNote ) );

   };
};

export const startSavingNote = () => {
   return async( dispatch, getState ) => {
      
      dispatch( setSaving() );

      const { uid } = getState().auth;
      const { activeNote } = getState().journal;

      const newNote = {...activeNote};

      if (!activeNote.id)  {
         
         const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) );
         await setDoc( newDoc, activeNote );
         newNote.id = newDoc.id;

         const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${newNote.id}`);
         await setDoc( docRef, newNote, { merge: true } );

      } else {

         const noteToFireStore = { ...newNote };
         delete noteToFireStore.id;

         const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${newNote.id}`);
         await setDoc( docRef, noteToFireStore, { merge: true } );

      }

      dispatch( updateNote( newNote ) );
   };
};


export const startLoadingNotes = () => {
   return async( dispatch, getState ) => {
   
      const { uid } = getState().auth;
      
      if ( !uid ) return new Error('The user UID was not found');
      
      const notes = await loadNotes( uid );

      if ( notes  <= 0 ) return new Error('Notes not found');

      dispatch( setNotes(notes) );
   };
};



export const startUploadingFiles = ( files = [] ) => {
   return async( dispatch, getState ) => {
      dispatch( setSaving() );
      
      // await fileUpload( files[0] );
      const fileUploadPromises = [];

      for (const file of files) {
         fileUploadPromises.push( fileUpload(file) );
      }

      const photosUrls = await Promise.all( fileUploadPromises );
      dispatch( setPhotosToActiveNote( photosUrls ));                                                                                  
   };
};

export const startDeletingNote = () => {
   return async( dispatch, getState ) => {
      const { uid } = getState().auth;
      const { activeNote } = getState().journal;

      const docRef = doc( FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
      await deleteDoc(docRef);

      dispatch( deleteNoteById(activeNote.id) );
   };
};