import axios from 'axios';

const url = 'http://localhost:3333/api';

const apiInstance = axios.create({
  baseURL: url,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  },
});

export default apiInstance;
