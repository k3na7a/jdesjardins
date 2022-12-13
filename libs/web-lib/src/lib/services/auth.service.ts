import apiClient from '../api/http-common';
import type { UserModel } from '@jdesjardins/dist-lib';

export const getMe = async () => {
  return await apiClient.get('/me').then((res) => {
    const user: UserModel = {
      id: res.data.id,
      username: res.data.username,
      email: res.data.email,
    };
    return user;
  });
};
