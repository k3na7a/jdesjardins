import apiClient from '../api/http-common';
import { IUser } from '@jdesjardins/dist-lib';
import { useAxios } from '../hooks';

class AuthService {
  getMe() {
    return apiClient.get<IUser>('/me', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlc2pqb2hAZ21haWwuY29tIiwic3ViIjoiMjVlMmM3ODktZmZmMC00NmU4LThjYjktNTVlZDY2NjZhNThjIiwiaWF0IjoxNjcxMjQ2NTY3LCJleHAiOjE2NzEzMzI5Njd9.N5ezg0aoi7ybaOWGfv04LU-RaRaV5HghCySmvD1UDhY',
      },
    });
  }
}

export const useAuthService = <T>() => {
  const [loading, data, error, request] = useAxios<T>({});

  return [loading, data, error, request];
};

export default new AuthService();
