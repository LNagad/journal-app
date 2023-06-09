import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
   cloud_name: 'lnagad',
   api_key: '665834415689665',
   api_secret: 'p2X8HSfG_S1OK_B2vG_MMeMQ4Cc',
   secure: true
});

describe('Testing fileUpload helper', () => { 
  
   test('should upload the file succesfully to cloudinary', async() => { 
    
      const imgURL = 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/IMG_Academy_Logo.svg/800px-IMG_Academy_Logo.svg.png';

      const resp = await fetch(imgURL);
      const blob = await resp.blob();
      const file = new File([blob], 'test.jpg');

      const url = await fileUpload(file);
      expect( typeof url ).toBe('string') ;


      const segments = url.split('/');
      const imageId = segments[ segments.length -1 ].split('.')[0];
      // const imageId = segments[ segments.length -1 ].replace('.png');
      await cloudinary.api.delete_resources([ 'journal-app/' + imageId ], {
         resource_type: 'image'
      });

   });

   test('should return null', async() => {

      const file = new File([], 'test image');
      const url = await fileUpload(file);
      expect(  url ).toBe( null ) ;

   });

});