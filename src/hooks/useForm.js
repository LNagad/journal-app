import { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export const useForm = ( initialForm = {}, validationsForm = {} ) => {
    
   const [formState, setFormState] = useState(initialForm);

   const [formValidation, setFormValidation] = useState({});

   useEffect(() => {
      createValidators();
   }, [ formState ]);
   
   useEffect(() => {
      setFormState( initialForm );
   }, [ initialForm ]);

   const isFormValid = useMemo( () => {

      for (const formValue of Object.keys(formValidation) ) {
         
         if (formValidation[formValue] !== null) return false;
         //null means there is an error
      }

      return true;

   },[formValidation]);

   const onChangeInput = ({ target }) => {
        
      const { name, value } = target;

      setFormState({
         ...formState,
         [name]: value
      });
   };

   const onResetBtn = () => {
      setFormState(initialForm);
   };

   const createValidators = () => {
     
      const formCheckedValues = {};

      for (const formField of Object.keys( validationsForm )) {
         const [ fn, errorMessage = 'This field is required' ] = validationsForm[formField];

         formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) 
            ? null 
            : errorMessage;
      }

      setFormValidation( formCheckedValues );
      // console.log(formCheckedValues);
      
   };

   return {
      ...formState,
      formState,
      onChangeInput,
      onResetBtn,


      ...formValidation,
      isFormValid
   };
};