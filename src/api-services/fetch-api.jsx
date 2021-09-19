// import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// const API_KEY = '22569115-02a432c6c1c62bbb3a59801b7';
// const PER_PAGE = 12;

// export const fetchItems = async (searchItem, page = 1) => {
//   const response = await axios.get(
//     `?q=${searchItem}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`,
//   );
//   return response;
// };

// Через обычный фетч, без axios

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22569115-02a432c6c1c62bbb3a59801b7';
export const PER_PAGE = 12;

export const fetchItems = (searchItem, page = 1) => {
  return fetch(
    `${BASE_URL}?q=${searchItem}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`,
  );
};
