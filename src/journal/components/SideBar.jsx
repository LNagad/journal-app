import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { SideBarListItem } from './SideBarListItem';

export const SideBar = ({ drawerWidth = 240}) => {

   const { displayName } = useSelector( state => state.auth);
   const { notes } = useSelector( state => state.journal);
   
   return (
      <Box
         component={'nav'}
         sx={{ width: { sm: drawerWidth}, flexShrink: { sm: 0 } }}
      >
         <Drawer
            variant='permanent'
            open
            sx={{ 
               display: { xs: 'block'}, 
               '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth}
            }}
         >
            <Toolbar>
               <Typography variant='h6' noWrap component={'div'}>
                  {displayName.split(' ')[0]}
               </Typography>
            </Toolbar>

            <Divider />

            <List>
               {
                  notes.map( note => (
                     
                     <SideBarListItem key={ !note.id ? new Date().getTime() : note.id  } note={ note } /> 
                  ))
               }
            </List>

         </Drawer>
      </Box>
   );
};
