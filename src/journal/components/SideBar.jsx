import { Box, Divider, Drawer, IconButton, List, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { SideBarListItem } from './SideBarListItem';
import { togleSideBar } from '../../store/journal';

export const SideBar = ({ drawerWidth = 240}) => {

   const dispach = useDispatch();
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

   const { displayName } = useSelector( state => state.auth);
   const { notes, isSideBarOpen } = useSelector( state => state.journal);
   

   const togleDrawer = () => {
      dispach( togleSideBar() );
   };

   return (
      <Box
         component={'nav'}
         sx={{ width: { sm: drawerWidth}, flexShrink: { sm: 0 } }}
      >
         <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isSideBarOpen}
            onClose={ togleDrawer }
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
