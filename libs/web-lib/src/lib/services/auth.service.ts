import apiClient from '../api/http-common';
import { User } from '@jdesjardins/dist-lib';

export const getMe = async () => {
  return await apiClient
    .get('/me', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlc2pqb2hAZ21haWwuY29tIiwic3ViIjoiMjVlMmM3ODktZmZmMC00NmU4LThjYjktNTVlZDY2NjZhNThjIiwiaWF0IjoxNjcwOTU4NDY0LCJleHAiOjE2NzEwNDQ4NjR9.AlpGPdjRk355uKW9LEcmt65HOs3J7mGMEbiGRYOUUqU',
      },
    })
    .then((res) => {
      return new User(res.data);
    });
};
