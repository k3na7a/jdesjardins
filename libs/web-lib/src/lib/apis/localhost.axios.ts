import axios from 'axios';

const BASE_URL = 'http://localhost:3333/api';

export const localhost = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export const localAuthenticate = axios.create({
  baseURL: `${BASE_URL}/authenticate`,
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
  },
});

export const localRefresh = axios.create({
  baseURL: `${BASE_URL}/refresh`,
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

export const localLogout = axios.create({
  baseURL: `${BASE_URL}/logout`,
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
  },
});
