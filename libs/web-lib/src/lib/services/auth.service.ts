import apiClient from '../api/http-common';
import { UserLoginModel } from '@jdesjardins/dist-lib';

const userLogin: UserLoginModel = {
  username: 'jdesjardins',
  password: 'Password123',
};

export const getMe = async () => {
  return await apiClient
    .post('/login', userLogin)
    .then((res) => console.log(res));
};
