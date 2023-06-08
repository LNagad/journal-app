import { useDispatch, useSelector } from 'react-redux';
import { useForm } from './useForm';
import { useRef } from 'react';
import { useEffect } from 'react';
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from '../store/journal';
import Swal from 'sweetalert2';
import { useMemo } from 'react';

export const useNoteView = () => {
  
   const dispatch = useDispatch();

   const { activeNote, savedMessage, isSaving } = useSelector( state => state.journal );
  
   const { body, title, date, onChangeInput, formState } = useForm( activeNote );

   const fileInputRef = useRef();

   useEffect(() => {
      dispatch( setActiveNote( formState ) );
   }, [ formState ]);

   useEffect(() => {
      if (savedMessage.length > 0) {
         Swal.fire('Note updated', savedMessage, 'success');
      }
   }, [ savedMessage ]);
  
  
   const dateString = useMemo( () => {
      const newDate = new Date( date );
      return newDate.toUTCString();
   }, [date]);
  
   const onSaveNote = () => {
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
      body, title, date, onChangeInput, formState,
      activeNote, savedMessage, isSaving
   };
};
