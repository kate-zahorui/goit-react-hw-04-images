import React from 'react';
import PropTypes from 'prop-types';

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
    const { searchQuery } = this.state;
    const { handleInputChange, handleFormSubmit } = this;

    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={handleFormSubmit}>
          <button type="submit" className={s.button}>
            <SearchIcon width="20" height="20" />
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
