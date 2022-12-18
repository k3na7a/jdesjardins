import axios from 'axios';

const BASE_URL = 'http://localhost:3333/api';

export const localhost = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
