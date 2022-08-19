import React from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
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
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState.searchQuery);
    // console.log(this.state.searchQuery);
    // console.log(this.state.searchQuery !== prevState.searchQuery);

    if (this.state.searchQuery !== prevState.searchQuery) {
      this.setState({ images: [] });

      setTimeout(
        this.fetchImages(this.state.searchQuery, this.state.page),
        900000
      );

      // this.fetchImages(this.state.searchQuery);
    }
    if (this.state.page !== prevState.page) {
      // this.fetchImages(this.state.searchQuery, this.state.page);
      this.setState({ isLoading: true });
      setTimeout(
        this.fetchImages(this.state.searchQuery, this.state.page),
        9000000
      );
    }
  }

  onSearchformSubmit = searchQuery => {
    if (searchQuery) {
      this.setState({ searchQuery, page: 1 });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log(this.state.page);
  };
  //  let availablePages = Math.ceil(
  //       imagesApiService.totalHits / imagesApiService.per_page
  //     );

  // if (imagesApiService.page > availablePages) {
  //   refs.loadMoreBtn.disabled = true;
  //   refs.loadMoreBtn.textContent =
  //     "We're sorry, but you've reached the end of search results.";
  // }
  async fetchImages() {
    try {
      // this.setState({ isLoading: true });
      const imagesResponse = await UserAPI.fetchImages(
        this.state.searchQuery,
        this.state.page
      );

      // this.setState({ images: images.hits });
      // console.log(images);
      if (imagesResponse.ok) {
        const img = await imagesResponse.json();

        const availablePages = Math.ceil(img.totalHits / 12);

        console.log(img.hits);
        // setTimeout(this.setState({ images: img.hits }), 3000000);
        this.setState(prevState => ({
          images: [...prevState.images, ...img.hits],
          availablePages,
        }));
        return;
      }
      return Promise.reject(new Error('Нет картинок по запросу'));
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.onSearchformSubmit} />
        {this.state.isLoading && <Loader />}

        {this.state.images.length > 0 && (
          <div>
            <ImageGallery>
              {this.state.images.map(item => {
                return (
                  <ImageGalleryItem
                    key={item.id}
                    src={item.webformatURL}
                    alt={item.tags}
                  />
                );
              })}
            </ImageGallery>

            {this.state.isLoading && <Loader />}
            <footer>
              <Button
                onClick={this.handleLoadMore}
                text={
                  this.state.page === this.state.availablePages
                    ? "We're sorry, but you've reached the end of search results."
                    : 'Load more'
                }
                disabled={
                  this.state.isLoading ||
                  this.state.page === this.state.availablePages
                    ? true
                    : false
                }
              />
            </footer>
          </div>
        )}
      </div>
    );
  }
}
