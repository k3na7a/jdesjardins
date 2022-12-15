import apiClient from '../api/http-common';
import { User } from '@jdesjardins/dist-lib';
import { AxiosResponse } from 'axios';

export const getMe = async () => {
  return await apiClient
    .get<User>('/me', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlc2pqb2hAZ21haWwuY29tIiwic3ViIjoiMjVlMmM3ODktZmZmMC00NmU4LThjYjktNTVlZDY2NjZhNThjIiwiaWF0IjoxNjcxMTM2NzMyLCJleHAiOjE2NzEyMjMxMzJ9.EwCy96B7WyFC-jFn2Yx7vlOO-cTYBhhXcNznmqjjwNE',
      },
    })
    .then((response: AxiosResponse<User>) => {
      const { data } = response;
      return new User(data);
    });
};
