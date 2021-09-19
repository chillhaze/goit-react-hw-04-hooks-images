import { useState, useEffect } from 'react';
import { fetchItems, PER_PAGE } from '../api-services/fetch-api';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// Уведомления Тостер
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [searchItem, setSearchItem] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageTag, setSelectedImageTag] = useState(null);

  useEffect(() => {
    // отмена первого фетча
    if (searchItem === '') {
      return;
    }
    setStatus('pending');
    // setPage(1);

    fetchItems(searchItem, page)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        toast.error('something went wrong');
        return Promise.reject(
          new Error(`search '${searchItem}' returned with error`),
        );
      })
      .then(data => {
        const { hits, totalHits } = data;

        // Фетч по поиску
        if (page === 1 && hits.length !== 0 && searchItem !== '') {
          toast.success(`${totalHits} images found`);
          setSearchResult(hits);
          setStatus('resolved');
          return;

          // Фетч по нажатию на кнопку Load more
        } else if (page > 1 && hits.length !== 0) {
          toast.success(`more images found`);
          setSearchResult(prevState => [...prevState, ...hits]);
          setStatus('resolved');
          scrollDown();
          return;
        }
        // Если отрицательный результат поиска
        toast.error('no images');
        setSearchResult([]);
        setSearchItem('');
        setPage(1);
        setStatus('idle');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });

    return;
  }, [searchItem, page]);

  // Передаю в стейт текст поиска
  const handleFormSubmit = searchQuery => {
    setSearchItem(searchQuery);
    setPage(1);
  };

  // Передаю в стейт информацию для модального окна
  const handleSelectItem = item => {
    setSelectedImage(item.largeImageURL);
    setSelectedImageTag(item.tags);
  };
  // Метод закрытия модального окна
  const handleModalClose = () => {
    setSelectedImage(null);
  };

  // Загружаю больше изображений
  const handleBtnClick = () => {
    if (searchResult.length !== 0) {
      setPage(prevState => prevState + 1);
    }
    return;
  };

  // Функция скролла
  const scrollDown = () => {
    return window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const showBtn = searchResult.length > PER_PAGE - 1 && status !== 'idle';

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <Toaster position="top-right" />

      {status === 'pending' && (
        <div className="loader_wrapper">
          <Loader
            type="TailSpin"
            color="#3f51b5"
            height={60}
            width={60}
            className="Loader"
          />
        </div>
      )}

      {status === 'rejected' && <h2 className="error">{error.message}</h2>}

      {status === 'resolved' && (
        <div>
          <ImageGallery
            searchResult={searchResult}
            onSelect={handleSelectItem}
          />
          {showBtn && <Button onBtnClick={handleBtnClick} />}

          {selectedImage && (
            <Modal
              src={selectedImage}
              tag={selectedImageTag}
              onClose={handleModalClose}
            />
          )}
        </div>
      )}
    </div>
  );
};
