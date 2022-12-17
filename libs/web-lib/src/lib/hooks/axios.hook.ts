/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import apiInstance from '../api/http-common';

export const useAxios = <T>(
  config: AxiosRequestConfig,
  loadOnStart = true
): [T | undefined, boolean, string, () => void] => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (loadOnStart) sendRequest();
    else setLoading(false);
  }, []);

  const request = () => {
    sendRequest();
  };

  const sendRequest = () => {
    setLoading(true);
    setTimeout(() => {
      apiInstance(config)
        .then((response: AxiosResponse) => {
          setError('');
          setData(response.data);
        })
        .catch((error: AxiosError) => {
          setError(error.message);
          setData(undefined);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1500);
  };

  return [data, loading, error, request];
};
