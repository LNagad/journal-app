import { logoutFirebase, signInWithEmailPassword, signInWithGoogle, signUpWithEmailPassword } from '../../firebase/providers';
import { clearNotesLogout } from '../journal/journalSlice';
import { checkingCredentials, login, logout, resetErroMessage } from './';

export const checkingAuthentication = () => {
   return async( dispatch ) => {
      dispatch( checkingCredentials() );
   };
};

export const resetErrorMessages = () => {
   return async( dispatch ) => {
      dispatch( resetErroMessage() );
   };
};

export const startGoogleSignIn = () => {
   return async( dispatch ) => {
      dispatch( checkingCredentials() );

      const result = await signInWithGoogle();
      
      if ( !result.ok ) return dispatch( logout( result ) );
      // delete result.ok;
      // console.log(result);
      dispatch( login( result ) );
   };
};

export const startSignInWithEmailPassword = ({ email, password}) => {
   return async( dispatch ) => {
      dispatch( checkingCredentials() );

      const result = await signInWithEmailPassword(email, password);

      if ( !result.ok ) return dispatch( logout( result ) );
      // delete result.ok;
      // console.log(result);
      dispatch( login( result ) );
   };
};


export const startCreatingUserWithEmailPassword = ({ email, password, displayName}) => {
   return async( dispatch ) => {
      dispatch( checkingCredentials() );

      const { 
         ok, 
         errorMessage,
         uid, 
         photoURL 
      } = await signUpWithEmailPassword( {email, password, displayName} );

      if ( !ok ) return dispatch( logout( { errorMessage } ) );

      dispatch( login( { uid, displayName, email, photoURL } ) );
   };
};

export const startLogout = () => {
   return async( dispatch ) => {
      await logoutFirebase();

      dispatch( logout() );
      dispatch( clearNotesLogout() );
   };
};