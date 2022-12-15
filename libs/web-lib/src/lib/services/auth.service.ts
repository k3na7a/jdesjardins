import apiClient from '../api/http-common';
import { IUser, User } from '@jdesjardins/dist-lib';
import { AxiosError } from 'axios';

export const getMe = async () => {
  return await apiClient
    .get('/me', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlc2pqb2hAZ21haWwuY29tIiwic3ViIjoiMjVlMmM3ODktZmZmMC00NmU4LThjYjktNTVlZDY2NjZhNThjIiwiaWF0IjoxNjcxMDQ1MjQxLCJleHAiOjE2NzExMzE2NDF9.Na-hZGeWr4GePKpc-KhJoHGNuQ9Ej9dsbIa9gBzX80s',
      },
    })
    .then((res) => {
      console.log(res.data as IUser);
      return new User(res.data as IUser);
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
};
