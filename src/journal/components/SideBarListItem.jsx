import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote, togleSideBar } from '../../store/journal';

export const SideBarListItem = ( { note } ) => {
   
   const { title, body } = note;

   const newTitle = useMemo( () => {
      return title.length > 17 
         ? title.substring(0, 17) + '...' 
         : title;
   }, [title]);

   const newBody = useMemo( () => {
      return body.length > 17 
         ? body.substring(0, 17) + '...' 
         : body;
   }, [body]);

   const dispatch = useDispatch();

   const onClickNote = () => {
      dispatch( setActiveNote( note ) );
      dispatch( togleSideBar() );

   };

   return (
      
      <ListItem disablePadding>
         <ListItemButton  onClick={ onClickNote }>

            <ListItemIcon>
               <TurnedInNot />
            </ListItemIcon>

            <Grid container sx={{ flexWrap: 'wrap' }}>
               <ListItemText sx={{ width: 100 }} primary={ newTitle } />
               <ListItemText sx={{ width: 100 }} secondary={ newBody }  />

            </Grid>

         </ListItemButton>
      </ListItem>
   );
};


SideBarListItem.propTypes = {
   note: PropTypes.object.isRequired
};