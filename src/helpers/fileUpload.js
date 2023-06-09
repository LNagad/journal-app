
export const fileUpload = async( file ) => {
   // if ( !file ) throw new Error('File has not been sent');
   if ( !file ) return null;

   const cloudURL = 'https://api.cloudinary.com/v1_1/lnagad/upload';
  
   const formData = new FormData();
   formData.append('upload_preset', 'react-journal');
   formData.append('file', file);
   
   try {
    
      const resp = await fetch( cloudURL, {
         method: 'POST',
         body: formData
      } );

      if ( !resp.ok ) throw new Error('Image could not be uploaded');

      const clouldResp = await resp.json();

      return clouldResp.secure_url;

   } catch (error) {
      // console.log(error);
      // throw new Error(error.message);
      return null;
   }
};