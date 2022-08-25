import { useState } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import s from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = e => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit(searchQuery);
  };

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
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
