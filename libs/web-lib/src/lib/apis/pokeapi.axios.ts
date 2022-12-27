import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokeapi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export const pokeapi_pokemon = axios.create({
  method: 'GET',
  baseURL: `${BASE_URL}/pokemon/`,
  headers: {
    'Content-type': 'application/json',
  },
});
