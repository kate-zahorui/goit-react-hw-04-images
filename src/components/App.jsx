import React from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { UserAPI } from './services/api';

import s from './App.module.css';

export class App extends React.Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    availablePages: 0,
    isLoading: false,
    error: '',
    modalIsShown: false,
    modalImage: {},
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (searchQuery !== prevState.searchQuery) {
      this.setState({ images: [] });
      this.fetchImages(searchQuery, page);
    } else if (page !== prevState.page) {
      this.fetchImages(searchQuery, page);
    }
  }

  onSearchformSubmit = searchQuery => {
    if (searchQuery) {
      this.setState({ images: [], searchQuery, page: 1 });
    }
  };

  handleImageClick = e => {
    if (e.target.nodeName === 'IMG') {
      const imgId = Number(e.target.id);
      const image = this.state.images.find(item => item.id === imgId);

      this.setState({
        modalImage: {
          url: image.largeImageURL,
          alt: image.tags,
        },
      });
      this.toogleModal();
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toogleModal = () => {
    this.setState(prevState => ({
      modalIsShown: !prevState.modalIsShown,
    }));
  };

  async fetchImages() {
    try {
      this.setState({ isLoading: true, error: '' });
      const imagesResponse = await UserAPI.fetchImages(
        this.state.searchQuery,
        this.state.page
      );

      if (imagesResponse.ok) {
        const images = await imagesResponse.json();

        const availablePages = Math.ceil(images.totalHits / 12);

        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          availablePages,
        }));

        if (images.totalHits === 0) {
          Promise.reject(
            new Error(`Нет картинок по запросу "${this.state.searchQuery}"`)
          );
          this.setState({
            error: `Нет картинок по запросу "${this.state.searchQuery}"`,
          });
        }
        return;
      }
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const {
      images,
      page,
      availablePages,
      isLoading,
      error,
      modalIsShown,
      modalImage,
    } = this.state;

    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.onSearchformSubmit} />
        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        {images.length > 0 && (
          <div>
            <ImageGallery onClick={this.handleImageClick}>
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
                onClick={this.handleLoadMore}
                text={
                  page === availablePages
                    ? "We're sorry, but you've reached the end of search results."
                    : 'Load more'
                }
                disabled={isLoading || page === availablePages ? true : false}
              />
            </footer>
            {modalIsShown && (
              <Modal onClick={this.toogleModal}>
                <img src={modalImage.url} alt={modalImage.tags} />
              </Modal>
            )}
          </div>
        )}
      </div>
    );
  }
}
