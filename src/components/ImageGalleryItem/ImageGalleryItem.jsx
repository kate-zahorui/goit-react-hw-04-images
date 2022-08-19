import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt }) => {
  return (
    <li className={s.galleryItem}>
      <img src={src} alt={alt} className={s.image} />
    </li>
  );
};

export { ImageGalleryItem };
