import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal';

export const JournalPage = () => {

   const { isSaving, activeNote } = useSelector( state => state.journal );
   const dispatch = useDispatch();
   
   const onClickNewNote = () => {
      dispatch( startNewNote() );
   };


   return (
      <JournalLayout>

         {
            ( activeNote ) //? Equal to: (!!activeNote)
               ? <NoteView />
               : 
               <>
                  <NothingSelectedView />
                  <IconButton 
                     onClick={ onClickNewNote }
                     disabled={ isSaving }
                     size='large'
                     sx={{
                        color: 'white',
                        backgroundColor: `${isSaving ? '#A9A9A9' : 'error.main'}`,
                        ':hover': { backgroundColor: 'error.main', opacity: 0.9  },
                        position: 'fixed',
                        right: 50,
                        bottom: 50
                     }}>
                     <AddOutlined sx={{ fontSize: 30 }} />
                  </IconButton>
               </> 
         }
         
         

      </JournalLayout>
   );
};
