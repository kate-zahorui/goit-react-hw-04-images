import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, src, alt }) => {
  return (
    <li className={s.galleryItem}>
      <img id={id} src={src} alt={alt} className={s.image} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export { ImageGalleryItem };
