import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetErrorMessages, startCreatingUserWithEmailPassword } from '../../store/auth';
import { useMemo } from 'react';

const formData = {
   email: '',
   password: '',
   displayName: ''
};

const validationsForm = {
   email: [ (value) => value.includes('@'), 'The email must have @' ],
   password: [ (value) => value.length >= 8, 'Password must be at least 8 characters long' ],
   displayName: [ (value) => value.length >= 1, 'The name is required' ],
};

export const RegisterPage = () => {

   const dispatch = useDispatch();

   const [formSubmitted, setFormSubmitted] = useState(false);

   const { status, errorMessage } = useSelector( state => state.auth );
   const isCheckingAuth = useMemo( () => status === 'checking', [status]);

   const { 
      email, password, displayName, onChangeInput, formState,
      isFormValid, emailValid, passwordValid, displayNameValid 
   } = useForm(formData, validationsForm);

   
   const onSubmit = ( event ) => {
      event.preventDefault();
      setFormSubmitted(true);
      dispatch( resetErrorMessages() );
      
      if ( !isFormValid ) return;

      dispatch( startCreatingUserWithEmailPassword(formState) );
   };

   return (
      <AuthLayout title='Register'>
         <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>
               <Grid item xs={ 12 } sx={ {mt: 2} }>
                  <TextField 
                     label='Full name' 
                     type='text'
                     placeholder='Your name'
                     value={displayName}
                     name='displayName'
                     onChange={ onChangeInput }
                     error={ !!displayNameValid && formSubmitted }
                     helperText={ formSubmitted && displayNameValid }
                     fullWidth
                  />
               </Grid>

               <Grid item xs={ 12 } sx={ {mt: 2} }>
                  <TextField 
                     label='Email' 
                     type='email'
                     placeholder='email@google.com'
                     value={email}
                     name='email'
                     onChange={ onChangeInput }
                     error={ !!emailValid && formSubmitted }
                     helperText={ formSubmitted && emailValid }
                     fullWidth
                  />
               </Grid>

               <Grid item xs={ 12 } sx={ {mt: 2} }>
                  <TextField 
                     label='Password' 
                     type='password'
                     placeholder='Your password'
                     value={password}
                     name='password'
                     onChange={ onChangeInput }
                     fullWidth
                     error={ !!passwordValid && formSubmitted }
                     helperText={ formSubmitted && passwordValid }
                  />
               </Grid>

               <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1}}>

                  {formSubmitted && errorMessage != null && (
                     <Grid item xs={12}>
                        <Alert severity='error'>{errorMessage}</Alert>
                     </Grid>
                  )}

                  <Grid item xs={ 12 } >
                     <Button 
                        disabled={ isCheckingAuth }
                        type='submit'
                        variant='contained' 
                        fullWidth>
                           Create Account
                     </Button>
                  </Grid>


               </Grid>

               <Grid container direction={'row'} justifyContent={'end'}>
                  <Typography sx={{ mr: 1}}>Do you already have an account?</Typography>
                  <Link component={ RouterLink } color={'inherit'} to='/auth/login'>
                     Login
                  </Link>
               </Grid>

            </Grid>
         </form>
      </AuthLayout>

   );
};
