import s from './ImageGallery.module.css';

const ImageGallery = ({ children }) => {
  return <ul className={s.imageGallery}>{children}</ul>;
};

export { ImageGallery };
