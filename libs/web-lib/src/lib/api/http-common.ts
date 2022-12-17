import axios from 'axios';

const BASE_URL = 'http://localhost:3333/api';

const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiInstance;
