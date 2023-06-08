import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/auth';

export const Navbar = ({ drawerWidth }) => {
   const dispach = useDispatch();

   const onLogout = () => {
      dispach( startLogout() );
   };

   return (
      <AppBar 
         position="fixed"
         sx={{ 
            width: { sm: `calc(100% - ${drawerWidth}px)` }, 
            ml: { sm: `${ drawerWidth }`}
         }}
      >
         <Toolbar>
            <IconButton
               color='inherit'
               edge='start'
               sx={{ mr: 2, display: { sm: 'none'}}}
            >
               <MenuOutlined />
            </IconButton>

            <Grid
               container
               direction={'row'}
               justifyContent={'space-between'}
               alignItems={'center'}
            >
               <Typography 
                  variant='h6' 
                  noWrap 
                  component={'div'} 
                  className='animate__animated animate__rubberBand'
               >
                  JournalApp
               </Typography>

               <IconButton onClick={ onLogout } color='error'>
                  <LogoutOutlined />
               </IconButton>
            </Grid>
         </Toolbar>
      </AppBar>
   );
};


Navbar.propTypes = {
   drawerWidth: PropTypes.number.isRequired
};