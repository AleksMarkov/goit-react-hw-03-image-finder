import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts',
  params: {},
});

export const getAllPosts = () => {
  return instance.get('/');
};

export const searchPosts = search => {
  return instance.get('/');
};
