import { createUserWithEmailAndPassword } from 'firebase/auth';
import { logoutFirebase, signInWithEmailPassword, signInWithGoogle, signUpWithEmailPassword } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout, resetErroMessage, } from '../../../src/store/auth/authSlice';
import { checkingAuthentication, startGoogleSignIn, resetErrorMessages, startSignInWithEmailPassword, startCreatingUserWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { demoUser } from '../../fixtures/authFixtures';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';

jest.mock('../../../src/firebase/providers');

describe('testing auth thunks', () => { 

   const dispatch = jest.fn();

   beforeEach(() => jest.clearAllMocks() );
  
   test('should invoke checkingAuthentication()', async() => { 
      
      await checkingAuthentication()(dispatch);
      expect( dispatch ).toHaveBeenCalledWith(checkingCredentials());

   });

   test('should invoke resetErrorMessages()', async() => { 
      
      await resetErrorMessages()(dispatch);
      expect( dispatch ).toHaveBeenCalledWith(resetErroMessage());

   });

   test('should invoke startGoogleSignIn() and login()', async() => { 
    
      const loginData = { ok: true, ...demoUser};
      await signInWithGoogle.mockResolvedValue( loginData );
      
      await startGoogleSignIn()(dispatch);
      
      expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
      expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
   });
   
   test('should invoke startGoogleSignIn() and logout() - Error', async() => { 
    
      const loginData = { ok: false, errorMessage: 'Google error' };
      await signInWithGoogle.mockResolvedValue( loginData );
      
      await startGoogleSignIn()(dispatch);
      
      expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
      expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );
   });

   test('should invoke startSignInWithEmailPassword() and login()', async() => { 
    
      const loginData = { ok: true, ...demoUser };
      
      await signInWithEmailPassword.mockResolvedValue( loginData );
      
      await startSignInWithEmailPassword(loginData.email, '123456')(dispatch);
      
      expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
      expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
   });

   test('should invoke startSignInWithEmailPassword() and logout() - Error', async() => { 
    
      const loginData = { ok: false, errorMessage: 'Error in backend' };
      const formData = { password: '123', ...demoUser};
      
      await signInWithEmailPassword.mockResolvedValue( loginData );
      
      await startSignInWithEmailPassword(formData)(dispatch);
      
      expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
      expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );
   });

   test('should invoke startCreatingUserWithEmailPassword() and login()', async() => { 
    
      const loginData = { ok: true , ...demoUser };
      const formdata = { password: 123, ...demoUser };
      
      await signUpWithEmailPassword.mockResolvedValue( loginData );
    
      await startCreatingUserWithEmailPassword(formdata)(dispatch);
    
      expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

      delete loginData.ok;
      
      expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
   });

   test('should invoke startCreatingUserWithEmailPassword() and logout() - Error', async() => { 
    
      const loginData = { ok: false, errorMessage: 'Error in backend' };
      const formdata = { password: 123, ...demoUser };
      
      await signUpWithEmailPassword.mockResolvedValue( loginData );
    
      await startCreatingUserWithEmailPassword(formdata)(dispatch);
    
      expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
      delete loginData.ok;
      
      expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );
   });


   test('should invoce startLogout() and clear all notes from reducer store', async() => { 
      
      await startLogout()(dispatch);

      expect( logoutFirebase ).toHaveBeenCalled();
      expect( dispatch ).toHaveBeenCalledWith( logout() );
      expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );

   });

});