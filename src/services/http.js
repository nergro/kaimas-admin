import axios from 'axios';
// import { getUserProperty } from 'Helpers/localUser';

export const frontUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
export const baseUrl = 'http://localhost:4000/api';

// const token = getUserProperty('token');

axios.defaults.baseURL = baseUrl;

// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
