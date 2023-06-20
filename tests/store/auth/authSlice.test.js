import { authSlice, login, logout } from '../../../src/store/auth/authSlice';
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from '../../fixtures/authFixtures';


describe('testing authSlice', () => { 
  

   test('should return the initial state and teh object name should be "auth"', () => { 
      
      expect(authSlice.name).toBe('auth');
      const state = authSlice.reducer( initialState, {});

      expect( state ).toEqual( initialState );
   });


   test('should authenticate the user', () => {

      const state = authSlice.reducer( initialState, login( demoUser ) );
      
      expect( state ).toEqual({
         status: 'authenticated', // not-authenticated, checking
         uid: demoUser.uid,
         email: demoUser.email,
         displayName: demoUser.displayName,
         photoURL: demoUser.photoURL,
         errorMessage: null
      });

   });

   test('should logout the user with no errorMessage', () => { 

      const state = authSlice.reducer( authenticatedState, logout() );
      console.log(state);
      expect( state ).toEqual(notAuthenticatedState);
    
   });

   test('should logout the user with errorMessage', () => { 

      const errorMessage = 'Invalid credentials';
      const state = authSlice.reducer( authenticatedState, logout({errorMessage}) );
      
      expect( state ).toEqual({
         ...notAuthenticatedState,
         errorMessage: errorMessage
      });
    
   });

});