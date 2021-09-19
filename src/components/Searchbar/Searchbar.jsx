import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaQuestionCircle } from 'react-icons/fa';

export const Searchbar = ({ onSubmit }) => {
  const [searchItem, setSearchItem] = useState('');

  // Считываю результат поиска
  const handleFormChange = e => {
    setSearchItem('');
    setSearchItem(e.currentTarget.value.toLowerCase());
  };

  // Передаю результат поиска
  const handleSubmit = e => {
    e.preventDefault();
    if (searchItem.trim() === '') {
      toast.error(
        'empty field',
        {
          icon: <FaQuestionCircle style={{ fill: '#3f51b5' }} />,
        },
        {
          style: {
            backgroundColor: '#e3d120f2',
          },
        },
      );
      return;
    }
    onSubmit(searchItem);
    setSearchItem('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button
          type="submit"
          className="SearchForm-button"
          onClick={handleSubmit}
        >
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          value={searchItem}
          onChange={handleFormChange}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
