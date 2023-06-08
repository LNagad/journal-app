import { useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { useForm } from './useForm';
import { setActiveNote, setActiveNoteNull, startDeletingNote, startSavingNote, startUploadingFiles } from '../store/journal';
import { useState } from 'react';

const validationsForm = {
   body: [ (value) =>  value.length >= 5, 'The body must be at least 5 characters long' ],
   title: [ (value) => value.length >= 5, 'The title must be at least 5 characters long' ],
};

export const useNoteView = () => {
  
   const dispatch = useDispatch();

   const { activeNote, savedMessage, isSaving } = useSelector( state => state.journal );
  
   const { 
      body, title, date, onChangeInput, formState,
      isFormValid, titleValid, bodyValid 
   } = useForm( activeNote, validationsForm );

   const fileInputRef = useRef();

   const [formSubmitted, setFormSubmitted] = useState(false);
   
   useEffect(() => {
      dispatch( setActiveNote( formState ) );
   }, [ formState ]);

   useEffect(() => {
      if (savedMessage.length > 0) {
         Swal.fire('Note updated', savedMessage, 'success');

         setTimeout( () => {
            dispatch( setActiveNoteNull() );
            Swal.close();
         }, 2000);
      }
   }, [ savedMessage ]);
  
  
   const dateString = useMemo( () => {
      const newDate = new Date( date );
      return newDate.toUTCString();
   }, [date]);
  
   const onSaveNote = () => {
      setFormSubmitted(true);
      if ( !isFormValid ) return;

      dispatch( startSavingNote() );
   };

   const onFileInputChange = ({ target }) => {
      if ( target.files === 0 ) return;
      dispatch( startUploadingFiles( target.files ));
   };

   const onDelete = () => {
      dispatch( startDeletingNote() );
   };

   return {
      onDelete, onFileInputChange, onSaveNote,
      dateString, fileInputRef,
      body, title, date, onChangeInput, formState, isFormValid, titleValid, bodyValid,
      formSubmitted,
      activeNote, savedMessage, isSaving
   };
};
