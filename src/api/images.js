import axios from 'axios';

// var API_KEY = '40977106-cc638815c8129760ea3020b74';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/?',
  // https://pixabay.com/api/?key=40977106-cc638815c8129760ea3020b74&image_type=photo&orientation=horizontal&per_page=12&q=cat&page=1
  params: {
    key: '40977106-cc638815c8129760ea3020b74',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: '12',
  },
});

export const getAllPosts = () => {
  return instance.get('/');
};

export const searchImage = (q, page = 1) => {
  // return instance.get(`/?q=${search}&_limit=6&_page=${_page}`);
  // &q=cat&page=1
  return instance.get('&', {
    params: {
      q,
      page,
    },
  });
};
