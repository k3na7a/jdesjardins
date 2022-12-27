import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';

export const usePrivateAxiosInstance = (instance: AxiosInstance) => {
  useEffect(() => {
    const responseRef = instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (config.headers)
          config.headers['Authorization'] = `Bearer ${localStorage.getItem(
            'AccessToken'
          )}`;
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    return () => {
      instance.interceptors.response.eject(responseRef);
    };
  }, [instance]);

  return instance;
};
