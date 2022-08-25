import { useState, useEffect } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { UserAPI } from './services/api';

import s from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [availablePages, setAvailablePages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [modal, setModal] = useState({
    modalIsShown: false,
    modalUrl: '',
    modalAlt: '',
  });

  useEffect(() => {
    setImages([]);
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    fetchImages(searchQuery, page);
    // eslint-disable-next-line
  }, [searchQuery, page]);

  const onSearchformSubmit = searchQuery => {
    if (searchQuery) {
      setImages([]);
      setSearchQuery(searchQuery);
      setPage(1);
    }
  };

  const handleImageClick = e => {
    if (e.target.nodeName === 'IMG') {
      const imgId = Number(e.target.id);
      const image = images.find(item => item.id === imgId);

      setModal(prevState => ({
        ...prevState,
        modalUrl: image.largeImageURL,
        modalAlt: image.tags,
      }));
      toogleModal();
    }
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toogleModal = () => {
    setModal(prevState => ({
      ...prevState,
      modalIsShown: !prevState.modalIsShown,
    }));
  };

  async function fetchImages() {
    try {
      setIsLoading(true);
      setError('');

      const imagesResponse = await UserAPI.fetchImages(searchQuery, page);

      if (imagesResponse.ok) {
        const images = await imagesResponse.json();

        const availablePages = Math.ceil(images.totalHits / 12);

        setImages(prevState => [...prevState, ...images.hits]);
        setAvailablePages(availablePages);

        if (images.totalHits === 0) {
          Promise.reject(new Error(`Нет картинок по запросу "${searchQuery}"`));
          setError(`Нет картинок по запросу "${searchQuery}"`);
        }
        return;
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={s.app}>
      <Searchbar onSubmit={onSearchformSubmit} />
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {images.length > 0 && (
        <div>
          <ImageGallery onClick={handleImageClick}>
            {images.map(item => {
              return (
                <ImageGalleryItem
                  key={item.id}
                  id={item.id}
                  src={item.webformatURL}
                  alt={item.tags}
                />
              );
            })}
          </ImageGallery>

          {isLoading && <Loader />}
          <footer>
            <Button
              onClick={handleLoadMore}
              text={
                page === availablePages
                  ? "We're sorry, but you've reached the end of search results."
                  : 'Load more'
              }
              disabled={isLoading || page === availablePages ? true : false}
            />
          </footer>
          {modal.modalIsShown && (
            <Modal onClick={toogleModal}>
              <img src={modal.modalUrl} alt={modal.modalAlt} />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};
