import { useState } from 'react';

export const useSignFormSubmitted = () => {

   const [formSubmitted, setFormSubmitted] = useState(false);
   const [normalSignInSubmited, setNormalSignInSubmited] = useState(false);

   return {
      formSubmitted,
      setFormSubmitted,
      normalSignInSubmited,
      setNormalSignInSubmited
   };
};
