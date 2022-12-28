import axios from 'axios';

const BASE_URL = 'http://localhost:3333/api';

export const localhost = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export const localAuthenticate = axios.create({
  baseURL: `${BASE_URL}/me`,
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
  },
});

export const localLogin = axios.create({
  baseURL: `${BASE_URL}/login`,
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
});
