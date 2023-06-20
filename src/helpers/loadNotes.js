import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';


export const loadNotes = async( uid = '') => {
  
   if ( !uid ) return new Error('The user UID was not found');

   const collectionRef = collection(FirebaseDB, `journal/${uid}/notes`);
   const docsRef = await getDocs( collectionRef );
   
   const notes = [];

   docsRef.forEach( doc => {
      notes.push( {id: doc.id, ...doc.data()});
   });

   return notes;
};