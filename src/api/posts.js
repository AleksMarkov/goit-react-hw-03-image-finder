import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts',
  // params: {
  //   key: '',
  //   image_type: 'photo',
  //   orientation: 'horizontal',
  // },
});

export const getAllPosts = () => {
  return instance.get('/');
};

export const searchPosts = (search, _page = 1) => {
  // return instance.get(`/?q=${search}&_limit=6&_page=${_page}`);
  return instance.get('/', {
    params: {
      search,
      _limit: 6,
      _page,
    },
  });
};
