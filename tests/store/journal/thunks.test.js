import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setSaving, startDeletingNote, startLoadingNotes, startNewNote, startSavingNote } from '../../../src/store/journal';
import { newNote } from '../../fixtures/journalFixtures';
import { FirebaseDB } from '../../../src/firebase/config';


describe('testing journal thunks', () => { 

   const dispatch = jest.fn();
   const getState = jest.fn();

   beforeEach( () => jest.clearAllMocks() );

   test('startNewNote should add new empty note to the store', () => { 
      const newNote = {
         title: '',
         body: '',
         date: expect.any(Number),
         imageUrls: []
      };

      startNewNote()(dispatch);

      expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
      expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote(newNote) );
      expect( dispatch ).toHaveBeenCalledWith( setActiveNote(newNote) );
   });

   test('startSavingNote should add new note to firebase and to reducer store', async() => { 
      const uid = 'TEST-123';

      getState.mockReturnValue({ 
         auth: { uid }, 
         journal: { activeNote: newNote}
      });

      await startSavingNote()( dispatch, getState );

      expect( dispatch ).toHaveBeenCalledWith( setSaving() );

      // * Borrar de Firebase
      const collectionRef = collection( FirebaseDB, `journal/${uid}/notes` ) ;
      const docs = await getDocs( collectionRef );
      
      const deletePromises = [];
      docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );
      await Promise.all( deletePromises );
      
   });
    
   test('startLoadingNotes should return the notes ', async() => { 
       
      const uid = 'TEST-LOADNOTES-123';
      getState.mockReturnValue({ auth: { uid }, });
       
      await startLoadingNotes()(dispatch, getState);
 
      expect( dispatch ).toHaveBeenCalledWith( setNotes([{
         ...newNote,
         id: expect.any( String ),
         date: expect.any( Number ),
      }]));
 
   });

   test('startLoadingNotes should return null if any notes found', async() => { 
      const uid = 'TEST-123';
      getState.mockReturnValue({ 
         auth: { uid }, 
      });

      const result = await startLoadingNotes()(dispatch, getState);

      expect( result ).toBe( null );

   });

   test('startDeletingNote should delete note from firebase and reducer store', async() => { 
      const uid = 'TEST-LOADNOTES-1234';
      const id = 'hola';

      getState.mockReturnValue({ 
         auth: { uid }, 
         journal: { activeNote: {id, ...newNote}}
      });
      
      await startSavingNote()( dispatch, getState );

      const resp = await startDeletingNote()( dispatch, getState );
      
      expect( resp.ok ).toBeTruthy();
      expect( dispatch ).toHaveBeenCalledWith(  deleteNoteById(id) );

   });

   test('startDeletingNote should return ok: false if note id does not exist', async() => { 
      const uid = 'TEST-LOADNOTES-1234';
      const id = 'hola';

      getState.mockReturnValue({ 
         auth: { uid }, 
         journal: { activeNote: {id, ...newNote}}
      });

      const falsyNoteState = () => ({ 
         auth: { uid }, 
         journal: { activeNote: {id: 123, ...newNote}}
      });
      
      await startSavingNote()( dispatch, getState );
      
      jest.clearAllMocks();

      const resp = await startDeletingNote()( dispatch, falsyNoteState );
      
      expect( resp.ok ).toBe(false);
      expect( dispatch ).not.toHaveBeenCalled();

   });


});