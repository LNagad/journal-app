import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
   Alert,
   Button,
   Grid,
   Link,
   TextField,
   Typography,
} from '@mui/material';
import { Google } from '@mui/icons-material';

import {
   resetErrorMessages,
   startGoogleSignIn,
   startSignInWithEmailPassword,
} from '../../store/auth';

import { useForm, useSignFormSubmitted } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';

const validationsForm = {
   email: [(value) => value.length >= 1, 'The name is required'],
   password: [(value) => value.length >= 1, 'The name is required'],
};

const initialState = {
   email: '',
   password: '',
};

export const LoginPage = () => {
   const dispatch = useDispatch();

   const { status, errorMessage } = useSelector((state) => state.auth);

   const {
      setFormSubmitted,
      formSubmitted,
      setNormalSignInSubmited,
      normalSignInSubmited,
   } = useSignFormSubmitted();

   const isAuthenticating = useMemo(() => status === 'checking', [status]);

   const {
      email,
      password,
      onChangeInput,
      emailValid,
      passwordValid,
      isFormValid,
   } = useForm(initialState, validationsForm);

   const onSubmit = (event) => {
      event.preventDefault();
      setFormSubmitted(true);
      setNormalSignInSubmited(true);

      dispatch(resetErrorMessages());
      if (!isFormValid) return;
      dispatch(startSignInWithEmailPassword({ email, password }));
   };

   const onGoogleSubmit = (event) => {
      event.preventDefault();
      setFormSubmitted(true);

      dispatch(resetErrorMessages());
      dispatch(startGoogleSignIn());
   };

   return (
      <AuthLayout title="Login">
         <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>
               <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                     label="Email"
                     type="email"
                     placeholder="email@google.com"
                     name="email"
                     value={email}
                     onChange={onChangeInput}
                     disabled={isAuthenticating}
                     error={normalSignInSubmited && !!emailValid}
                     helperText={normalSignInSubmited && emailValid}
                     fullWidth
                  />
               </Grid>

               <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                     label="Password"
                     type="password"
                     placeholder="Your password"
                     name="password"
                     value={password}
                     disabled={isAuthenticating}
                     onChange={onChangeInput}
                     error={normalSignInSubmited && !!passwordValid}
                     helperText={normalSignInSubmited && passwordValid}
                     fullWidth
                  />
               </Grid>

               <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                  {formSubmitted && errorMessage != null && (
                     <Grid item xs={12}>
                        <Alert severity="error">{errorMessage}</Alert>
                     </Grid>
                  )}

                  <Grid item xs={12} sm={6}>
                     <Button
                        type="submit"
                        variant="contained"
                        disabled={isAuthenticating}
                        fullWidth
                     >
                        Login
                     </Button>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                     <Button
                        disabled={isAuthenticating}
                        variant="contained"
                        onClick={onGoogleSubmit}
                        fullWidth
                     >
                        <Google />
                        <Typography sx={{ ml: 1 }}>Google</Typography>
                     </Button>
                  </Grid>
               </Grid>

               <Grid container direction={'row'} justifyContent={'end'}>
                  <Link
                     component={RouterLink}
                     color="inherit"
                     to="/auth/register"
                     sx={{pointerEvents: isAuthenticating ? 'none' : 'auto'}}
                  >
                     Create account
                  </Link>
               </Grid>
            </Grid>
         </form>
      </AuthLayout>
   );
};
