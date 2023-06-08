import { ImageList, ImageListItem } from '@mui/material';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images }) => {
   return (
      <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
         {images.map((image) => (
            <ImageListItem key={image}>
               <img
                  src={`${image}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt='Image note'
                  loading="lazy"
               />
            </ImageListItem>
         ))}
      </ImageList>
   );
};
ImageGallery.propTypes = {
   images: PropTypes.array.isRequired
};