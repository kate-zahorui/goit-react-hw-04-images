import React from 'react';

import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import s from './Searchbar.module.css';

export class Searchbar extends React.Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = e => {
    const { value } = e.target;
    this.setState({ searchQuery: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={s.button}>
            <SearchIcon width="20" height="20" />
            {/* <span className={s.buttonLabel}>Search</span> */}
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

// export { Searchbar };
