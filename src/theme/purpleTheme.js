import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const purpleTheme = createTheme({
   palette: {
      primary: {
         main: '#917FB3'
      },
      secondary: {
         main: '#E5BEEC'
      },
      error: {
         main: red.A400
      }
   }
});