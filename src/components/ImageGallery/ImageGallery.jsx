import PropTypes from 'prop-types';

import s from './ImageGallery.module.css';

const ImageGallery = ({ children, onClick }) => {
  return (
    <ul className={s.imageGallery} onClick={onClick}>
      {children}
    </ul>
  );
};

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export { ImageGallery };
