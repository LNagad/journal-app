export const initialState = {
   status: 'checking', // not-authenticated, checking
   uid: null,
   email: null,
   displayName: null,
   photoURL: null,
   errorMessage: null
};

export const authenticatedState = {
   status: 'authenticated', // not-authenticated, checking
   uid: 'ABC123',
   email: 'demo@gmail.com',
   displayName: 'Demo user',
   photoURL: 'https://demo.jpg',
   errorMessage: null
};

export const notAuthenticatedState = {
   status: 'not-authenticated', // not-authenticated, checking
   uid: null,
   email: null,
   displayName: null,
   photoURL: null,
   errorMessage: null
};

export const demoUser = {
   uid: 'ABC123',
   email: 'demo@google.com',
   displayName: 'Demo user 2',
   photoURL: 'https://demo.jpg',
};