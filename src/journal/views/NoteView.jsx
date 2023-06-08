import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';

import { useNoteView } from '../../hooks';
import { useSelector } from 'react-redux';


export const NoteView = () => {
   const {
      onDelete, onFileInputChange, onSaveNote,
      dateString, fileInputRef,
      body, title, onChangeInput, isFormValid, titleValid, bodyValid,
      activeNote, isSaving, formSubmitted,
   } = useNoteView();

   const { noteActive } = useSelector( state => state.journal);

   return (
      <Grid container
         direction={'row'}
         justifyContent={'space-between'}
         className='animate__animated animate__fadeIn animate__faster'
         sx={{ mb: 1}}
      >
         <Grid item>
            <Typography fontSize={ 39 } fontWeight={'light'}>{ dateString }</Typography>
         </Grid>

         <Grid item>

            <input 
               type='file'
               multiple
               ref={ fileInputRef }
               onChange={ onFileInputChange }
               style={{ display: 'none' }}
               disabled={ isSaving || !isFormValid }
            />

            <IconButton
               disabled={ isSaving || !isFormValid }
               color='primary'
               onClick={ () => fileInputRef.current.click() }
            >
               <UploadOutlined />
            </IconButton>

            <Button 
               onClick={ onSaveNote }
               disabled={ formSubmitted && (isSaving || !isFormValid) }
               color='primary' 
               sx={{ p: 2 }}>
               <SaveOutlined sx={{ fontSize: 30, mr: 1}} /> 
                Save
            </Button>
         </Grid>

         <Grid container>
            <TextField
               type='text'
               variant='filled'
               fullWidth
               placeholder='Type a title'
               label='Title' 
               name='title'
               value={ title }
               onChange={ onChangeInput }
               sx={{ border: 'none', mb: 1}}
               error={ formSubmitted && titleValid }
               helperText={ formSubmitted && titleValid }
            />

            <TextField
               type='text'
               variant='filled'
               fullWidth
               multiline
               placeholder='What happened today?' 
               minRows={ 5 }
               label='Body' 
               name='body'
               value={ body }
               onChange={ onChangeInput }
               error={ formSubmitted && bodyValid }
               helperText={ formSubmitted && bodyValid }
            />
         </Grid>

         <Grid>
            <Button
               onClick={ onDelete }
               disabled={ !activeNote.id  }
               sx={{ mt: 2 }}
               color='error'
            >
               <DeleteOutline />
               Delete
            </Button>
         </Grid>
         
         <ImageGallery images={ activeNote.imageUrls } />
         
      </Grid>
   );
};
