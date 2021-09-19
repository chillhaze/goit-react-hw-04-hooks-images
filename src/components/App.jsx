import { useState, useEffect } from 'react';
import { fetchItems } from '../api-services/fetch-api';
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
    // Фетч по поиску
    if (searchItem !== '' && page === 1) {
      setStatus('pending');
      setPage(1);

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
          if (hits.length === 0) {
            toast.error('no images');
            setSearchResult([]);
            setStatus('idle');
          } else if (hits.length > 0) {
            toast.success(`${totalHits} images found`);
            setSearchResult(hits);
          }

          return setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }

    return;
  }, [searchItem]);

  useEffect(() => {
    // Фетч по нажатию Load more
    if (page > 1) {
      setStatus('pending');

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
          const { hits } = data;

          if (hits.length === 0) {
            toast.error('no more images found');
            setSearchResult([]);
            setSearchItem('');
            setStatus('idle');
            setPage(1);

            return;
          }
          toast.success('more images found');
          setSearchResult(prevState => [...prevState, ...hits]);
          setStatus('resolved');
          scrollDown();

          return;
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }
  }, [page]);

  // Передаю в стейт текст поиска
  const handleFormSubmit = searchQuery => {
    setSearchItem(searchQuery);
    setPage(1);
  };

  // Передаю в стейт результат поиска
  const handleSearchResult = querryResult => {
    if (querryResult.length === 0) {
      setSearchResult(null);
    } else {
      setSearchResult(querryResult);
    }
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

  const showBtn = searchResult.length > 0 && status !== 'idle';

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

// setStatus('pending');
// setPage(1);

// fetchItems(searchItem, page)
//   .than(response => {
//     console.log(response);
//     if (response.ok) {
//       return response.json();
//     }

//     toast.error('something went wrong');
//     return Promise.reject(
//       new Error(`search '${searchItem}' returned with error`),
//     );
//   })
//   .than(data => {
//     const { hits, totalHits } = data;
//     if (hits.length === 0) {
//       toast.error('no images');
//       setSearchResult([]);
//       setStatus('idle');
//     } else if (hits.length > 0) {
//       toast.success(`${totalHits} images found`);
//       setSearchResult(hits);
//     }

//     return setStatus('resolved');
//   })
//   .catch(error => {
//     setError(error);
//     setStatus('rejected');
//   });
