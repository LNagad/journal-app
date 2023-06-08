// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyAw3O8dUxooJWBjoHawItgfTRCaQumo48E',
   authDomain: 'react-cursos-2423c.firebaseapp.com',
   projectId: 'react-cursos-2423c',
   storageBucket: 'react-cursos-2423c.appspot.com',
   messagingSenderId: '951772337525',
   appId: '1:951772337525:web:e640990d7241d03cd6af3c'
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );